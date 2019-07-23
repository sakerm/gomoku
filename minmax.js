var	nbaa = 0;

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

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function	heuristique(i, j, playerv)
{
	var	score = 0;

	//score += getRandomInt(500);
	if (checkWin(i, j, current_player))
	{
		if (current_player == playerv)
			score += 5000;
		else
			score -= 5000;
	}
	if (checkWin(i, j, opponent))
	{
		if (opponent == playerv)
			score += 5000;
		else
			score -= 5000;
	}
	if (playerv == current_player)
		return score;
	return -score;
}

function	minmax(position, depth, alpha, beta, playerk)
{
	var	score;
	var	RetScore;
	var	topLeft = getTopLeft();
	var	botRight = getBotRight();
	var a;

	nbaa++;
	if (depth == 0 || checkWin(position[0], position[1], current_player) || checkWin(position[0], position[1], opponent))
		return [position[0], position[1], heuristique(position[0], position[1], playerk)];
	if (playerk == current_player)
	{
		RetScore = [0, 0, -1000000];
		for (var i = topLeft[0]; i <= botRight[0]; i++)
		{
			for (var j = topLeft[1]; j <= botRight[1]; j++)
			{
				if (board[i][j] == 0)
				{
					board[i][j] = playerk;
					score = minmax([i, j], depth - 1, alpha, beta, opponent);
					board[i][j] = 0;
					if (score[2] > RetScore[2])
					{
						//console.log(score[2]);
						RetScore = [i, j, score[2]];
					}
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
		RetScore = [0, 0, 1000000];
		for (var i = topLeft[0]; i <= botRight[0]; i++)
		{
			for (var j = topLeft[1]; j <= botRight[1]; j++)
			{
				if (board[i][j] == 0)
				{
					board[i][j] = playerk;
					score = minmax([i, j], depth - 1, alpha, beta, current_player);
					board[i][j] = 0;
					if (score[2] < RetScore[2])
					{
						//console.log(score[2]);
						RetScore = [i, j, score[2]];
					}
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