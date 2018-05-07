var walls=[];
let totalPopulation = 200;
let allBirds = [];
let activeBirds = [];
let counter = 0;
let wallspacing=50;
let numBestBirds=10;
let bestScore = 0;
let actualScore = 0;
let generation = 1;
function resetAll(){
  activeBirds=[];
  allBirds=[];
  bestBirds=[];
  bestScore=0;
  actualScore=0;
  generation=1;
  counter=0;
  walls=[];

  for (let i = 0; i < totalPopulation; i++) {
    var bird = new Bird();
    activeBirds.push(bird);
    allBirds.push(bird);
  }
  walls.push(new Wall());
}
function setup() {

  var flappyAI = createCanvas(800,400);
  flappyAI.show();
  flappyAI.parent("flappyAI");

  resetAll();



}

function draw() {
  background(0);
  graphics();
  sliderval = document.getElementById("vel").value;

  for(var i = 0;i<sliderval;i++){
    if(activeBirds.length==0){
      //create new generation and reset simulation
      reset();
    }else{
      //Run or keep running simulation
        play();
    }
  }

}
function play(){

  //Update birds movement
  for(var i = 0;i < activeBirds.length ;i++){
    activeBirds[i].update();
    if(activeBirds[i].score > bestScore){
      bestScore=activeBirds[i].score;
    }
  }



  //Create walls every 120 frames
  if(counter % wallspacing == wallspacing-1){
      walls.push(new Wall());
  }
  counter++;
  actualScore=counter;

  //update walls
  updateWalls();

  //Make birds "think"
  for(var i = 0;i < activeBirds.length ;i++){

    if(walls.length>0){activeBirds[i].think(closestWall());}
  }

}
function updateWalls(){
  for(var i = walls.length -1;i >= 0;i--){
    walls[i].update();

    //Delete birds hitting walls
    for(var j = activeBirds.length -1;j >= 0;j--){
      if(activeBirds[j].y==height || activeBirds[j].y==0 || walls[i].hits(activeBirds[j])){
        activeBirds.splice(j,1);
      }
    }
    //Delete walls out of screen
    if(walls[i].offscreen()){
      walls.splice(i,1)
    }
  }
}

function reset(){
    generation++;
    getBestBirds(numBestBirds);
    setWalls();
}
function getBestBirds(num){
  let bestBirds = [];
  for(var i  = 0 ;i<num ;i++){
    bestBirds[i]=new Bird;
  }

  for(var i = 0; i< allBirds.length ; i++){
    for(var j = 0 ; j<num ; j++){

      if (i<allBirds.length && allBirds[i].score > bestBirds[j].score){

        newBird = allBirds.splice(i,1)[0];
        bestBirds[j]=newBird;
      }
    }

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
function closestWall(){
  let closeWall = new Wall;
  closeWall.x = width;

    for(var j = 0; j<walls.length;j++){
      if(walls[j].x > width/4-walls[j].width && walls[j].x < closeWall.x){
        closeWall=walls[j];
      }
    }
    return closeWall;

}
function graphics(){
    document.getElementById("generation").innerHTML = "Generation number:   " + generation;
    document.getElementById("alive").innerHTML = "Number of birds alive:  " + activeBirds.length;
    document.getElementById("bestscore").innerHTML = "Best Score:   " + (Math.floor((bestScore-75)/wallspacing)+1);
    document.getElementById("score").innerHTML = "Score:  " + (Math.floor((actualScore-75)/wallspacing)+1);
    //Update birds movement
    noStroke();
    fill(255,100);
    for(var i = 0;i < activeBirds.length ;i++){
      activeBirds[i].show();
    }

    //update walls graphics
    fill(255);
    for(var i=0;i < walls.length;i++){
      walls[i].show();

    }

}
