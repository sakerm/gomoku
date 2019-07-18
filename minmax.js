function	distance(hx, hy)
{
	var xx;
	var yy;

	if (hx <= 1)
		xx = 0;
	else
		xx = hx - 2;
	while (xx <= hx + 2 && xx <= 18)
	{
		if (hy <= 1)
			yy = 0;
		else
			yy = hy - 2;
		while (yy <= hy + 2 && yy <= 18)
		{
			if ((yy != hy || xx != hx) && board[xx][yy] != 0)
				return true;
			yy++;
		}
		xx++;
	}
	return false;
}

function	heuristique(i, j, player)
{
	var	score = 0;

	x = i;
	y = j;
	if (detectThree() == 1)
		score += 100;
	return score;
}

function	minmax(position, depth, alpha, beta, player, start)
{
	var	score;
	var	maxScore;
	var	minScore;

	if (depth == 0 /* || game_over() */)
		return [position[0], position[1], heuristique(position[0], position[1], player)];
	if (player == current_player)
	{
		maxScore = [0, 0, -100000];
		for (var i = 0; i < 19; i++)
		{
			for (var j = 0; j < 19; j++)
			{
				if (board[i][j] == 0 && distance(i, j))
				{
					board[i][j] = player;
					score = minmax([i, j], depth - 1, opponent, false);
					board[i][j] = 0;
					if (score[2] > maxScore[2])
						maxScore = [i, j, score[2]];
					if (score[2] > alpha)
						alpha = score[2];
					if (beta <= alpha)
						return maxScore;
				}
			}
		}
		return maxScore;
	}
	else
	{
		minScore = [0, 0, 100000];
		for (var i = 0; i < 19; i++)
		{
			for (var j = 0; j < 19; j++)
			{
				if (board[i][j] == 0 && distance(i, j))
				{
					board[i][j] = player;
					score = minmax([i, j], depth - 1, current_player, false);
					board[i][j] = 0;
					if (score[2] < minScore[2])
						minScore = [i, j, score[2]];
					if (score[2] < beta)
						beta = score[2];
					if (beta <= alpha)
						return minScore;
				}
			}
		}
		return minScore;
	}
}