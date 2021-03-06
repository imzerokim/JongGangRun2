import { FONT_SIZE, LIFE_IMAGE_SIZE, POINT_IMAGE_SIZE } from './Constants.js';

import lifeImage from '../data/life.png';
import points from '../data/points.png';

class ScoreDisplay {
  constructor(initLife){
    this.img=loadImage(lifeImage),
    this.point=loadImage(points),
    this.resetScore(),
    this.setLife(initLife)
  }
  resetScore(){
    this.score=0;
  }
  addScore(scoretoadd){
    this.score += scoretoadd;
  }
  setLife(num){
    this.leftlife=num;
  }
  draw(){
    for(let b=1; b<=this.leftlife; b++){
      image(this.img, width-10*b-LIFE_IMAGE_SIZE*b, 40, LIFE_IMAGE_SIZE, LIFE_IMAGE_SIZE*1.2);
    }
    var pointWidth = POINT_IMAGE_SIZE*(this.point.width/this.point.height)
    image(this.point,70,38, pointWidth, POINT_IMAGE_SIZE);
    
    strokeWeight(0);
    fill(0,0,0);
    textFont('Roboto');
    textSize(FONT_SIZE);

    text(`${this.score}`,pointWidth+35, 45);
    
  }
  update(source, ...others){
    this.setLife(others[0]);
    if(source=='score'){
      this.addScore(others[0]);
    }
  }
}

export { ScoreDisplay };
