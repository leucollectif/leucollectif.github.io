function load_OBJ(scene, texture, obj, position, scale) {
  // texture
  var manager = new THREE.LoadingManager();
  manager.onProgress = function ( item, loaded, total ) {
    console.log( item, loaded, total );
  };
  var textureLoader = new THREE.TextureLoader( manager );
  var texture = textureLoader.load( texture );

  // model
  var onProgress = function ( xhr ) {
    if ( xhr.lengthComputable ) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
  };
  var onError = function ( xhr ) {
  };
  var loader = new THREE.OBJLoader( manager );
  loader.load( obj, function ( object ) {
    object.traverse( function ( child ) {
      if ( child instanceof THREE.Mesh )
        child.material.map = texture;
    } );
    object.position.x = position.x;
    object.position.y = position.y;
    object.scale.x = scale.x;
    object.scale.y = scale.y;
    object.scale.z = scale.z;
    scene.add( object )
  }, onProgress, onError );
}
