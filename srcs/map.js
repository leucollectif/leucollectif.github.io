function Map( scene, camera, index ) {
	var test_tex = new THREE.TextureLoader().load( 'img/UV_Grid_Sm.jpg' );

	this.ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
//	this.ambientLight.renderingGroupId = 1;
	scene.add( this.ambientLight );

	if (index == 1) {
		load_OBJ(scene, "img/UV_Grid_Sm.jpg", "models/fopMap2.obj",
			{x: 10, y: 1560}, {x: 100, y: 100, z: 100});
/*
		var spriteMaterial = new THREE.SpriteMaterial( { map: test_tex, color: 0xffffff } );
		var sprite = new THREE.Sprite( spriteMaterial );
		sprite.scale.set(100, 100, 1)
		sprite.position.y = 50;
		scene.add( sprite );
*/
/*
		var groundMaterial = new THREE.MeshBasicMaterial( { color: 0xaaaaaa } );
		var groundGeom = new THREE.CubeGeometry( 4000, 4, 4000, 1, 1, 1 );
		var ground = new THREE.Mesh( groundGeom, groundMaterial );
		scene.add( ground );
*/
/*
		this.walls = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	          1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	          1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	          1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1,
	          1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	          1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	          1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	          1, 0, 0, 0, 0, 0, 1, .5, .5, .5, 1, 0, 0, 0, 0, 1,
	          1, 0, 0, 0, 4, 3, 2, 1, 1, 1, 2, 3, 4, 0, 0, 1,
	          1, 0, 0, 0, 4, 0, 0, 1, 1, 1, 0, 0, 4, 0, 0, 1,
	          1, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 1,
	          1, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 1,
	          1, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 1,
	          1, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 1,
	          1, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 1,
	          1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1];
		var wallMaterial = new THREE.MeshBasicMaterial( { color: 0xaaaaaa } );
		var wallGeom = new THREE.CubeGeometry( 100, 100, 100 );
		for (var i = 0; i < this.walls.length; i++)
		{
			if (this.walls[i] > 0)
			{
				var wall = new THREE.Mesh( wallGeom, wallMaterial );
				wall.position.x = (i % 16)*100;
				wall.position.z = (i / 16)*100;
				wall.position.y = 100;
				scene.add( wall );
			}
		}
*/
	}
	else if (index == 0) {
		var groundTex = new THREE.TextureLoader().load( 'img/ground_low.jpg' );
		groundTex.wrapS = THREE.MirroredRepeatWrapping;
		groundTex.wrapT = THREE.MirroredRepeatWrapping;
		groundTex.repeat.set( 16, 16 );

		var groundMaterial = new THREE.MeshPhysicalMaterial( { map: groundTex, color: 0xffffff } );
		var groundGeom = new THREE.CubeGeometry( 4000, 4, 4000, 1, 1, 1 );
		var ground = new THREE.Mesh( groundGeom, groundMaterial );
		scene.add( ground );

		var sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xffffaa } );
		var sphereGeom = new THREE.SphereGeometry( 40, 32, 32);
		var sphere = new THREE.Mesh( sphereGeom, sphereMaterial );
		sphere.translateOnAxis( { x:0, y:1, z:0 }, 1500);
		sphere.translateOnAxis( { x:0, y:0, z:1 }, 250);
		scene.add( sphere );

		var listener = new THREE.AudioListener();
		camera.add( listener );
		var sound = new THREE.PositionalAudio( listener );
		//Load a sound and set it as the PositionalAudio object's buffer
		var audioLoader = new THREE.AudioLoader();
		audioLoader.load( 'sounds/brazil.ogg', function( buffer ) {
			sound.setBuffer( buffer );
			sound.setRefDistance( 200 );
			sound.play();
		});
		
		load_OBJ(scene, 'models/Room-Door/textures/Door_C.jpg', "models/Room-Door/Door_Component_BI3.obj",
				{x: 0, y: 0}, {x: 70, y: 70, z: 70});
		ground.add( sound );
/*
// create a keyframe track (i.e. a timed sequence of keyframes) for each animated property
				// Note: the keyframe track type should correspond to the type of the property being animated

		var positionKF = new THREE.VectorKeyframeTrack( '.position', [ 0, 1, 2 ],
														[ 0, 0, 0, 30, 0, 0, 0, 0, 0 ] );
		var scaleKF = new THREE.VectorKeyframeTrack( '.scale', [ 0, 1, 2 ],
													[ 1, 1, 1, 2, 2, 2, 1, 1, 1 ] );
		// ROTATION
		var xAxis = new THREE.Vector3( 1, 0, 0 );
		var qInitial = new THREE.Quaternion().setFromAxisAngle( xAxis, 0 );
		var qFinal = new THREE.Quaternion().setFromAxisAngle( xAxis, Math.PI );
		var quaternionKF = new THREE.QuaternionKeyframeTrack( '.quaternion', [ 0, 1, 2 ],
						[ qInitial.x, qInitial.y, qInitial.z, qInitial.w, qFinal.x, qFinal.y,
						qFinal.z, qFinal.w, qInitial.x, qInitial.y, qInitial.z, qInitial.w ] );
		// COLOR
		var colorKF = new THREE.ColorKeyframeTrack( '.material.color', [ 0, 1, 2 ],
							[ 1, 0, 0, 0, 1, 0, 0, 0, 1 ], THREE.InterpolateDiscrete );
		// OPACITY
		var opacityKF = new THREE.NumberKeyframeTrack( '.material.opacity', [ 0, 1, 2 ],
														[ 1, 0, 1 ] );
		// create an animation sequence with the tracks
		// If a negative time value is passed, the duration will be calculated from the times of the passed tracks array
		var clip = new THREE.AnimationClip( 'Action', 3,
							[ scaleKF, positionKF, quaternionKF, colorKF, opacityKF ] );

		this.mixer = new THREE.AnimationMixer( ground );
		var clipAction = this.mixer.clipAction( clip );
		clipAction.play();

		this.clock = new THREE.Clock();
*/
	}
}

Map.prototype.update = function() {
/*
	var delta = this.clock.getDelta()
	if (this.mixer)
		this.mixer.update( delta );
*/
}
