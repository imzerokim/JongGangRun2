import { Subject } from './Subject';

import jump from '../data/jump.mp3';
import sizeup from '../data/sizeup.mp3';
import hit from '../data/hit.mp3';

class Runner extends Subject {
  constructor(tot){
    super();
    this.gnd = 426;
    this.runner = createSprite(150, this.gnd, 4, 10);
    this.runner.addAnimation('run','data/run1.png','data/run2.png','data/run3.png','data/run4.png','data/run5.png','data/run6.png','data/run7.png','data/run6.png','data/run5.png','data/run4.png', 'data/run3.png','data/run2.png',);
    this.runner.addAnimation('hit','data/red1.png','data/red1.png','data/run2.png','data/red2.png','data/run3.png','data/red3.png','data/run4.png','data/red4.png','data/run5.png','data/red6.png','data/run7.png','data/red6.png','data/run5.png','data/run4.png','data/red3.png','data/run2.png',);
    this.jumpSound= loadSound(jump),
    this.sizeupSound = loadSound(sizeup),
    this.hitSound= loadSound(hit),
    this.runner.changeAnimation('run');
    this.runner.setCollider('rectangle', -5,5,70,142);

    this.gravity = 1 ;
    this.flap = -16;
    this.ground_y = 350;  
    this.jump_count = 0;
    this.flicker=0;
    this.totLife =tot;
    this.reload();

  }
  reload(){
    this.life=[],
    this.remainingLife=this.totLife;
    this.notifySubscribers('runner', this.x, this.y, this.getRemainingLife());
  }
  getRemainingLife(){
    return this.remainingLife;
  }
  isHit(){
    this.flicker=26;
    this.runner.changeAnimation('hit');
    this.hitSound.play();
  }
  sizeup(){
    //if runner drink energy, scale up
    this.runner.scale=1.25;
    this.runner.position.y-= 20;
    this.gnd -= 20;
    this.sizeupSound.play();
  }
  sizedown(){
    //scale down to normal size
    this.runner.scale=1;
    this.runner.position.y += 20;
    this.gnd += 20;
  }
  draw(){
    if(this.flicker>0){
      if(this.flicker ==1){
        this.runner.changeAnimation('run');
      }
      this.flicker--;
    }

    this.runner.velocity.y+=this.gravity;
    if(this.runner.position.y>=this.gnd){
      this.runner.position.y=this.gnd;
      this.runner.animation.play();  
      this.runner.velocity.y=0;
      this.isjump=0;
      this.touch = true;
      this.jump_count = 0;
    }
    imageMode(CENTER);
  }
  jump(){
    this.runner.velocity.y=this.flap;
    this.jumpSound.play();
  }
}
  
export { Runner };