import '../css/style.css';
import { TOT_LIFE } from './Constants.js';
import { ScoreDisplay } from './ScoreDisplay.js';
import { Runner } from './Runner';
import { Target, Covid , Coin , Test, Soju, Computer, Hw, Quiz, Energy } from './Target';

import point from '../data/point.mp3';
import kick from '../data/kick.mp3'
import bar from '../data/startbar.png'
import startimage from '../data/00.png'
import checkpoint from '../data/checkpoint.png'
import a_image from '../data/a.png'
import restart from '../data/restart.png'
const coin_delta_y = 40;
const invincible_time = 600;
let game_speed = 1;

let starter;
let start0, seepoint;
let runner;
let score;
var gameOver, gameStage;
var action;
var life;
let delete_coin;

let coin_array, obstacle_array;
let invincible =0;
let pointsound, kicksound,startbar;
let grade_a, restart_button;

function setup() {
  //set canvas in center
  var cnv = createCanvas(800, 600);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  
  // 1. Init runner and score display
  life= TOT_LIFE;
  
  runner = new Runner(life);  
  coin_array= new Array();
  obstacle_array = new Array();
  
  delete_coin = new Array();
  score = new ScoreDisplay(runner.getRemainingLife());

  starter = createSprite(400,230,50,100);
  starter.addAnimation('run','data/1.png','data/1.png','data/1.png','data/2.png','data/2.png','data/3.png','data/3.png','data/4.png','data/4.png','data/5.png','data/5.png','data/6.png','data/6.png','data/7.png','data/7.png');
  starter.scale=0.7;
  
  startbar = loadImage(bar);
  start0 = loadImage(startimage);
  grade_a = loadImage(a_image);
  restart_button = loadImage(restart);
  seepoint = loadImage(checkpoint);
  pointsound= loadSound(point);
  kicksound=loadSound(kick);
  gameStage= 0;
  gameOver = true;
}

function draw() {
  if(gameStage==0){
    clear();
    starter.visible=true;
    runner.runner.visible=false;
    background(255);
    noStroke();
    
    starter.animation.play();
    drawSprites(); 

    imageMode(CENTER);
    image(start0,400,230,677*0.83,170*0.83);
    image(startbar,400,380,201,40);
    
    //init runner, coin, obstacle, score
    life= TOT_LIFE;
    
    coin_array.forEach(e => {
      e.target.remove();
    })
    obstacle_array.forEach(e => {
      e.target.remove();
    })
    coin_array= new Array();
    obstacle_array = new Array();
    score = new ScoreDisplay(runner.getRemainingLife());
    if(mouseIsPressed && mouseX<=500&&mouseX>=300 &&mouseY>=360&&mouseY<=400){
      gameOver=false;
      starter.visible=false;
      clear();
      gameStage=1;
    }
  }
  
  if(gameStage==1){
    background(250);
    strokeWeight(3);
    line(30, 505, 770, 500);
    stroke(0);
    action = true;
    runner.runner.visible=true;
    if(invincible>0){
      if(invincible==1){
        setspeed(2/3);
        runner.sizedown();
      }
      invincible--;
    }

    
    runner.draw(); 
    
    if(invincible>0){
      fill(255,229,102);
      strokeWeight(1);
      stroke(41,162,229)
      rect(240,28,invincible/(invincible_time/300),24,5);
    }

    if (frameCount % (12/game_speed) == 0){
      let coin = new Coin(game_speed);
      coin_array.push(coin);
    }

    if (frameCount % (60/game_speed) == 0 && frameCount>=180) {
      let number = Math.floor(random(1,1000));
      console.log(number%8);
      if(number%8 ==1){
        let covid = new Covid(game_speed);
        obstacle_array.push(covid);
        console.log(obstacle_array);
      }
      if(number%8 ==2){
        let test = new Test(game_speed);
        obstacle_array.push(test);
        let length =coin_array.length;
        coin_array[length - 1].target.position.y -= 1 * coin_delta_y;
        coin_array[length - 2].target.position.y -= 2 * coin_delta_y-3;
        coin_array[length - 3].target.position.y -= 3 * coin_delta_y-5;
        coin_array[length - 4].target.position.y -= 2 * coin_delta_y-3;
        coin_array[length - 5].target.position.y -= 1 * coin_delta_y;
      }
      if(number% 8 ==3){
        let soju = new Soju(game_speed);
        obstacle_array.push(soju);
        let length =coin_array.length;
        coin_array[length - 1].target.position.y -= 1 * coin_delta_y;
        coin_array[length - 2].target.position.y -= 2.3 * coin_delta_y-4;
        coin_array[length - 3].target.position.y -= 3 * coin_delta_y-5;
        coin_array[length - 4].target.position.y -= 2.3 * coin_delta_y-4;
        coin_array[length - 5].target.position.y -= 1 * coin_delta_y;
      }
      if(number%8 == 4){
        let hw = new Hw(game_speed);
        obstacle_array.push(hw);
        let length =coin_array.length;

        coin_array[length - 2].target.position.y -= 1.3 * coin_delta_y;
        coin_array[length - 3].target.position.y -= 2.5 * coin_delta_y-3;
        coin_array[length - 4].target.position.y -= 1.3 * coin_delta_y;
      }
      if(number%8 == 5){
        let computer = new Computer(game_speed);
        obstacle_array.push(computer);
        let length =coin_array.length;

        coin_array[length - 1].target.position.y -= 1 * coin_delta_y-2;
        coin_array[length - 2].target.position.y -= 2 * coin_delta_y-5;
        coin_array[length - 3].target.position.y -= 3 * coin_delta_y-10;
        coin_array[length - 4].target.position.y -= 2 * coin_delta_y-5;
        coin_array[length - 5].target.position.y -= 1 * coin_delta_y-2;
      }
      if(number%8 == 6){
        let qz = new Quiz(game_speed);
        obstacle_array.push(qz);
        let length =coin_array.length;

        coin_array[length - 2].target.position.y -= 1.5 * coin_delta_y-1;
        coin_array[length - 3].target.position.y -= 2.8 * coin_delta_y-15;
        coin_array[length - 4].target.position.y -= 1.5 * coin_delta_y-1;
      }
      if(number %8 ==7 && invincible==0 && frameCount % 180==0){
        let energy = new Energy(game_speed);
        obstacle_array.push(energy);
      }
    }

    coin_array.forEach(element => {
      if(runner.runner.overlap(element.target) && element.isCollisionChecked==false){
        score.addScore(10);
        pointsound.play();
        element.isCollisionChecked= true;
        delete_coin.push(element);
      }
      if(element.target.position.x <= 20){
        coin_array.shift();
        element.target.remove();
      }
    })
    //coin 먹으면 지우기
    delete_coin.forEach(element => {
      let index = coin_array.indexOf(element);
      coin_array.splice(index, 1);
      element.target.remove();
      delete_coin.shift();
    });

    for(let i=0; i<obstacle_array.length; i++){
      let element= obstacle_array[i];
      if(element.name === "quiz"){
        element.target.velocity.y = 2;
        if(element.target.position.y==480){
          element.target.velocity.y=0;
        }
      }
      if(element.name === "covid"){
        element.target.rotation -=8;  
      }
      if(element.name === "computer"){
        element.s+= 2* element.z;
        if(element.s>6){
          element.z=-1
        }
        else if(element.s<-6){
          element.z=1;
        }
        element.target.velocity.y = element.s;
      }
      if(runner.runner.overlap(element.target) && element.isCollisionChecked==false){
        if(element.name === "energy"){
          if (invincible == 0) {
            setspeed(1.5);
            runner.sizeup();
          }
          invincible=invincible_time;
          obstacle_array.splice(i,1);
          i--;
          element.target.remove();
          continue;
        }
        else if(invincible==0){
          element.target.changeAnimation('hit');
          runner.isHit();
          life--;
          if(life==0){
            gameStage=2;
          }
          score.setLife(life);
          element.isCollisionChecked= true;
        }else {
          element.kick();
          kicksound.play();
        }
        if(element.target.position.x <= -200 || element.target.position.y<0){
          obstacle_array.splice(i, 1);
          i--;
          element.target.remove();
        }
      }
    }
  
    coin_array.forEach(element => {
      element.draw();
    });
    obstacle_array.forEach(element => {
      element.draw();
    });
    
    imageMode(CENTER);
    drawSprites();
    score.draw();
  }

  if(gameStage==2){
    setspeed(0);
    imageMode(CENTER);
    image(seepoint,400,300,201,40);
    action = false;
    gameOver= true;
    frameCount = 0;
    if(mouseIsPressed && mouseX<=500&&mouseX>=300 &&mouseY>=280&&mouseY<=320){
      gameStage=3;
    }
  }
  if(gameStage==3){
    clear();
    background(255);
    // coin_array.forEach(e => {
    //   e.target.remove();
    // })
    // obstacle_array.forEach(e => {
    //   e.target.remove();
    // })
    //runner.runner.visible=false;

    
    noStroke();
    
    imageMode(CENTER);
    image(grade_a,400,250,697*0.45,819*0.45);
    image(restart_button,400,490,199*0.9,60*0.9);
  }
}

// mouse press to jump, jump when game is playing(action)
function mousePressed() {
  if (action && mouseIsPressed) {
    if(runner.jump_count<2){
      runner.runner.animation.stop();
      runner.jump();
      runner.jump_count++;
    }
  }
}

// Spacebar to jump, jump when game is playing(action)
function keyPressed() {
  if (action && key === ' ') {
    if(runner.jump_count<2){
      runner.runner.animation.stop();
      runner.jump();
      runner.jump_count++;
    }
  }
}

function setspeed(n){
  game_speed *= n;
  coin_array.forEach((element) =>
    element.target.velocity.x *= n
  );
  obstacle_array.forEach((element) =>
  element.target.velocity.x *= n
  );
}

window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
window.keyPressed = keyPressed;
