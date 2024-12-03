//COLLISIONS - Demonstrates understanding of events and functions (quality), aims to produce an unexpected mini-project (creativity).

let carx = []
let cary = []
let carrotation = []
let cartype = []
let cardirection = []
let count = 0
let chosendirection = 0
let xcollide = false
let ycollide = false
let carcollidex = false
let carcollidey = false
let carturningclock = []

function preload() {
  //Preloads images
  BOUNCYBOY = loadImage("MERMIN.jpg")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  //Draw shapes around center coordinates, not from top left
  rectMode(CENTER)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background('black')
}

function checkforCollide(carsdrawn) {
  xcollide = false
  ycollide = false
  carcollidex = false
  carcollidey = false

  //if rectangle edge hits left or right edge of window, sets x-axis collision check to true
  if (carx[carsdrawn] <= 5 || carx[carsdrawn] >= windowWidth-5) {
    xcollide = true
  //if rectangle edge hits top or bottom edge of window, sets y-axis collision check to true
  } else if (cary[carsdrawn] <= 10 || cary[carsdrawn] >= windowHeight-10) {
    ycollide = true
  }
  checkall = carx.length

  //if 'car' comes within 20px of another car they are considered to be colliding
  //check current car against coordinates of all other cars
  for (let carschecked = 0; carschecked < carx.length; carschecked++) {
    if (carschecked !== carsdrawn) {
      let distance = dist(carx[carsdrawn], cary[carsdrawn], carx[carschecked], cary[carschecked])
      if (distance < 20) {
        carcollidex = true
        carcollidey = true
        separateCars(carsdrawn, carschecked)
      }
    }
  }
}


function separateCars(car1, car2) {
  // Separate the cars by a small distance along the axis of the collision to avoid sticking
  //Finds direction of car 1 to car2
  let angle = atan2(cary[car2] - cary[car1], carx[car2] - carx[car1]);
  let separationDistance = 5; // Distance to move the cars apart
  
  // Push the cars apart along the directional line found in above calculation
  carx[car1] -= cos(angle) * separationDistance;
  cary[car1] -= sin(angle) * separationDistance;
  
  carx[car2] += cos(angle) * separationDistance;
  cary[car2] += sin(angle) * separationDistance;
}

function generateCars() {
  //Generates and stores random coordinates for cars
  carx.push(Math.floor(Math.random() * windowWidth))
  cary.push(Math.floor(Math.random() * windowHeight))
  carrotation.push(0)
  cartype.push(Math.floor(Math.random() * 6))
  //Direction of cars works on NESW basis (1 being North, clockwise to 4 for West)
  cardirection.push(Math.floor((Math.random() * 4))+1)
  carturningclock.push(true)
}

function carTurn(carsdrawn) {
  let turndirection = Math.floor(Math.random() * 100)
  //Every now and then (very small amount of time), change rotation direction randomly

  if (turndirection > 2) {
    carturningclock[carsdrawn] = !carturningclock[carsdrawn]
  }

  if (carturningclock == true) {
    carrotation[carsdrawn] += 5
  } else {
    carrotation[carsdrawn] -= 5
  }
}


function draw() {
  background('black')
  frameRate(60)
  //Generates and stores random coordinates for cars
  if (count < 30) {
    generateCars()
  }
  
  let carstodraw = carx.length

  for(let carsdrawn = 0; carsdrawn < carstodraw; carsdrawn ++){

    push()
    translate(carx[carsdrawn], cary[carsdrawn])
    //If the car's rotation exceeds 360 degrees, it resets the rotation to 0, ensuring that rotations stay within the 0-360 degree range.
    if (carrotation[carsdrawn] > 360) {
      carrotation[carsdrawn] = 0
    }
    rotate(carrotation[carsdrawn])
    strokeWeight(0)
    image(BOUNCYBOY, 0, 0, 20, 20)
    pop()

    chosendirection = cardirection[carsdrawn]

    checkforCollide(carsdrawn)
    
    if (xcollide == true) {
      if (carx[carsdrawn] <= 5) {
        chosendirection = 2
      } else if (carx[carsdrawn] >= windowWidth - 5) {
        chosendirection = 4
      }
    }

    if (ycollide == true) {
      if (cary[carsdrawn] <= 10) {
        chosendirection = 3
      } else if (cary[carsdrawn] >= windowHeight - 10){
        chosendirection = 1
      }
    }

    // Car-to-car collision handling
    if (carcollidex && carcollidey) {
      // Only reverse the direction if the cars are still in collision
      if (chosendirection == 1 || chosendirection == 3) {
        chosendirection = (chosendirection == 1) ? 3 : 1; // Reverse vertical direction
      }
      if (chosendirection == 2 || chosendirection == 4) {
        chosendirection = (chosendirection == 2) ? 4 : 2; // Reverse horizontal direction
      }
    }

    carTurn(carsdrawn)

    //Matches 1-4 system to correct NESW directional movement
    if (chosendirection == 1) {
      cary[carsdrawn] -= 5
    } else if (chosendirection == 2) {
      carx[carsdrawn] += 5
    } else if (chosendirection == 3) {
      cary[carsdrawn] += 5
    } else if (chosendirection == 4) {
      carx[carsdrawn] -= 5
    }

    cardirection[carsdrawn] = chosendirection

  }
  count += 1
}

