doAlpha = true;


let speed;
var stars = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}


// Sigmoid is a function which maps the entire number line between 0 and 1.
// It's defined as 1/(1+e⁻ˣ)
// Think of it as a scale of "how positive is this number?"
function sigmoid(value) {
  return 1/(1+pow(2.7182818284590452353602874713526624977572470936999595749669676277240766303535475945713821785251664274, -value));
}

// mouseControl handles controlling the amount and speed of stars via the mouse.
function mouseControl() {
  let starCount = map(mouseY, 0, height, 7500, 20);
  if (stars.length > starCount) {
    stars.splice(starCount-1, Infinity);
  } else for (let i = 0; i < starCount-stars.length; i++) {
    stars.push(newStar());
  }

  speed = map(mouseX, 0, width, 0, 1);
}

function newStar() {
  let b = random(0, 200);
  let col = color(b, b+random(0, 50), random(200, 255));
  let star = new Star(random(width), random(height), col, random(0.01, 5));
  return star;
}

function draw() {
  mouseControl();
  background(0, doAlpha ? 100 : 255);

  for (let i = stars.length-1; i > 0; i--) {
    if (stars[i].dead) {
      stars.splice(stars.indexOf(stars[i]), 1);
      stars.push(newStar());
    }
    stars[i].update();
    stars[i].show();
  }
}