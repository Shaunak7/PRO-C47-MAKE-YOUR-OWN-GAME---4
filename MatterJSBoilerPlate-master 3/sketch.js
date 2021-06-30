var PLAY = 1;
var END = 2;
var START = 0;
var gameState = START;
var score=0;
var bg;

localStorage["HighestScore"] = 0;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	bgImage1=loadImage("images/bg1.png")
	bgImage2=loadImage("images/bg2.png")
  bgImage3=loadImage("images/bg3.jpg")

	ironManFlyingImage=loadAnimation("images/IRONMAN/IronManFlying1.gif")
  superManFlyingImage=loadAnimation("images/SUPERMAN/SuperManFlying.gif")

	ThanosImage=loadAnimation("images/Thanos.gif")
  CatWomanImage=loadAnimation("images/CatWoman.gif")

  IronManLogoImage=loadImage("images/IRONMAN/IronManLogo.png")
  SuperManLogoImage=loadAnimation("images/SUPERMAN/SuperManLogo.gif")

  IronManVictoryImage=loadAnimation("images/IRONMAN/IronManVictory.gif")
  SuperManVictoryImage=loadAnimation("images/SUPERMAN/SuperManVictory.gif")
  MindStoneImage=loadImage("images/INFINITYSTONES/MindStone.png")
  PowerStoneImage=loadImage("images/INFINITYSTONES/PowerStone.png")
  RealityStoneImage=loadImage("images/INFINITYSTONES/RealityStone.png")
  SoulStoneImage=loadImage("images/INFINITYSTONES/SoulStone.png")
  SpaceStoneImage=loadImage("images/INFINITYSTONES/SpaceStone.png")
  TimeStoneImage=loadImage("images/INFINITYSTONES/TimeStone.png")

  SuperManStoneImage=loadImage("images/SUPERMAN/SuperManStone.png")
	robot1Image=loadAnimation("images/ROBOTS/Robot1.gif")
	robot2Image=loadAnimation("images/ROBOTS/Robot2.gif")
	robot3Image=loadAnimation("images/ROBOTS/Robot3.gif")
	robot4Image=loadAnimation("images/ROBOTS/Robot4.gif")
	robot5Image=loadAnimation("images/ROBOTS/Robot5.gif")
	robot6Image=loadAnimation("images/ROBOTS/Robot6.gif")

  VictoryImage=loadImage("images/Victory.png")
  DefeatImage=loadImage("images/Defeat.png")
  RestartImage=loadImage("images/Restart.jpg")

  starImage=loadImage("images/star.png")
}

function setup() {
	createCanvas(displayWidth-10,displayHeight-100);

	engine = Engine.create();
	world = engine.world;

  bg=createSprite(displayWidth/2,displayHeight/2,1000,displayHeight*2)
  bg.addImage(bgImage1);
  bg.visible=false;
 // bg.velocityY=2

  ironManFlying = createSprite(displayWidth/2,displayHeight-250,20,50);
  ironManFlying.addAnimation("ironManFlyingImage",ironManFlyingImage)
  ironManFlying.addAnimation("superManFlyingImage",superManFlyingImage)
	ironManFlying.scale = 0.4;
  ironManFlying.visible=false;

  Thanos = createSprite(displayWidth/2,displayHeight+250,20,50);
  Thanos.addAnimation("ThanosImage",ThanosImage)
  Thanos.addAnimation("CatWomanImage",CatWomanImage)
	Thanos.scale = 0.4;
  Thanos.visible=false;
/*
  SuperManFlying = createSprite(displayWidth/2,displayHeight-250,20,50);
  SuperManFlying.addAnimation("superManFlyingImage",superManFlyingImage)
	SuperManFlying.scale = 1;
  SuperManFlying.visible=false;
*/

  IronManLogo=createSprite(350,350,10,10)
  
  IronManLogo.addImage(IronManLogoImage)
  IronManLogo.visible=false;
  
  SuperManLogo=createSprite(900,370,10,10)
  SuperManLogo.addAnimation("SuperManLogoImage",SuperManLogoImage)
  SuperManLogo.visible=false;
  SuperManLogo.scale=2
  /*

	gameOver = createSprite(300,100);
	gameOver.addImage(gameOverImg);
	
	restart = createSprite(300,140);
	restart.addImage(restartImg);
	
	gameOver.scale = 0.5;
	restart.scale = 0.5;
  
	gameOver.visible = false;
	restart.visible = false;
	
	invisibleGround = createSprite(200,190,400,10);
	invisibleGround.visible = false;
	
	obstaclesGroup = new Group();
	
	score = 0;

	Engine.run(engine);
  */
}


function draw() {
  background("lightBlue");

  if(bg.y>displayHeight/2){

    bg.y=displayHeight/2
  }

  if(gameState === START){

    background(bgImage3)
    IronManLogo.visible=true;
    SuperManLogo.visible=true;

    if(mousePressedOver(IronManLogo)){
      background("lightblue")
      gameState=PLAY
      bg.visible=true
      IronManLogo.visible=false
      SuperManLogo.visible=false
      ironManFlying.visible=true;
      Thanos.visible=true;
    }

    if(mousePressedOver(SuperManLogo)){
      background("lightblue")
      gameState=PLAY
      bg.visible=true
      IronManLogo.visible=false
      SuperManLogo.visible=false;
      ironManFlying.changeAnimation("superManFlyingImage",superManFlyingImage)
      ironManFlying.visible=true;
      ironManFlying.scale=1

     Thanos.changeAnimation("CatWomanFlyingImage",CatWomanFlyingImage)
        Thanos.visible=true;
    }
  }
if (gameState===PLAY){
  spawnRobots();

  if(keyDown("LEFT")){
    ironManFlying.x=ironManFlying.x-10
  }

  if(keyDown("RIGHT")){
    ironManFlying.x=ironManFlying.x+10
  }
}
 

  drawSprites();

  text(mouseX+","+mouseY,mouseX,mouseY)
}

function spawnRobots() {
  if(frameCount % 160 === 0) {
    var robot = createSprite(random(displayWidth/2-200,displayWidth+200),-100,10,40);
    robot.velocityY = 2;
    robot.addAnimation("robot1Image",robot1Image)
    robot.addAnimation("robot2Image",robot2Image)
    robot.addAnimation("robot3Image",robot3Image)
    robot.addAnimation("robot4Image",robot4Image)
    robot.addAnimation("robot5Image",robot5Image)
    robot.addAnimation("robot6Image",robot6Image)
    robot.scale=0.5
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: robot.changeAnimation("robot1Image",robot1Image);
              break;
      case 2: robot.changeAnimation("robot2Image",robot2Image);
              break;
      case 3: robot.changeAnimation("robot3Image",robot3Image);
              robot.scale=0.3
              break;
      case 4: robot.changeAnimation("robot4Image",robot4Image);
              robot.scale=1
              break;
      case 5: robot.changeAnimation("robot5Image",robot5Image);
              break;
      case 6: robot.changeAnimation("robot6Image",robot6Image);
              robot.scale=0.7
              break;
      default: break;
    }
  }
}
