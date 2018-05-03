var walls=[];
let totalPopulation = 20;
let allBirds = [];
let activeBirds = [];
let counter = 0;

function setup() {
  createCanvas(800,600);

  for (let i = 0; i < totalPopulation; i++) {
    var bird = new Bird();
    console.log(bird);
    activeBirds.push(bird);
    allBirds.push(bird);
  }
}

function draw() {
  background(0);
  if(activeBirds.length==0){
    //create new generation and reset simulation
    reset();
  }else{
    //Run or keep running simulation
    play();
  }

}
function play(){
  //Update birds movement
  for(var i = 0;i < activeBirds.length ;i++){
    activeBirds[i].update();
    activeBirds[i].show();

  }
  //Create walls
  if(frameCount % 120 == 1){
      walls.push(new Wall());
  }
  //update walls
  for(var i = walls.length -1;i >= 0;i--){
      walls[i].update();
      walls[i].show();
      //Delete walls out of screen
      if(walls[i].offscreen()){
        walls.splice(i,1)
      }
      //Delete birds hitting walls
      for(var j = activeBirds.length -1;j >= 0;j--){
        if(walls[i].hits(activeBirds[j])){
          activeBirds.splice(j,1);
        }
      }
  }
  //Make birds "think"
  for(var i = 0;i < activeBirds.length ;i++){
    activeBirds[i].think(walls[0]);
  }

}
function reset(){

  let bestBirds = [];

  for(var i = 0; i < 1 ;i++){
    bestBirds.push(new Bird);
  }

  for(var i = 0;i < allBirds.length ;i++){
    for(var j = 0;j < bestBirds.length ;j++){
      if(bestBirds[j].score < allBirds[i].score){
        bestBirds[j] = allBirds.splice(i,1)[0];
      }
    }
  }
  for(var i = 0;i < totalPopulation ;i++){
    bestBirds[0].score = 0;
    allBirds[i] = bestBirds[0];
    activeBirds[i] = bestBirds[0];
  }

  walls=[];
  walls.push(new Wall);

}
