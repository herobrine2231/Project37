var canvas;
var background;
var runner1, runner2;

var jungleImage, bananaImage;
var jungleSprite, bananaSprite;
var monkeyImage;
var obstacleImage;
var floor1;
var monkeyPlayer;
var obstacleSprite;
var obstacleGroup;
var food, foodGroup;
var score=0;

function preload()
{
  jungleImage=loadImage("images/jungle.jpg");
  bananaImage=loadImage("images/banana.png");
  moneky_running_image= loadAnimation("images/Monkey_01.png", 
  "images/Monkey_02.png", "images/Monkey_03.png", "images/Monkey_04.png", 
  "images/Monkey_05.png", "images/Monkey_06.png", "images/Monkey_07.png",
  "images/Monkey_08.png", "images/Monkey_09.png", "images/Monkey_10.png"
  );
  monkeyImage=loadImage("images/Monkey_01.png");

  obstacleImage=loadImage("images/stone.png");
}
function setup()
{
    canvas= createCanvas(displayWidth, displayHeight);
    jungleSprite=createSprite(displayWidth ,displayHeight,displayWidth,2);
    jungleSprite.addImage(jungleImage);
    jungleSprite.x=width/2;
    jungleSprite.velocityX=-2;

    floor1=createSprite(displayWidth/2,height,width,10);
      floor1.visible=false;

    monkeyPlayer=createSprite(100,height-70,20,50);
    monkeyPlayer.addAnimation("monkey", moneky_running_image);
    monkeyPlayer.scale=0.1;

    foodGroup= new Group();
    obstacleGroup= new Group();

    //score=0;


   
}

function draw()
{
  //  background("red");

  
    if(keyDown("SPACE") || touches.length>0 )
    {
      monkeyPlayer.velocityY=-10;
      touches= [];
    }
    monkeyPlayer.velocityY=monkeyPlayer.velocityY+2;
    monkeyPlayer.collide(floor1);
  spawnObstacles();
  spawnFood();
 // background(jungleImage);
  if(jungleSprite.x<0)
    {
      jungleSprite.x=jungleSprite.width/2;
    }

    if(foodGroup.isTouching(monkeyPlayer))
    {
      score= score+2
      food.remove();
    }
      console.log(score);
    if(obstacleGroup.isTouching(monkeyPlayer))
    {
      monkeyPlayer.scale=0.1;
    }

    switch(score)
    {
      case 10:
          monkeyPlayer.scale=0.14;
          break;
        case 20:
            monkeyPlayer.scale=0.18;
            break;
        case 30:
            monkeyPlayer.scale=0.22;
            break;
        case 40:
            monkeyPlayer.scale=0.26;
            break;
        default:break;
    }
    drawSprites();
    stroke("white");
    textSize(20);
    fill("white");
    text("Score: " +score, width-300,height-70);
}

function spawnObstacles()
{
  if(frameCount % 80 === 0)
  {
    obstacleSprite= createSprite(600, height-95, 20,30);
    obstacleSprite.y= Math.round(random(height,height-20));
    obstacleSprite.addImage(obstacleImage);
    obstacleSprite.scale=0.05;
   obstacleSprite.velocityX=-3;
    
    obstacleSprite.lifetime=200;
    obstacleGroup.add(obstacleSprite);
  }
}

function spawnFood()
{
  if (frameCount % 60 === 0)
  {
     food=createSprite(600,height-200,20,10);
     food.y=Math.round(random(height-50,height-100));
    food.addImage(bananaImage);
    food.scale=0.05;
    food.velocityX=-3;

    food.lifetime=200;
    foodGroup.add(food);
  }
}
