//MOVEMENT - Original artwork or game-like play (creativity) demonstrating understanding of animation and variables (quality)

let count = 0
let x = 0
let y = 0
let z = 0
let rotationx = 0
let rotationy = 0
let rotationz = 0
//The sketch will always start in the bright (non-red/blue) lights state
let LightsOn = true

//I should probably have tried to condense these into smaller 3D arrays, but I didn't, so let's move on
let trailage = []
let hiltcoordx = []
let hiltcoordy = []
let hiltcoordz = []
let hiltpullx = []
let hiltpully = []
let hiltpullz = []
let knifecurvex = []
let knifecurvey = []
let knifecurvez = []
let pointcoordx = []
let pointcoordy = []
let pointcoordz = []
let trailrotationx = []
let trailrotationy = []
let trailrotationz = []
let trailchunksnum = 0


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  //Still hate radians.
  angleMode(DEGREES)
  //Position the camera much farther out in the Z direction
  camera(0, 0, 1000)
  //debugMode()
}


function draw() {

  //Had to google how to do this, allows the trail to fade away the farther from the knife it is
  gl = this._renderer.GL 
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

  background('black');
  frameRate(30)
  strokeWeight(1)
  
  //Manages light state based on whether mouse has been clicked. Lights always start ON.
  if (LightsOn) {
    ambientLight(255,255,255)
  } else {
    //Positioning spotlights
    lightFalloff(0.1,0,0)
    //Blue to the RIGHT and close
    spotLight(0, 0, 255, 250, 0, 500, -0.5, 0, -1, 180, 10)
    //Blue further away, narrower cone and higher concentration, same direction of light
    spotLight(0, 0, 255, 250, 0, -1000, -0.5, 0, 1, 90, 50)
    
    //Red to the LEFT and close
    spotLight(255, 0, 0, -250, 0, 500, 0.5, 0, -1, 180, 10)
    //Red further away, narrower cone and higher concentration, same direction of light
    spotLight(255, 0, 0, -250, 0, -1000, 0.5, 0, 1, 90, 50)
  }
  //Draws the knife in a material that reacts appropriately to the chosen lighting style
  specularMaterial(230, 0.1);

  push()
  translate(x, y, z);
  rotateX(rotationx)
  rotateY(rotationy)
  rotateZ(rotationz)
  let a = 0
  //how indented/sticking out detail of blade is (sense of depth/stop overlapping shapes)
  let b = 0
  let c = 0

  shininess(100)

  //darkest shadow on central blade indent
  beginShape();
  fill(70,70,70)
  vertex(a, b, c+55)
  vertex(a-200, b, c-5)
  bezierVertex(a-200, b, c-5, a-320, b, c-35, a-320, b, c-70)
  bezierVertex(a-320, b, c-30, a-200, b, c, a-200, b, c)
  vertex(a, b, c+60)
  endShape()

  //central blade indent
  b-=1
  beginShape();
  fill(104,104,104)
  vertex(a, b, c+40)
  vertex(a-200, b, c-25)
  bezierVertex(a-230, b, c, a-320, b, c-70, a-320, b, c-70)
  bezierVertex(a-320, b, c-30, a-200, b, c, a-200, b, c)
  vertex(a, b, c+60)
  endShape()

  //I quite honestly can't remember what this is, it's one of the details on the blade though!
  b-=1
  beginShape();
  fill(104,104,104)
  vertex(a, b, c+40)
  vertex(a-200, b, c-25)
  bezierVertex(a-230, b, c, a-320, b, c-70, a-320, b, c-70)
  bezierVertex(a-320, b, c-30, a-200, b, c, a-200, b, c)
  vertex(a, b, c+60)
  endShape()

  //Main blade shape
  b-=1
  beginShape();
  fill(156, 156, 156)
  vertex(a, b, c)
  vertex(a-200, b, c-100)
  bezierVertex(a-250, b, c-50, a-350, b, c-200, a-340, b, c-187)
  bezierVertex(a-380, b, c-20, a-250, b, c+26, a-200, b, c+30)
  vertex(a, b, c+80)
  endShape()

  //Highlighted edge of blade
  b-=1
  beginShape();
  fill(246,246,246)
  vertex(a, b, c)
  vertex(a-200, b, c-100)
  bezierVertex(a-250, b, c-50, a-350, b, c-200, a-350, b, c-200)
  bezierVertex(a-400, b, c, a-250, b, c+36, a-200, b, c+50)
  vertex(a, b, c+100)
  endShape()
  

  //Add the details of the blades current position and rotation to be used in the trail
  hiltcoordx.push(a)
  hiltcoordy.push(b)
  hiltcoordz.push(c)

  hiltpullx.push(a-250)
  hiltpully.push(b)
  hiltpullz.push(c-50)

  knifecurvex.push(a-200)
  knifecurvey.push(b)
  knifecurvez.push(c-100)

  pointcoordx.push(a-350)
  pointcoordy.push(b)
  pointcoordz.push(c-200)

  trailrotationx.push(rotationx)
  trailrotationy.push(rotationy)
  trailrotationz.push(rotationz)

  trailage.push(25)


  trailchunksnum = hiltcoordx.length

  pop()

  //Drawing the trail! I can't really remember how I did this, but it involved so much deleting and restarting when I initially did it code comments seemed like the least of my worries.

  //Iterates through the list of past trail 'chunks' to draw them all
  for(let chunksdrawn = 0; chunksdrawn < trailchunksnum; chunksdrawn ++){
    
    //Calculates how faded each chunk is based on it's 'age' (how long it's been since it was added to the array)
    let trailaged = Math.floor(255 * (trailage[chunksdrawn] / 25))
    trailaged-=100
    
    push()
    strokeWeight(0)
    //Sets the alpha value to it's calculated 'fade' opacity
    fill(255, 255, 255, trailaged)
    ambientMaterial(255,255,255,trailaged)

    //orient the chunk correctly
    rotateX(trailrotationx[chunksdrawn])
    rotateY(trailrotationy[chunksdrawn])
    rotateZ(trailrotationz[chunksdrawn])

    //if the chunk is completely faded, remove it from the arrays to avoid the program running slower over a longer time
    if (trailage[chunksdrawn] == 0) {
      fill(255, 0, 0, 0)
      hiltcoordx.splice(chunksdrawn, 1)
      hiltcoordy.splice(chunksdrawn, 1)
      hiltcoordz.splice(chunksdrawn, 1)

      hiltpullx.splice(chunksdrawn, 1)
      hiltpully.splice(chunksdrawn, 1)
      hiltpullz.splice(chunksdrawn, 1)

      knifecurvex.splice(chunksdrawn, 1)
      knifecurvey.splice(chunksdrawn, 1)
      knifecurvez.splice(chunksdrawn, 1)

      pointcoordx.splice(chunksdrawn, 1)
      pointcoordy.splice(chunksdrawn, 1)
      pointcoordz.splice(chunksdrawn, 1)

      trailage.splice(chunksdrawn, 1)

      trailrotationx.splice(chunksdrawn, 1)
      trailrotationy.splice(chunksdrawn, 1)
      trailrotationz.splice(chunksdrawn, 1)

      trailchunksnum--
      chunksdrawn--


    } else {
      //If it is the most recent chunk, it follows the knife's inner curve
      if (trailchunksnum == chunksdrawn+1) {
        pointcoordz[chunksdrawn]-=8
        
        beginShape()
        vertex(hiltcoordx[chunksdrawn], hiltcoordy[chunksdrawn], hiltcoordz[chunksdrawn])
        vertex(knifecurvex[chunksdrawn], knifecurvey[chunksdrawn], knifecurvez[chunksdrawn])
        bezierVertex(hiltpullx[chunksdrawn], hiltpully[chunksdrawn], hiltpullz[chunksdrawn], pointcoordx[chunksdrawn], pointcoordy[chunksdrawn], pointcoordz[chunksdrawn], pointcoordx[chunksdrawn], pointcoordy[chunksdrawn], pointcoordz[chunksdrawn])
        vertex(pointcoordx[chunksdrawn], pointcoordy[chunksdrawn], pointcoordz[chunksdrawn]-10)
        vertex(hiltcoordx[chunksdrawn], hiltcoordy[chunksdrawn], hiltcoordz[chunksdrawn]-10)
        
        endShape()
        
      //Otherwise, the chunk is just a rectangle
      } else {


        beginShape()
        vertex(hiltcoordx[chunksdrawn], hiltcoordy[chunksdrawn], hiltcoordz[chunksdrawn])
        vertex(pointcoordx[chunksdrawn], pointcoordy[chunksdrawn], pointcoordz[chunksdrawn])
        vertex(pointcoordx[chunksdrawn], pointcoordy[chunksdrawn], pointcoordz[chunksdrawn]-10)
        vertex(hiltcoordx[chunksdrawn], hiltcoordy[chunksdrawn], hiltcoordz[chunksdrawn]-10)
        endShape()
      }
    }

    trailage[chunksdrawn]-=0.25

    
    hiltcoordz[chunksdrawn]-=8

    
  pop()
  }

  push()

  rotateX(rotationx)
  rotateY(rotationy)
  rotateZ(rotationz)

  //Repeat the steps to draw the other side of the knife, this time working outwards from edge highlight to darkest shadow of indent
  b-=1
  beginShape();
  fill(246,246,246)
  vertex(a, b, c)
  vertex(a-200, b, c-100)
  bezierVertex(a-250, b, c-50, a-350, b, c-200, a-350, b, c-200)
  bezierVertex(a-400, b, c, a-250, b, c+36, a-200, b, c+50)
  vertex(a, b, c+100)
  endShape()

  b-=1
  beginShape();
  fill(156, 156, 156)
  vertex(a, b, c)
  vertex(a-200, b, c-100)
  bezierVertex(a-250, b, c-50, a-350, b, c-200, a-340, b, c-187)
  bezierVertex(a-380, b, c-20, a-250, b, c+26, a-200, b, c+30)
  vertex(a, b, c+80)
  endShape()

  b-=1
  beginShape();
  fill(104,104,104)
  vertex(a, b, c+40)
  vertex(a-200, b, c-25)
  bezierVertex(a-230, b, c, a-320, b, c-70, a-320, b, c-70)
  bezierVertex(a-320, b, c-30, a-200, b, c, a-200, b, c)
  vertex(a, b, c+60)
  endShape()

  b-=1
  beginShape();
  fill(70,70,70)
  vertex(a, b, c+55)
  vertex(a-200, b, c-5)
  bezierVertex(a-200, b, c-5, a-320, b, c-35, a-320, b, c-70)
  bezierVertex(a-320, b, c-30, a-200, b, c, a-200, b, c)
  vertex(a, b, c+60)
  endShape()

  pop()

  push()

  rotateX(rotationx)
  rotateY(rotationy)
  rotateZ(rotationz)


  //Draw handle, large long grey box and hilt, shorter wide grey box, both with heavier outlines
  fill(70,70,70)
  shininess(10)
  strokeWeight(5)
  rotateY(-15)
  translate(0,0,50)
  box(30,40,140)
  translate(115,0,0)
  box(250, 20, 100)
  pop()



  //Ensure rotation remains within normal range (repeating every 720 degrees from -360 to 360). Rotation increases each time, so once it reaches 360 it resets to -360.
  if (rotationx == 360) {
    rotationx = -360
  } else {
    rotationx += 2
  }

  if (rotationy == 360) {
    rotationy = -360
  } else {
    rotationy += 2
  }


}

//When mouse clicked, change lights on status so different lighting views can be toggled
function mouseClicked() {
  if (LightsOn == true) {
  LightsOn = false
  } else {
    LightsOn = true
  }
}

//resize background to fill window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
 


