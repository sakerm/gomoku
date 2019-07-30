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
		g_priorities.push([[x+1, y][[x+2, y]]]);
	}
	if (x >= 3 && board[x - 3][y] == current_player && board[x - 1][y] == opponent && board[x - 2][y] == opponent) // gauche
	{
		deleteCase(x - 1, y);
		deleteCase(x - 2, y);
		g_priorities.push([[x-1, y][[x-2, y]]]);
	}
	if (y <= 15 && board[x][y + 3] == current_player && board[x][y + 2] == opponent && board[x][y + 1] == opponent) // bas
	{
		deleteCase(x, y + 1);
		deleteCase(x, y + 2);
		g_priorities.push([[x, y+1][[x, y+2]]]);
	}
	if (y >= 3 && board[x][y - 3] == current_player && board[x][y - 2] == opponent && board[x][y - 1] == opponent) // haut
	{
		deleteCase(x, y - 1);
		deleteCase(x, y - 2);
		g_priorities.push([[x, y-1][[x, y-2]]]);
	}
	if (x <= 15 && y >= 3 && board[x + 3][y - 3] == current_player && board[x + 1][y - 1] == opponent && board[x + 2][y - 2] == opponent) // haut droite
	{
		deleteCase(x + 1, y - 1);
		deleteCase(x + 2, y - 2);
		g_priorities.push([[x+1, y-1][[x+2, y-2]]]);
	}
	if (x >= 3 && y >= 3 && board[x - 3][y - 3] == current_player && board[x - 1][y - 1] == opponent && board[x - 2][y - 2] == opponent) // haut gauche
	{
		deleteCase(x - 1, y - 1);
		deleteCase(x - 2, y - 2);
		g_priorities.push([[x-1, y-1][[x-2, y-2]]]);
	}
	if (x >= 3 && y <= 15 && board[x - 3][y + 3] == current_player && board[x - 1][y + 1] == opponent && board[x - 2][y + 2] == opponent) // bas gauche
	{
		deleteCase(x - 1, y + 1);
		deleteCase(x - 2, y + 2);
		g_priorities.push([[x-1, y+1][[x-2, y+2]]]);
	}
	if (x <= 15 && y <= 15 && board[x + 3][y + 3] == current_player && board[x + 1][y + 1] == opponent && board[x + 2][y + 2] == opponent) // bas droite
	{
		deleteCase(x + 1, y + 1);
		deleteCase(x + 2, y + 2);
		g_priorities.push([[x+1, y+1][[x+2, y+2]]]);
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

function checkside(it, xx, yy, offset, nospace, nbspace, player, ii, jj)
{
	var ret = 0;
	var i;
	for (i = 1 + offset; i <= it + offset; i++)
	{
		if (ii+i*xx < 0 || ii+i*xx > 18 || jj+i*yy < 0 || jj+i*yy > 18)
			return 0;
		if (board[ii+i*xx][jj+i*yy] == player)
			ret++;
		else if (board[ii+i*xx][jj+i*yy] == ((player == opponent) ? current_player : opponent))
			return 0;
		else if (ii+(i+1)*xx < 0 || ii+(i+1)*xx > 18 || y+(i+1)*yy < 0 || jj+(i+1)*yy > 18)
			break ;
		else if (board[ii+i*xx][jj+i*yy] == 0 && board[ii+(i+1)*xx][jj+(i+1)*yy] == player)
		{
			if (!nospace)
			{
				nbspace[0] += 1;
				ret += checkside(it - i, xx, yy, i, nospace, nbspace, player, ii, jj);
			}
			break ;
		}
		else
			break ;
	}
	if ((ii+i*xx < 0 || ii+i*xx > 18 || jj+i*yy < 0 || jj+i*yy > 18) || board[ii+i*xx][jj+i*yy] != 0)
		return 0;
	return ret;
}

function checkBlanks(xx, yy, player, ii, jj)
{
	var nb = 0;

	for (var i = 1; (ii+xx*i >= 0 && ii+xx*i <= 18 && jj+yy*i >= 0 && jj+yy*i <= 18); i++)
	{
		if (board[ii+xx*i][jj+yy*i] == 0)
		{
			nb++;
			break ;
		}
		if (board[ii+xx*i][jj+yy*i] == ((player == opponent) ? current_player : opponent))
			return false;
	}
	for (var i = 1; (ii-xx*i >= 0 && ii-xx*i <= 18 && jj-yy*i >= 0 && jj-yy*i <= 18); i++)
	{
		if (board[ii-xx*i][jj-yy*i] == 0)
		{
			nb++;
			break ;
		}
		if (board[ii-xx*i][jj-yy*i] == ((player == opponent) ? current_player : opponent))
			return false;
	}
	if (nb >= 2)
		return true;
	return false;
}

function threeAll(xx, yy, i, j, player)
{
	var count = 1;
	var nbspace = [0];

	if (((i == 0 || i >= 18) && xx != 0)
			|| ((j == 0 || j >= 18) && yy != 0)
			|| (board[i - xx][j - yy] == 0 && board[i + xx][j + yy] == 0
				&& (i - xx*2 >= 0 && i + xx*2 <= 18)
				&& !(board[i - xx*2][j - yy*2] == player ^ board[i + xx*2][j + yy*2] == player)))
		return [0, []];
	if (!checkBlanks(xx, yy, player, i, j))
		return [0, []];
	count += checkside(3, xx, yy, 0, false, nbspace, player, i, j);
	count += checkside(3, -xx, -yy, 0, false, nbspace, player, i, j);
	if (count != 3)
	{
		count = 1;
		count += checkside(3, xx, yy, 0, true, nbspace, player, i, j);
		count += checkside(3, -xx, -yy, 0, true, nbspace, player, i, j);
	}
	if (count != 3)
	{
		nbspace[0] = 0;
		count = 1;
		count += checkside(3, xx, yy, 0, false, nbspace, player, i, j);
		count += checkside(3, -xx, -yy, 0, true, nbspace, player, i, j);
		if (count == 3 && nbspace[0] == 1)
			return [2, coordThree(xx, yy, i, j, player)];
	}
	if (count != 3)
	{
		nbspace[0] = 0;
		count = 1;
		count += checkside(3, xx, yy, 0, true, nbspace, player, i, j);
		count += checkside(3, -xx, -yy, 0, false, nbspace, player, i, j);
		if (count == 3 && nbspace[0] == 1)
			return [2, coordThree(xx, yy, i, j, player)];
	}
	if (count == 3)
		return [1, coordThree(xx, yy, i, j, player)];
	return [0, []];
}

function coordThree(xx, yy, i, j, player)
{
	var ret = [];
	var	is = i;
	var	js = j;

	is += xx;
	js += yy;
	if (is+xx >= 0 && is+xx <= 18 && js+yy >= 0 && js+yy <= 18)
	{
		while (board[is][js] != 0 || board[is+xx][js+yy] == player)
		{
			if (board[is][js] == 0)
				ret.push([is, js]);
			is += xx;
			js += yy;
			if (!(is+xx >= 0 && is+xx <= 18 && js+yy >= 0 && js+yy <= 18))
				break ;
		}
		ret.push([is, js]);
	}
	i -= xx;
	j -= yy;
	if (i-xx >= 0 && i-xx <= 18 && j-yy >= 0 && j-yy <= 18)
	{
		while (board[i][j] != 0 || board[i-xx][j-yy] == player)
		{
			if (board[i][j] == 0)
				ret.push([i, j]);
			i -= xx;
			j -= yy;
			if (!(i-xx >= 0 && i-xx <= 18 && j-yy >= 0 && j-yy <= 18))
				break ;
		}
		ret.push([i, j]);
	}
	return ret;
}

function coordCloseThree(i, j, player, revers)
{
	var ret = [];
	var nbpieces = 0;
	var space = 0;
	var savei = 0;
	var savej = 0;
	var counti = 0;
	var countj = 0;

		while ((i+counti > 0 && i+counti <= 18 && j+countj >= 0 && j+countj <= 18) && counti > -3 || (board[i+counti][j] == player && i+counti > 0))
			counti--;
		while((i+counti >= 0 && i+counti <= 18 && j+countj >= 0 && j+countj <= 18) && counti != 4)
		{
			if (nbpieces == 2)
			{
				if (savei - 1 >= 0 && board[savei-1][j] == 0 && savei-1 != i)
				{
					if (savei - 1 == i)
						ret.push([savei-2, j])
					else
						ret.push([savei-1, j])
				}
				while(savei <= i+counti && i+counti < 18)
				{
					if (board[savei][j] == 0 && savei != i)
						ret.push([savei, j])
					savei++;
				}
				while(savei < 18 && (board[savei][j] == player || savei == i))
					savei++;
				if (board[savei][j] == 0 && savei != i && (board[savei-1][j] == player || savei-1 == i))
					ret.push([savei, j])
				break ;
			}
			if (board[i+counti][j] == player || counti == 0)
			{
				nbpieces++;
				space = 0;
				if (nbpieces == 1)
					savei = i+counti;
			}
			else if (board[i+counti][j] == 0)
				space++;
			else if (space == 2 || (board[i+counti][j] != player && board[i+counti][j] != 0))
			{
				savei = 0;
				savej = 0;
				space = 0;
				nbpieces = 0;
			}
			if (nbpieces != 2)
				counti++;
		}
		nbpieces = 0;
		space = 0;
		savei = 0;
		savej = 0;
		counti = 0;
		countj = 0;
		while ((i+counti > 0 && i+counti <= 18 && j+countj > 0 && j+countj <= 18) && countj > -3 || (board[i][j+countj] == player && j+countj > 0))
			countj--;
		while((i+counti >= 0 && i+counti <= 18 && j+countj >= 0 && j+countj <= 18) && countj != 4)
		{
			if (nbpieces == 2)
			{
				if (savej - 1 >= 0 && board[i][savej-1] == 0 && savej-1 != j)
				{
					if (savej - 1 == j)
						ret.push([i, savej-2])
					else
						ret.push([i, savej-1])
				}
				while(savej <= j+countj && j+countj < 18)
				{
					if (board[i][savej] == 0 && savej != j)
						ret.push([i, savej])
					savej++;
				}
				while(savej < 18 && (board[i][savej] == player || savej == j))
					savej++;
				if (board[i][savej] == 0 && savej != j && (board[i][savej-1] == player || savej-1 == j))
					ret.push([i, savej])
				break ;
			}
			if (board[i][j+countj] == player || countj == 0)
			{
				nbpieces++;
				space = 0;
				if (nbpieces == 1)
					savej = j+countj;
			}
			else if (board[i][j+countj] == 0)
				space++;
			else if (space == 2 || (board[i][j+countj] != player && board[i][j+countj] != 0))
			{
				savei = 0;
				savej = 0;
				space = 0;
				nbpieces = 0;
			}
			if (nbpieces != 2)
				countj++;
		}
		nbpieces = 0;
		space = 0;
		savei = 0;
		savej = 0;
		counti = 0;
		countj = 0;
		while ((i+counti > 0 && i+counti <= 18 && j+countj > 0 && j+countj <= 18) && countj > -3 && counti > -3 || (board[i+counti][j+countj] == player && j+countj > 0 && i+counti > 0))
		{
			counti--;
			countj--;
		}
		while((i+counti >= 0 && i+counti <= 18 && j+countj >= 0 && j+countj <= 18) && countj != 4 && counti != 4)
		{
			if (nbpieces == 2)
			{
				if (savej-1 >= 0 && savei-1 >= 0 && board[savei-1][savej-1] == 0 && savej-1 != j && savei-1 != i)
				{
					if (savej - 1 == j && savei-1 == j)
						ret.push([savei-2, savej-2])
					else
						ret.push([savei-1, savej-1])
				}
				while(savej <= j+countj && j+countj < 18 && savei <= i+counti && i+counti < 18)
				{
					if (board[savei][savej] == 0 && savej != j && savei != i)
						ret.push([savei, savej])
					savej++;
					savei++;
				}
				while(savej < 18 && savei < 18 && (board[savei][savej] == player || (savej == j && savei == i)))
				{
					savei++;
					savej++;
				}
				if (board[savei][savej] == 0 && savej != j && savei != i && (board[savei-1][savej-1] == player || (savej-1 == j && savei-1 == i)))
					ret.push([savei, savej])
				break ;
			}
			if (board[i+counti][j+countj] == player || (countj == 0 && counti == 0))
			{
				nbpieces++;
				space = 0;
				if (nbpieces == 1)
				{
					savei = i+counti;
					savej = j+countj;
				}
			}
			else if (board[i+counti][j+countj] == 0)
				space++;
			else if (space == 2 || (board[i+counti][j+countj] != player && board[i+counti][j+countj] != 0))
			{
				savei = 0;
				savej = 0;
				space = 0;
				nbpieces = 0;
			}
			if (nbpieces != 2)
			{
				counti++;
				countj++;
			}
		}
		nbpieces = 0;
		space = 0;
		savei = 0;
		savej = 0;
		counti = 0;
		countj = 0;
		while ((i+counti > 0 && i+counti < 18 && j+countj > 0 && j+countj <= 18) && countj > -3 && counti < 3 || (board[i+counti][j+countj] == player && j+countj > 0 && i+counti < 18))
		{
			counti++;
			countj--;
		}
		while((i+counti >= 0 && i+counti <= 18 && j+countj >= 0 && j+countj <= 18) && countj != 4 && counti != -4)
		{
			if (nbpieces == 2)
			{
				if (savej-1 >= 0 && savei+1 <= 18 && board[savei+1][savej-1] == 0 && savej-1 != j && savei+1 != i)
				{
					if (savej-1 == j && savei+1 == i)
						ret.push([savei+2, savej-2])
					else
						ret.push([savei+1, savej-1])
				}
				while(savej <= j+countj && j+countj < 18 && savei <= i+counti && i+counti > 0)
				{
					if (board[savei][savej] == 0 && savej != j && savei != i)
						ret.push([savei, savej])
					savej++;
					savei--;
				}
				while(savej < 18 && savei > 0 && (board[savei][savej] == player || (savej == j && savei == i)))
				{
					savei--;
					savej++;
				}
				if (board[savei][savej] == 0 && savej != j && savei != i && (board[savei+1][savej-1] == player || (savej-1 == j && savei+1 == i)))
					ret.push([savei, savej])
				break ;
			}
			if (board[i+counti][j+countj] == player || (countj == 0 && counti == 0))
			{
				nbpieces++;
				space = 0;
				if (nbpieces == 1)
				{
					savei = i+counti;
					savej = j+countj;
				}
			}
			else if (board[i+counti][j+countj] == 0)
				space++;
			else if (space == 2 || (board[i+counti][j+countj] != player && board[i+counti][j+countj] != 0))
			{
				savei = 0;
				savej = 0;
				space = 0;
				nbpieces = 0;
			}
			if (nbpieces != 2)
			{
				counti--;
				countj++;
			}
		}
		return(ret);
}

function detectThree(i, j, player)
{
	var	nb = 0;
	var	priorities = [];
	var tmp;


	priorities.push(coordCloseThree(i, j, player, 1));
//	priorities.push(coordCloseThree(i, j, player, -1));
//	console.log(priorities);

	tmp = threeAll(1, 0, i, j, player);
	nb += tmp[0];
	priorities.push(tmp[1].slice());
	if (nb >= 2)
		return [nb, priorities];
	tmp = threeAll(1, 1, i, j, player);
	nb += tmp[0];
	priorities.push(tmp[1].slice());
	if (nb >= 2)
		return [nb, priorities];
	tmp = threeAll(0, 1, i, j, player);
	nb += tmp[0];
	priorities.push(tmp[1].slice());
	if (nb >= 2)
		return [nb, priorities];
	tmp = threeAll(1, -1, i, j, player);
	nb += tmp[0];
	priorities.push(tmp[1].slice());
	return [nb, priorities];
}

function resolveAfter2Seconds() {
	return new Promise(resolve => {
	  setTimeout(() => {
			resolve('resolved');
	  }, 1);
	});
}

var	g_priorities = [];

async function click(ThreeLastPlay)
{
	for (var p = 0; p < ThreeLastPlay[1].length; p++)
		g_priorities.push(ThreeLastPlay[1][p]);
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
	await resolveAfter2Seconds();
	if (current_player == 2)
	{
		var ret_ia = minmax([0, 0], 6, -999999, 999999, current_player, g_priorities);
	//	console.log(nbaa);
		nbaa = 0;
		x = ret_ia[0];
		y = ret_ia[1];
		ThreeLastPlay = detectThree(x, y, current_player);
		for (var p = 0; p < ThreeLastPlay[1].length; p++)
			g_priorities.push(ThreeLastPlay[1][p]);
		//console.log(ret_ia)
		click(ThreeLastPlay);
	}
	//console.log(g_priorities);
}

drawCanvas();
game_canvas.addEventListener('mousedown', function(e) {
	var ThreeLastPlay;
    getCursorPosition(game_canvas, e);
    if ((current_player == 1 || ia == false) && playing == true && board[x][y] == 0 && (ThreeLastPlay = (detectThree(x, y, current_player)))[0] <= 1)
    	click(ThreeLastPlay);
});