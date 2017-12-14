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

		var groundMaterial = new THREE.MeshBasicMaterial( { map: groundTex, color: 0xffffff } );
		var groundGeom = new THREE.CubeGeometry( 4000, 4, 4000, 1, 1, 1 );
		var ground = new THREE.Mesh( groundGeom, groundMaterial );
		scene.add( ground );

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
		
		var model = load_OBJ(scene, "", "models/door.obj",
				{x: 0, y: 0}, {x: 70, y: 70, z: 70});
		ground.add( sound );
	}
}
