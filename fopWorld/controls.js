function Controls() {
  this.codes  = { 81: 'up', 69: 'down', 37: 'left', 65: 'left', 68: 'right',
                  39: 'right', 87: 'forward', 38: 'forward', 83: 'backward',
                  40: 'backward' };
  this.states = { 'up': false, 'down': false, 'left': false, 'right': false, 'forward': false, 'backward': false };
  document.addEventListener('keydown', this.onKey.bind(this, true), false);
  document.addEventListener('keyup', this.onKey.bind(this, false), false);
  document.addEventListener('touchstart', this.onTouch.bind(this), false);
  document.addEventListener('touchmove', this.onTouch.bind(this), false);
  document.addEventListener('touchend', this.onTouchEnd.bind(this), false);
}
Controls.prototype.onTouch = function(e) {
  var t = e.touches[0];
  this.onTouchEnd(e);
  if (t.pageY < window.innerHeight * 0.5) this.onKey(true, { keyCode: 38 });
  else if (t.pageX < window.innerWidth * 0.5) this.onKey(true, { keyCode: 37 });
  else if (t.pageY > window.innerWidth * 0.5) this.onKey(true, { keyCode: 39 });
};
Controls.prototype.onTouchEnd = function(e) {
  this.states = { 'left': false, 'right': false, 'forward': false, 'backward': false };
  //todo : edit the line before to keep homogeneity with up and down states
  e.preventDefault();
  e.stopPropagation();
};
Controls.prototype.onKey = function(val, e) {
  var state = this.codes[e.keyCode];
//  console.log(e.keyCode);
  if (typeof state === 'undefined') return;
  this.states[state] = val;
  e.preventDefault && e.preventDefault();
  e.stopPropagation && e.stopPropagation();
};
