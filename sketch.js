var monkey;
var banana;
var bananasGroup;
var rock;
var rocksGroup;
var background_;
var ground;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY
var restart

function preload() {
  Monkey1 = loadImage("Monkey_01.png");
  Monkey2 = loadImage("Monkey_02.png");
  Monkey3 = loadImage("Monkey_03.png");
  Monkey4 = loadImage("Monkey_04.png");
  Monkey5 = loadImage("Monkey_05.png");
  Monkey6 = loadImage("Monkey_06.png");
  Monkey7 = loadImage("Monkey_07.png");
  Monkey8 = loadImage("Monkey_08.png");
  Monkey9 = loadImage("Monkey_09.png");
  Monkey10 = loadImage("Monkey_10.png");
  Jungle = loadImage("jungle.jpg");
  banana_image = loadImage("banana.png")
  stone = loadImage("stone.png")
  restart_image = loadImage("restart.png")
}

function setup() {

  createCanvas(500, 500);
  background_ = createSprite(250, 250, 20, 20)
  background_.addImage(Jungle);
  background_.velocityX = -5;
  background_.x = background_.width / 2;

  ground = createSprite(250, 470, 500, 10);
  ground.visible = false;
  
  restart=createSprite(250,250,20,20);
  restart.addImage("again",restart_image);
  restart.visible=false;
  


  monkey = createSprite(60, 450, 20, 20)
  monkey.addAnimation("monkey", Monkey1, Monkey2, Monkey3, Monkey4, Monkey5, Monkey6, Monkey7, Monkey8, Monkey9, Monkey10);
  monkey.scale = 0.13;
  
  bananasGroup=createGroup();
  rocksGroup=createGroup();


}

function draw() {
  background(300);

  if (gameState === PLAY) {
    if (background_.x < 0) {
      background_.x = background_.width / 2;
    }

    monkey.collide(ground);


    if (keyDown("space") && monkey.y >= 420) {
      monkey.velocityY = -13;
    }

    monkey.velocityY = monkey.velocityY + 0.9;

     bananas();
    rocks();
    
    if (monkey.isTouching(bananasGroup)) 
    {
      score = score + 2;
      bananasGroup.destroyEach();
    }

   if(monkey.isTouching(rocksGroup))
     { 
       if(monkey.scale>0)
         {
       monkey.scale-= 0.001;
         }
     }
 

    switch (score) 
    {
      case 10:
        monkey.scale = 0.15;
        break;
      case 20:
        monkey.scale = 0.18;
        break;
      case 30:
        monkey.scale = 0.21;
        break;
      case 40:
        monkey.scale = 0.24;
        break;
      default:
        break;

    }
}


  

  if (gameState === END)

  {
    ground.velocityX = 0;
    rocksGroup.destroyEach();
    bananasGroup.destroyEach();
    rocksGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);
    restart.visible=true;
    if(mousePressedOver(restart))
    {
      score=0;
      bananasGroup.destoyEach();
      rocksGroup.destroyEach();
      gameState=PLAY;
    }

  }


  drawSprites();




  textSize(20);
  textFont("Arial");
  stroke("black")
  fill("black");
  text("SCORE:" + score, 60, 70);


}

function bananas() {
  if (frameCount % 80 === 0) {
    banana = createSprite(500, 340, 30, 30);
    banana.addImage("Banana", banana_image);
    banana.scale = 0.06;

    bananasGroup.add(banana);

    bananasGroup.setVelocityXEach(-5);
    bananasGroup.setLifetimeEach(100);
  }

}

function rocks() {
  if (frameCount % 120 === 0) {
    rock = createSprite(500, 450, 30, 30);
    rock.addImage("obstacle", stone);
    rock.scale = 0.1;

    rocksGroup.add(rock);


    rocksGroup.setVelocityXEach(-5);
    rocksGroup.setLifetimeEach(100);
  }

}

