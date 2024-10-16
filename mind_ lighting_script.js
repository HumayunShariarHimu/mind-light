var ctx = canvas.getContext("2d");
var discs = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var TWO_PI = 2 * Math.PI;
discCount = 50;


for(i = 0; i < discCount; i++){
  var disc = {
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    radius: 60,
    x_vel: 5-Math.random()*10,
    y_vel: 5-Math.random()*10
  };
  discs.push(disc);
}
//Colours from:
//https://krazydad.com/tutorials/makecolors.php
var red = [];
var grn = [];
var blu = [];

center = 128;
width = 127;
frequency1 = 0.3;
frequency2 = 0.3;
frequency3 = 0.3;

phase1 = 0;
phase2 = 2;
phase3 = 4;

for (s = 0; s < discCount; s++) {
  red[s] = Math.round(Math.sin(frequency1*s + phase1) * width + center);
  grn[s] = Math.round(Math.sin(frequency2*s + phase2) * width + center);
  blu[s] = Math.round(Math.sin(frequency3*s + phase3) * width + center);
}

function move() {
  for(i = 0; i < discCount; i++){
    if(discs[i].x < discs[i].radius/5){
      discs[i].x = discs[i].radius/5;
      discs[i].x_vel = -discs[i].x_vel;
    }  
    if(discs[i].y < discs[i].radius/5){
      discs[i].y = discs[i].radius/5;
      discs[i].y_vel = -discs[i].y_vel;
    }
    if(discs[i].x > canvas.width-discs[i].radius/5){
      discs[i].x = canvas.width-discs[i].radius/5;
      discs[i].x_vel = -discs[i].x_vel;
    }  
    if(discs[i].y > canvas.height-discs[i].radius/5){
      discs[i].y = canvas.height-discs[i].radius/5;
      discs[i].y_vel = -discs[i].y_vel;
    }

    discs[i].x += discs[i].x_vel;
    discs[i].y += discs[i].y_vel;
  }
}

function draw() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
 
  move();

  discSize = Math.min(canvas.width, canvas.height)/3;

  ctx.save();
  for(i = 0; i < discCount; i++){

    ctx.globalCompositeOperation = "lighter";
    var grd = ctx.createRadialGradient(discs[i].x,discs[i].y,0,discs[i].x,discs[i].y, discSize);
    grd.addColorStop(0, 'rgba('+red[i]+','+grn[i]+','+blu[i]+',1)');
    //Background colour #114
    grd.addColorStop(1, 'rgba(17,27,68,0)');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(discs[i].x, discs[i].y, discSize, 0, TWO_PI);
    ctx.fill();
  }
  ctx.restore();

  window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);