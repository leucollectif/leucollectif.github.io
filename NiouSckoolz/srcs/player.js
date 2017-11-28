function Player(scene, camera) {
	this.mov = {x:0, z:0};
	this.angleY = 0;
	this.xAxis = new THREE.Vector3( );
	this.yAxis = new THREE.Vector3( );
	this.zAxis = new THREE.Vector3( );
	this.hud = new Hud(scene, camera);
	this.raycaster = new THREE.Raycaster();
	this.center = new THREE.Vector2( 0., 0. );
	this.intersects;
}

Player.prototype.move = function(controls, camera) {
	if (controls.states.left) this.mov.x = -15;
	else if (controls.states.right) this.mov.x = 15;
	else this.mov.x = 0;
	if (controls.states.down) this.mov.z = 15;
	else if (controls.states.up) this.mov.z = -15;
	else this.mov.z = 0;

	camera.modelViewMatrix.extractBasis( this.xAxis, this.yAxis, this.zAxis );
	camera.translateOnAxis( this.zAxis, this.mov.z );
	camera.translateOnAxis( this.xAxis, this.mov.x );
}

Player.prototype.rotate = function(controls, camera, scene) {
	this.angleY = -controls.decal.x * .02;
//	if (Math.abs(controls.decal.x) < .2 )
//		this.angleY = 0;
	camera.rotateY( this.angleY );

//	scene.modelViewMatrix.extractBasis( this.xAxis, this.yAxis, this.zAxis );
//	camera.setRotationFromAxisAngle( this.yAxis, this.angleY );
}

Player.prototype.update = function(controls, camera, scene) {
	this.move(controls, camera);
	this.rotate(controls, camera, scene);
	// update the picking ray with the camera and center of the screen
	this.raycaster.setFromCamera( this.center, camera );
	this.intersects = this.raycaster.intersectObjects( scene.children, true );
	for ( var i = 0; i < this.intersects.length; i++ ) {
//		this.intersects[ i ].object.material.color.set( 0xff0000 );
//		console.log(this.intersects[ i ].object.type);
	}
	this.hud.update(camera, this.raycaster.ray.direction);
}
