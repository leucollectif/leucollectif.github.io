function Player(x, y, direction) {
  this.x = x;
  this.y = y;
  this.direction = direction;
  this.decal = 0;
  this.weapon = new Bitmap('assets/hand.png', 319, 320);
  this.paces = 0;
}
Player.prototype.rotate = function(angle) {
  this.direction = (this.direction + angle + CIRCLE) % (CIRCLE);
};
Player.prototype.upndown = function(decal) {
  this.decal = this.decal + decal;
};
Player.prototype.walk = function(distance, map) {
  var dx = Math.cos(this.direction) * distance;
  var dy = Math.sin(this.direction) * distance;
  if (map.get(this.x + dx, this.y) <= 0) this.x += dx;
  if (map.get(this.x, this.y + dy) <= 0) this.y += dy;
  this.paces += distance;
};
Player.prototype.update = function(controls, map, seconds) {
  if (controls.left) this.rotate(-Math.PI * seconds);
  if (controls.right) this.rotate(Math.PI * seconds);
  if (controls.down) this.upndown(-10);
  if (controls.up) this.upndown(10);
  if (controls.forward) this.walk(5 * seconds, map);
  if (controls.backward) this.walk(-5 * seconds, map);
};
