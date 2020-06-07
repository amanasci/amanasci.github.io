let x = 1.1;
let y = 2;
let z = 7;

let a = 10.0;
let b = 28.0;
let c = 8.0 / 3.0;

let points = new Array();

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent("header");
  colorMode(HSB);
  perspective((60 * PI) / 180, width / height, 1, 5000);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  let dt = 0.01;

  let dx = a * (y - x) * dt;
  let dy = (x * (b - z) - y) * dt;
  let dz = (x * y - c * z) * dt;
  x = x + dx;
  y = y + dy;
  z = z + dz;

  points.push(new p5.Vector(x, y, z));

  if (points.length > 3500) {
    points.length = 0;
    x = 1.1;
    y = 2;
    z = 7;
  }

  translate(0, 0, -80);
  let camX = map(mouseX, 0, width, -200, 200);
  let camY = map(mouseY, 0, height, -1000, 1000);
  camera(camX, camY, -70, 0, 0, 0, 0, 1, 0);
  //translate(width / 2, height / 2);
  scale(6);
  stroke(255);
  strokeWeight(10);
  noFill();

  let hu = 0;
  beginShape(points);

  for (let v of points) {
    stroke(hu, 255, 255);
    vertex(v.x, v.y, v.z);
    //var offset = p5.Vector.random3D();
    //offset.mult(0.1);
    //v.add(offset);

    hu += 1;
    if (hu > 255) {
      hu = 0;
    }
  }
  endShape();

  console.log(points.length);

  //println(x,y,z);
}
