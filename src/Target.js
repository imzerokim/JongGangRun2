import { Subject } from './Subject';
import { Runner } from './Runner';

import covid from '../data/COVID.png';
import duck from '../data/duck.png';
import squirrel from '../data/squirrel.png';

class Target extends Subject {
  constructor(x, y, width){
    super();
    this.visible = true;
    this.x=x;
    this.y=y;
    this.width=width;
    this.height = 0;
    this.img=undefined;
  }
  getPoints(){
    return 0;
  }
  draw(){
    if(this.visible && this.img){
      imageMode(CENTER);
      image(this.img, this.x, this.y, this.width,this.height);
    }
  }
  isHit(x, y){
    if((x>=this.x-this.width/2) && (x<=this.x+this.width/2) && (y>=this.y-this.height/2))
      return y<=this.y+this.height/2;
  }
  shoot(x, y){
    if(this.isHit(x,y)){
      this.visible=false;
      this.notifySubscribers('score', this.getPoints());
    }
  }
  update(source, ...others){
    if(source == 'runner'){
      this.shoot(others[0], others[1]);
    }
  }
}

class Covid extends Target {
    constructor(x, y, width){
      super(x,y,width);
      this.img=loadImage((covid), ()=>{
        this.height = this.img.height * (this.width/ this.img.width)
      })
    }
    loseLife(){
      return 1;
    }
  }

  class TargetFactory {
    static getInstance(){
      if(!this.instance){
        this.instance = new TargetFactory();
      }
      return this.instance;
    }
    getTargetsByName(name,width,y){
      var line1 =[];
  
      for(let i=0; i<name.length;i++){
        if(name[i]== 'covid'){
          let ttarget = new Covid(width*i*1.5+width, y,width);
          line1.push(ttarget);
        }
        if(name[i]== 'duck'){
          let dtarget = new DuckTarget(width*i*1.5+width, y,width);
          line1.push(dtarget);
        }
        if(name[i]== "squirrel"){
          let starget = new SquirrelTarget(width*i*1.5+width, y,width);
          line1.push(starget);
         }
      }
      return line1;
    }
    getRandomTargets(num, width, y){
        var line =[];
        for(let i=0; i<num;i++){
          var number= random(1,10);
          if(Math.floor(number)%3 ==0){
            line.push('covid');
          }
          if(Math.floor(number)%3 ==1){
            line.push('covid');
          }
          if(Math.floor(number)%3 ==2){
            line.push("covid");
           }
        }
        return this.getTargetsByName(line,width,y);
      }
    }


    export { Target, TargetFactory };
    