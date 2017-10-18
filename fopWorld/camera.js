function Camera(canvas, resolution, focalLength)
{
  this.ctx = canvas.getContext('2d');
  this.width = canvas.width = window.innerWidth * 0.5;
  this.height = canvas.height = window.innerHeight * 0.5;
  this.resolution = resolution;
  this.spacing = this.width / resolution;
  this.focalLength = focalLength || 0.8;
  this.range = MOBILE ? 8 : 20;
  this.lightRange = 10;
  this.scale = (this.width + this.height) / 1200;
}

Camera.prototype.render = function(player, map)
{
  this.drawSky(player.direction, player.decal, map.skybox, map.light);
  this.drawColumns(player, map);
  this.draw_miniMap(player, map);
  this.drawWeapon(player.weapon, player.paces);
};

Camera.prototype.draw_miniMap = function(player, map)
{
  var scale = 4;
  for (var i = 0; i < map.size * map.size; i++)
  {
    var x = i % map.size;
    var y = Math.floor(i / map.size);
    var wall = map.wallGrid[i];//get(x, y);
    if (wall > 0)
    {
      this.ctx.fillStyle = '#ff5522';
      //this.ctx.globalAlpha = 0.75;
      this.ctx.fillRect(x*scale, y*scale, scale, scale);
    }
    else if (Math.floor(player.x) == x && Math.floor(player.y) == y)
    {
      this.ctx.fillStyle = '#55ff22';
      this.ctx.fillRect(x*scale, y*scale, scale, scale);
    }
    else
    {
      this.ctx.fillStyle = '#555555';
      this.ctx.fillRect(x*scale, y*scale, scale, scale);
    }
  }
}

Camera.prototype.drawSky = function(direction, decal, sky, ambient)
{
  var width = sky.width * (this.height / sky.height) * 2;
  var left = (direction / CIRCLE) * -width;
  this.ctx.save();
  this.ctx.drawImage(sky.image, left, decal, width, this.height);

  if (left < width - this.width)
    this.ctx.drawImage(sky.image, left + width, decal, width, this.height);
  if (ambient > 0) // Not in use now
  {
    this.ctx.fillStyle = '#ffffff';
    this.ctx.globalAlpha = ambient * 0.1;
    this.ctx.fillRect(0, this.height * 0.5, this.width, this.height * 0.5);
  }
  this.ctx.restore();
};

Camera.prototype.drawColumns = function(player, map)
{
  this.ctx.save();
  for (var column = 0; column < this.resolution; column++)
  {
    var x = column / this.resolution - 0.5;
    var angle = Math.atan2(x, this.focalLength);
    var ray = map.cast(player, player.direction + angle, this.range);
    this.drawColumn(column, ray, angle, map, player.decal);
  }
  this.ctx.restore();
};

Camera.prototype.drawWeapon = function(weapon, paces)
{
  var bobX = Math.cos(paces * 2) * this.scale * 6;
  var bobY = Math.sin(paces * 4) * this.scale * 6;
  var left = this.width * 0.66 + bobX;
  var top = this.height * 0.6 + bobY;
  this.ctx.drawImage(weapon.image, left, top, weapon.width * this.scale, weapon.height * this.scale);
};

Camera.prototype.drawColumn = function(column, ray, angle, map, decal)
{
  var ctx = this.ctx;
  var texture = map.wallTexture;
  var texture_tab = map.wall_tab_texture;
  var left = Math.floor(column * this.spacing);
  var width = Math.ceil(this.spacing);
  var hit = -1;

//if (column == 0)
//  console.log(ray.length);

  while (++hit < ray.length && ray[hit].height <= 0);
  for (var s = ray.length - 1; s >= 0; s--)
  {
    var step = ray[s];
    if (typeof(s) == typeof(hit) && step.x > 0 && step.x < map.size && step.y > 0 && step.y < map.size)
    {
      var textureX = Math.floor(texture.width * step.offset);
      var wall = this.project(step.height, angle, step.distance, decal);
      //var hit = map.get_xy(step.x, step.y);
      if (!ray[hit])
        return ;
      var hitx = ray[hit].hit_coord[0];
      var hity = ray[hit].hit_coord[1];
      var wallTex = texture_tab[hitx + hity * map.size];
      ctx.drawImage(wallTex.image, textureX, 0, 1, wallTex.height, left, wall.top, width, wall.height);
// Draw floor starting from bottom of the wall ?
//      ctx.drawImage(texture.image, textureX, 0, 1, texture.height, left, wall.bot, width, wall.height); 
    }
  }
};

Camera.prototype.project = function(height, angle, distance, decal)
{
  var z = distance * Math.cos(angle);
  if (z == 0)
    z = .00001;
  var wallHeight = this.height * height / z;
  var bottom = this.height / 2 * (1 + 1 / z) + decal;
  return { bot: bottom,
           top: bottom - wallHeight,
           height: wallHeight }; 
};
