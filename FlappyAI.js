var walls=[];
let totalPopulation = 10;
let allBirds = [];
let activeBirds = [];
let counter = 0;

function setup() {
  createCanvas(800,600);

  for (let i = 0; i <= totalPopulation; i++) {
    let bird = new Bird();
    activeBirds.push(bird);
    allBirds.push(bird);
  }
}

function draw() {
  background(0);
  for(var i = 0;i < allBirds.length ;i++){
    console.log(i);
    allBirds[i].update();
    allBirds[i].show();
  }
  if(frameCount % 120 == 1){
      walls.push(new Wall());
  }

  for(var i = walls.length -1;i >= 0;i--){
      walls[i].update();
      walls[i].show();

      if(walls[i].offscreen()){
        walls.splice(i,1)
      }
      for(var j = allBirds.length -1;j >= 0;j--){
        if(walls[i].hits(allBirds[j])){
          allBirds.splice(j,1);
        }
      }
  }

}
function mousePressed(){
  for(var i = 0;i < allBirds.length ;i++){
    allBirds[i].jump();
  }
}
