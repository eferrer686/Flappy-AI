var walls=[];
let totalPopulation = 500;
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
  graphics();
  for(var i = 0;i<slider.value();i++){
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
  }

  //Create walls every 120 frames
  let wallspacing=80;
  if(counter % wallspacing == wallspacing-1){
      walls.push(new Wall());
  }
  counter++;

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
    getBestBirds(5);
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
  let closeWall = walls[0];

    for(var j = 0; j<walls.length;j++){
      if(walls[j].x > activeBirds[0].x && walls[j].x<closeWall.x){
        closeWall=walls[j];
      }
    }
    return closeWall;

}
function graphics(){

    //Update birds movement
    for(var i = 0;i < activeBirds.length ;i++){
      activeBirds[i].show();
    }

    //update walls graphics
    for(var i=0;i < walls.length;i++){
      walls[i].show();
    }

}
