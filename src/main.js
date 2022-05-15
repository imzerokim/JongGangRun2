import '../css/style.css';
import { TOT_LIFE } from './Constants.js';
import { ScoreDisplay } from './ScoreDisplay.js';
import { Runner } from './Runner';
import { Target, Covid , Coin , Test, Soju, Computer, Hw, Quiz, Energy } from './Target';

import point from '../data/point.mp3';
import kick from '../data/kick.mp3'

import startbar from '../data/startbar.png'
import startimage from '../data/00.png'
import checkpoint from '../data/checkpoint.png'
import restart from '../data/restart.png'
import gameoverimg from '../data/gameover.png'
import title from '../data/title.png'

const coin_delta_y = 40;
const invincible_time = 600;

let runner;
let score;
let coin_array, delete_coin, obstacle_array;

var checkframe;
var gameStage;
var life;
var playing;

let game_speed = 1;
let invincible =0;

let pointsound, kicksound;
let startgame_img, start_background, starter_img, title_img;
let check_point, gameover_img;
let restart_button;
let grade_aplus, grade_a, grade_b, grade_c, grade_d, grade_f;

function setup() {
  // set canvas in center
  var cnv = createCanvas(800, 600);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);

  // Initialize
  life= TOT_LIFE;
  runner = new Runner(life);  
  coin_array= new Array();
  obstacle_array = new Array();
  delete_coin = new Array();
  score = new ScoreDisplay(runner.getRemainingLife());
  gameStage= 0;

  // Image loading
  startgame_img = loadImage(startbar);
  start_background = loadImage(startimage);
  title_img= loadImage(title);

  starter_img = createSprite(400,230,50,100);
  starter_img.addAnimation('run','data/1.png','data/1.png','data/1.png','data/2.png','data/2.png','data/3.png','data/3.png','data/4.png','data/4.png','data/5.png','data/5.png','data/6.png','data/6.png','data/7.png','data/7.png');
  starter_img.scale=0.7;

  gameover_img = loadImage(gameoverimg);
  check_point = loadImage(checkpoint);
  restart_button = loadImage(restart);
  grade_aplus = loadImage('data/a+.png')
  grade_a = loadImage('data/a.png');
  grade_b = loadImage('data/b.png');
  grade_c = loadImage('data/c.png');
  grade_d = loadImage('data/d.png');
  grade_f = loadImage('data/f.png');

  //sound loading
  pointsound= loadSound(point);
  kicksound=loadSound(kick);
  
}

function draw() {
  //game stage 0: Game Starting Page
  if(gameStage==0){
    //initialize
    init();
    starter_img.visible=true;
    runner.runner.visible=false;

    background(250);
    //running animation
    starter_img.animation.play();
    drawSprites(); 

    //load image
    imageMode(CENTER);
    image(start_background,400,230,677*0.83,170*0.83);
    image(title_img,400,340,148*1.3,28*1.3);
    image(startgame_img,400,400,201*0.97,40*0.97);
    
    if(mouseX<=500&&mouseX>=300 &&mouseY>=380&&mouseY<=420){
      image(startgame_img,400,400,201,40);
    }

    //click start game button
    if(mouseIsPressed && mouseX<=500&&mouseX>=300 &&mouseY>=380&&mouseY<=420){
      starter_img.visible=false;
      gameStage=1;
      checkframe=0;
      runner.runner.visible=true;
      runner.runner.changeAnimation('run');
      setspeed(1);
    }
  }
  // game stage 1: Game Playing Page
  if(gameStage==1){
    background(255);
    strokeWeight(3);
    line(30, 505, 770, 500);
    stroke(0);
    
    playing = true;
    checkframe+=1;
    //runner size down
    if(invincible>0){
      if(invincible==1){
        setspeed(2/3);
        runner.sizedown();
      }
      invincible--;
    }

    //invincible time showing rect
    if(invincible>0){
      fill(255,229,102);
      strokeWeight(1);
      stroke(41,162,229)
      rect(240,28,invincible/(invincible_time/300),24,5);
    }

    //create coin
    if (frameCount % (12/game_speed) == 0){
      let coin = new Coin(game_speed);
      coin_array.push(coin);
    }

    //create obstacle, energy by random number
    if (frameCount % (60/game_speed) == 0 && checkframe>=90) {
      let number = Math.floor(random(1,1000));
      if(number%8 ==1){
        let covid = new Covid(game_speed);
        obstacle_array.push(covid);
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
        coin_array[length - 3].target.position.y -= 3.2 * coin_delta_y-5;
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
        coin_array[length - 2].target.position.y -= 2.3 * coin_delta_y-5;
        coin_array[length - 3].target.position.y -= 3.2 * coin_delta_y-10;
        coin_array[length - 4].target.position.y -= 2.3 * coin_delta_y-5;
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

    //check coin overlap + out of canvas
    coin_array.forEach(element => {
      if(runner.runner.overlap(element.target) && element.isCollisionChecked==false){
        //if overlap
        score.addScore(10);
        pointsound.play();
        element.isCollisionChecked= true;
        delete_coin.push(element);
      }
      if(element.target.position.x <= 20){
        //if out of canvas
        coin_array.shift();
        element.target.remove();
      }
    })
    
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
          score.setLife(life);
          if(life==0){
            gameStage=2;
          }
          element.isCollisionChecked= true;
        }else {
          element.kick();
          kicksound.play();
        }
        if(element.target.position.x <= -200 || element.target.position.y<0){
          //remove obstacle out of canvas
          obstacle_array.splice(i, 1);
          i--;
          element.target.remove();
        }
      }
    }
    // draw coin, obstacle
    coin_array.forEach(element => {
      element.draw();
    });
    obstacle_array.forEach(element => {
      element.draw();
    });
    imageMode(CENTER);
    score.draw();
    runner.draw();
    drawSprites();
  }
  // game stage 2: Stop playing, Show 'GameOver', 'Checkpoint' Button  
  if(gameStage==2){
    playing = false;

    imageMode(CENTER);
    image(check_point,400,300,201*0.97,40*0.97);
    image(gameover_img,400,240,130*1.2,30*1.2);
    if(mouseX<=500&&mouseX>=300 &&mouseY>=280&&mouseY<=320){
      image(check_point,400,300,201,40);
    }
    if(mouseIsPressed && mouseX<=500&&mouseX>=300 &&mouseY>=280&&mouseY<=320){
      gameStage=3;
    }
  }
  if(gameStage==3){
    background(255);
    noStroke();
    imageMode(CENTER);
    
    //grade display
    let final_score = score.score;
    if(final_score >10000){
      image(grade_aplus,400,250,697*0.45,819*0.45);
    }
    else if(final_score >8000){
      image(grade_a,400,250,697*0.45,819*0.45);
    }
    else if(final_score >6000){
      image(grade_b,400,250,697*0.45,819*0.45);
    }
    else if(final_score >4000){
      image(grade_c,400,250,697*0.45,819*0.45);
    }
    else if(final_score >3000){
      image(grade_d,400,250,697*0.45,819*0.45);
    }
    else{
      image(grade_f,400,250,697*0.45,819*0.45);
    }
    image(restart_button,400,490,179*0.97,54*0.97);

    //score
    textFont('Roboto');
    textSize(22);
    text(`${score.score}`,385,377);

    //restart button
    if(mouseX<=490&&mouseX>=310 &&mouseY>=463&&mouseY<=517){
      image(restart_button,400,490,179,54);
    }
    if(mouseIsPressed && mouseX<=490&&mouseX>=310 &&mouseY>=463&&mouseY<=517){
      gameStage=0;
    }
  }
}

// mouse press to jump, jump when game is playing
function mousePressed() {
  if (playing && mouseIsPressed) {
    if(runner.jump_count<2){
      runner.runner.animation.stop();
      runner.jump();
      runner.jump_count++;
    }
  }
}

// Spacebar to jump, jump when game is playing
function keyPressed() {
  if (playing && key === ' ') {
    if(runner.jump_count<2){
      runner.runner.animation.stop();
      runner.jump();
      runner.jump_count++;
    }
  }
}

function init(){
  life= TOT_LIFE;
  // runner = new Runner(life);  
  coin_array= new Array();
  obstacle_array = new Array();
  delete_coin = new Array();
  score = new ScoreDisplay(runner.getRemainingLife());
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
