var	nbaa = 0;

function	distance(hx, hy)
{
	var xx;
	var yy;

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

function	minmax(position, depth, alpha, beta, player, prio)
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

	if (depth == 6)
		console.log(prio);
	if ((win1 = checkWin(position[0], position[1], current_player)))
	{
		win2 = false;
		return [position[0], position[1], (depth+1)*heuristique(position[0], position[1], player, win1, win2)];
	}
	if ((win2 = checkWin(position[0], position[1], opponent)))
	{
		win1 = false;
		return [position[0], position[1], (depth+1)*heuristique(position[0], position[1], player, win1, win2)];
	}
	if (depth == 0)
		return [position[0], position[1], heuristique(position[0], position[1], player, win1, win2)];
	if (player == current_player && prio)
	{
		RetScore = [0, 0, -10000000];
		for (var i = topLeft[0]; i <= botRight[0]; i++)
		{
			for (var j = topLeft[1]; j <= botRight[1]; j++)
			{
				if (prio_checked == false)
				{
					for (var h = 0; h < prio.length; h++)
					{
						for (var l = 0; prio[h] !== undefined && l < prio[h].length; l++)
						{
							if (prio[h][l] !== undefined && prio[h][l].length == 2 && board[prio[h][l][0]][prio[h][l][1]] == 0 && (tmpThree = detectThree(prio[h][l][0], prio[h][l][1], player))[0] < 2)
							{
								board[prio[h][l][0]][prio[h][l][1]] = player;
								score = minmax(prio[h][l], depth - 1, alpha, beta, opponent, tmpThree[1]);
								board[prio[h][l][0]][prio[h][l][1]] = 0;
								if (score[2] > RetScore[2])
									RetScore = [prio[h][l][0], prio[h][l][1], score[2]];
								if (score[2] > alpha)
									alpha = score[2];
								if (beta <= alpha)
									return RetScore;
							}
						}
					}
					prio_checked = true;
				}
				if (board[i][j] == 0 && distance(i, j) && (tmpThree = detectThree(i, j, player))[0] < 2)
				{
					board[i][j] = player;
					score = minmax([i, j], depth - 1, alpha, beta, opponent, tmpThree[1]);
					board[i][j] = 0;
					if (score[2] > RetScore[2])
						RetScore = [i, j, score[2]];
					if (score[2] > alpha)
						alpha = score[2];
					if (beta <= alpha)
						return RetScore;
				}
			}
		}
		return RetScore;
	}
	else
	{
		RetScore = [0, 0, 10000000];
		for (var i = topLeft[0]; i <= botRight[0]; i++)
		{
			for (var j = topLeft[1]; j <= botRight[1]; j++)
			{
				if (prio_checked == false)
				{
					for (var h = 0; h < prio.length; h++)
					{
						for (var l = 0; prio[h] !== undefined && l < prio[h].length; l++)
						{
							if (prio[h][l] !== undefined && prio[h][l].length == 2 && board[prio[h][l][0]][prio[h][l][1]] == 0 && (tmpThree = detectThree(prio[h][l][0], prio[h][l][1], player))[0] < 2)
							{
								board[prio[h][l][0]][prio[h][l][1]] = player;
								score = minmax(prio[h][l], depth - 1, alpha, beta, current_player, tmpThree[1]);
								board[prio[h][l][0]][prio[h][l][1]] = 0;
								if (score[2] < RetScore[2])
									RetScore = [prio[h][l][0], prio[h][l][1], score[2]];
								if (score[2] < beta)
									beta = score[2];
								if (beta <= alpha)
									return RetScore;
							}
						}
					}
					prio_checked = true;
				}
				if (board[i][j] == 0 && distance(i, j) && (tmpThree = detectThree(i, j, player))[0] < 2)
				{
					board[i][j] = player;
					score = minmax([i, j], depth - 1, alpha, beta, current_player, tmpThree[1]);
					board[i][j] = 0;
					if (score[2] < RetScore[2])
						RetScore = [i, j, score[2]];
					if (score[2] < beta)
						beta = score[2];
					if (beta <= alpha)
						return RetScore;
				}
			}
		}
		return RetScore;
	}
}