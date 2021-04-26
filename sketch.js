var princess,princessImage;
var knight,knightImage,knightImage1,knightImage2,knightImage3;
var wood1,wood2,wood3,woodImage;
var obstacle,obstacleImage;
var arrow,arrowImage, arrow1,arrowImage1,arrow2,arrowImage2,arrow3,arrowImage3;
var obstaclesGroup;
var arrowGroup;
var score = 0;
var backgroundImage;
var bowSound;
var gameOverSound;

var gameState = 1;
var PLAY = 1;
var END = 0;

function preload(){
knightImage = loadImage("Knight arrow.png");
knightImage1 = loadImage("knightArrowDown.png");
knightImage2 = loadImage("knightArrowUp.png");
knightImage3 = loadImage("knightArrowRight.png");
woodImage = loadImage("wood1.jpg");
obstacleImage = loadImage("skeleton1-removebg-preview.png");
  princessImage = loadImage("Princess1.png");
  arrowImage = loadImage("arrow0.png");
  arrowImage1 = loadImage("arrowUp.png");
  arrowImage2 = loadImage("arrowdown.png");
  arrowImage3 = loadImage("arrowRight.png");
  backgroundImage = loadImage("Bg.png");
  bowSound = loadSound("BOW_HIT.wav");
  gameOverSound = loadSound("mixkit-arcade-game-over-1949.wav");
}


function setup() {
  createCanvas(550, 600);
  
  princess = createSprite(300,555,30,30);
  princess.addImage(princessImage);
  
  knight = createSprite(200,300,40,40);
  knight.addImage(knightImage);
  knight.scale = 1.5;
  
  wood1 = createSprite(300,500,600,50);
  wood1.addImage(woodImage);
  
  wood2 = createSprite(200,425,600,50);
  wood2.addImage(woodImage);
  
  wood3 = createSprite(300,350,600,50);
  wood3.addImage(woodImage);
  
  obstaclesGroup = new Group();
  arrowGroup = new Group();
  
}

function draw() {
  background(backgroundImage);
  fill("white");
  textSize(26);
  text("score = "+ score,20,50);
   
  
  
  if(gameState === PLAY){
   camera.position.x = knight.x;
   camera.position.y = knight.y;
  
  knight.collide(wood3);
  knight.collide(wood2);
  knight.collide(wood1);
  
  if(keyDown("up")){
  knight.y = knight.y-10;
  knight.addImage(knightImage2);
   if(keyDown("space")){
       createArrow();
     bowSound.play();
      
       }
  }
  
  if(keyDown("down")){
  knight.y = knight.y+10;
  knight.addImage(knightImage1);
    if(keyDown("space")){
       createArrow();
      bowSound.play();
       }
  }
   
  if(keyDown("left")){
  knight.x = knight.x-10;
  knight.addImage(knightImage);
   if(keyDown("space")){
       createArrow();
     bowSound.play();
       }
  }
    
  if(keyDown("right")){
  knight.x = knight.x+10;
  knight.addImage(knightImage3);
    if(keyDown("space")){
       createArrow();
      bowSound.play();
       }
 
  }
    
  
     spawnObstacles();
     if(obstaclesGroup.isTouching(princess)){
       gameOverSound.play();
       gameState = END;
       }
    
    if(obstaclesGroup.isTouching(arrowGroup)){
     obstaclesGroup[0].destroy();
      arrowGroup.destroyEach();
      score  = score+1;
       }
     }
  
  else if(gameState === END){
    obstaclesGroup.destroyEach();
    arrowGroup.destroyEach();
    fill("red");
    textSize(30);
    text("Game Over" ,275 ,300);
  }
  
  drawSprites();
}

function spawnObstacles(){
  if(frameCount % 60 === 0){
     obstacle = createSprite(50,0);
    obstacle.addImage(obstacleImage);
     obstacle.velocityY = 2;
    obstacle.scale = 0.1;
     obstacle.x = Math.round(random(50,550));
    obstaclesGroup.add(obstacle);
     }
}


 function createArrow(){
  arrow = createSprite(200,280,30,30);
  arrow.velocityX = 3;
  // arrow.addImage(arrowImage);
  arrow.scale = 0.3;
  arrow.x = knight.x;
  arrow.y = knight.y;
   
   if(keyDown("right")){
       arrow.addImage(arrowImage1);
     arrow.velocityX = 3;
      }
   if(keyDown("up")){
      arrow.velocityY = -3;
     arrow.addImage(arrowImage2);
      }
   if(keyDown("down")){
     arrow.velocityY = 3;
       arrow.addImage(arrowImage3);
      }
   if(keyDown("left")){
     arrow.velocityX = -3;
       arrow.addImage(arrowImage);
      }
   arrowGroup.add(arrow);
   
   
 }