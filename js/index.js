let app = document.getElementById("app");
document.body.style.cssText = `
    overflow: hidden
`;

let beginningGame = document.createElement("div");
beginningGame.innerText = "Игра Дартс";
beginningGame.style.cssText = `
    text-align: center;
    position: relative;
    top: 180px;
    z-index: 2;
    color: black;
    font-size: 100px; 
    font-family: Segoe Script, sans-serif; 
`;
document.body.appendChild(beginningGame);

let start = document.createElement("div");
start.style.cssText = `
  
    top: calc(50% - ${500 / 2}px); 
    left: calc(50% - ${500 / 2}px);
    z-index: 9; 
    position: fixed;
    border: 5px solid green;
    border-radius: 50%;
`;
document.body.appendChild(start);

let startButton = document.createElement("input");
startButton.type = "button";
startButton.value = "Старт";
startButton.style.cssText = `
    height: 500px;  
    width: 500px;
    font-family: Arial, sans-serif;
    font-size: 100px;
    border-radius: 50%;
    color: #fff;
    background-image: linear-gradient( 90deg, rgb(15,148,26) 0%, rgb(101,193,62) 100%);
    
`;
start.appendChild(startButton);

let sum = 0;
function finish() {
  let finishGame = document.createElement("div");
  finishGame.style.cssText = `
        position: fixed;
        width:100%;
        height:100%;
        z-index: 1;
        background:#fff;
        opacity: 0.5;
        left:0;
        top:0
    `;
  document.body.appendChild(finishGame);
  startButton.addEventListener(
    "click",
    function startGame() {
      finishGame.style.display = "none";
      start.style.display = "none";
      beginningGame.style.display = "none";
      app.style.display = "block";
    },
    false
  );
  startButton.addEventListener(
    "click",
    function playMusic() {
      musicPlay.play();
    },
    false
  );
  startButton.addEventListener(
    "click",
    function countPoints() {
      points.innerText = "";
      sum = 0;
      setTimeout(() => {
        musicPlay.pause();
        finish();
        let getPoints = document.createElement("div");
        getPoints.style.cssText = `
                width: 400px;
                height: 50px;
                background: #0461fc;
                color: white;
                top: 600px; 
                font-family: Segoe Script, sans-serif;
                font-size: 25px; 
                z-index: 9; 
                position: relative;
                border: 1px solid #383838;
                border-radius: 8px;
                text-align: center;
                margin: 0 auto;
        `;
        document.body.appendChild(getPoints);
        app.style.display = "none";
        getPoints.innerText = `Ваш рекорд ${sum} очков`;
      }, 60000);
      setTimeout(function musicPlayFinish() {
        let audioPlayFinish = document.createElement("audio");
        audioPlayFinish.src = "audio/play_finish.mp3";
        audioPlayFinish.loop = true;
        audioPlayFinish.volume = 0.5;
        app.appendChild(audioPlayFinish);
        audioPlayFinish.play();
        setTimeout(() => {
          audioPlayFinish.pause();
        }, 5000);
      }, 60000);
    },
    false
  );
}
finish();
app.style.display = "none";
let musicPlay = document.createElement("audio");
musicPlay.src = "audio/play.mp3";
musicPlay.loop = true;
musicPlay.volume = 0.3;
app.appendChild(musicPlay);
let points = document.createElement("div");
points.style.cssText = `
    width: 100px;
    height: 100px;
    font-size: 30px;
    font-family: Arial, sans-serif;
    position: absolute;
    line-height: 100px;
    top: 10px;
    left: 10px;
    border: 1px solid black;
    border-radius: 50%;
    background: #0461fc;
    color: #fff;
    text-align: center;
    
`;
app.appendChild(points);

let audioDrop = document.createElement("audio");
audioDrop.src = "audio/dartDrop.mp3";
app.appendChild(audioDrop);

function Circle(size, backgroundColor, point, zIndex = 0) {
  let element = document.createElement("div");
  element.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background-color: ${backgroundColor};
    position: absolute;
    top: calc(50% - ${size / 2}px);
    left: calc(50% - ${size / 2}px);
    z-index:${zIndex};
    `;

  element.addEventListener("click", Play, false);
  function Play() {
    audioDrop.play();
  }

  element.addEventListener("click", pointSum, false);
  function pointSum() {
    sum += +`${point}`;
    points.innerHTML = sum;
  }

  this.appendToApp = () => circlesWrapper.appendChild(element);
}
let circlesWrapper = document.createElement("div");
circlesWrapper.style.cssText = `
    width: 400px;
    height: 400px;
    position: absolute;
    // top: calc(50% - ${500 / 2}px);
    // left: calc(50% - ${500 / 2}px)
    `;
app.appendChild(circlesWrapper);

const circles = [
  new Circle(400, "blue", 10),
  new Circle(200, "green", 20, 1),
  new Circle(100, "red", 30, 2)
];

circles.forEach(circle => circle.appendToApp());

function circlesMove() {
  circlesWrapper.style.transition = `1s all`;
  setInterval(() => {
    circlesWrapper.style.top = `${random(200, 500)}px`;
    circlesWrapper.style.left = `${random(300, 700)}px`;
  }, 500);
}
circlesMove();

function Bird(size, imageScr, intervalTime, zIndex = 5) {
  let element = document.createElement("img");
  element.src = imageScr;
  element.style.cssText = `
        position: absolute;    
        width: ${size}px;
        z-index: ${zIndex}px;
        transition: ${intervalTime / 1000}s all;
    `;
  let random = (min, max) => Math.round(Math.random() * (max - min) + min);

  this.appendToApp = () => app.appendChild(element);
  this.startInterval = () => {
    setInterval(() => {
      element.style.top = `${random(0, window.innerHeight - size)}px`;
      element.style.left = `${random(0, window.innerWidth - size)}px`;
    }, intervalTime);
  };
}

let birds = [];
let random = (min, max) => Math.round(Math.random() * (max - min) + min);
for (let i = 0; i < 5; i++) {
  birds.push(new Bird(random(50, 250), "img/bird.gif", random(50, 2000)));
}
birds.forEach(bird => bird.appendToApp());
birds.forEach(bird => bird.startInterval());

let img = document.createElement("img");
img.src = "dart.png";
img.style.zIndex = 10;
img.style.width = "60px";
img.style.position = "absolute";
app.appendChild(img);

let style = document.createElement("style");
style.innerText = `
html,
body{
    hieght:100%;
}
body{
    margin: 0
}
body:hover{
cursor:none;
}
`;
document.head.appendChild(style);

let dartDrop = false;

window.onmousemove = event => {
  if (!dartDrop) {
    img.style.top = `${event.clientY - 80}px`;
    img.style.left = `${event.clientX - 80}px`;
  }
};

window.onclick = event => {
  if (!dartDrop) {
    dartDrop = false;
  }
  img.src = "img/dartDrop.gif";
  setTimeout(() => {
    img.src = "img/dart.png";
  }, 300);
};
