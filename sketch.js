var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player_running,player,player_colide;
var bg_img,bg;
var monster,bird_img;

var arrow_img
var bullet_sound
var GunReload

var gameOver,imgGameOver;
var restart,imgRestart;

function preload() {
    player_running = loadAnimation("1.png","2.png","3.png");
    player_colide = loadImage("1.png");
    bg_img = loadImage("bg_img.png");
    monster = loadImage("monster.png");
    imgGameOver = loadImage("gameover.png");
    imgRestart = loadImage("restart .png");
    arrow_img = loadImage("bullet.png");
    bullet_sound = loadSound("Gun+Shot2.mp3");
    GunReload = loadSound("Gun+Reload.mp3");
}
function setup() {
  createCanvas(900, 430);

  obstaclesGroup = new Group();
  arrowGroup = new Group();
  bg = createSprite(600,200,20,50);
  bg.addImage(bg_img);
  //bg.scale = 0.9;
  bg.velocityX =-2;
  bg.x = bg.width /2;

  //PLAYER OBJ
  player = createSprite(50,350,20,50);
  player.addAnimation("running", player_running);
  player.scale = 0.9;
 
  //invisibleGround FOR COLIDE
  invisibleGround = createSprite(50,400,10000,10)
  invisibleGround.visible = false;

  //FOR GAME OVER & RESTART OBJ
  gameOver = createSprite(450,215,10,10);
  gameOver.addImage(imgGameOver);
  gameOver.visible = false; 
  restart = createSprite(450,330,10,10);
  restart.addImage(imgRestart);
  restart.visible = false; 

}

function draw() {
  background(220);

  //ADD GRAVITY
  player.velocityY = player.velocityY + 1;

    if (gameState === PLAY) {
        bg.velocityX = -2;
        
 //FOR COLIDE IN GROUND
 player.collide(invisibleGround);
    }
    if(keyDown("space") && player.y >= 300){
          player.velocityY = -12 ;
    }
    gameOver.visible = false;
    restart.visible = false; 
    player.visible = true;

    if(keyDown("f")){
      createArrow(); 
    }
    else if(keyWentUp("f")){
      GunReload.play();
    }

    if (obstaclesGroup.isTouching(player)){
      obstaclesGroup.destroyEach(); 
      player.x = 900
      player.y = 350
      gameState = END;
    }
    if (obstaclesGroup.isTouching(arrowGroup)){
      arrowGroup.destroyEach();
      obstaclesGroup.destroyEach();

    }
    if (gameState === END) {
        bg.velocityX = 0;

      //FOR COLIDE IN GROUND
      player.collide(invisibleGround);
        player.visible = false;
        gameOver.visible = true;
        restart.visible = true; 

        if(keyDown("r")){
          player.x = 50;
          player.y = 350; 
         gameState = PLAY;
        }
        
    }

    //for infinit ground
    if(bg.x < 200){
        bg.x = bg.width /2;
    }
  
  drawSprites();
  spawnObstacles();
}
function spawnObstacles() {
    if(frameCount % 270 === 0) {
      var obstacle = createSprite(920,365,10,40);
      obstacle.addImage(monster);
      obstacle.scale = 0.1;
      obstacle.velocityX = -4;
      //ADDING DEAPTH
      obstacle.depth = player.depth;
      player.depth = player.depth + 1;
      //assign scale and lifetime to the obstacle           
      obstacle.lifetime = 400;
      //creat gr
      obstaclesGroup.add(obstacle);
    }
  }
  function createArrow(){
    if(frameCount % 5 === 0){
    var arrow = createSprite(350,200,60,10);
    arrow.addImage(arrow_img);
    arrow.x = 70;
    arrow.y= player.y-15;
    arrow.velocityX = 10;
    bullet_sound.play();
    arrow.depth = player.depth;
    player.depth = player.depth + 1;

    arrowGroup.add(arrow);
    }
  }
