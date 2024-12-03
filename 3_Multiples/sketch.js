//MULTIPLES - Demonstrates technical understanding of arrays (quality) and illustrates ability to search out sources of inspiration and integrate ideas into own work (creativity).

//Blood Splatters Info
//Arrays containing details of all new and existing blood splatters

//x-coord of blood centre
let bloodx = []
//y-coord of blood centre
let bloody = []
//size of blood splat
let bloodsize = []
//how long blood splat has been on screen
let bloodage = []


function setup() {
  //dynamically resizing window
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0, 0, 0)
}


function draw() {
  //black background
  background(0, 0, 0);
  frameRate(10)

  //how many new splatters to add each frame (0 to 10)
  newsplatnum = Math.floor(Math.random() * 11)

  //generates and adds details of each new blood splatter to the relevant array
  for(let newsplats = 0; newsplats <= newsplatnum; newsplats ++){
  
    bloodx.push(Math.floor(Math.random() * windowWidth))
    bloody.push(Math.floor(Math.random() * windowHeight))
    bloodsize.push(Math.floor(Math.random() * 51))
    //each blood splat starts at '25' i.e. the highest opacity as it is 'fresh'
    bloodage.push(25)
  }

  //goes through every blood splat in the array and draws it in
  //finds how many blood splats currently exist
  splatstodraw = bloodx.length
  //goes through each splat in the list until the number drawn matches the number contained in the list
  for(let splatsdrawn = 0; splatsdrawn < splatstodraw; splatsdrawn ++){
    //calculates an alpha/opacity value for each blood splat based on its age (older = lower opacity)
    bloodfaded = Math.floor(255 * (1 - (1 / bloodage[splatsdrawn])))
    push()
    strokeWeight(0)
    //shade of darker red, along with calculated alpha value
    fill(194, 46, 46, bloodfaded)
    //if blood is fully faded (0 or less), the splat becomes completely invisible
    if (bloodage[splatsdrawn] <= 0) {
      fill(196, 42, 42, 0)
    }
    //draws splat using the corresponding stored values in the array
    circle(bloodx[splatsdrawn], bloody[splatsdrawn], bloodsize[splatsdrawn])
    //decreases blood age, meaning it will be more faded next time it is drawn
    bloodage[splatsdrawn]--
    pop()
  }   
}
