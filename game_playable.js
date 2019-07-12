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
	ctx.arc(xx*(w/19)+(w/19/2), yy*(h/19)+(h/19/2), w/19/2.2, 0, 2*Math.PI);
	ctx.fill();
	ctx.stroke();
	ctx.strokeStyle = "black";
	board[xx][yy] = 0;
}

function checkCapture()
{
	if (x <= 15 && board[x + 3][y] == current_player && board[x + 1][y] == opponent && board[x + 2][y] == opponent) // droite
	{
		deleteCase(x + 1, y);
		deleteCase(x + 2, y);
	}
	if (x >= 3 && board[x - 3][y] == current_player && board[x - 1][y] == opponent && board[x - 2][y] == opponent) // gauche
	{
		deleteCase(x - 1, y);
		deleteCase(x - 2, y);
	}
	if (y <= 15 && board[x][y + 3] == current_player && board[x][y + 2] == opponent && board[x][y + 1] == opponent) // bas
	{
		deleteCase(x, y + 1);
		deleteCase(x, y + 2);
	}
	if (y >= 3 && board[x][y - 3] == current_player && board[x][y - 2] == opponent && board[x][y - 1] == opponent) // haut
	{
		deleteCase(x, y - 1);
		deleteCase(x, y - 2);
	}
	if (x <= 15 && y >= 3 && board[x + 3][y - 3] == current_player && board[x + 1][y - 1] == opponent && board[x + 2][y - 2] == opponent) // haut droite
	{
		deleteCase(x + 1, y - 1);
		deleteCase(x + 2, y - 2);
	}
	if (x >= 3 && y >= 3 && board[x - 3][y - 3] == current_player && board[x - 1][y - 1] == opponent && board[x - 2][y - 2] == opponent) // haut gauche
	{
		deleteCase(x - 1, y - 1);
		deleteCase(x - 2, y - 2);
	}
	if (x >= 3 && y <= 15 && board[x - 3][y + 3] == current_player && board[x - 1][y + 1] == opponent && board[x - 2][y + 2] == opponent) // bas gauche
	{
		deleteCase(x - 1, y + 1);
		deleteCase(x - 2, y + 2);
	}
	if (x <= 15 && y <= 15 && board[x + 3][y + 3] == current_player && board[x + 1][y + 1] == opponent && board[x + 2][y + 2] == opponent) // bas droite
	{
		deleteCase(x + 1, y + 1);
		deleteCase(x + 2, y + 2);
	}
}

function fiveInRow(j, k, xx, yy)
{
	var count = 0;

	for (var i = 0; i < 19; i++)
	{
		if (board[xx + i*j][yy + i*k] == current_player)
			count++;
		else
			count = 0;
		if (count == 5)
			return true;
	}
	return false;
}

function fiveInRowDiag1()
{
	var	h = 0;
	var count = 0;

	while (x + h > 0 && y + h > 0)
		h--;
	while (x + h < 19 && y + h < 19)
	{
		if (board[x+h][y+h] == current_player)
			count++;
		else
			count = 0;
		if (count == 5)
			return true;
		h++;
	}
	return false;
}

function fiveInRowDiag2()
{
	var	h = 0;
	var count = 0;

	while (x + h > 0 && y - h < 18)
		h--;
	while (x + h < 19 && y - h >= 0)
	{
		if (board[x+h][y-h] == current_player)
			count++;
		else
			count = 0;
		if (count == 5)
			return true;
		h++;
	}
	return false;
}

function checkWin()
{
	var win = false;

	if (fiveInRow(1, 0, 0, y)) // horizontal
		win = true;
	else if (fiveInRow(0, 1, x, 0)) // vertcial
		win = true;
	else if (fiveInRowDiag1())
		win = true;
	else if (fiveInRowDiag2())
		win = true;
	if (win)
	{
		alert("player " + current_player.toString(10) + " won !");
		window.location.reload(true);
	}
}

function threeAll(xx, yy)
{
	var sx = 1;
	var	sy = 1;
	var	s;
	var	count;
	var endx = 14;
	var	endy = 14;
	var	end;
	var	j;
	var	m;
	var	n;

	if ((x == 18 || x == 0) && xx != 0)
		return false;
	if ((y == 18 || y == 0) && yy != 0)
		return false;
	if (x - 3 > 0)
		sx = x - 3;
	if (x + 3 < 18)
		endx = x;
	if (y - 3 > 0)
		sy = y - 3;
	if (y + 3 < 18)
		endy = y;
	end = (endx > endy && yy != 0) ? endy : endx;
	s = (sx > sy && yy != 0) ? sy : sx;
	for (var i = s; i <= end; i++)
	{
		count = 1;
		for (j = 0; j < 4; j)
		{
			if (board[(xx != 0) ? sx - 1 : x][(yy != 0) ? sy - 1 : y] == opponent)
			{
				j++;
				break ;
			}
			m = (xx != 0) ? sx + j : x;
			if (m > 18)
				break ;
			n = (yy != 0) ? sy + j : y;
			if (n > 18)
				break ;
			if (board[m][n] == current_player)
				count++;
			if (board[m][n] == opponent)
				count = 1;
			if (count >= 3)
			{
				j++;
				break ;
			}
			j++;
		}
		m = (xx != 0) ? sx + j : x;
		if (m > 18)
			m = 18;
		n = (yy != 0) ? sy + j : y;
		if (n > 18)
			n = 18;
		if (board[m][n] == opponent)
			count = 1;
		if (count >= 3)
			return true;
		sx++;
		sy++;
	}
	return false;
}

function threeLast()
{
	return false;
}

function detectThree()
{
	var	nb = 0;
	if (threeAll(1, 0))
		nb++;
	if (threeAll(0, 1))
		nb++;
	if (threeAll(1, 1))
		nb++;
	if (threeLast())
		nb++;
	if (nb != 0)
		alert(nb);
	return nb;
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
