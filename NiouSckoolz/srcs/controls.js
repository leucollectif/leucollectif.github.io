function Controls(windowHalfX, windowHalfY)
{
  this.codes  = { 81: 'q', 69: 'e', 37: 'left', 65: 'left', 68: 'right',
                  39: 'right', 87: 'up', 38: 'up', 83: 'down',
                  40: 'down' };
  this.states = { 'up': false, 'down': false, 'left': false, 'right': false,
					'forward': false, 'backward': false };
  this.winHalfX = windowHalfX;
  this.winHalfY = windowHalfY;
  this.mouse = new THREE.Vector2();
  this.last = new THREE.Vector2();
  this.decal = new THREE.Vector2();
  document.addEventListener('keydown', this.onKey.bind(this, true), false);
  document.addEventListener('keyup', this.onKey.bind(this, false), false);
  document.addEventListener('touchstart', this.onTouch.bind(this), false);
  document.addEventListener('touchmove', this.onTouch.bind(this), false);
  document.addEventListener('touchend', this.onTouchEnd.bind(this), false);

  document.addEventListener( 'mousemove', this.onMouseMove.bind(this), false );
}

Controls.prototype.onTouch = function(e)
{
  var t = e.touches[0];
  this.onTouchEnd(e);
  if (t.pageY < window.innerHeight * 0.5) this.onKey(true, { keyCode: 38 });
  else if (t.pageX < window.innerWidth * 0.5) this.onKey(true, { keyCode: 37 });
  else if (t.pageY > window.innerWidth * 0.5) this.onKey(true, { keyCode: 39 });
};

Controls.prototype.onTouchEnd = function(e)
{
  this.states = { 'left': false, 'right': false, 'forward': false, 'backward': false };
  //todo : edit the line before to keep homogeneity with up and down states
  e.preventDefault();
  e.stopPropagation();
};

Controls.prototype.onKey = function(val, e)
{
  var state = this.codes[e.keyCode];
//  console.log(e.keyCode);
  if (typeof state === 'undefined') return;
  this.states[state] = val;
  e.preventDefault && e.preventDefault();
  e.stopPropagation && e.stopPropagation();
};

Controls.prototype.onMouseMove = function(e)
{
  this.last.x = this.mouse.x;
  this.last.y = this.mouse.y;
  this.mouse.x = ( e.clientX - this.winHalfX ) / 2;
  this.mouse.y = ( e.clientY - this.winHalfY ) / 2;
  this.decal.x = this.mouse.x - this.last.x;
  this.decal.y = this.mouse.y - this.last.y;
}
