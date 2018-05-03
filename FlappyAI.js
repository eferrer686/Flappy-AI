var walls=[];
let totalPopulation = 100;
let allBirds = [];
let activeBirds = [];
let counter = 0;

function setup() {
  createCanvas(800,600);
  slider = createSlider(1, 10, 1);
  for (let i = 0; i < totalPopulation; i++) {
    var bird = new Bird();
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
    if(activeBirds[i].y==height || activeBirds[i].y==0){
      activeBirds.splice(i,1);
    }

  }

  //Create walls every 120 frames
  if(counter % 120 == 119){
      walls.push(new Wall());
  }
  counter++;

  //update walls
  updateWalls();

  //Make birds "think"
  for(var i = 0;i < activeBirds.length ;i++){
    if(walls.length>0){activeBirds[i].think(walls[0]);}
  }

}
function updateWalls(){
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
}

function reset(){
    getBestBirds(4);
    setWalls();
}
function getBestBirds(num){
  let bestBirds = [];
  for(var i  = 0 ;i<num ;i++){
    bestBirds[i]=new Bird;
  }

  for(var i = 0; i< allBirds.length ; i++){
    for(var j = 0 ; j<num ; j++){

      if (allBirds[i].score > bestBirds[j].score){
        newBird = allBirds.splice(i,1)[0];

        bestBirds[j]=newBird;
      }
    }
    console.log(bestBirds[0].score);
  }

  replacePopulation(bestBirds,num);
}
function replacePopulation(bestBirds,num){
  allBirds=[];
  activeBirds=[];
  for(var i = 0; i<totalPopulation ; i++){
    var newBird = new Bird;
    newBird.setBrain(bestBirds[i%num].brain.copy());
    newBird.mutate();

    activeBirds.push(newBird);
    allBirds.push(newBird);

  }
}
function setWalls(){
  walls = [];
  walls[0] = new Wall;
  counter = 0;
}
