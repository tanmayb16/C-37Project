var trex, trex_running;
var groung, ground_image;
var invisible_ground;
var cloud,cloud_image
var obstacle, obstacle1, obstacle2, obstacle3,
    obstacle4, obstacle5, obstacle6;

var score =0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var restart, restart_image, gameOver, gameOver_image;

function preload(){
  trex_running=loadAnimation("images/trex1.png","images/trex3.png","images/trex4.png");
  ground_image = loadImage("images/ground2.png");
  cloud_image = loadImage("images/cloud.png");
  trex_collided = loadImage("images/trex_collided.png");
  obstacle1 = loadImage("images/obstacle1.png");
  obstacle2 = loadImage("images/obstacle2.png");
  obstacle3 = loadImage("images/obstacle3.png");
  obstacle4 = loadImage("images/obstacle4.png");
  obstacle5 = loadImage("images/obstacle5.png");
  obstacle6 = loadImage("images/obstacle6.png");
  gameOver_image = loadImage("images/gameOver.png");
  restart_image = loadImage("images/restart.png");
}

function setup() {
  createCanvas(displayWidth-120, displayHeight-200);
  trex = createSprite(50,displayHeight/2 + 135,displayHeight/10,displayHeight);
  trex.addAnimation("running",trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(displayWidth/2,displayHeight/2 + 150,displayWidth,20);
  ground.addImage("ground",ground_image);
  ground.velocityX = -2;
  ground.x = ground.width/2;
  
  invisible_ground = createSprite(displayWidth/2,displayHeight/2 + 140,displayWidth,5);
  invisible_ground.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  gameOver = createSprite(height,height/4);
  gameOver.addImage(gameOver_image);
  
  restart = createSprite(height,height/4 + 80);
  restart.addImage(restart_image);
  
  restart.scale = 0.75;

  gameOver.visible = false;
  restart.visible = false;

  trex.setCollider("circle",0,0,30);
}

function draw() {
  background(180);   
  textSize(30)
  text("Score: "+ score, height,height/4 - 100);
  console.log(trex.y)
  if(gameState === PLAY){
   score = score + Math.round(getFrameRate()/60);
    if(keyDown("space") && trex.y>= displayHeight/2 +120 ) {
     trex.velocityY = -12;
   } 
    trex.velocityY = trex.velocityY + 0.2
   
    if (ground.x < 0){
     ground.x = ground.width/2;
   }

  //console.log(trex.y);
  trex.velocityY = trex.velocityY + 0.8;
  
 //Function Call 
  spawnCloud();
  spawnObstacle();

  if(obstaclesGroup.isTouching(trex)){
    gameState = END; 
  } 
}
  if(gameState === END){
    gameOver.visible = true;
    restart.visible = true;

    trex.velocityY = 0;
    trex.changeAnimation("collided",trex_collided);
    ground.velocityX = 0;
    cloudsGroup.setVelocityXEach (0);
    obstaclesGroup.setVelocityXEach (0);
    
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
}
  trex.collide(invisible_ground);
  if(mousePressedOver(restart)) {
    reset();
  }
  drawSprites();
}

function spawnCloud(){
  if(frameCount %60 === 0){
    cloud = createSprite(displayWidth,height/2+200,40,10);
    cloud.y = Math.round(random(height/2+140,height/2+180));
    cloud.addImage("cloud",cloud_image);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 205;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
  }
}

function spawnObstacle(){
  if(frameCount %60 === 0){
    obstacle = createSprite(displayWidth, height/2+230, 1, 1);
    obstacle.velocityX = -6;
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1 : obstacle.addImage(obstacle1);
               break;
      case 2 : obstacle.addImage(obstacle2);
               break;
      case 3 : obstacle.addImage(obstacle3);
               break;
      case 4 : obstacle.addImage(obstacle4);
               break;
      case 5 : obstacle.addImage(obstacle5);
               break;
      case 6 : obstacle.addImage(obstacle6); 
               break;
     default : break;
    }
    obstacle.scale = 0.5;
    obstacle.lifetime = 250;
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  ground.velocityX = -(6 + 3*score/100);
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}