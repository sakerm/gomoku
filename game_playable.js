// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   game_playable.js                                   :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: lvasseur <marvin@42.fr>                    +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2019/08/05 19:50:01 by lvasseur          #+#    #+#             //
//   Updated: 2019/08/05 19:50:06 by lvasseur         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

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
//var	compterur_de_coups = 0;
var	nbCaptured = [0, 0, 0];
var	finished = false;
var	leveling = [0,0,0];

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
	ctxx.font = "10px Arial";
	for (var i = 0; i < 19; i++)
	{
		for (var j = 0; j < 19; j++)
		{
			ctxx.fillText(i + " " + j, i*(w/19)+(w/(19*3.5)), (h/19)*(j+1)-(h/(19*15)));
		}
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
	ctxx.fillStyle = "black";
	ctxx.fillText(xx + " " + yy, xx*(w/19)+(w/(19*3.5)), (h/19)*(yy+1)-(h/(19*15)));
}

function checkCapture()
{
	if (x <= 15 && board[x + 3][y] == current_player && board[x + 1][y] == opponent && board[x + 2][y] == opponent) // droite
	{
		deleteCase(x + 1, y);
		deleteCase(x + 2, y);
		nbCaptured[current_player] += 2;
		if (document.getElementById("leveling").checked == true)
			leveling[current_player]++;
	}
	if (x >= 3 && board[x - 3][y] == current_player && board[x - 1][y] == opponent && board[x - 2][y] == opponent) // gauche
	{
		deleteCase(x - 1, y);
		deleteCase(x - 2, y);
		nbCaptured[current_player] += 2;
		if (document.getElementById("leveling").checked == true)
			leveling[current_player]++;
	}
	if (y <= 15 && board[x][y + 3] == current_player && board[x][y + 2] == opponent && board[x][y + 1] == opponent) // bas
	{
		deleteCase(x, y + 1);
		deleteCase(x, y + 2);
		nbCaptured[current_player] += 2;
		if (document.getElementById("leveling").checked == true)
			leveling[current_player]++;
	}
	if (y >= 3 && board[x][y - 3] == current_player && board[x][y - 2] == opponent && board[x][y - 1] == opponent) // haut
	{
		deleteCase(x, y - 1);
		deleteCase(x, y - 2);
		nbCaptured[current_player] += 2;
		if (document.getElementById("leveling").checked == true)
			leveling[current_player]++;
	}
	if (x <= 15 && y >= 3 && board[x + 3][y - 3] == current_player && board[x + 1][y - 1] == opponent && board[x + 2][y - 2] == opponent) // haut droite
	{
		deleteCase(x + 1, y - 1);
		deleteCase(x + 2, y - 2);
		nbCaptured[current_player] += 2;
		if (document.getElementById("leveling").checked == true)
			leveling[current_player]++;
	}
	if (x >= 3 && y >= 3 && board[x - 3][y - 3] == current_player && board[x - 1][y - 1] == opponent && board[x - 2][y - 2] == opponent) // haut gauche
	{
		deleteCase(x - 1, y - 1);
		deleteCase(x - 2, y - 2);
		nbCaptured[current_player] += 2;
		if (document.getElementById("leveling").checked == true)
			leveling[current_player]++;
	}
	if (x >= 3 && y <= 15 && board[x - 3][y + 3] == current_player && board[x - 1][y + 1] == opponent && board[x - 2][y + 2] == opponent) // bas gauche
	{
		deleteCase(x - 1, y + 1);
		deleteCase(x - 2, y + 2);
		nbCaptured[current_player] += 2;
		if (document.getElementById("leveling").checked == true)
			leveling[current_player]++;
	}
	if (x <= 15 && y <= 15 && board[x + 3][y + 3] == current_player && board[x + 1][y + 1] == opponent && board[x + 2][y + 2] == opponent) // bas droite
	{
		deleteCase(x + 1, y + 1);
		deleteCase(x + 2, y + 2);
		nbCaptured[current_player] += 2;
		if (document.getElementById("leveling").checked == true)
			leveling[current_player]++;
	}
}

function checkCapturePrio(i, j, player, other)
{
	var	ret = false;

	if (i <= 15 && board[i + 3][j] == player && board[i + 1][j] == other && board[i + 2][j] == other) // droite
		ret = true;
	else if (i >= 3 && board[i - 3][j] == player && board[i - 1][j] == other && board[i - 2][j] == other) // gauche
		ret = true;
	else if (j <= 15 && board[i][j + 3] == player && board[i][j + 2] == other && board[i][j + 1] == other) // bas
		ret = true;
	else if (j >= 3 && board[i][j - 3] == player && board[i][j - 2] == other && board[i][j - 1] == other) // haut
		ret = true;
	else if (i <= 15 && j >= 3 && board[i + 3][j - 3] == player && board[i + 1][j - 1] == other && board[i + 2][j - 2] == other) // haut droite
		ret = true;
	else if (i >= 3 && j >= 3 && board[i - 3][j - 3] == player && board[i - 1][j - 1] == other && board[i - 2][j - 2] == other) // haut gauche
		ret = true;
	else if (i >= 3 && j <= 15 && board[i - 3][j + 3] == player && board[i - 1][j + 1] == other && board[i - 2][j + 2] == other) // bas gauche
		ret = true;
	else if (i <= 15 && j <= 15 && board[i + 3][j + 3] == player && board[i + 1][j + 1] == other && board[i + 2][j + 2] == other) // bas droite
		ret = true;
	return ret;
}

function checkCaptureSim(i, j, player, other)
{
	var	ret = [];

	if (i <= 15 && board[i + 3][j] == player && board[i + 1][j] == other && board[i + 2][j] == other) // droite
	{
		board[i+1][j] = 0;
		board[i+2][j] = 0;
		ret.push([i+1, j, other]);
		ret.push([i+2, j, other]);
	}
	if (i >= 3 && board[i - 3][j] == player && board[i - 1][j] == other && board[i - 2][j] == other) // gauche
	{
		board[i-1][j] = 0;
		board[i-2][j] = 0;
		ret.push([i-1, j, other]);
		ret.push([i-2, j, other]);
	}
	if (j <= 15 && board[i][j + 3] == player && board[i][j + 2] == other && board[i][j + 1] == other) // bas
	{
		board[i][j+1] = 0;
		board[i][j+2] = 0;
		ret.push([i, j+1, other]);
		ret.push([i, j+2, other]);
	}
	if (j >= 3 && board[i][j - 3] == player && board[i][j - 2] == other && board[i][j - 1] == other) // haut
	{
		board[i][j-1] = 0;
		board[i][j-2] = 0;
		ret.push([i, j-1, other]);
		ret.push([i, j-2, other]);
	}
	if (i <= 15 && j >= 3 && board[i + 3][j - 3] == player && board[i + 1][j - 1] == other && board[i + 2][j - 2] == other) // haut droite
	{
		board[i+1][j-1] = 0;
		board[i+2][j-2] = 0;
		ret.push([i+1, j-1, other]);
		ret.push([i+2, j-2, other]);
	}
	if (i >= 3 && j >= 3 && board[i - 3][j - 3] == player && board[i - 1][j - 1] == other && board[i - 2][j - 2] == other) // haut gauche
	{
		board[i-1][j-1] = 0;
		board[i-2][j-2] = 0;
		ret.push([i-1, j-1, other]);
		ret.push([i-2, j-2, other]);
	}
	if (i >= 3 && j <= 15 && board[i - 3][j + 3] == player && board[i - 1][j + 1] == other && board[i - 2][j + 2] == other) // bas gauche
	{
		board[i-1][j+1] = 0;
		board[i-2][j+2] = 0;
		ret.push([i-1, j+1, other]);
		ret.push([i-2, j+2, other]);
	}
	if (i <= 15 && j <= 15 && board[i + 3][j + 3] == player && board[i + 1][j + 1] == other && board[i + 2][j + 2] == other) // bas droite
	{
		board[i+1][j+1] = 0;
		board[i+2][j+2] = 0;
		ret.push([i+1, j+1, other]);
		ret.push([i+2, j+2, other]);
	}
	return ret;
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

function checkWin(i, j, player, ultraprio)
{
	var win = [false, false, false, false];
	var ret = false;
	var	take_ret = false;

	nbaa++;
	if (nbCaptured[player] >= 10)
		return true;
	if (fiveInRow(1, 0, 0, j, player)) // horizontal
		win[0] = true;
	else if (fiveInRow(0, 1, i, 0, player)) // vertcial
		win[1] = true;
	else if (fiveInRowDiag1(i, j, player))
		win[2] = true;
	else if (fiveInRowDiag2(i, j, player))
		win[3] = true;
	for (var k = 0; k < 4; k++)
	{
		if (win[k] == true)
		{
			var other = ((player == current_player) ? opponent : current_player);
			for (var o = 0; o < 19; o++)
			{
				for (var q = 0; q < 19; q++)
				{
					if (board[o][q] == 0)
					{
						board[o][q] = other;
						if (checkCapturePrio(o, q, other, player))
						{
							if (nbCaptured[other] >= 8)
							{
								board[o][q] = 0;
								return true;
							}
							else
							{
								var	tmp = checkCaptureSim(o, q, other, player);
	
								for (var p = 0; p < tmp.length; p++)
									board[tmp[p][0]][tmp[p][1]] = 0;
								if (!ret)
								{
									if (k == 0)
										ret = fiveInRow(1, 0, 0, j, player);
									else if (k == 1)
										ret = fiveInRow(0, 1, i, 0, player);
									else if (k == 2)
										ret = fiveInRowDiag1(i, j, player);
									else if (k == 3)
										ret = fiveInRowDiag2(i, j, player);
								}
								for (var p = 0; p < tmp.length; p++)
									board[tmp[p][0]][tmp[p][1]] = player;
								board[o][q] = 0;
								ultraprio.push([o, q]);
								take_ret = true;
							}
						}
						board[o][q] = 0;
					}
				}
			}
			if (take_ret)
				return ret;
		}
	}
	for (var k = 0; k < 4; k++)
	{
		if (win[k] == true)
			return true;
	}
	return false;
}

function checkWinBourrin(i, j, player)
{
	var win = [false, false, false, false];

	nbaa++;
	if (nbCaptured[player] >= 10)
		return true;
	if (fiveInRow(1, 0, 0, j, player)) // horizontal
		win[0] = true;
	else if (fiveInRow(0, 1, i, 0, player)) // vertcial
		win[1] = true;
	else if (fiveInRowDiag1(i, j, player))
		win[2] = true;
	else if (fiveInRowDiag2(i, j, player))
		win[3] = true;
	for (var k = 0; k < 4; k++)
	{
		if (win[k] == true)
			return true;
	}
	return false;
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
		return 0;
	if (!checkBlanks(xx, yy, player, i, j))
		return 0;
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
			return 2;
	}
	if (count != 3)
	{
		nbspace[0] = 0;
		count = 1;
		count += checkside(3, xx, yy, 0, true, nbspace, player, i, j);
		count += checkside(3, -xx, -yy, 0, false, nbspace, player, i, j);
		if (count == 3 && nbspace[0] == 1)
			return 2;
	}
	if (count == 3)
		return 1;
	return 0;
}

function detectThree(i, j, player)
{
	var	nb = 0;
	var tmp;

	return 0;
	nbDetect++;
	nb = threeAll(1, 0, i, j, player);
	if (nb >= 2)
		return nb;
	nb += threeAll(1, 1, i, j, player);
	if (nb >= 2)
		return nb;
	nb += threeAll(0, 1, i, j, player);
	if (nb >= 2)
		return nb;
	nb += threeAll(1, -1, i, j, player);
	return nb;
}

function resolveAfter2Seconds() {
	return new Promise(resolve => {
	  setTimeout(() => {
			resolve('resolved');
	  }, 1);
	});
}

var	nbDetect = 0;

var playerprio = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

async function click()
{
	if (!finished)
	{
		var prio = [];
		//console.log(test);
		compterur_de_coups++;
		ctx2.clearRect(103,105,100,40)
		ctx2.fillStyle = secondColor;
		ctx2.fillStyle = color;
		ctx2.font = "20px Georgia";
		ctx2.fillText(compterur_de_coups, 145,133);
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
		checkCapture();
		if (checkWin(x, y, current_player, prio))
		{
			alert("player " + current_player.toString(10) + " won !");
			finished = true;
			window.location.reload(true);
			return ;
		}
		if (document.getElementById("leveling").checked == true)
		{
			for (var i = 0; i < leveling[current_player]; i++)
			{
				x = getRandomInt(19);
				y = getRandomInt(19);
				if (board[x][y] == 0)
				{
					ctxx.beginPath();
					ctxx.arc(x*(w/19)+(w/19/2), y*(h/19)+(h/19/2), w/19/2.3, 0, 2*Math.PI);
					ctxx.fillStyle = (current_player == 1) ? "blue" : "red";
					ctxx.fill();
					ctxx.stroke();
					board[x][y] = current_player;
					if (checkWin(x, y, current_player, prio))
					{
						alert("player " + current_player.toString(10) + " won !");
						finished = true;
						window.location.reload(true);
						return ;
					}
				}
			}
		}
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
		var t0 = performance.now();
		if (current_player == 2 && document.getElementById("PVP").checked == false && !finished)
		{
				ctx2.clearRect(75,165,125,40)
				var ret_ia = minmax([8, 8], level, -999999, 999999, current_player, 0, prio, 0);
				//prio = [];
				x = ret_ia[0];
				y = ret_ia[1];
				click();
				var t1 = performance.now();
				time = t1 - t0;

//		console.log("nb heuristique: ", nbHeuristique);
//		console.log("nb minmax: ", nbaa);
//		console.log("nb distance: ", nbDistance);
//		console.log("nb detect: ", nbDetect);
//		nbaa = 0;
//		nbHeuristique = 0;
//		nbDistance = 0;
//		nbDetect = 0;
//		test = false;
		}
		if (document.getElementById("IAvsIA").checked == true && !finished)
		{
			setTimeout(function(){
				var ret_ia = minmax([8, 8], level, -999999, 999999, current_player, 0, prio, 0);
				x = ret_ia[0];
				y = ret_ia[1];
				click();
			}, 50);
		}
		if (!finished)
		{
			playerprio = [];
			for (var i = 0; i < prio.length; i++)
				playerprio.push(prio[i].slice());
			if (document.getElementById("IAvsIA").checked == false)
			{
				var conseil_strength = (level >= 4) ? 4 : level;
				var ret_ia = minmax([8, 8], conseil_strength, -999999, 999999, current_player, 0, prio, 0);
				x = ret_ia[0];
				y = ret_ia[1];

				ctx2.clearRect(80,170,115,30)
				ctx2.fillStyle = color;
				ctx2.font = "20px Georgia";
				ctx2.fillText("x : "  + x + "     y : " + y, 85,190);
				ctx2.stroke(conseil);
			}
		}
		if (document.getElementById("apocalypse").checked == true)
		{
			x = getRandomInt(19);
			y = getRandomInt(19);
			ctxx.beginPath();
			ctxx.arc(x*(w/19)+(w/19/2), y*(h/19)+(h/19/2), w/19/2.3, 0, 2*Math.PI);
			ctxx.fillStyle = "grey";	
			ctxx.fill();
			ctxx.stroke();
			board[x][y] = 3;
		}
	}
}

function	inplayerprio()
{
	for (var i = 0; i < playerprio.length; i++)
	{
		if (x == playerprio[i][0] && y == playerprio[i][1])
			return true;
	}
	return false;
}

drawCanvas();
game_canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(game_canvas, e);
    if ((playerprio.length == 0 || inplayerprio()) && !finished)
    	if ((current_player == 1 || ia == false) && playing == true && board[x][y] == 0 && detectThree(x, y, current_player) <= 1)
    		click();
});
