var background;
var player, opponent, edge, gameState;
var p_img, o_img;
var projectile1,projectile2;
var music, drum;
var reset;
var p_stats = {
  damages:0,
  speed:10,
  attack:0,
  regen:5,
  jump:-10,
  throws:100,
  movement : 0
}
var o_stats = {
  damages:0,
  speed:10,
  attack:10,
  regen:5,
  jump:-30,
  throws:100,
  movement : 0
}
var tool1,tool2;

function preload(){
  background = loadImage("./assets/background.jpg");
  p_img = loadImage("./assets/ninja.png");
  o_img = loadImage("./assets/ninja.png");
  music = loadSound("./music/music.mp3");
  drum = loadSound("./music/judgement.mp3");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  edge = createEdgeSprites();

  player = createSprite(100,height-500,60,60);
  player.setCollider("rectangle",0,0,300,360);

  opponent = createSprite(width-100,height-500,60,60);
  opponent.setCollider("rectangle",0,0,300,360);

  player.addImage("ninja",p_img);
  player.scale = 0.4;

  opponent.addImage("ninja",o_img);
  opponent.scale = 0.4;

  tool1 = new Tool(0.1,p_stats,1,opponent,o_stats);
  tool2 = new Tool(0.1,o_stats,-1,player,p_stats);
  projectile1 = new Projectile(0.2,p_stats,false,o_stats,opponent);
  projectile2 = new Projectile(0.2,o_stats,true,p_stats,player);
  gameState = 0;
  opponent.mirrorX(-1);
  music.loop();
}
function draw(){
  image(background,0,0,width,height);
  textFont("Algerian");
  textAlign(CENTER);
  if(gameState === 0 || gameState === 1){
    play();
  }
  if(gameState === 2){
    push();
    fill(255);
    textSize(100);
    stroke(200,255,100);
    strokeWeight(10);
    text("k.o.",width/2,height/2);
    text("winner got the scroll",width/2,height/2+100);
    stroke("red");
    textFont("Ariel");
    textSize(30);
    fill(0);
    text("reset",width/2,height/2-140);
    pop();
    music.stop();
    reset = createSprite(width/2,height/2-100,100,50);
    reset.shapeColor = "red";
    if(mousePressedOver(reset)){
      location.reload();
    }
  }
  drawSprites();

}

function run(){
  let rand1 = Math.round(random(1,10));
    console.log(rand1);
      switch(rand1){
        case 1 || 2 || 3:
          if(opponent.x < player.x){
            opponent.velocityX = o_stats.speed;
            opponent.mirrorX(1);
            tool2.direction(1)
            o_stats.movement = 1;
          }
          if(opponent.x > player.x){
            opponent.velocityX = -o_stats.speed;
            tool2.direction(-1)
            opponent.mirrorX(-1);
            o_stats.movement = -1;
          }
          break;
          case 4:
            if (o_stats.damages>150){
              if(opponent.x < player.x){
                opponent.velocityX = -o_stats.speed;
                tool2.direction(-1)
              }
              if(opponent.x > player.x){
                opponent.velocityX = o_stats.speed;
                tool2.direction(1)
              }
            }
            else{
              if(opponent.x < player.x){
                opponent.velocityX = o_stats.speed;
                opponent.mirrorX(1);
                tool2.direction(1)
                o_stats.movement = 1;
              }
              if(opponent.x > player.x){
                opponent.velocityX = -o_stats.speed;
                opponent.mirrorX(-1);
                tool2.direction(-1)
                o_stats.movement = -1;
              }
            }
            break;
          case 5:
            if(frameCount%100 === 0){
              if(o_stats.speed>20){
                o_stats.speed+=0.7;
              }
              if(o_stats.damages>0 && o_stats.damages<300){
                o_stats.damages-=0.7;
              }
              if(o_stats.attack>20){
                o_stats.attack+=0.7;
              }
            }
            else{
              if(opponent.x < player.x){
                opponent.velocityX = o_stats.speed;
                opponent.mirrorX(1)
                tool2.direction(1)
                o_stats.movement = 1;
              }
              if(opponent.x > player.x){
                opponent.velocityX = -o_stats.speed;
                opponent.mirrorX(-1);
                tool2.direction(-1)
                o_stats.movement = -1;
              }
            }
            case 6||7:
              opponent.y = 400
              break;
            case 8||9||10:
              opponent.y = 400
              if(opponent.x < player.x){
                opponent.velocityX = o_stats.speed;
                tool2.direction(1)
                opponent.mirrorX(1)
                o_stats.movement = 1;
              }
              if(opponent.x > player.x){
                opponent.velocityX = -o_stats.speed;
                tool2.direction(-1)
                opponent.mirrorX(-1);
                o_stats.movement = -1;
              }
              break;
          default:
            break;
        
        }
}
function attack(){
  let rand2 = Math.round(random(1,4));
  console.log(rand2);
  switch(rand2){
    case 1||2:
      tool2.sword();
      break;
    case 3||4:
      tool2.spear();
    default:
      break;
  }
}
function play(){
  // giving player weapons
  if(p_stats.damages < 300){
    tool1.use(player.x+50*p_stats.movement,player.y-10,0);
    projectile1.use(player.x,player.y,edge);
  }
  if(o_stats.damages < 300){
    tool2.use(opponent.x+50*o_stats.movement,opponent.y-10,0);
    projectile2.use(opponent.x,opponent.y,edge);
  }
  if(o_stats.damages > 0 && p_stats.damages<300){
    o_stats.damages -= 0.7
  }
  if(o_stats.damages >= 290 || p_stats.damages >= 300){
    gameState = 2;
    drum.play();
  }

  // displaying health bar of player and opponent
  strokeWeight(0);
  fill(150,255,100);
  rect(100,100,300,10);
  rect(width-100,100,-300,10);
  textSize(30);

  fill("white");
  text(p_stats.throws,400,120);
  text(o_stats.throws,width-450,120);

  fill("red");
  if(p_stats.damages>0){
    rect(100,100,p_stats.damages,10);
  }
  if(o_stats.damages>0){
    rect(width-400,100,o_stats.damages,10);
  }


  // to add controls to the player
  if(!keyDown("space") && gameState === 1){
  if (keyDown(UP_ARROW) && player.collide(edge)){
    player.y = 400
  }

  if (keyDown(LEFT_ARROW)){
    player.x -= p_stats.speed;
    player.mirrorX(-1);
    tool1.direction(-1);
    p_stats.movement=-1;
  }

  if (keyDown(RIGHT_ARROW)){
    player.x += p_stats.speed
    tool1.direction(1);
    player.mirrorX(1);
    p_stats.movement=1;
  }

  if(p_stats.jump < -10){
    p_stats.jump+=0.5
  }

  if(p_stats.speed > 10){
    p_stats.speed-=0.5
  }

  if(p_stats.damages > 0 && p_stats.damages<300){
    p_stats.damages-=0.5
  }

  }

  // boost to player
  if (keyDown("space") && gameState === 1){
    if(p_stats.speed<20){
      p_stats.speed+=0.7;
    }
    if(p_stats.damages>0 && p_stats.damages<300){
      p_stats.damages-=0.7;
    }
  
  }

  // giving opponent AI
  if (gameState === 1 && frameCount%60 === 0 && o_stats.damages<300){
    run();
    attack();
  }

  // displaying text messages about game
  if (gameState === 0){
    strokeWeight(30);
    push()
    textSize(70);
    stroke(20,255,20)
    text("ninja clash",width/2+0,height/2-200);
    stroke(0)
    strokeWeight(20);
    text("ninja clash",width/2+0,height/2-200)
    pop();
    fill(255)
    textSize(30);
    text("change weapons using 1 & 2",width/2,height/2);
    text("press enter key to continue",width/2+0,height/2+100);
  }
  
  // changing game state to play
  if(keyDown("enter")){
    gameState = 1
  }

  // colliding player and opponent with all the edges
  player.collide(edge);
  opponent.collide(edge);
  
  // adding gravity
  player.velocityY += 0.9;
  opponent.velocityY += 0.9;
  console.log(o_stats.jump);
  tool2.angle();
}