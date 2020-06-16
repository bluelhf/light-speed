class Star {
  constructor(x, y, colour, size) {
    this.colour = colour;
    this.size = size; // Maybe this could be part of the constructor parameters?
    this.pos = createVector(x, y);

    this.dead = false;
    this.aliveTicks = 0;
    this.ppos = this.pos.copy(); // ppos = previous position


    // Define some constants to save that sweet sweet computation time
    this.MAX_DIST_SQ = width*width+height*height;
    this.MID_VECTOR = createVector(width/2, height/2);
  }

  toCentre() {
    return p5.Vector.sub(this.pos, this.MID_VECTOR);
  }
  
  update() {
    if (this.dead) return;
    this.aliveTicks += 0.1;

    this.ppos = this.pos.copy();
    this.pos.add(this.toCentre().mult(speed));

    if (this.ppos.magSq() > this.MAX_DIST_SQ) this.dead = true;
  }

  
  show() {
    if (this.dead) return;

    push();
    let weight = map(this.toCentre().magSq(), 0, this.MAX_DIST_SQ, this.size, 8);

    let dist = p5.Vector.dist(this.ppos, this.pos);
    if (dist == 0) weight = this.size;

    // Sigmoid of aliveTicks is used here to make stars fade in when they're created instead of just popping in.
    // We could optionally just use an alpha value for new stars.
    weight *= sigmoid(this.aliveTicks);

    strokeWeight(weight);stroke(this.colour);
    line(this.ppos.x, this.ppos.y, this.pos.x, this.pos.y);
    pop();
  }
}