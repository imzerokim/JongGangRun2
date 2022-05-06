import { RUNNER_SIZE } from './Constants.js';
import { Subject } from './Subject';

// Assets
// import jump from '../data/jump.mp3';
// import hit from '../data/hit.mp3';

class Runner extends Subject {
    constructor(tot){
      super();
      this.runner = createSprite(150, 426, 100,100);
      this.runner.addAnimation("runner_gif",'data/run1.png','data/run2.png','data/run3.png','data/run4.png','data/run5.png','data/run6.png','data/run7.png','data/run6.png','data/run5.png','data/run4.png', 'data/run3.png','data/run2.png',);
      this.runner.scale=0.31;
    //this.jumpSound = loadSound(jump),
    //this.hitSound = loadSound(hit),
      this.gravity = 1 ;
      this.flap = -12;
      this.ground_y = 350;
      this.jump_count = 0;
      this.touch = true;
      this.totLife =tot;
      this.reload()
    }
    reload(){
      this.life=[],
      this.remainingLife=this.totLife;
      this.notifySubscribers('runner', this.x, this.y, this.getRemainingLife());
    }
    getRemainingLife(){
      return this.remainingLife;
    }
    draw(){
      if(this.runner.position.y<=this.ground_y){
        this.runner.velocity.y+=this.gravity;
      }
      if(this.runner.position.y>=426){
        this.runner.position.y=426;
        this.runner.velocity.y=0;
        this.gravity=0;
        this.isjump=0;
        this.touch = true;
        this.jump_count = 0;
      }
      imageMode(CENTER);
      drawSprites();
      for(let tot of this.life)tot.draw();
    }
    jump(){
      this.gravity = 1 ;
      this.runner.velocity.y=this.flap;
      
    }
    isHit(){
      if(this.runner.overlap()){
        if(this.remainingLife<=0){
          //life==0일때 게임오버
          updateSprites(false);
          gameOver = true;
        }
        else{
          // life가 남아있는데 장애물 hit 한 경우
          this.remainingLife --;
          //this.hitSound.play();
          this.notifySubscribers('runner', this.x, this.y, this.getRemainingShots());
        }
      }
    }

  }


  
  export { Runner };
  