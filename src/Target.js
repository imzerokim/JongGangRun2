import { Subject } from './Subject';

class Target extends Subject {
  constructor(v){
    super();
    this.target= createSprite(800, 482);
    this.target.velocity.x = -6*v;
    this.target.scale=0.1;
    this.isCollisionChecked = false;
    this.name="";
    this.direction =-46;
  }
  draw(){
    imageMode(CENTER);
    if(this.direction >= -45){
      this.fly();
    }
  }
  fly(){
    //make obstacle kicked / fly
    this.target.velocity.y=-20;
    for(let a=0; a<25; a++){
      this.target.velocity.x =15+ a;
    }
    this.target.rotation=10;
    this.direction++;
  }
  kick() {
    //when obstacle is overlapped
    this.direction = -45;
  }
}

class Energy extends Target {
  constructor(v){
      super(v);
      this.target.addAnimation('energy','data/energy.png','data/energy2.png','data/energy2.png','data/energy.png');
      this.target.scale=0.13;
      this.target.position.x= 1112;
      this.target.position.y=450;
      this.name="energy";
      this.s=0;
      this.z=1;
  }
}

class Coin extends Target {
  constructor(v){
      super(v);
      this.target.addAnimation("coin_img",'data/coin.png');
      this.target.setCollider('circle', 0,0,60);
      this.target.position.x= 1112;
      this.target.position.y=480;
  }
}

class Covid extends Target {
    constructor(v){
      super(v);
      this.target.addAnimation('pass','data/COVID.png');
      this.target.addAnimation('hit','data/COVID.png','data/redcovid.png','data/redcovid.png','data/COVID.png');
      this.target.changeAnimation('pass');
      this.target.position.x= 960;
      this.target.position.y=480;
      this.target.velocity.x = -6*1.8*v;
      this.name="covid";
    }
  }

class Test extends Target {
  constructor(v){
    super(v);
    this.target.addAnimation('pass','data/test0.png','data/test1.png','data/test2.png','data/test3.png','data/test4.png','data/test5.png','data/test6.png','data/test7.png');
    this.target.addAnimation('hit','data/test.png','data/redtest.png','data/redtest.png','data/test.png');
    this.target.rotation=15;
    this.target.position.x=955;
    this.target.position.y=485;
    this.target.changeAnimation('pass');
  } 
}

class Quiz extends Target {
  constructor(v){
    super(v);
    this.target.addAnimation('pass','data/quiz.png');
    this.target.addAnimation('hit','data/quiz.png','data/redquiz.png','data/redquiz.png','data/quiz.png');
    this.target.changeAnimation('pass');
    this.target.scale=0.08;
    this.target.position.x= 955;
    this.target.position.y=300;
    this.name="quiz";
  }
}
class Hw extends Target {
  constructor(v){
    super(v);
    this.target.addAnimation('pass','data/hw.png');
    this.target.addAnimation('hit','data/hw.png','data/redhw.png','data/redhw.png','data/hw.png');
    this.target.changeAnimation('pass');
    this.target.scale=0.09;
    this.target.position.x= 960;
    this.target.position.y= 485;
  }
}
class Computer extends Target {
  constructor(v){
    super(v);
    this.target.addAnimation('pass','data/computer.png','data/computer.png','data/cp2.png','data/computer.png','data/computer.png');
    this.target.addAnimation('hit','data/computer.png','data/redcp.png','data/redcp.png','data/computer.png');
    this.target.changeAnimation('pass');
    this.target.position.x= 965;
    this.target.position.y=480;
    this.name="computer";
    this.animation_velocity=0;
    this.animation_direction=1;
  }
}
class Soju extends Target {
  constructor(v){
    super(v);
    this.target.addAnimation('pass','data/Soju.png','data/Soju0.png','data/Soju.png');
    this.target.addAnimation('hit','data/Soju.png','data/redsoju.png','data/redsoju.png','data/Soju.png');
    this.target.changeAnimation('pass');
    this.target.scale=0.12;
    this.target.position.x= 965;
    this.target.position.y=490;
  }
}

export { Covid , Coin , Test, Soju, Computer, Hw, Quiz, Energy};