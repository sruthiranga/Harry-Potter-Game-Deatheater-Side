
var bg, bgimg, bg2, bgimg2;

var harry, harryimg;

var deatheaters, deathimg;

var text1, textimg;

var lightningGroup;

var lightning1, lightning2, lightning3, lightning4;

var lightning5, lightning6;

var lightning;
var HarryfirespellGroup;
var DeathfirespellGroup
//var edges;

var fireballimg1;
var fireballimg2;
var fireballimg3;
var fireballimg4;
var fireballimg5;
var fireballanimation;


var gameState = "start";

var scoreHarry = 500;

var scoreDeath = 500;

var death2img;

function preload(){
  bgimg = loadImage("Images/background.jpg");
  
  harryimg = loadImage("Images/harryonbroom.png");
  
  deathimg = loadImage("Images/HarryDeath.png");
  
  textimg = loadImage("Images/Chooseyourplayer.png");

  death2img = loadImage("Images/Deatheater.png");
  
  lightning1 = loadImage("Images/Lightning1.png");
  lightning2 = loadImage("Images/Lightning2.png");
  lightning3 = loadAnimation("Images/Lightning3.png", "Images/Lightning4.png");
  lightning4 = loadAnimation("Images/Lightning4.png", "Images/Lightning3.png");
  lightning5 = loadImage("Images/Lightning5.png");
  lightning6 = loadImage("Images/Lightning6.png");

  bgimg2 = loadImage("Images/Burrow.jpg");

  fireballimg1 = loadAnimation("Images/Fireball1.png", "Images/Fireball2.png", "Images/Fireball3.png", "Images/Fireball4.png", "Images/Fireball5.png");
}


function setup(){
  createCanvas(displayWidth, 400)
  
  bg = createSprite(displayWidth/2, 200, displayWidth, 400);
  bg.addImage(bgimg);
  bg.x = bg.width/2;
  bg.velocityX = -5;
  bg.scale = 1.8;

  bg2 = createSprite((displayWidth/2)-700, 200, displayWidth, 20);
  bg2.addImage(bgimg2);
  bg2.visible = false;

  
  harry = createSprite(displayWidth-660, 200, 30, 30);
  harry.addImage(harryimg);
  harry.scale = 0.3;
  harry.debug=true;
  harry.setCollider("rectangle",-80,0,3,100)
  
  
  deatheaters = createSprite(displayWidth-800, 190, 10, 10);
  deatheaters.addImage(deathimg);
  deatheaters.addImage("death2", death2img);
  deatheaters.scale = 0.8;

  text1 = createSprite(displayWidth-750, 50, 50, 50);
  text1.addImage(textimg);
  text1.scale = 0.1; 


  lightningGroup = new Group();
  HarryfirespellGroup = new Group();
  DeathfirespellGroup = new Group()
}

function draw(){
  background("black");
  drawSprites();
  harry.velocityY = 0
  //edges = createEdgeSprites();

  
  if(mousePressedOver(deatheaters) && gameState === "start"){
    deathPlayer();

    bg.velocityX = 0;

    gameState = "playDeath"

    deatheaters.changeImage("death2", death2img);
 
  }

  if(bg.x<200){
    bg.x = bg.width/2;
  } 


  if(gameState === "playDeath"){
    spawnLightning();

    bg.depth = deatheaters.depth;
    bg.depth += 5;
    deatheaters.depth = bg.depth + 5

    textSize(20);
    text("Count:" + scoreDeath, camera.position.x-50, 320);

    keyControls();

    if(lightningGroup.isTouching(deatheaters)){
      scoreDeath = scoreDeath - 5;
    }

    if(deatheaters.x<0){
      gameState = "level1Death";
    }

  }

  if(scoreDeath === 0){
    gameState = "loseDeath";
  }

  if(gameState === "loseDeath"){
    bg.visible = false;
    textSize(40)
    text("You lost! Try again!", displayWidth/2, displayHeight/2);
    harry.visible = false;
    deatheaters.y = 320;
    lightning.visible = false;
  }

    else if(gameState === "level1Death"){
      deathPlayer();
      harry.x = camera.position.x-300;
 
     
      bg.visible = false;
      bg2.visible = true;
      bg2.scale = 1.2;
      deatheaters.depth = bg2.depth;
      deatheaters.depth = deatheaters.depth+5;
      harry.depth = deatheaters.depth;

      Deathfirespellbutton = createImg("Images/Fireballbutton.png", "firebutton");
      Deathfirespellbutton.position((displayWidth/2)+350, 320)
      Deathfirespellbutton.size(60, 60);


      Deathfirespellbutton.mousePressed((()=>{      
       firespellsDeath();
      }))

      if(DeathfirespellGroup.isTouching(harry)){
        DeathfirespellGroup.destroyEach();
        scoreHarry = scoreHarry - 40;
      }

      if(HarryfirespellGroup.isTouching(deatheaters)){
        HarryfirespellGroup.destroyEach();
        scoreDeath = scoreDeath - 40;
      }


      if(frameCount % 120 === 0){
        harry.y = random(0,300);
      }

      if(frameCount % 1000 === 0){
        harry.y = deatheaters.y;
      }

      if(frameCount % 250 === 0){
        harry.y = deatheaters.y;
        firespellsHarry();
      }

      textSize(20);
      text("Harry Count:" + scoreHarry, camera.position.x-500, 320);
      text("Deatheater Count:" + scoreDeath, camera.position.x-100, 320);

      
  
      keyControls();

      if(scoreHarry === 0 && deatheaters.x < 0){
        gameState = "winDeath"
      }
      
      if(gameState === "winDeath"){
        bg2.visible = false;
        textSize(40)
        text("You Win! Play again!", displayWidth/2, displayHeight/2);
        harry.visible = false;


        deatheaters.y = 320;
        Deathfirespell.visible = false;
        Deathfirespellbutton.visible = false;
      }

      if(scoreDeath === 0){
        gameState = "loseDeath";
      }
}

  function deathPlayer(){
    text1.visible = false;
    deatheaters.debug = true;
  }

  function spawnLightning(){
    if(frameCount % 50 === 0){
      lightning = createSprite(Math.round(random(10,700)), Math.round(random(10,50)), 40, 40);
      lightning.depth = bg.depth;
      lightning.depth = lightning.depth+10;
        var rand = 
      Math.round(random(1,6));
        switch(rand){
          case 1:
      lightning.addImage(lightning1);
                    break;
          case 2:
      lightning.addImage(lightning2);
                    break;
          case 3:
      lightning.addAnimation("l3", lightning3);
                    break;
          case 4:
      lightning.addAnimation("l4", lightning4);
                    break;
          case 5:
      lightning.addImage(lightning5);
                    break;
          case 6:
      lightning.addImage(lightning6);
                    break;
        }
    lightning.lifetime = 50;
    lightningGroup.add(lightning);
    }
  }

  
    
  

  function firespellsHarry(){
    var Harryfirespell = createSprite(displayWidth/2, 200, 40, 40);
    Harryfirespell.addAnimation("f1", fireballimg1);
    HarryfirespellGroup.add(Harryfirespell)
    Harryfirespell.x = harry.x;
    Harryfirespell.y = harry.y;
    Harryfirespell.debug=true;
    Harryfirespell.setCollider("rectangle",-10,0,5,1)
    Harryfirespell.velocityX = -6;
    Harryfirespell.depth = deatheaters.depth;
    
  }

  function firespellsDeath(){
    var Deathfirespell = createSprite(displayWidth/2, 200, 40, 40);
    Deathfirespell.addAnimation("f1", fireballimg1);
    DeathfirespellGroup.add(Deathfirespell)
    Deathfirespell.x = deatheaters.x;
    Deathfirespell.y = deatheaters.y;
    Deathfirespell.debug=true;
    Deathfirespell.setCollider("rectangle",-10,0,5,1)
    Deathfirespell.velocityX = 6;
    Deathfirespell.depth = harry.depth;
  }


 

  function keyControls(){
    if(keyIsDown(LEFT_ARROW)){
      deatheaters.x = deatheaters.x-6;
      camera.position.x = deatheaters.x;
    }

    if(keyIsDown(RIGHT_ARROW)){
      deatheaters.x = deatheaters.x+6;
      camera.position.x = deatheaters.x;
    }

    if(keyIsDown(DOWN_ARROW)){
      deatheaters.y = deatheaters.y+6;
    }

    if(keyIsDown(UP_ARROW)){
      deatheaters.y = deatheaters.y-6;
    }
  }
}
