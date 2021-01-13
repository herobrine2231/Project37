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
var score;

function preload()
{
  jungleImage=loadImage("images/jungle.jpg");
  bananaImage=loadImage("images/banana.png");
  /*moneky_running_image= loadAnimation("images/Monkey_01.png", 
  "images/Monkey_02.png", "images/Monkey_03.png", "images/Monkey_04.png", 
  "images/Monkey_05.png", "images/Monkey_06.png", "images/Monkey_07.png",
  "images/Monkey_08.png", "images/Monkey_09.png", "images/Monkey_10.png"
  );*/
  monkeyImage=loadImage("images/Monkey_01.png");

  obstacleImage=loadImage("images/stone.png");
}
function setup()
{
    canvas= createCanvas(displayWidth-50, displayHeight-30);
    jungleSprite=createSprite(displayWidth/2,400,0,0);
    jungleSprite.addImage(jungleImage);
   // jungleSprite.velocityX=-4;

    floor1=createSprite(200,400,400,10);
    floor1.visible=false;

    monkeyPlayer=createSprite(210,600,10,10);
    monkeyPlayer.addImage(monkeyImage);
    monkeyPlayer.scale=0.1;

    foodGroup= new Group();
    obstacleSprite= new Group();


   
}

function draw()
{
  //  background("red");
  spawnFood();
    if(keyDown("space"))
    {
      monkeyPlayer.velocityY=-10;
    }
    monkeyPlayer.velocityY=monkeyPlayer.velocityY+1;
    monkeyPlayer.collide(floor1);
  spawnObstacles();
  background(220);
  if(jungleSprite.x<210)
    {
      jungleSprite.x=jungleSprite.displayWidth/2;
    }

    if(foodGroup.isTouching(monkeyPlayer))
    {
      score=score+2;
      food.remove();
    }

    if(obstacleGroup.isTouching(monkeyPlayer))
    {
      monkeyPlayer.scale=0.1;
    }

    switch(score)
    {
      case 10:
          monkeyPlayer.scale=0.12;
          break;
        case 20:
            monkeyPlayer.scale=0.14;
            break;
        case 30:
            monkeyPlayer.scale=0.16;
            break;
        case 40:
            monkeyPlayer.scale=0.18;
            break;
        default:break;
    }
    drawSprites();
    stroke("white");
    textSize(20);
    fill("white");
    text("Score: " +score, 500,50);
}

function spawnObstacles()
{
  if(camera.position.x%80 ===0)
  {
    obstacleSprite= createSprite(310, 600, 40,10);
    obstacleSprite.y= Math.round(random(250,370));
    obstacleSprite.addImage(obstacleImage);
    obstacleSprite.sc=0.05;
  // obstacleSprite.velocityX=-3;
    
    obstacleSprite.lifetime=100;
    obstacleGroup.add(obstacleSprite);
  }
}

function spawnFood()
{
  if (camera.position.x%60===0)
  {
     food=createSprite(310,600,40,10);
     food.y=Math.round(random(250,370));
    food.addImage(bananaImage);
    food.scale=0.05;
   // food.velocityX=-3;

    food.lifetime=100;
    foodGroup.add(food);
  }
}
