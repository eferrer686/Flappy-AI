class Wall{
  constructor(){
    this.width = 75;
    this.velocity = 10;
    this.space = 100;

    this.x = width;
    this.y = random(0,height-this.space);
    this.top = this.y-height;
    this.bottom = this.top + this.space + height;
  }

  show(){

   rect(this.x,this.top,this.width,height);
   rect(this.x,this.bottom,this.width,height);

   fill(255);

  }
  update(){

    this.x -= this.velocity;

  }
  offscreen(){
    if(this.x<-this.width){return true;}
    else{return false;}
  }

  hits(bird){
    if(bird.y+(bird.r/2) < this.y|| bird.y > this.bottom){
      if(bird.x > this.x && bird.x < this.x+this.width){return true;}
    }
  }
}
