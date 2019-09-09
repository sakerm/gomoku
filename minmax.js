// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   minmax.js                                          :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: lvasseur <marvin@42.fr>                    +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2019/08/05 19:50:44 by lvasseur          #+#    #+#             //
//   Updated: 2019/08/05 19:50:45 by lvasseur         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

var	nbaa = 0;
var	nbDistance = 0;

function	distance(hx, hy)
{
	var xx;
	var yy;

	nbDistance++;
	if (hx < 1)
		xx = 0;
	else
		xx = hx - 1;
	while (xx <= hx + 1 && xx <= 18)
	{
		if (hy < 1)
			yy = 0;
		else
			yy = hy - 1;
		while (yy <= hy + 1 && yy <= 18)
		{
			if ((yy != hy || xx != hx) && board[xx][yy] != 0)
				return true;
			yy++;
		}
		xx++;
	}
	return false;
}

function	getTopLeft()
{
	var	left = -1;
	var	top = -1;

	for (var i = 0; i < 19 && left == -1; i++)
		for (var j = 0; j < 19 && left == -1; j++)
			if (board[i][j] != 0)
				left = i;
	for (var i = 0; i < 19 && top == -1; i++)
		for (var j = 0; j < 19 && top == -1; j++)
			if (board[j][i] != 0)
				top = i;
	if (left < 1)
		left = 0;
	else
		left -= 1;
	if (top < 1)
		top = 0;
	else
		top -= 1;
	return [left, top];
}

function	getBotRight()
{
	var	right = -1;
	var	bot = -1;

	for (var i = 18; i >= 0 && right == -1; i--)
		for (var j = 18; j >= 0 && right == -1; j--)
			if (board[i][j] != 0)
				right = i;
	for (var i = 18; i >= 0 && bot == -1; i--)
		for (var j = 18; j >= 0 && bot == -1; j--)
			if (board[j][i] != 0)
				bot = i;
	if (right > 17)
		right = 18;
	else
		right += 1;
	if (bot > 17)
		bot = 18;
	else
		bot += 1;
	return [right, bot];
}

var	test = false;

function	getPrioritiesCapture(topLeft, botRight, player, other)
{
	var	ret = [];

	for (var i = topLeft[0]; i <= botRight[0]; i++)
	{
		for (var j = topLeft[1]; j <= botRight[1]; j++)
		{
			if (checkCapturePrio(i, j, player, other))
				ret.push([i, j]);
		}
	}
	return ret;
}

function	getPriorities(topLeft, botRight, target)
{
	var		free = [];
	var		locked = [];
	
	getPrioritiesVertical(free, locked, topLeft, botRight, target);
	getPrioritiesHorizontal(free, locked, topLeft, botRight, target);
	getPrioritiesDiag1(free, locked, target);
	getPrioritiesDiag1_2(free, locked, target);
	getPrioritiesDiag2(free, locked, target);
	getPrioritiesDiag2_2(free, locked, target);

	if (target == 3 && (free.length > 0 || locked.length > 0))
		return fusion_tab(free, locked);
	if (free.length > 0)
		return free;
	else if (locked.length > 0)
		return locked;
	else if (target > 2)
		return getPriorities(topLeft, botRight, target - 1);
	return [];
}

function	minmax(position, depth, alpha, beta, player, nbcap, ultraprio, nbcapOpponent)
{
	var	score;
	var	RetScore;
	var	topLeft = getTopLeft();
	var	botRight = getBotRight();
	var a;
	var	win1;
	var	win2;
	var	tmpThree;
	var	prio_checked = false;
	var nb_prio = 0;
	var prio = getPriorities(topLeft, botRight, 4);
	var	captures = getPrioritiesCapture(topLeft, botRight, player, ((player == 1) ? 2 : 1));

	prio = fusion_tab(prio, captures);
	prio = fusion_tab(prio, getPrioritiesCapture(topLeft, botRight, ((player == 1) ? 2 : 1), player));
	test = true;
	nbaa++;
//	if (depth == level)
//		console.log(prio);
	if (ultraprio.length > 0 && depth == level)
	{
		//console.log(ultraprio.length);
		var	ultrapriocoord = [ultraprio[0][0], ultraprio[0][1], 9999999*((player==current_player) ? 1 : -1)];
		ultraprio = [];
		return ultrapriocoord;
	}
	if ((win1 = checkWinBourrin(position[0], position[1], current_player)))
	{
		win2 = false;
		return [position[0], position[1], (depth+1)*heuristique(position[0], position[1], player, win1, win2, prio, nbcap, nbcapOpponent)];
	}
	if ((win2 = checkWinBourrin(position[0], position[1], opponent)))
	{
		win1 = false;
		return [position[0], position[1], (depth+1)*heuristique(position[0], position[1], player, win1, win2, prio, nbcap, nbcapOpponent)];
	}
	if (depth == 0)
		return [position[0], position[1], heuristique(position[0], position[1], player, win1, win2, prio, nbcap, nbcapOpponent)];
	if (player == current_player)
	{
		RetScore = [0, 0, -100000000];
		for (var i = topLeft[0]; i <= botRight[0]; i++)
		{
			for (var j = topLeft[1]; j <= botRight[1]; j++)
			{
				if (prio_checked == false)
				{
					for (var h = 0; h < prio.length; h++)
					{
						if (prio[h] !== undefined && prio[h].length == 2 && board[prio[h][0]][prio[h][1]] == 0)
						{
							board[prio[h][0]][prio[h][1]] = player;
							captures = checkCaptureSim(prio[h][0], prio[h][1], current_player, opponent);
							nbCaptured[player] += captures.length;
							score = minmax(prio[h], depth - 1, alpha, beta, opponent, captures.length + nbcap, ultraprio, nbcapOpponent);
							//if (depth == level)
							//	console.log(depth, "score:", [prio[h][0], prio[h][1], score[2]]);
							nbCaptured[player] -= captures.length;
							for (var p = 0; p < captures.length; p++)
								board[captures[p][0]][captures[p][1]] = captures[p][2];
							board[prio[h][0]][prio[h][1]] = 0;
							if (score[2] >= RetScore[2])
								RetScore = [prio[h][0], prio[h][1], score[2]];
							if (score[2] > alpha)
								alpha = score[2];
							if (beta <= alpha)
								return RetScore;
							nb_prio++;
						}
					}
					prio_checked = true;
				}
				if (nb_prio == 0 && board[i][j] == 0 && distance(i, j) && detectThree(i, j, player) < 2)
				{
					board[i][j] = player;
					captures = checkCaptureSim(i, j, current_player, opponent);
					nbCaptured[player] += captures.length;
					if (depth >= 8)
						score = minmax([i, j], depth - 5, alpha, beta, opponent, captures.length + nbcap, ultraprio, nbcapOpponent);
					else
						score = minmax([i, j], depth - 1, alpha, beta, opponent, captures.length + nbcap, ultraprio, nbcapOpponent);
					nbCaptured[player] -= captures.length;
					for (var p = 0; p < captures.length; p++)
						board[captures[p][0]][captures[p][1]] = captures[p][2];
					board[i][j] = 0;
					if (score[2] >= RetScore[2])
						RetScore = [i, j, score[2]];
					if (score[2] > alpha)
						alpha = score[2];
					if (beta <= alpha)
						return RetScore;
					if (compterur_de_coups <= 2)
						return RetScore;
				}
			}
		}
		return RetScore;
	}
	else
	{
		RetScore = [0, 0, 100000000];
		for (var i = topLeft[0]; i <= botRight[0]; i++)
		{
			for (var j = topLeft[1]; j <= botRight[1]; j++)
			{
				if (prio_checked == false)
				{
					for (var h = 0; h < prio.length; h++)
					{
						if (prio[h] !== undefined && prio[h].length == 2 && board[prio[h][0]][prio[h][1]] == 0)
						{
							board[prio[h][0]][prio[h][1]] = player;
							captures = checkCaptureSim(prio[h][0], prio[h][1], opponent, current_player);
							nbCaptured[player] += captures.length;
							score = minmax(prio[h], depth - 1, alpha, beta, current_player, nbcap, ultraprio, captures.length + nbcapOpponent);
							//if (depth == level)
							//	console.log(depth, "score:", [prio[h][0], prio[h][1], score[2]]);
							nbCaptured[player] -= captures.length;
							for (var p = 0; p < captures.length; p++)
								board[captures[p][0]][captures[p][1]] = captures[p][2];
							board[prio[h][0]][prio[h][1]] = 0;
							if (score[2] < RetScore[2])
								RetScore = [prio[h][0], prio[h][1], score[2]];
							if (score[2] < beta)
								beta = score[2];
							if (beta <= alpha)
								return RetScore;
							nb_prio++;
						}
					}
					prio_checked = true;
				}
				if (nb_prio == 0 && board[i][j] == 0 && distance(i, j) && detectThree(i, j, player) < 2)
				{
					board[i][j] = player;
					captures = checkCaptureSim(i, j, opponent, current_player);
					nbCaptured[player] += captures.length;
					if (depth >= 8)
						score = minmax([i, j], depth - 5, alpha, beta, current_player, nbcap, ultraprio, captures.length + nbcapOpponent);
					else
						score = minmax([i, j], depth - 1, alpha, beta, current_player, nbcap, ultraprio, captures.length + nbcapOpponent);
					nbCaptured[player] -= captures.length;
					for (var p = 0; p < captures.length; p++)
						board[captures[p][0]][captures[p][1]] = captures[p][2];
					board[i][j] = 0;
					if (score[2] < RetScore[2])
						RetScore = [i, j, score[2]];
					if (score[2] < beta)
						beta = score[2];
					if (beta <= alpha)
						return RetScore;
					if (compterur_de_coups <= 2)
						return RetScore;
				}
			}
		}
		return RetScore;
	}
}
