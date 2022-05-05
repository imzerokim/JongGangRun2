import { RUNNER_SIZE } from './Constants.js';
import { Subject } from './Subject';

// Assets
//import runner from '../data/run.png';
import lifeImage from '../data/life.png';
var running;

class Runner extends Subject {
    constructor(tot){
      super();
      // this.runner = loadImage (runner);
      this.runner = createSprite(150, 426, 100,100);
      this.runner.addAnimation("runner_gif",'data/run1.png',
      'data/run2.png','data/run3.png','data/run4.png','data/run5.png','data/run6.png',
      'data/run7.png','data/run6.png','data/run5.png','data/run4.png', 'data/run3.png','data/run2.png',);
      this.runner.scale=0.316;
    //this.jumpSound = loadSound(jump),
    //this.hitSound = loadSound(hit),
      this.totLife =tot;
      this.reload()
      this.gravity = 6 ;
      this.flap = -6;
      this.ground_y = 350;
      this.isjump = false;
    }
    reload(){
      this.life=[],
      this.remainingLife=this.totLife;
      this.notifySubscribers('gun', this.x, this.y, this.getRemainingLife());
    }
    getRemainingLife(){
      return this.remainingLife;
    }
    draw(){
      if(this.runner.position.y<=this.ground_y){
        this.runner.velocity.y+=this.gravity;
      }
      if(this.runner.position.y==426){
        this.runner.velocity.y=0;
        this.isjump=false;
      }
      imageMode(CENTER);
      drawSprites();
      for(let tot of this.life)tot.draw();
    }
    jump(){
      if(!this.isjump){
        this.runner.velocity.y=this.flap;
      }
      this.isjump = true;
      console.log(this.runner.position.y);
      // if(this.runner.position.y>300)
      // this.runner.position.y = 300;
      
      // if(this.runner.position.y<200){
      //   this.runner.velocity.y=1;
      //   if(this.runner.position==426){
      //     this.runner.velocity.y=0;
      //   }
      // }

        //gun의 shoot의 역할 life가 남아있으면 해당 사운드 플레이함
        //여기서는 러너가 움직이게 해야겠지...? 클릭 혹은 스페이스바 눌렀을때 액션하는걸 따로 빼야할까?
    //   if(mouseX<=800 && mouseY <=600){
    //   if(this.remainingLife<=0){
    //     this.emptySound.play();
    //   }
      
    //   else{
    //     this.remainingShots --;
    //     this.x= mouseX + CURSOR_SIZE* random(-1/2,1/2);
    //     this.y= mouseY + CURSOR_SIZE* random(-1/2,1/2);
    //     this.shotSound.play();
    //     this.bullets.push(new Bullet(this.x, this.y));
    //     this.notifySubscribers('gun', this.x, this.y, this.getRemainingShots());
    //   }
    // }
    }
  }


  
  export { Runner };
  