//counter
var boxCounter = 0.0001;
var arcStart = 1.5*Math.PI;
var width = 250
var height = 150
var minuteFontSize = width*(3/20);
var milMinuteFontSize = width*(1/10);
var timerStart = false;
//end counter

//scoring
var score = document.getElementById("canvas1");
var ctx2 = score.getContext("2d");
var theme= 0;

//button
const restartButton = new Path2D()
restartButton.rect(400,42,200,30)
restartButton.closePath()

const levelButton = new Path2D()
levelButton.rect(400,92,200,30)
levelButton.closePath()

const themeButton = new Path2D()
themeButton.rect(400,142,200,30)
themeButton.closePath()

//draw your shape data to the context
ctx2.fillStyle = "#FFFFFF"
ctx2.fillStyle = "rgba(225,225,225,0.5)"
ctx2.fill(restartButton)
ctx2.fill(levelButton)
ctx2.fill(themeButton)
ctx2.lineWidth = 2
//ctx2.strokeStyle = "#000000"
ctx2.stroke(restartButton)
ctx2.stroke(levelButton)
ctx2.stroke(themeButton)
ctx2.fillStyle = 'black';
ctx2.font = "20px Georgia";
ctx2.fillText(" restart", 465,63);
ctx2.fillText("   level", 465,113);
ctx2.fillText(" theme", 467,163);

//ok-----------------------------------------------------------------------------------------------------
setInterval(function() {
  if (timerStart)
  {
    boxCounter += (1/60);
  }
    var boxMinutes = boxCounter.toString().split(".")[0];
    boxMinutes = boxMinutes.length == 1 ? "0" + boxMinutes : boxMinutes;
    var boxMilMinutes = boxCounter.toString().split(".")[1].substring(0, 3);
    ctx2.clearRect(700, 0, 900, 300);
    
    ctx2.font = minuteFontSize+"px Arial";
    ctx2.fillText(boxMinutes, 805, (height/2) + 25);
    //text
    ctx2.font = "20px Georgia"
    ctx2.fillText("timer", 805,55);
    ctx2.font = "30px Verdana";
    //text
    ctx2.font = milMinuteFontSize+"px Arial";
    ctx2.fillText(boxMilMinutes, 805, (height/2)+(minuteFontSize/1.5) + 30);
    ctx2.beginPath();
    var arcLength = (boxCounter*2*Math.PI) % (2*Math.PI);
    ctx2.arc(825, 90, width/4, arcStart, (2*Math.PI) - (0.5*Math.PI) + arcLength);
    ctx2.moveTo(width/2,0);
    ctx2.moveTo(0,height/2);
    ctx2.stroke();
  }, 1000/60);
//ok -------------------------------------------------------------------------------------------------

function getXY(score, event){ //adjust mouse click to score coordinates
  const rect = score.getBoundingClientRect()
  const y = event.clientY - rect.top
  const x = event.clientX - rect.left
  return {x:x, y:y}
}

document.addEventListener("click",  function (e) {
  const XY = getXY(score, e)
  //use the shape data to determine if there is a collision
  if(ctx2.isPointInPath(restartButton, XY.x, XY.y)) {
    // Do Something with the click
    alert("clicked in restartButton");
  }
  if(ctx2.isPointInPath(levelButton, XY.x, XY.y)) {
    // Do Something with the click
    alert("clicked in levelButton");
  }
  if(ctx2.isPointInPath(themeButton, XY.x, XY.y)) {
    // Do Something with the click
    theme +=1;
    var title = document.getElementById("Title");
    if (theme == 0)
    {
        title.style.color = '#000000';
        ctx2.fillStyle = 'white'
        ctx2.fill(restartButton)
        ctx2.fill(levelButton)
        ctx2.fill(themeButton)
        ctx2.fillStyle = 'black';
        ctx2.font = "20px Georgia";
        ctx2.fillText(" restart", 465,63);
        ctx2.fillText("   level", 465,113);
        ctx2.fillText(" theme", 467,163);
        ctx2.fillStyle = '#000000';
        ctx2.font = "30px Georgia";
        ctx2.fillText("score", 120,60);
        ctx2.font = "90px Georgia";
        ctx2.fillText(scoreJ1, 50,140);
        ctx2.font = "90px Georgia";
        ctx2.fillText(":",140,140);
        ctx2.font = "90px Georgia";
        ctx2.fillText(scoreJ2, 203,140);
        document.body.style.backgroundColor = 'white';
        document.body.style.backgroundImage = 'none';
    }
    else if (theme == 1)
    {
        title.style.color = '#0407A6';
        ctx2.fillStyle = '#0407A6'
        ctx2.fill(restartButton)
        ctx2.fill(levelButton)
        ctx2.fill(themeButton)
        ctx2.fillStyle = 'white';
        ctx2.font = "20px Georgia";
        ctx2.fillText(" restart", 465,63);
        ctx2.fillText("   level", 465,113);
        ctx2.fillText(" theme", 467,163);
        ctx2.fillStyle = '#0407A6';
        ctx2.font = "30px Georgia";
        ctx2.fillText("score", 120,60);
        ctx2.font = "90px Georgia";
        ctx2.fillText(scoreJ1, 50,140);
        ctx2.font = "90px Georgia";
        ctx2.fillText(":",140,140);
        ctx2.font = "90px Georgia";
        ctx2.fillText(scoreJ2, 203,140);
        document.body.style.backgroundImage = "url('https://media0.giphy.com/media/mX1bWOEGPIAY1yhmKI/giphy.gif')";
    }
    else if (theme == 2)
    {
        title.style.color = '#2EA847';
        ctx2.fillStyle = '#2EA847'
        ctx2.fill(restartButton)
        ctx2.fill(levelButton)
        ctx2.fill(themeButton)
        ctx2.fillStyle = 'white';
        ctx2.font = "20px Georgia";
        ctx2.fillText(" restart", 465,63);
        ctx2.fillText("   level", 465,113);
        ctx2.fillText(" theme", 467,163);
        ctx2.fillStyle = '#2EA847';
        ctx2.font = "30px Georgia";
        ctx2.fillText("score", 120,60);
        ctx2.font = "90px Georgia";
        ctx2.fillText(scoreJ1, 50,140);
        ctx2.font = "90px Georgia";
        ctx2.fillText(":",140,140);
        ctx2.font = "90px Georgia";
        ctx2.fillText(scoreJ2, 203,140);
        document.body.style.backgroundImage = "url('https://images.alphacoders.com/477/477025.jpg')";

    }
    else if (theme == 3)
    {
        title.style.color = '#FF7930';
        ctx2.fillStyle = '#FF7930'
        ctx2.fill(restartButton)
        ctx2.fill(levelButton)
        ctx2.fill(themeButton)
        ctx2.fillStyle = 'white';
        ctx2.font = "20px Georgia";
        ctx2.fillText(" restart", 465,63);
        ctx2.fillText("   level", 465,113);
        ctx2.fillText(" theme", 467,163);
        ctx2.fillStyle = '#FF7930';
        ctx2.font = "30px Georgia";
        ctx2.fillText("score", 120,60);
        ctx2.font = "90px Georgia";
        ctx2.fillText(scoreJ1, 50,140);
        ctx2.font = "90px Georgia";
        ctx2.fillText(":",140,140);
        ctx2.font = "90px Georgia";
        ctx2.fillText(scoreJ2, 203,140);
        document.body.style.backgroundImage = "url('https://media.giphy.com/media/iikb3dTQ0Skne/giphy.gif')";
    }
    else if (theme == 4)
    {
        title.style.color = '#6832E0';
        ctx2.fillStyle = '#6832E0'
        ctx2.fill(restartButton)
        ctx2.fill(levelButton)
        ctx2.fill(themeButton)
        ctx2.fillStyle = 'white';
        ctx2.font = "20px Georgia";
        ctx2.fillText(" restart", 465,63);
        ctx2.fillText("   level", 465,113);
        ctx2.fillText(" theme", 467,163);
        ctx2.fillStyle = '#6832E0';
        ctx2.font = "30px Georgia";
        ctx2.fillText("score", 120,60);
        ctx2.font = "90px Georgia";
        ctx2.fillText(scoreJ1, 50,140);
        ctx2.font = "90px Georgia";
        ctx2.fillText(":",140,140);
        ctx2.font = "90px Georgia";
        ctx2.fillText(scoreJ2, 203,140);
        document.body.style.backgroundImage = "url('https://i.redd.it/c0emei8n03w01.jpg')";
    }
    else if (theme == 5)
    {
        title.style.color = '#2EBBF6';
        ctx2.fillStyle = '#2EBBF6'
        ctx2.fill(restartButton)
        ctx2.fill(levelButton)
        ctx2.fill(themeButton)
        ctx2.fillStyle = 'white';
        ctx2.font = "20px Georgia";
        ctx2.fillText(" restart", 465,63);
        ctx2.fillText("   level", 465,113);
        ctx2.fillText(" theme", 467,163);
        ctx2.fillStyle = '#2EBBF6';
        ctx2.font = "30px Georgia";
        ctx2.fillText("score", 120,60);
        ctx2.font = "90px Georgia";
        ctx2.fillText(scoreJ1, 50,140);
        ctx2.font = "90px Georgia";
        ctx2.fillText(":",140,140);
        ctx2.font = "90px Georgia";
        ctx2.fillText(scoreJ2, 203,140);
        document.body.style.backgroundImage = "url('https://natewren.com/themes/wallpaper2/radpack/radpack_8.jpg')";
        theme = -1;
    }
  }
}, false)
//button

var scoreJ1 = 0;
var scoreJ2 = 0;
function scoring() {
    //text
    ctx2.fillStyle = 'black';
    ctx2.font = "30px Georgia";
    ctx2.fillText("score", 120,60);
    ctx2.font = "90px Georgia";
    ctx2.fillText(scoreJ1, 50,140);
    ctx2.font = "90px Georgia";
    ctx2.fillText(":",140,140);
    ctx2.font = "90px Georgia";
    ctx2.fillText(scoreJ2, 203,140);
    //text
}
//end scoring

scoring();