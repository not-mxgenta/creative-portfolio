//MEDIA - Tests knowledge of incorporating external media assets (quality), and shows inventiveness by generating own assets (creativity).

let currentpic = 0

function preload() {
  //load all assets
  BACKGROUNDIMG = loadImage("BACKGROUND.png")
  FILEICON = loadImage("FILEICON.png")
  HDDICON = loadImage("HDDICON.png")
  MER1 = loadImage("MER1.jpg")
  MER2 = loadImage("MER2.jpg")
  MER3 = loadImage("MER3.jpg")
  MER4 = loadImage("MER4.jpg")
  MER5 = loadImage("MER5.jpg")
  MER6 = loadImage("MER6.jpg")
  MER7 = loadImage("MER7.jpg")
  MER8 = loadImage("MER8.jpg")
  MER9 = loadImage("MER9.jpg")
  MER10 = loadImage("MER10.jpg")
  CLICKNOISE = loadSound("CLICK.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  imageMode(CENTER)
  rectMode(CENTER)
  cursor(HAND)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background('white')
}

//when next button is clicked
function NEXTPIC() {
  //play clicking noise
  CLICKNOISE.play()
  //next pic
  currentpic += 1
  //if reaches final pic, cycle round to beginning again
  if (currentpic > 9) {
    currentpic = 0
  }
}

//when prev button is clicked
function PREVPIC() {
  //play clicking noise
  CLICKNOISE.play()
  //previous pic
  currentpic -= 1
  //if reaches first pic, cycle round to end again
  if (currentpic < 0) {
    currentpic = 9
  }
}

function draw() {

  //save ids of all pics in one array, in order
  let picturefolder = [MER1, MER2, MER3, MER4, MER5, MER6, MER7, MER8, MER9, MER10]


  strokeWeight(1)
  background('white');
  //starts coordinates at centre of window
  translate(windowWidth/2, windowHeight/2)
  //windows XP background image fills HEIGHT of window
  image(BACKGROUNDIMG, 0, 0, 0, windowHeight)
  textFont('Tahoma')
  textAlign(CENTER, CENTER)
  //Creates blue 'window' in centre of actual window
  fill(0,85,230)
  rect(0, 0, 600, 500)

  //Creates pale yellow inner part of fake window
  push()
  fill(240, 237, 228)
  //Leaves space for thicker bar at top of window, where details + max/min buttons go
  translate(0, 10)
  rect(0, 0, 590, 475)
  //Creates thin side window containing file explorer details
  fill(220, 217, 208)
  translate(-225, 0)
  rect(0, 0, 140, 475)

  //Highlight bar showing which image is currently selected
  push()
  translate(0, -135)
  //Each piece of text is 15px below the previous. Highlight bar moves down by 15px multiplied by which picture is currently selected (so it will cycle back round when reaching the end/start of the list)
  let selectedimage = (15 * currentpic)
  strokeWeight(1)
  translate(0, selectedimage)
  stroke(180, 177, 168)
  fill(200, 197, 188)
  rect(0, 0, 138, 15)
  pop()

  //List of files on Merlin's PC
  translate(-45, -225)
  textSize(12)
  textAlign(LEFT, CENTER)
  fill('black')
  textStyle(BOLD)
  text(" Merlin's PC", 0, 0)
  textStyle(NORMAL)
  translate(-10, 0)
  image(HDDICON, 0, 0, 40, 40)
  translate(15, 15)
  text("- Downloads", 0, 0)
  translate(0, 15)
  text("- Pictures", 0, 0)
  translate(15, 15)
  text("- Dotty", 0, 0)
  translate(0, 15)
  text("- Elsie", 0, 0)
  translate(0, 15)
  text("- Merlin <3", 0, 0)
  translate(15, 15)
  text("- mermin.jpg", 0, 0)
  translate(0, 15)
  text("- sassy.jpg", 0, 0)
  translate(0, 15)
  text("- cleaning.jpg", 0, 0)
  translate(0, 15)
  text("- ET.jpg", 0, 0)
  translate(0, 15)
  text("- huh.jpg", 0, 0)
  translate(0, 15)
  text("- RAGE.jpg", 0, 0)
  translate(0, 15)
  text("- eepy.jpg", 0, 0)
  translate(0, 15)
  text("- stylish.jpg", 0, 0)
  translate(0, 15)
  text("- clawdia.jpg", 0, 0)
  translate(0, 15)
  text("- snuggled.jpg", 0, 0)
  translate(-30, 15)
  text("- Documents", 0, 0)
  pop()

  //Details in top bar of fake window
  push()
  translate(-286, -238)
  image(FILEICON, 0, 0, 18, 18)
  fill('black')
  textStyle(BOLD)
  text('File Viewer', 45, 0)
  pop()

  //Uses shapes to mimic maximise/minimise/close window buttons
  push()
  translate(288, -238)
  stroke('white')
  strokeWeight(1)
  //exit button
  fill(150, 0, 0)
  square(0, 0, 10)
  //cross within exit button
  fill('white')
  textStyle(BOLD)
  textSize(8)
  text('X', 0, 0)
  //maximise button
  translate(-12, 0)
  fill(0,55,200)
  square(0, 0, 10)
  //maximise symbol
  square(0, 0, 4)
  //minimise button
  translate(-12, 0)
  square(0, 0, 10)
  translate(0, -2)
  //minimise symbol
  text("_", 0, 0)
  pop()

  push()
  translate(75, 0)
  print(currentpic)
  imageused = picturefolder[currentpic]
  //crops image into a square format
  let size = min(imageused.width, imageused.height)
  let displayimage = imageused.get(((imageused.width - size)/2), ((imageused.height - size)/2), size, size)
  //makes all images same/regular size
  displayimage.resize(400, 400)
  image(displayimage, 0, 0)
  pop()

  //creates button at bottom of window to click to the next picture
  let NEXTbutton = createButton('next')
  NEXTbutton.position(windowWidth/2+200, windowHeight/2+220)
  NEXTbutton.style('border-radius', '10px')
  NEXTbutton.mousePressed(NEXTPIC)

  //creates button next to other button to return to previous picture
  let PREVbutton = createButton('prev')
  PREVbutton.position(windowWidth/2+150, windowHeight/2+220)
  PREVbutton.style('border-radius', '10px')
  PREVbutton.mousePressed(PREVPIC)

}




