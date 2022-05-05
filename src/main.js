import '../css/style.css';
import { TOT_LIFE } from './Constants.js';
import { ScoreDisplay } from './ScoreDisplay.js';
import { Runner } from './Runner';


let runner;
let score;
let targets = [];

function setup() {
  var cnv = createCanvas(800, 600);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  
  // 1. Init runner and score display
  runner = new Runner(TOT_LIFE);
  score = new ScoreDisplay(runner.getRemainingLife());
  
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
  // for (let t of targets) t.draw();
  // requestAnimationFrame(byFrame);
  // clearRect(0,0,windowWidth,windowHeight);
  runner.draw();
  score.draw();
}


// mouse press to jump
function mousePressed() {
  runner.jump();
  //console.log('jump');

}
// Spacebar to jump
function keyPressed() {
  if (key === ' ') {
    runner.jump();
  }
}

// sketch.mousePressed = function(){
//   console.log('here');
// }

window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
window.keyPressed = keyPressed;
