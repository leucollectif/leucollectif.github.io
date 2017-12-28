function load_OBJ(scene, texture, obj, position, scale) {
	// texture
	var manager = new THREE.LoadingManager();
	manager.onProgress = function ( item, loaded, total ) {
		console.log( "item, loaded, total :", item, loaded, total );
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
		console.log( "Error : ", xhr );
	};
	var mtlLoader = new THREE.MTLLoader( manager );
	mtlLoader.setPath( 'models/Room-Door/' );
	mtlLoader.load( 'Door_Component_BI3.mtl', function( materials ) {
		materials.preload();
		var objLoader = new THREE.OBJLoader( manager );
		objLoader.setMaterials( materials );
//		objLoader.setPath( 'obj/male02/' );
		objLoader.load( obj, function ( object ) {
			/*object.position.y = - 95;
			scene.add( object );
		}, onProgress, onError );
	});

	var loader = new THREE.OBJLoader( manager );
	loader.load( obj, function ( object ) {*/
		object.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				console.log( "Child : ", child );
				child.material.map = texture;
			}
		} );
		console.log( "Object : ", object );
		object.position.x = position.x;
		object.position.y = position.y;
		object.scale.x = scale.x;
		object.scale.y = scale.y;
		object.scale.z = scale.z;
		scene.add( object );
	}, onProgress, onError );
	console.log( "Loader : ", objLoader);
	});
//	console.log( "Loader : ", loader);
}
