
function Map(size, map, texMap) {
  this.size = size;
  this.wallGrid = this.load(map);
  this.skybox = new Bitmap('fopWorld/assets/panorama3.jpg', 1000, 375);
  this.wallTexture = new Bitmap('fopWorld/assets/wall_texture2.jpg', 1024, 1024);
  this.wall_tab_texture = this.init_texture(texMap);
  this.light = 0;
}
Map.prototype.get = function(x, y) {
  x = Math.floor(x);
  y = Math.floor(y);
  if (x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1) return -1;
    return this.wallGrid[y * this.size + x];
};
Map.prototype.get_xy = function(x, y) {
  x = Math.floor(x);
  y = Math.floor(y);
  if (x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1) return -1;
  return [x, y]
};
Map.prototype.load = function(tab) {
  wallGrid = new Uint8Array(this.size * this.size);
  for (var i = 0; i < this.size * this.size; i++) {
//    if (tab[i] == '\n')
 //     i++;
    wallGrid[i] = tab[i];// - '0';
  }
  return wallGrid;
};
Map.prototype.randomize = function() {
  for (var i = 0; i < this.size * this.size; i++) {
    this.wallGrid[i] = Math.random() < 0.3 ? 1 : 0;
  }
};
Map.prototype.init_texture = function(tab) {
  var name = "";
  var wallTex = [];
  console.log(this.size);
  for (var i = 0; i < this.size * this.size; i++) {
    name = "fopWorld/assets/wall_" + tab[i] + ".jpg";
    wallTex[i] = new Bitmap(name , 1024, 1024);
  }
  return (wallTex);
}
Map.prototype.cast = function(point, angle, range) {
  var self = this;
  var sin = Math.sin(angle);
  var cos = Math.cos(angle);
  var noWall = { length2: Infinity };
  return ray({ x: point.x, y: point.y, height: 0, distance: 0 });
  function ray(origin) {
    var stepX = step(sin, cos, origin.x, origin.y);
    var stepY = step(cos, sin, origin.y, origin.x, true);
    var nextStep = stepX.length2 < stepY.length2
      ? inspect(stepX, 1, 0, origin.distance, stepX.y)
      : inspect(stepY, 0, 1, origin.distance, stepY.x);
    if (nextStep.distance > range) return [origin];
    return [origin].concat(ray(nextStep));
  }
  function step(rise, run, x, y, inverted) {
    if (run === 0) return noWall;
    var dx = run > 0 ? Math.floor(x + 1) - x : Math.ceil(x - 1) - x;
    var dy = dx * (rise / run);
    return {
      x: inverted ? y + dy : x + dx,
      y: inverted ? x + dx : y + dy,
      length2: dx * dx + dy * dy
    };
  }
  function inspect(step, shiftX, shiftY, distance, offset) {
    var dx = cos < 0 ? shiftX : 0;
    var dy = sin < 0 ? shiftY : 0;
    var res = map.get(step.x - dx, step.y - dy);
    step.height = self.get(step.x - dx, step.y - dy);
//    hit = self.get_xy(step.x - dx, step.y - dy);
    step.hit_coord = self.get_xy(step.x - dx, step.y - dy);
    step.distance = distance + Math.sqrt(step.length2);
    if (shiftX) step.shading = cos < 0 ? 2 : 0;
    else step.shading = sin < 0 ? 2 : 1;
    step.offset = offset - Math.floor(offset);
    return step;
  }
};
Map.prototype.update = function(seconds) {
  if (this.light > 0) this.light = Math.max(this.light - 10 * seconds, 0);
  else if (Math.random() * 5 < seconds) this.light = 2;
};

//  this.wallGrid = new Uint8Array(size * size);
