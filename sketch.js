  /*

  Kemal Bora Sağlamer

  Creative Coding Fall2020 @Yasar University VCD

  Instructor: Ceren Kayalar

  Brief: A escape game that has nonlinear narratives and voice recognition (please open in Google Chrome)

  Technical Info:
  User can move character aroun the canvas with left and right arrow keys also collects the items that
  he/she needs when he escape because outside of the house is snowy and windy and he/she has short time
  to live

  Additional Resources:
  HOME AND STUFF
  <a href="https://www.freepik.com/vectors/wood">Wood vector created by upklyak - www.freepik.com</a>
  Character
  <a href="https://www.freepik.com/vectors/design">Design vector created by pikisuperstar - www.freepik.com</a>
  Code tutorials
  For making objects interactive: https://www.youtube.com/watch?v=Rk-_syQluvc&t=802s
  For speech recognition: https://www.youtube.com/watch?v=v0CHV33wDsI    https://www.youtube.com/watch?v=q_bXBcmfTJM  https://idmnyu.github.io/p5.js-speech/    https://www.youtube.com/watch?v=RrjOp2tJ3VE
  For time counter: https://www.youtube.com/watch?v=SpfJUlSusj0




  Inspirations:
  The Allice Story that we made in the class
  The Zork game and actually browser games
  The Connected Worlds project at New York Hall of Science

  Github Pages Link:

  */


  //------------------------------------------------------------------------------------------------------------------------------------------------


  let imgRoom, imgBoots, imgBed, imgFire, imgHat, imgHorns,
    imgMirror, imgNightstand, imgSeat, imgWallCarpet, imgBrokenDoor;

  let manRegular, manReaching, manWithKey, manRegularLeft, manReachingLeft, manWithKeyleft;

  let manX = 300;
  let manY = 150;

  let hornX=5;
  let hornY=80;

  let imgMan;

  var boots = false;
  var hat = false;
  var fire = false;
  var cam = false;
  var brokenDoor = false;

  var capture;

  var totalTime;
  var timeLimit = 70;

  let speechRec;
  let continuous = true;
  let interim = false;
  let morale = 0;
  var moraleBuff= false;

  function preload() { //preload start
    imgRoom = loadImage("Images/room.png");
    imgBoots = loadImage("Images/boots.png");
    imgBed = loadImage("Images/bed.png");
    imgFire = loadImage("Images/Fire.png");
    imgHat = loadImage("Images/hat.png");
    imgHorns = loadImage("Images/horns.png");
    imgMirror = loadImage("Images/mirror.png");
    imgNightstand = loadImage("Images/nightstand.png");
    imgSeat = loadImage("Images/seat.png");
    imgWallCarpet = loadImage("Images/wallCarpet.png");

    imgManRight = loadImage("Images/manRight.png");
    imgManLeft = loadImage("Images/manLeft.png");

    manReaching = loadImage("Images/manReaching.png");
    manWithKey = loadImage("Images/manWithKey.png");

    manReachingLeft = loadImage("Images/manReachingLeft.png");
    manWithKeyleft = loadImage("Images/manWithKeyLeft.png");

   imgBrookenDoor = loadImage("Images/brokenDoor.png");

    speechRec = new p5.SpeechRec('en-US', gotSpeech);

    speechRec.start(continuous, interim);
  } //preload end

  function setup() { //setup start
    createCanvas(1100, 600);
    imgMan = imgManRight;
    capture = createCapture(VIDEO);
    capture.size(960, 720);
    capture.hide();



  } //setup end

  function draw() { //draw start
    background(0);
    image(imgRoom, -110, -10);
    image(imgBed, 120, 230);
    image(imgNightstand, 530, 315);
    image(imgWallCarpet, 135, 70);

    image(imgMirror, -20, 150);
    image(imgSeat, 900, 390);

console.log(morale);
    /*  if (boots == false) {
        image(imgBoots, 310, 350);
      }*/
    if (boots) {
      image(imgBoots, 1000, 50);
    } else image(imgBoots, 310, 350);


    /*if (hat == false) {
      image(imgHat, 520, 170);
    }*/
    if (hat) {
      image(imgHat, 1010, 115);
    } else image(imgHat, 520, 170);







  noFill();
  stroke(255);
  //rect(5,190,100,100);
  if (fire) {
    image(imgFire, 808, 305);
    noTint();
  } else {
    image(imgFire, 808, -305);
    tint(0, 0, 200);
  }
  //if (fire== false){tint(0,0,200) /*text(light the fireplace,50,700)*/;}
  //else {noTint();}


  //if (keyIsPressed) man;
  image(imgMan, manX, manY);
  if (keyCode == LEFT_ARROW) {
    imgMan = imgManLeft;
  } else if (keyCode == RIGHT_ARROW) {
    imgMan = imgManRight;
  }

  if (keyIsPressed && keyCode == LEFT_ARROW && manX > 0) {
    manX -= 5;
  }


  if (keyIsPressed && keyCode == RIGHT_ARROW && manX < 900 - imgMan.width) {
    manX += 5;
  }

  image(imgHorns, hornX, hornY);

totalTime=millis();

  if (morale==3){
totalTime= int(totalTime/1000);
text('TIME LEFT:',700,height-50);
text(timeLimit-totalTime,1000,height-50);
fill(255,0,0);
hornX=manX-5;
hornY=manY-30;
moraleBuff= true;
}
if (brokenDoor) {
image(imgBrokenDoor, 630, 100);

}

  //if (manX>=900){manX+=0;}
  if (cam) {
    image(capture, 0, 0);
  } else image(capture, 0, -1000);
  console.log(cam + ' ' + fire);

  if (manX<=150 && manX>=0) {
    cam = true;
    }
    else {cam = false;}

  if (cam) {
    textSize(50);
    text('Motivate yourself',50,550);}
 if (timeLimit=== 0) {
   fill(0);
  rect(0,0,width,height);
  fill(255);
  text ('YOU LOSE', width/2,height/2);}
  } //draw end

  function mouseReleased() { //mousePressed Start
    //fire
    if (moraleBuff= true && mouseX >= 835 && mouseX <= 875 && mouseY >= 305 && mouseY <= 367 && manX > 750 && manX < 900) {
      fire = !fire;
    } //fire

    //boots
    if (mouseX >= 310 && mouseX <= 355 && mouseY >= 350 && mouseY <= 400 && manX >= 150 && manX < 400) {
      boots = true;
    } else if (mouseX >= 1000 && mouseX <= 1045 && mouseY >= 50 && mouseY <= 100) {
      boots = false;
    } //boots

    //hat
    if (mouseX >= 520 && mouseX <= 550 && mouseY >= 170 && mouseY <= 220 && manX >= 400 && manX < 650) {
      hat = true;
    } else if (mouseX >= 1010 && mouseX <= 1040 && mouseY >= 115 && mouseY <= 165) {
      hat = false;
    } //hat
//rect(630,100,150,280);
    if (moraleBuff && mouseX >= 630 && mouseX <= 780 && mouseY >= 100 && mouseY <= 150) {
      brokenDoor=true;
      //image(imgBrokenDoor, 630, 100);

    }


    //rect(5,190,100,100);

  } //mousePressed End

  function gotSpeech() {

    if (speechRec.resultValue) {

      console.log(speechRec.resultString);
      if (speechRec.resultString.includes('you can do it' || 'you got this' || 'you are the best')) {
        if (cam)
          morale++;

      }

    }
}
