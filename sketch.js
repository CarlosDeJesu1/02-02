const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var tower,ground,cannon,angle,cannonBall,boat;
var backgroundImg, waterSound, backgroundMusic, cannonExplosion;

var balls = [];
var boats = [];

var boatAnimation = [];
var boatSpritedata, boatSpritesheet;

var brokenBoatAnimation = [];
var brokenBoatSpritedata, brokenBoatSpritesheet;

var isGameOver = false;

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");

  boatSpritedata = loadJSON("assets/boat/boat.json");
  boatSpritesheet = loadImage("assets/boat/boat.png");

  brokenBoatSpritedata = loadJSON("assets/boat/broken_boat.json");
  brokenBoatSpritesheet = loadImage("assets/boat/broken_boat.png");
 
  cannonExplosion = loadSound("./assets/cannon_explosion.mp3");
}

function setup() {
  canvas = createCanvas(1200,600);

  engine = Engine.create();
  world = engine.world;
  angle = -PI/4;

  ground = new Ground(0,height - 1,width * 2,2);
  tower = new Tower(150,350,150,300);
  cannon = new Cannon(185,135,50,25,angle);

  var boatFrames = boatSpritedata.frames;
  for (var i = 0; i < boatFrames.length; i++) {
    var pos = boatFrames[i].position;
    var img = boatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    boatAnimation.push(img);
  }

  var brokenBoatFrames = brokenBoatSpritedata.frames;
  for (var i = 0; i < brokenBoatFrames.length; i++) {
    var pos = brokenBoatFrames[i].position;
    var img = brokenBoatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    brokenBoatAnimation.push(img);
  }

  //rectMode(CENTER);
  //ellipseMode(RADIUS);

}

function draw() 
{
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

//muestra la torre(desafío 4)
 ground.display();
 cannon.display();
 tower.display();

 showBoats();

 for(var i = 0; i < balls.length; i ++){
  showCannonBalls(balls[i],i);
  for(var j=0; j < boats.length;j++){
    if(balls[i]!==undefined && boats[j]!==undefined){
          var collision = Matter.SAT.collides(balls[i].body,boats[j].body);
          if(collision.collided){
            boats[j].remove(j);
            Matter.World.remove(world,balls[i].body);
            balls.splice(i,1);
            i--;
          }
        }
      }
    }
}

function keyPressed(){
if(keyCode === DOWN_ARROW){
  var cannonBall = new CannonBall(cannon.x,cannon.y);
  cannonBall.trajectory =[];
  Matter.Body.setAngle(cannonBall.body,cannon.angle);
  balls.push(cannonBall);
}
}

function keyReleased(){
if(keyCode === DOWN_ARROW){
  balls[balls.length - 1].shoot();
}
}

function showCannonBalls(ball,index){
  ball.display();
  if(ball.body.position.x >= width || ball.body.position.y >= height - 50){
      Matter.World.remove(world,ball.body);
      balls.splice(index,1);
  }
}

function showBoats(){
  if(boats.length > 0){
    if(
      boats.length < 4 && 
      boats[boats.length - 1].body.position.x < width - 300){

      var positions = [-40,-60,-70,-20];
      var position = random(positions);
      var  boat = new Boat(width,height - 100,170,170,position,boatAnimation);
      boats.push(boat)
    }
    for(var i = 0; i < boats.length;i++){
      Matter.Body.setVelocity(boats[i].body,{
        x:-0.9,
        y:0
      });

      boats[i].display();
      boats[i].animate();

      var collision = Matter.SAT.collides(tower.body,boats[i].body);
      if(collision.collides && !boats[i].isBroken){
        isGameOver = true
        gameOver();
      }
    }
  } else {
    var  boat = new Boat(width,height - 60,170,170,-60,boatAnimation);
    boats.push(boat);
  }
}

function gameOver(){
swal({
  title:"Fin del juego",
  confirmBottonText:"Jugar de nuevo",
},
function(isConfirm){
  if(isConfirm){
    location.reload();
  }
}
);
}