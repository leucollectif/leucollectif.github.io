function Player(scene, camera) {
	this.mov = {x:0, y:0, z:0};
	this.angleY = 0;
	this.xAxis = new THREE.Vector3( );
	this.yAxis = new THREE.Vector3( );
	this.zAxis = new THREE.Vector3( );
	this.hud = new Hud(scene, camera);
	this.raycaster = new THREE.Raycaster();
	this.center = new THREE.Vector2( 0., 0. );
	this.intersects;
	/*min = camera.position;
	min.y -= 70;
	max = camera.position;
	this.box = THREE.Box3( min, max );*/
	this.speed = 0;
}

Player.prototype.move = function(controls, camera) {
	if (controls.states.forward) this.mov.z = -15;
	else if (controls.states.backward) this.mov.z = 15;
	else if (controls.states.up) this.mov.y = 15;
	else if (controls.states.down) this.mov.y = -15;
	else {this.mov.z = 0;this.mov.y = 0;}
	// Todo : check backward also
	// cleaner way to set ray, so we can then easily set move along walls
	axisY = new THREE.Vector3( 0, -1, 0 );
	this.raycaster.set( camera.position, axisY );
	this.intersects = this.raycaster.intersectObjects( scene.children, true );
	if ( this.intersects.length > 0 ) {
		dist = this.intersects[ 0 ].distance;
		pos = camera.position.y;
//console.log( "dist : ", dist );
//console.log( "pos : ", pos );
		if ( dist > pos )
		{
//			this.speed += 9.81;
//			camera.position.y = pos - this.speed;
		}
//		if ( dist < pos )
//			camera.position.y = pos + 9.81;
	}
	this.raycaster.setFromCamera( this.center, camera );
	this.intersects = this.raycaster.intersectObjects( scene.children, true );
//	if (this.intersects) {
//		if ( !( this.intersects[ 0 ].object.type == "Mesh" && this.intersects[ 0 ].distance < 100 ) ) {
			camera.modelViewMatrix.extractBasis( this.xAxis, this.yAxis, this.zAxis );
			camera.translateOnAxis( this.zAxis, this.mov.z );
			camera.translateOnAxis( this.yAxis, this.mov.y );
//		}
//	}
	
	//camera.translateOnAxis( this.xAxis, this.mov.x );
}

Player.prototype.rotate = function(controls, camera, scene) {
	this.angleY = -controls.decal.x * .02;
//	if (Math.abs(controls.decal.x) < .2 )
//		this.angleY = 0;
	if (controls.states.left) this.mov.x = .05;
	else if (controls.states.right) this.mov.x = -.05;
	else this.mov.x = 0;
	camera.rotateY( this.mov.x );

//	scene.modelViewMatrix.extractBasis( this.xAxis, this.yAxis, this.zAxis );
//	camera.setRotationFromAxisAngle( this.yAxis, this.angleY );
}

Player.prototype.update = function(controls, camera, scene) {
	this.move(controls, camera);
	this.rotate(controls, camera, scene);
	// update the picking ray with the camera and mouse position
	this.raycaster.setFromCamera( controls.mouse, camera );
	// we shouldn't need recursive intersection
	this.intersects = this.raycaster.intersectObjects( scene.children, true );
	if (controls.click & this.intersects.length > 0) {
		//this.intersects[ 0 ].object.material.color.set( 0xff0000 );
		console.log(this.intersects[ 0 ].object);
		controls.click = 0;
//		for ( var i = 0; i < this.intersects.length; i++ ) {
//			this.intersects[ i ].object.material.color.set( 0xff0000 );
//			console.log(this.intersects[ i ].object.type);
//		}
	}
	this.hud.update(camera, this.raycaster.ray.direction);
}
