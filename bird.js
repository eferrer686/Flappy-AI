function mutate(x) {
  if (random(1) < 0.1) {
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}


class Bird{
  constructor(){
    this.lift = -15;
    this.x = width/4;
    this.y = random(0,height);
    this.gravity = 2;
    this.velocity = 0;
    this.r = 25;



    this.brain = new NeuralNetwork(5,5,1);

    this.score = 0;
    this.fitness = 0;
  }
  show(){
   ellipse(this.x,this.y,this.r);
   fill(255);
  }
  update(){

    this.velocity += this.gravity;
    this.y += this.velocity;
    if(this.y < 0){
      this.velocity = 0;
      this.y = 0;
    }
    if(this.y > height){
      this.velocity = 0;
      this.y = height;
    }
    if(this.velocity>=15){
      this.velocity=15;
    }

    this.score++;

  }

  jump(){
    if(this.velocity < 0) {this.velocity += this.lift;}
    else{this.velocity = this.lift;}
  }

  think(wall){
    let input = [];

    input[0] = this.y;
    input[1] = wall.x - wall.width;
    input[2] = wall.y;
    input[3] = wall.bottom;
    input[4] = this.velocity;
    let output = this.brain.predict(input);
    if(output[0]>0.5){
      this.jump();
    }
  }

  mutate(){
    this.brain.mutate(mutate);
  }
  setBrain(newBrain){
    this.brain = newBrain ;
  }

}
