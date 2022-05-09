import { Subject } from './Subject';
import { Runner } from './Runner';

// import covid from '../data/COVID.png';
// import duck from '../data/duck.png';
// import squirrel from '../data/squirrel.png';

class Target extends Subject {
  constructor(x, y, width){
    super();
    // this.visible = true;
    this.target= createSprite(800, 482);
    this.target.velocity.x=-1.8;
    this.target.scale=0.1;
  }
  getPoints(){
    return 0;
  }
  draw(){
    imageMode(CENTER);
    drawSprites();
  }
  isHit(x, y){//러너랑 충돌했는지 확인해서 true false로 알려줌
    if((x>=this.x-this.width/2) && (x<=this.x+this.width/2) && (y>=this.y-this.height/2))
      return y<=this.y+this.height/2;
  }
  shoot(x, y){//타겟이 맞았으면 이미지 잠깐 바꾸기 + 라이프-1
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
      this.target.addAnimation("covid_img",'data/COVID.png');
    }
    // flicker(){
    //   if(this.target.isHit==true){
    //     this.target.addAnimation("covid_img",'data/COVID.png');
    //   }
    // }
    // loseLife(){
    //   return 1;
    // }
  }

class Test extends Target {
  constructor(x, y, width){
    super(x,y,width);
    this.target.addAnimation("test_img",'data/test.png');
  } 
}
class Quiz extends Target {
  constructor(x, y, width){
    super(x,y,width);
    this.target.addAnimation("quiz_img",'data/quiz.png');
  }
}
class Hw extends Target {
  constructor(x, y, width){
    super(x,y,width);
    this.target.addAnimation("hw_img",'data/hw.png');
  }
}
class Computer extends Target {
  constructor(x, y, width){
    super(x,y,width);
    this.target.addAnimation("computer_img",'data/computer.png');
  }
}
class Soju extends Target {
  constructor(x, y, width){
    super(x,y,width);
    this.target.addAnimation("soju_img",'data/Soju.png');
  }
}


  // class TargetFactory {
  //   static getInstance(){
  //     if(!this.instance){
  //       this.instance = new TargetFactory();
  //     }
  //     return this.instance;
  //   }
  //   getTargetsByName(name,width,y){
  //     var line1 =[];
  
  //     for(let i=0; i<name.length;i++){
  //       if(name[i]== 'covid'){
  //         let ttarget = new Covid(width*i*1.5+width, y,width);
  //         line1.push(ttarget);
  //       }
  //       if(name[i]== 'covid'){
  //         let dtarget = new Covid(width*i*1.5+width, y,width);
  //         line1.push(dtarget);
  //       }
  //       if(name[i]== "covid"){
  //         let starget = new Covid(width*i*1.5+width, y,width);
  //         line1.push(starget);
  //        }
  //     }
  //     return line1;
  //   }
  //   getRandomTargets(num, width, y){
  //       var line =[];
  //       for(let i=0; i<num;i++){
  //         var number= random(1,10);
  //         if(Math.floor(number)%3 ==0){
  //           line.push('covid');
  //         }
  //         if(Math.floor(number)%3 ==1){
  //           line.push('covid');
  //         }
  //         if(Math.floor(number)%3 ==2){
  //           line.push("covid");
  //          }
  //       }
  //       return this.getTargetsByName(line,width,y);
  //     }
  // }

  
    export { Target, Covid };
    