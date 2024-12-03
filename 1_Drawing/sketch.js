//DRAWING - illustrates creative experimentation (creativity) and technical understanding (quality) of pixel coordinates, use of colour, and shape.

function setup() {
  createCanvas(500, 500, WEBGL);
  //debugMode()
}

function draw() {
  background(112, 20, 44);
  //changes from radians to degrees for objects such as ovals (because radians suck)
  angleMode(DEGREES)


  //adding torso/shoulders
  push()
  //creating basic shape in black, working on the right side first
  fill('black')
  beginShape();
  //start of straight line down center of body
  vertex(0, 150)
  //adjusts based on window size
  //will always fill bottom of window, as origin in middle therefore lower part of window is always /2 window size
  vertex(0, (windowHeight/2))
  //outer shoulder also adjustable based on window size
  vertex(125, (windowHeight/2))
  //shoulder slants, starting 1/4 of the window's total height from the origin
  vertex(125, (windowHeight/4))
  vertex(0, 100)
  endShape()
  pop()

  //left side of body
  fill('black')
  //repeat of above process, mirrored in the y-axis 
  beginShape();
  vertex(0, 150)
  vertex(0, (windowHeight/2))
  vertex(-125, (windowHeight/2))
  vertex(-125, (windowHeight/4))
  vertex(0, 100)
  endShape()
  pop()

  //Adding background of hood
  push()
  fill(25, 25, 25)
  beginShape();
  //Curve of hood over ghostface's head
  vertex(-100,50);
  bezierVertex(-210, -275, 210, -275, 100, 50 );
  endShape();
  //triangle to fill in closed part of hood around neck
  triangle(-100, 50, 100, 50, 0, 150)
  pop()

  
  //making ghostface's mask
  //all elements should be symmetrical across the y-axis

  //sets the background of the mask to white
  fill('white')
  //removes outlining
  strokeWeight(0)

  //top of head shape
  beginShape();
  //starting point of bezier curve - the left side where the forehead connects to the cheek
  vertex(-70,0);
  //connects the curve to the other cheek, and sizes/angles appropriately to fit the image
  bezierVertex(-200, -250, 200, -250, 70, 0 );
  endShape();

  //'cheek' shapes
  beginShape();
  //right cheek
  //anchor point directly across
  curveVertex(-100, -75);
  //starting point connecting to head
  curveVertex(100, -75);
  //ending point connecting to chin
  curveVertex(75, 0);
  //anchor point across and angled upwards from end of curve
  curveVertex(-100, -25);

  //left cheek
  //repeats as for right cheek, but mirrored across y-axis
  curveVertex(100, -25);
  curveVertex(-75, 0);
  //starting at chin going to forehead unlike the right cheek (forehead to chin)
  curveVertex(-100, -75);
  curveVertex(100, -75);
  endShape();

  //mouth shape
  beginShape();
  //creates a long curve connecting the two cheek shapes
  curveVertex(100, -1250);
  curveVertex(75, -25);
  curveVertex(-75, -25);
  curveVertex(-100, -1250);
  endShape();

  //facial features coloured in black
  fill('black')

  //mouth
  //simple ellipse as base
  ellipse(0, 50, 60, 125)
  beginShape();
  //use curve to elongate mouth further and make it appear pointier at the top
  vertex(-30,50);
  bezierVertex(-30, -50, 30, -50, 30, 50);
  endShape();

  //Left Eye
  //uses 4 mapped points as guides, connects 3/4 with black bezier curves
  beginShape();
  vertex(-65, -100);
  bezierVertex(-65, -130, -20, -130, -20, -100);
  vertex(-20, -100);
  bezierVertex(-20, -100, -20, -20, -75, -20);
  vertex(-75, -20);
  bezierVertex(-100, -20, -100, -60, -85, -60);
  endShape();

  //finishes the eye using a white curve to maintain the curved shape of the eye (otherwise one side would be flat/straight)
  fill('white');
  beginShape();
  vertex(-85, -60);
  bezierVertex(-65, -60, -65, -100, -65, -100);
  endShape();

  fill('black')
  //Right Eye
  //repeat left eye, mirrored across y-axis
  beginShape();
  vertex(65, -100);
  bezierVertex(65, -130, 20, -130, 20, -100);
  vertex(20, -100);
  bezierVertex(20, -100, 20, -20, 75, -20);
  vertex(75, -20);
  bezierVertex(100, -20, 100, -60, 85, -60);
  endShape();

  fill('white');
  beginShape();
  vertex(85, -60);
  bezierVertex(65, -60, 65, -100, 65, -100);
  endShape();

  fill('black')
  //nose
  //start a drawing group
  push()
  //move the origin to where the right nostril will center on
  translate(10, -40)
  //rotate the axis 45 degrees as ghostface's nose is slanted
  rotate(45)
  //create a stretched ellipse for the right nostril
  ellipse(0, 0, 40, 20)
  //reset the rotation and origin back to 'standard'
  pop()
  push()
  //repeat the same process in a new drawing group, mirrored across the y-axis
  translate (-10, -40)
  rotate(-45)
  ellipse(0, 0, 40, 20)
  pop()

  //adding the front of the hood
  push()
  fill('black')
  beginShape()
  //curve over top of head
  vertex(-100,50);
  bezierVertex(-200, -260, 200, -260, 100, 50 );
  vertex(150, 50)
  bezierVertex(200, -325, -200, -325, -150, 50 );
  endShape()
  //triangles to connect curve of hood to chin
  triangle(-100,50, -150,50, 0,150)
  triangle(150,50, 100,50, 0,150)

  //adding details
  //Darker Highlight on Left
  push()
  fill(42, 42, 42)
  beginShape();
  vertex(-120, (windowHeight/2))
  vertex(-120, (windowHeight/4))
  vertex(-100, (windowHeight/2))
  endShape()
  pop()

  //Brighter Highlight on Left
  push()
  fill('white')
  beginShape();
  vertex(-120, (windowHeight/2))
  vertex(-120, (windowHeight/4)+40)
  vertex(-115, (windowHeight/2))
  endShape()
  pop()

  //Darker Highlight on Right
  push()
  fill(42, 42, 42)
  beginShape();
  vertex(120, (windowHeight/2))
  vertex(120, (windowHeight/4))
  vertex(100, (windowHeight/2))
  endShape()
  pop()

  //Brighter Highlight on Right
  push()
  fill('white')
  beginShape();
  vertex(120, (windowHeight/2))
  vertex(120, (windowHeight/4)+40)
  vertex(115, (windowHeight/2))
  endShape()
  pop()

  
  push()
  //Darker Highlight on Hood
  fill(42,42,42)
  beginShape()
  vertex(-140,-100);
  bezierVertex(-80, -260, -40, -170, -60, -180 );
  endShape()
  push()
  //Brighter Highlight on Hood
  fill('white')
  beginShape()
  vertex(-140,-100);
  bezierVertex(-80, -240, -40, -150, -100, -150);
  endShape()
  push()
  //Cleaning up Highlight Shapes
  fill('black')
  beginShape()
  vertex(-140,-100);
  vertex(-60, -210);
  vertex(-40, -180);
  vertex(-85, -150);
  vertex(-120, -100);
  endShape()


}

