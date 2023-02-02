class CannonBall{
    constructor(x,y){
    var options = {
        restitution:0.8,
        friction:1.0,
        density:1.0,
        isStatic: true
    };
    this.image = loadImage("assets/cannonball.png");
    this.r = 40; 
    this.body = Bodies.circle(x,y,this.r,options);
    World.add(world,this.body);
    this.trajectory = [];
    }

    shoot(){
    var velocity = p5.Vector.fromAngle(cannon.angle);
    velocity.mult(20);
    Matter.Body.setStatic(this.body,false);
    Matter.Body.setVelocity(this.body,{x:velocity.x,y:velocity.y});
    }

    display(){
        var angle = this.body.angle;
        var pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image,0,0,this.r,this.r);
        pop();

        if(this.body.velocity.x > 0 && this.body.position.x > 300){
            var position = [this.body.position.x,this.body.position.y]
            this.trajectory.push(position)
        }
        for(var e= 0; e < this.trajectory.length; e++){
            image(this.image,this.trajectory[e][0],this.trajectory[e][1],5,5);
        }
    }
}