import '../css/style.css';
import { TOT_LIFE } from './Constants.js';
import { ScoreDisplay } from './ScoreDisplay.js';
import { Runner } from './Runner';
import { Covid } from './Target';


let runner;
let score;
let targets = [];
var gameOver;
let covid;

function setup() {
  var cnv = createCanvas(800, 600);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  
  // 1. Init runner and score display
  runner = new Runner(TOT_LIFE);
  score = new ScoreDisplay(runner.getRemainingLife());
  covid =  new Covid();
  
  // 2. Init the targets
  //initTargets(runner, score);

  // 3. Subscribe gun -- Uncomment when ready
  runner.subscribe(score);
}

function draw() {
  background(250);
  
  strokeWeight(3);
  line(30, 505, 770, 500);
  
  stroke(0);

  for (let t of targets) t.draw();
  runner.draw();
  score.draw();
  covid.draw();
}


// mouse press to jump
function mousePressed() {
  if (mousePressed) {
    if(runner.touch==false){
      runner.gravity = 1;
    }
    else{
      if(runner.jump_count<2){
        runner.jump();
      }
      else{
        runner.touch=false;
      }
    }
    runner.jump_count++;
  }

}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve,ms));
}

// Spacebar to jump
function keyPressed() {
  if (key === ' ') {
    if(runner.touch==false){
      runner.gravity = 1;
    }
    else{
      if(runner.jump_count<2){
        runner.jump();
      }
      else{
        runner.touch=false;
      }
    }
    runner.jump_count++;
  }
}

function initTargets(){

  //Unsubscribe previous targets
  if(targets.length >0){
    for(let t of targets){
      runner.unsubscribe(t);
    }
  }

  //create target
  targets = TargetFactory.getInstance().getRandomTargets(
    //target 조건들... 수정해야함
    MAX_TARGETS,
    TARGET_WIDTH,
    height/2
  );

  //subscribe to events
  targets.map((target) =>{
    target.subscribe(score);
    runner.subscribe(target);
  });

}

window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
window.keyPressed = keyPressed;
