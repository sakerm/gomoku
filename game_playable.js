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
var	x;
var y;
var	ia = false;
var	game_canvas = document.getElementById("game");
var	playing = true;
var	ctxx = game_canvas.getContext("2d");
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
		ctxx.beginPath();
		ctxx.moveTo(w/19 + i*(w/19), 0);
		ctxx.lineTo(w/19 + i*(w/19), h);
		ctxx.moveTo(0, h/19 + i*(h/19));
		ctxx.lineTo(w, h/19 + i*(h/19));
		ctxx.stroke();
	}
}

function deleteCase(xx, yy)
{
	ctxx.beginPath();
	ctxx.strokeStyle = "white";
	ctxx.fillStyle = "white";
	ctxx.arc(xx*(w/19)+(w/19/2), yy*(h/19)+(h/19/2), w/19/2.2, 0, 2*Math.PI);
	ctxx.fill();
	ctxx.stroke();
	ctxx.strokeStyle = "black";
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

function fiveInRow(j, k, xx, yy, player)
{
	var count = 0;

	for (var i = 0; i < 19; i++)
	{
		if (board[xx + i*j][yy + i*k] == player)
			count++;
		else
			count = 0;
		if (count == 5)
			return true;
	}
	return false;
}

function fiveInRowDiag1(i, j, player)
{
	var	h = 0;
	var count = 0;

	while (i + h > 0 && j + h > 0)
		h--;
	while (i + h < 19 && j + h < 19)
	{
		if (board[i+h][j+h] == player)
			count++;
		else
			count = 0;
		if (count == 5)
			return true;
		h++;
	}
	return false;
}

function fiveInRowDiag2(i, j, player)
{
	var	h = 0;
	var count = 0;

	while (i + h > 0 && j - h < 18)
		h--;
	while (i + h < 19 && j - h >= 0)
	{
		if (board[i+h][j-h] == player)
			count++;
		else
			count = 0;
		if (count == 5)
			return true;
		h++;
	}
	return false;
}

function checkWin(i, j, player)
{
	var win = false;

	nbaa++;
	if (fiveInRow(1, 0, 0, j, player)) // horizontal
		win = true;
	else if (fiveInRow(0, 1, i, 0, player)) // vertcial
		win = true;
	else if (fiveInRowDiag1(i, j, player))
		win = true;
	else if (fiveInRowDiag2(i, j, player))
		win = true;
	return win;
}

function checkside(it, xx, yy, offset, nospace, nbspace)
{
	var ret = 0;
	var i;
	for (i = 1 + offset; i <= it + offset; i++)
	{
		if (x+i*xx < 0 || x+i*xx > 18 || y+i*yy < 0 || y+i*yy > 18)
			return 0;
		if (board[x+i*xx][y+i*yy] == current_player)
			ret++;
		else if (board[x+i*xx][y+i*yy] == opponent)
			return 0;
		else if (x+(i+1)*xx < 0 || x+(i+1)*xx > 18 || y+(i+1)*yy < 0 || y+(i+1)*yy > 18)
			break ;
		else if (board[x+i*xx][y+i*yy] == 0 && board[x+(i+1)*xx][y+(i+1)*yy] == current_player)
		{
			if (!nospace)
			{
				nbspace[0] += 1;
				ret += checkside(it - i, xx, yy, i, nbspace);
			}
			break ;
		}
		else
			break ;
	}
	if ((x+i*xx < 0 || x+i*xx > 18 || y+i*yy < 0 || y+i*yy > 18) || board[x+i*xx][y+i*yy] != 0)
		return 0;
	return ret;
}

function checkBlanks(xx, yy)
{
	var nb = 0;

	for (var i = 1; (x+xx*i >= 0 && x+xx*i <= 18 && y+yy*i >= 0 && y+yy*i <= 18); i++)
	{
		if (board[x+xx*i][y+yy*i] == 0)
		{
			nb++;
			break ;
		}
		if (board[x+xx*i][y+yy*i] == opponent)
			return false;
	}
	for (var i = 1; (x-xx*i >= 0 && x-xx*i <= 18 && y-yy*i >= 0 && y-yy*i <= 18); i++)
	{
		if (board[x-xx*i][y-yy*i] == 0)
		{
			nb++;
			break ;
		}
		if (board[x-xx*i][y-yy*i] == opponent)
			return false;
	}
	if (nb >= 2)
		return true;
	return false;
}

function threeAll(xx, yy, i, j)
{
	var count = 1;
	var nbspace = [0];

	if (((i == 0 || i >= 18) && xx != 0)
			|| ((j == 0 || j >= 18) && yy != 0)
			|| (board[i - xx][j - yy] == 0 && board[i + xx][j + yy] == 0
				&& (i - xx*2 >= 0 && i + xx*2 <= 18)
				&& !(board[i - xx*2][j - yy*2] == current_player ^ board[i + xx*2][j + yy*2] == current_player)))
		return 0;
	if (!checkBlanks(xx, yy))
		return 0;
	count += checkside(3, xx, yy, 0, false, nbspace);
	count += checkside(3, -xx, -yy, 0, false, nbspace);
	if (count != 3)
	{
		count = 1;
		count += checkside(3, xx, yy, 0, true, nbspace);
		count += checkside(3, -xx, -yy, 0, true, nbspace);
	}
	if (count != 3)
	{
		nbspace[0] = 0;
		count = 1;
		count += checkside(3, xx, yy, 0, false, nbspace);
		count += checkside(3, -xx, -yy, 0, true, nbspace);
		if (count == 3 && nbspace[0] == 1)
			return 2;
	}
	if (count != 3)
	{
		nbspace[0] = 0;
		count = 1;
		count += checkside(3, xx, yy, 0, true, nbspace);
		count += checkside(3, -xx, -yy, 0, false, nbspace);
		if (count == 3 && nbspace[0] == 1)
			return 2;
	}
	if (count == 3)
		return 1;
	return 0;
}

function detectThree(i, j)
{
	var	nb = 0;
	nb += threeAll(1, 0, i, j);
	if (nb >= 2)
		return nb;
	nb += threeAll(1, 1, i, j);
	if (nb >= 2)
		return nb;
	nb += threeAll(0, 1, i, j);
	if (nb >= 2)
		return nb;
	nb += threeAll(1, -1, i, j);
	return nb;
}

function click()
{
	timerStart = true;
	ctxx.beginPath();
	ctxx.arc(x*(w/19)+(w/19/2), y*(h/19)+(h/19/2), w/19/2.3, 0, 2*Math.PI);
	if (current_player == 1)
		ctxx.fillStyle = "blue";
	else
		ctxx.fillStyle = "red";
	ctxx.fill();
	ctxx.stroke();
	board[x][y] = current_player;
	if (checkWin(x, y, current_player))
	{
		alert("player " + current_player.toString(10) + " won !");
		window.location.reload(true);
		return ;
	}
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
	if (current_player == 2)
	{
		var ret_ia = minmax([0, 0], 6, -999999, 999999, current_player);
		console.log(nbaa);
		nbaa = 0;
		x = ret_ia[0];
		y = ret_ia[1];
		console.log(ret_ia)
		click();
	}
}

drawCanvas();
game_canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(game_canvas, e);
    if ((current_player == 1 || ia == false) && playing == true && board[x][y] == 0 && detectThree(x, y) <= 1)
    	click();
});