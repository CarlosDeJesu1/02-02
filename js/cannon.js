
class Cannon{
    constructor(x, y, width, height,angle) {
    this.x = x; 
    this.y = y;
    
    this.image = loadImage("assets/cannon_base.png");
    this.width = width;
    this.height = height;
    this.angle = angle;
    }

display() {
    console.log(this.angle);
    if(keyIsDown(RIGHT_ARROW) && this.angle < 0.5){
        this.angle += 0.02;
    }
    if(keyIsDown(LEFT_ARROW) && this.angle > -1.45){
        this.angle -= 0.02;
    }
    
    fill("gray");
    push();
    translate(this.x,this.y);
    rotate(this.angle);
    rect(-10,-20,this.width,this.height);
    pop();
    arc(this.x - 40, this.y + 80, 130, 180,PI,TWO_PI);
    noFill();
}
}
