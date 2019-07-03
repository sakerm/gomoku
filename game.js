var lastClicked;
var grid = clickableGrid(19,19,function(el,row,col){
    console.log("You clicked on element:",el);
    console.log("You clicked on row:",row);
    console.log("You clicked on col:",col);

    el.className='clicked';
    timerStart = true;
});

document.body.appendChild(grid);

//counter
var boxCounter = 0.0001;
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var arcStart = 1.5*Math.PI;
var width = 250
var height = 150
var minuteFontSize = width*(3/20);
var milMinuteFontSize = width*(1/10);
var timerStart = false;

setInterval(function() {
if (timerStart)
{
  boxCounter += (1/60);
}
  var boxMinutes = boxCounter.toString().split(".")[0];
  boxMinutes = boxMinutes.length == 1 ? "0" + boxMinutes : boxMinutes;
  var boxMilMinutes = boxCounter.toString().split(".")[1].substring(0, 3);
  ctx.clearRect(0, 0, c.width, c.height);
  
  ctx.font = minuteFontSize+"px Arial";
  ctx.fillText(boxMinutes, (width/2)-(minuteFontSize/1.8), (height/2));
  //text
  ctx.font = "20px Georgia"
  ctx.fillText("timer", 5,20); 
  ctx.font = "30px Verdana";
  //text
  ctx.font = milMinuteFontSize+"px Arial";
  ctx.fillText(boxMilMinutes, (width/2)-(milMinuteFontSize/1.2), (height/2)+(minuteFontSize/1.5));
  ctx.beginPath();
  var arcLength = (boxCounter*2*Math.PI) % (2*Math.PI);
  ctx.arc(width/2, height/2, width/4, arcStart, (2*Math.PI) - (0.5*Math.PI) + arcLength);
  ctx.moveTo(width/2,0);
  ctx.moveTo(0,height/2);
  ctx.stroke();
}, 1000/60);
//end counter

//scoring
var score = document.getElementById("canvas1");
var ctx2 = score.getContext("2d");
var theme= 0;

//button
const restartButton = new Path2D()
restartButton.rect(250, 350, 200, 100)
restartButton.rect(425,30,200,30)
restartButton.closePath()

const levelButton = new Path2D()
levelButton.rect(250, 350, 200, 100)
levelButton.rect(425,80,200,30)
levelButton.closePath()

const themeButton = new Path2D()
themeButton.rect(250, 350, 200, 100)
themeButton.rect(425,130,200,30)
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
ctx2.fillText(" restart", 490,51);
ctx2.fillText("   level", 490,101);
ctx2.fillText(" theme", 492,151);

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
    var elmt = document.getElementById("Title");
    if (theme == 0)
    {
        elmt.style.color = '#000000';
    }
    else if (theme == 1)
    {
        elmt.style.color = '#1D46D5';
        ctx2.fillStyle = '#1D46D5'
        ctx2.fill(restartButton)
        ctx2.fill(levelButton)
        ctx2.fill(themeButton)
        ctx2.fillStyle = 'white';
        ctx2.font = "20px Georgia";
        ctx2.fillText(" restart", 490,51);
        ctx2.fillText("   level", 490,101);
        ctx2.fillText(" theme", 492,151);
        ctx2.fillStyle = '#1D46D5';
        ctx2.font = "30px Georgia";
        ctx2.fillText("score", 120,60);
        ctx2.font = "90px Georgia";
        ctx2.fillText(scoreJ1, 50,140);
        ctx2.font = "90px Georgia";
        ctx2.fillText(":",140,140);
        ctx2.font = "90px Georgia";
        ctx2.fillText(scoreJ2, 203,140);
        ctx.fillStyle = '#1D46D5';
        document.body.style.backgroundImage = "url('https://wallpapercave.com/wp/u9MRcTO.jpg')";
    }
    else if (theme == 2)
    {
        elmt.style.color = '#2EA847';
    }
    else if (theme == 3)
    {
        elmt.style.color = '#FF7930';
    }
    else if (theme == 4)
    {
        elmt.style.color = '#6832E0';
    }
    else if (theme == 5)
    {
        elmt.style.color = '#2EBBF6';
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


//button restart and others

function clickableGrid( rows, cols, callback ){
    var grid = document.createElement('table');
    grid.className = 'grid';
   
    for (var r=0;r<rows;++r){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0;c<cols;++c){
            var cell = tr.appendChild(document.createElement('td'));
            cell.addEventListener('click',(function(el,r,c){
                return function() {
                    //ne peux pas poser plusieurs pieces aux meme endroit
                    if (el.className == "clicked")
                    {
                        alert("you can not put a token");
                        return ;
                    }
                    callback(el,r,c);
                }
            })
            (cell,r,c),false);
        }
    }
    return grid;
}

scoring();