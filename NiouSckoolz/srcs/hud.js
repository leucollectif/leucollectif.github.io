function Hud(scene, camera) {
/*	var spriteMap = new THREE.TextureLoader().load( 'UV_Grid_Sm.jpg' );
	var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
	this.visor = new THREE.Sprite( spriteMaterial );
	this.visor.scale.set(1, 1, 1)
	this.visor.position = camera.position;
	scene.add( this.visor ); */
	this.width = window.innerWidth;
	this.height = window.innerHeight;

	// HUD from http://codepen.io/jaamo/pen/MaOGZV
	this.hudCanvas = document.createElement('canvas');
  
	// Again, set dimensions to fit the screen.
	this.hudCanvas.width = this.width;
	this.hudCanvas.height = this.height;

	// Get 2D context and draw something supercool.
	this.hudBitmap = this.hudCanvas.getContext('2d');
	this.hudBitmap.font = "Normal 40px Arial";
	this.hudBitmap.textAlign = 'center';
	this.hudBitmap.fillStyle = "rgba(245,245,245,0.75)";
	this.hudBitmap.fillText('Initializing...', this.width / 2, this.height / 2);
     
/*	// Create the camera and set the viewport to match the screen dimensions.
	this.cameraHUD = new THREE.OrthographicCamera(-this.width/2, this.width/2, this.height/2, -this.height/2, 0, 30 );

	// Create also a custom scene for HUD.
	this.sceneHUD = new THREE.Scene();
 
	// Create texture from rendered graphics.
	this.hudTexture = new THREE.Texture(this.hudCanvas) 
	this.hudTexture.needsUpdate = true;
  
	// Create HUD material.
	this.material = new THREE.MeshBasicMaterial( {map: this.hudTexture} );
	this.material.transparent = true;

	// Create plane to render the HUD. This plane fill the whole screen.
	this.planeGeometry = new THREE.PlaneGeometry( this.width, this.height );
	this.plane = new THREE.Mesh( this.planeGeometry, this.material );
	this.sceneHUD.add( this.plane );*/
}

Hud.prototype.update = function(camera, dir) {
/*	this.visor.position.x = camera.position.x + dir.x*10;
	this.visor.position.y = camera.position.y;
	this.visor.position.z = camera.position.z + dir.z*10; */
/*
    this.hudBitmap.clearRect(0, 0, this.width, this.height);
    this.hudBitmap.fillText("I'm glad you came...", this.width/2, this.height/2);
  	this.hudTexture.needsUpdate = true;*/
}

