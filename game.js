// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   game.js                                            :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: lvasseur <marvin@42.fr>                    +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2019/08/05 19:49:47 by lvasseur          #+#    #+#             //
//   Updated: 2019/08/05 19:49:55 by lvasseur         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

//counter
var boxCounter = 0.0001;
var arcStart = 1.5*Math.PI;
var width = 250
var height = 150
var minuteFontSize = width*(3/20);
var milMinuteFontSize = width*(1/10);
var timerStart = false;
var level = 2;
var color = "black"
var secondColor = 'white'
var Xconseil = 0;
var Yconseil = 0;
var time = 0;
//end counter

//scoring
var score = document.getElementById("canvas1");
var ctx2 = score.getContext("2d");
var theme= 0;
var	compterur_de_coups = 0;

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

const compteur = new Path2D()
compteur.rect(103,105,100,40)
compteur.closePath()

const conseil = new Path2D()
conseil.rect(80,170,115,30)
conseil.closePath()

//draw your shape data to the context
ctx2.fillStyle = "#FFFFFF"
ctx2.fillStyle = "rgba(225,225,225,0)"
ctx2.fill(restartButton)
ctx2.fill(levelButton)
ctx2.fill(themeButton)
ctx2.fill(compteur)
ctx2.lineWidth = 2
ctx2.stroke(restartButton)
ctx2.stroke(levelButton)
ctx2.stroke(themeButton)
ctx2.stroke(compteur)
ctx2.fillStyle = 'black';
ctx2.font = "20px Georgia";
ctx2.fillText(" restart", 465,63);
ctx2.fillText("  level " + level, 465,113);
ctx2.fillText(" theme", 467,163);
ctx2.fillText(compterur_de_coups, 145,133);


//ok-----------------------------------------------------------------------------------------------------
setInterval(function() {
  if (timerStart)
  {
    boxCounter += (1/60);
  }
    var boxMinutes = boxCounter.toString().split(".")[0];
    boxMinutes = time.toFixed(4)//boxMinutes.length == 1 ? "0" + boxMinutes : boxMinutes;
    
    ctx2.clearRect(700, 0, 900, 300);
    
    ctx2.fillStyle = color;
    ctx2.font = minuteFontSize+"px Arial";
    ctx2.fillText(boxMinutes, 805, (height/2) + 25);
    //text
    ctx2.font = "20px Georgia"
    ctx2.fillText("timer in millisecond", 805,55);
    ctx2.font = "30px Verdana";
    //text
    ctx2.font = milMinuteFontSize+"px Arial";
  
    ctx2.beginPath();
  }, 1000/60);
//ok -------------------------------------------------------------------------------------------------

function  onclickmydear()
{  
  if (document.getElementById("PVP").checked == true)
    document.getElementById("IAvsIA").checked = false
}

function  onclickmytotoro()
{  
  if (document.getElementById("IAvsIA").checked == true)
    document.getElementById("PVP").checked = false
}

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
    window.location.reload(true);
  }
  if(ctx2.isPointInPath(levelButton, XY.x, XY.y)) {
    // Do Something with the click
    level++;
    if (level > 10)
      level = 2;
    ctx2.clearRect(405,95,190,25);
    ctx2.fillStyle = secondColor;
    ctx2.fill(levelButton)
    ctx2.fillStyle = color;
    ctx2.font = "20px Georgia";
    ctx2.fillText("  level " + level, 465,113);

  }

  if(ctx2.isPointInPath(themeButton, XY.x, XY.y)) {
    // Do Something with the click
    theme +=1;
    var title = document.getElementById("Title");
    if (theme == 0)
    {
        color = 'black'
        secondColor = 'white'
        title.style.color = '#000000';
        ctx2.fillStyle = secondColor
        ctx2.fill(restartButton)
        ctx2.fill(levelButton)
        ctx2.fill(themeButton)
        ctx2.fillStyle = color;
        ctx2.font = "20px Georgia";
        ctx2.fillText(" restart", 465,63);
        ctx2.fillText("  level " + level, 465,113);
        ctx2.fillText(" theme", 467,163);
        ctx2.fillText(compterur_de_coups, 145,133);
        ctx2.fillStyle = '#000000';
        ctx2.font = "30px Georgia";
        ctx2.fillText("compteur", 90,60);
        document.body.style.backgroundColor = 'white';
        document.body.style.backgroundImage = 'none';
    }
    else if (theme == 1)
    {
        color = 'white'
        secondColor = '#0407A6'
        title.style.color = '#0407A6';
        ctx2.fillStyle = '#0407A6'
        ctx2.fill(restartButton)
        ctx2.fill(levelButton)
        ctx2.fill(themeButton)
        ctx2.fillStyle = color;
        ctx2.font = "20px Georgia";
        ctx2.fillText(" restart", 465,63);
        ctx2.fillText("  level " + level, 465,113);
        ctx2.fillText(" theme", 467,163);
        ctx2.fillText(compterur_de_coups, 145,133);
        ctx2.fillStyle = '#0407A6';
        ctx2.font = "30px Georgia";
        ctx2.fillText("compteur", 90,60);
        document.body.style.backgroundImage = "url('https://media0.giphy.com/media/mX1bWOEGPIAY1yhmKI/giphy.gif')";
    }
    else if (theme == 2)
    {
        secondColor = '#2EA847'
        title.style.color = '#2EA847';
        ctx2.fillStyle = '#2EA847'
        ctx2.fill(restartButton)
        ctx2.fill(levelButton)
        ctx2.fill(themeButton)
        ctx2.fillStyle = 'white';
        ctx2.font = "20px Georgia";
        ctx2.fillText(" restart", 465,63);
        ctx2.fillText("  level " + level, 465,113);
        ctx2.fillText(" theme", 467,163);
        ctx2.fillText(compterur_de_coups, 145,133);
        ctx2.fillStyle = '#2EA847';
        ctx2.font = "30px Georgia";
        ctx2.fillText("compteur", 90,60);
        document.body.style.backgroundImage = "url('https://images.alphacoders.com/477/477025.jpg')";

    }
    else if (theme == 3)
    {
        secondColor = '#FF7930'
        title.style.color = '#FF7930';
        ctx2.fillStyle = '#FF7930'
        ctx2.fill(restartButton)
        ctx2.fill(levelButton)
        ctx2.fill(themeButton)
        ctx2.fillStyle = 'white';
        ctx2.font = "20px Georgia";
        ctx2.fillText(" restart", 465,63);
        ctx2.fillText("  level " + level, 465,113);
        ctx2.fillText(" theme", 467,163);
        ctx2.fillText(compterur_de_coups, 145,133);
        ctx2.fillStyle = '#FF7930';
        ctx2.font = "30px Georgia";
        ctx2.fillText("compteur", 90,60);
        document.body.style.backgroundImage = "url('https://media.giphy.com/media/iikb3dTQ0Skne/giphy.gif')";
    }
    else if (theme == 4)
    {
        secondColor = '#6832E0'
        title.style.color = '#6832E0';
        ctx2.fillStyle = '#6832E0'
        ctx2.fill(restartButton)
        ctx2.fill(levelButton)
        ctx2.fill(themeButton)
        ctx2.fillStyle = 'white';
        ctx2.font = "20px Georgia";
        ctx2.fillText(" restart", 465,63);
        ctx2.fillText("  level " + level, 465,113);
        ctx2.fillText(" theme", 467,163);
        ctx2.fillText(compterur_de_coups, 145,133);
        ctx2.fillStyle = '#6832E0';
        ctx2.font = "30px Georgia";
        ctx2.fillText("compteur", 90,60);
        document.body.style.backgroundImage = "url('https://i.redd.it/c0emei8n03w01.jpg')";
    }
    else if (theme == 5)
    {
        secondColor = '#2EBBF6'
        title.style.color = '#2EBBF6';
        ctx2.fillStyle = '#2EBBF6'
        ctx2.fill(restartButton)
        ctx2.fill(levelButton)
        ctx2.fill(themeButton)
        ctx2.fillStyle = 'white';
        ctx2.font = "20px Georgia";
        ctx2.fillText(" restart", 465,63);
        ctx2.fillText("  level " + level, 465,113);
        ctx2.fillText(" theme", 467,163);
        ctx2.fillText(compterur_de_coups, 145,133);
        ctx2.fillStyle = '#2EBBF6';
        ctx2.font = "30px Georgia";
        ctx2.fillText("compteur", 90,60);
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
    ctx2.fillStyle = color;
    ctx2.font = "30px Georgia";
    ctx2.fillText("compteur", 90,60);
    //text
}
//end scoring

scoring();
