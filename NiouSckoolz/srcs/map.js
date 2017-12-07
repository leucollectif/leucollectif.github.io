function Map( scene, camera, index ) {
	var test_tex = new THREE.TextureLoader().load( 'NiouSckoolz/img/UV_Grid_Sm.jpg' );
/*var materialArray = [];
  materialArray.push(new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( 'UV_Grid_Sm.jpg' ) })); // xpos
  materialArray.push(new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( 'UV_Grid_Sm.jpg' ) })); // xneg
  materialArray.push(new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( 'UV_Grid_Sm.jpg' ) })); // ypos
  materialArray.push(new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( 'UV_Grid_Sm.jpg' ) })); // yneg
  materialArray.push(new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( 'UV_Grid_Sm.jpg' ) })); // zpos
  materialArray.push(new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( 'UV_Grid_Sm.jpg' ) })); // zneg
  for (var i = 0; i < 6; i++)
     materialArray[i].side = THREE.BackSide;
  var skyboxMaterial = new THREE.MeshFaceMaterial( materialArray );*/
	var skyboxMaterial = new THREE.MeshBasicMaterial( { map: test_tex, color: 0xffffff } );
	var skyboxGeom = new THREE.CubeGeometry( 4000, 4000, 4000, 1, 1, 1 );
	this.skybox = new THREE.Mesh( skyboxGeom, skyboxMaterial );
	this.skybox.material.side = THREE.BackSide;
	this.skybox.material.fog = false;
	this.skybox.renderingGroupId = 0;
	this.skybox.position.copy( camera.position );
	scene.add( this.skybox );


	this.ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
	this.ambientLight.renderingGroupId = 1;
	scene.add( this.ambientLight );

	if (index == 1) {
//	load_OBJ(scene, "NiouSckoolz/img/UV_Grid_Sm.jpg", "NiouSckoolz/models/fopMap2.obj",
//			{x: 10, y: 1560}, {x: 100, y: 100, z: 100});
		var spriteMaterial = new THREE.SpriteMaterial( { map: test_tex, color: 0xffffff } );
		var sprite = new THREE.Sprite( spriteMaterial );
		sprite.renderingGroupId = 1;

		sprite.scale.set(100, 100, 1)
		sprite.position.y = 50;
		scene.add( sprite );
//  scene.registerBeforeRender(function() { skybox.position = camera.position });
		var groundMaterial = new THREE.MeshBasicMaterial( { color: 0xaaaaaa } );
		var groundGeom = new THREE.CubeGeometry( 4000, 4, 4000, 1, 1, 1 );
		var ground = new THREE.Mesh( groundGeom, groundMaterial );
		ground.renderingGroupId = 1;
//	scene.add( ground );
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
				wall.renderingGroupId = 1;
				scene.add( wall );
			}
		}
	}
	else if (index == 0) {
		var spriteMaterial = new THREE.SpriteMaterial( { map: test_tex, color: 0xffffff } );
		var sprite = new THREE.Sprite( spriteMaterial );
		sprite.renderingGroupId = 1;

		sprite.scale.set(100, 100, 1)
		sprite.position.y = 50;
		scene.add( sprite );

		var groundMaterial = new THREE.MeshBasicMaterial( { color: 0xaaaaaa } );
		var groundGeom = new THREE.CubeGeometry( 4000, 4, 4000, 1, 1, 1 );
		var ground = new THREE.Mesh( groundGeom, groundMaterial );
		ground.renderingGroupId = 1;
		scene.add( ground );
		
		load_OBJ(scene, "", "NiouSckoolz/models/door.obj",
				{x: 0, y: 0}, {x: 70, y: 70, z: 70});
	}
}
