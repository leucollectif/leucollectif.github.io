function Map(scene) {
	this.ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
	scene.add( this.ambientLight );
	load_OBJ(scene, "NiouSckoolz/img/UV_Grid_Sm.jpg", "NiouSckoolz/models/fopMap2.obj",
			{x: 10, y: 1505}, {x: 100, y: 100, z: 100});
//	load_OBJ(scene, "UV_Grid_Sm.jpg", "male02.obj",
//			{x: 5, y: -5}, {x: 1, y: 1, z: 1});
	var spriteMap = new THREE.TextureLoader().load( 'NiouSckoolz/img/UV_Grid_Sm.jpg' );
	var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
	var sprite = new THREE.Sprite( spriteMaterial );

	sprite.scale.set(100, 100, 1)
	sprite.position.y = 50;
	scene.add( sprite );
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
  var skyboxGeom = new THREE.CubeGeometry( 5000, 5000, 5000, 1, 1, 1 );
  var skybox = new THREE.Mesh( skyboxGeom);//, skyboxMaterial );
  skybox.material.map = spriteMap;
  skybox.material.side = THREE.BackSide;
  scene.add( skybox );
}
