function	game() {

var board = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var current_player = 1;
var opponent = 2;
var	ia = false;
var	game_canvas = document.getElementById("game");
var	x;
var y;
var	playing = true;
var	ctx = game_canvas.getContext("2d");
var w = game_canvas.width;
var h = game_canvas.height;

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    y = event.clientY - rect.top;
    x = event.clientX - rect.left;
    x = Math.trunc(x / (w/19));
    y = Math.trunc(y / (h/19));
}

function drawCanvas()
{
	for (var i = 0; i < 18; i++)
	{
		ctx.beginPath();
		ctx.moveTo(w/19 + i*(w/19), 0);
		ctx.lineTo(w/19 + i*(w/19), h);
		ctx.moveTo(0, h/19 + i*(h/19));
		ctx.lineTo(w, h/19 + i*(h/19));
		ctx.stroke();
	}
}

function deleteCase(xx, yy)
{
	ctx.beginPath();
	ctx.strokeStyle = "white";
	ctx.fillStyle = "white";
	ctx.arc(xx*(w/19)+(w/19/2), yy*(h/19)+(h/19/2), w/19/2.3, 0, 2*Math.PI);
	ctx.fill();
	ctx.stroke();
	ctx.strokeStyle = "black";
	board[xx][yy] = 0;
}

function checkCapture()
{
	var addx = -1;
	var addy = -1;

	for (var i = 0; i < 8; i++)
	{
		switch (i) {
			case 0:
				break ;
			case 1:
			case 2:
				addx++;
				break ;
			case 3:
			case 4:
				addy++;
				break ;
			case 5:
			case 6:
				addx--;
				break ;
			case 7:
				addy--;
				break ;
		}
		if (x <= 18-3*addx && y <= 18-3*addy && x >= 3*Math.abs(addx) && y >= 3*Math.abs(addy)
				&& board[x + 3*addx][y + 3*addy] == current_player
				&& board[x + addx][y + addy] == opponent
				&& board[x + 2*addx][y + 2*addy] == opponent)
		{
			deleteCase(x + addx, y + addy);
			deleteCase(x + 2*addx, y + 2*addy);
		}
	}
}

function checkWin()
{
	var addx = -1;
	var addy = -1;

	for (var i = 0; i < 8; i++)
	{
		switch (i) {
			case 0:
				break ;
			case 1:
			case 2:
				addx++;
				break ;
			case 3:
			case 4:
				addy++;
				break ;
			case 5:
			case 6:
				addx--;
				break ;
			case 7:
				addy--;
				break ;
		}
		if (x <= 18-4*addx && y <= 18-4*addy && x >= 4*Math.abs(addx) && y >= 4*Math.abs(addy)
				&& board[x + 4*addx][y + 4*addy] == current_player
				&& board[x + 3*addx][y + 3*addy] == current_player
				&& board[x + 2*addx][y + 2*addy] == current_player
				&& board[x + 1*addx][y + 1*addy] == current_player)
			alert("player " + current_player.toString(10) + " won !");
	}
}

function detectThree()
{
	var	nb = 0;
	var player = 1;
	var opp = 0;
	var addx = -1;
	var addy = -1;

	for (var i = 0; i < 8; i++)
	{
		switch (i) {
			case 0:
				break ;
			case 1:
			case 2:
				addx++;
				break ;
			case 3:
			case 4:
				addy++;
				break ;
			case 5:
			case 6:
				addx--;
				break ;
			case 7:
				addy--;
				break ;
		}
		if (x <= 18-4*addx && y <= 18-4*addy && x >= 4*Math.abs(addx) && y >= 4*Math.abs(addy))
		{
			if (x - addx > 0 && x - addx <= 18 && board[x - addx][y - addy] != opponent) // != opponent ou != 0 a voir si 4 ça comptre comme un three
			{
				for (var j = 0; j < 4; j++)
				{
					if (board[x + j*addx + addx][y + j*addy + addy] == current_player)
						player++;
					if (board[x + j*addx + addx][y + j*addy + addy] == opponent)
						opp++;
					if (j == 3 && board[x + j*addx + addx][y + j*addy + addy] != 0)
						opp++;
				}
				if (player >= 3 && opp == 0)
					nb++;
				player = 1;
				opp = 0;
			}
		}
	}
	if (nb != 0)
		alert(nb);
	return (nb);
}

function click()
{
	timerStart = true;
	ctx.beginPath();
	ctx.arc(x*(w/19)+(w/19/2), y*(h/19)+(h/19/2), w/19/2.3, 0, 2*Math.PI);
	if (current_player == 1)
		ctx.fillStyle = "blue";
	else
		ctx.fillStyle = "red";
	ctx.fill();
	ctx.stroke();
	board[x][y] = current_player;
	checkWin();
	checkCapture();
	if (current_player == 1)
	{
		current_player = 2;
		opponent = 1;
	}
	else
	{
		current_player = 1;
		opponent = 2;
	}
}

drawCanvas();
game_canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(game_canvas, e);
    if ((current_player == 1 || ia == false) && playing == true && board[x][y] == 0 && detectThree() <= 1)
    	click();
});

}

game();
