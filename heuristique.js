var	nbHeuristique = 0;

function checkNbPieces(i, j, player)
{
	var nbpieces = 0;
	var space = 0;
	var counti = 0;
	var countj = 0;

	while ((i+counti > 0 && i+counti <= 18 && j+countj >= 0 && j+countj <= 18) && counti > -3 || (board[i+counti][j] == player && i+counti > 0))
		counti--;
	while((i+counti >= 0 && i+counti <= 18 && j+countj >= 0 && j+countj <= 18))
	{
		if (board[i+counti][j] == player)
		{
			nbpieces++;
			if (nbpieces == 1) 
				space = 0;
		}
		else if (board[i+counti][j] == 0)
			space++;
		else if (space == 2 || (board[i+counti][j] != player && board[i+counti][j] != 0))
			break;
		counti++;
	}

	space = 0;
	counti = 0;
	countj = 0;

	while ((i+counti > 0 && i+counti <= 18 && j+countj >= 0 && j+countj <= 18) && counti > -3 || (board[i+counti][j] == player && i+counti > 0))
		countj--;
	while((i+counti >= 0 && i+counti <= 18 && j+countj >= 0 && j+countj <= 18))
	{
		if (board[i+counti][j+countj] == player)
		{
			nbpieces++;
			if (nbpieces == 1) 
				space = 0;
		}
		else if (board[i+counti][j+countj] == 0)
			space++;
		else if (space == 2 || (board[i+counti][j+countj] != player && board[i+counti][j+countj] != 0))
			break;
		countj++;
	}

	space = 0;
	counti = 0;
	countj = 0;

	while ((i+counti > 0 && i+counti <= 18 && j+countj > 0 && j+countj <= 18) && countj > -3 && counti > -3 || (board[i+counti][j+countj] == player && j+countj > 0 && i+counti > 0))
	{
		counti--;
		countj--;
	}
	while((i+counti >= 0 && i+counti <= 18 && j+countj >= 0 && j+countj <= 18))
	{
		if (board[i+counti][j+countj] == player)
		{
			nbpieces++;
			if (nbpieces == 1) 
				space = 0;
		}
		else if (board[i+counti][j+countj] == 0)
			space++;
		else if (space == 2 || (board[i+counti][j+countj] != player && board[i+counti][j+countj] != 0))
			break;
		countj++;
		counti++;
	}

	space = 0;
	counti = 0;
	countj = 0;

	while ((i+counti > 0 && i+counti < 18 && j+countj > 0 && j+countj <= 18) && countj > -3 && counti < 3 || (board[i+counti][j+countj] == player && j+countj > 0 && i+counti < 18))
	{
		counti++;
		countj--;
	}
	while((i+counti >= 0 && i+counti <= 18 && j+countj >= 0 && j+countj <= 18))
	{
		if (board[i+counti][j+countj] == player)
		{
			nbpieces++;
			if (nbpieces == 1) 
				space = 0;
		}
		else if (board[i+counti][j+countj] == 0)
			space++;
		else if (space == 2 || (board[i+counti][j+countj] != player && board[i+counti][j+countj] != 0))
			break;
		countj++;
		counti--;
	}
	return(nbpieces);
}

function	heuristique(i, j, player, win1, win2, prio, nbcap)
{
	var	score = 0;
	var nb = 0;
	
	if (win1)
	{
		if (current_player == player)
			score += 50000;
		else
			score -= 50000;
	}
	if (win2)
	{
		if (opponent == player)
			score += 50000;
		else
			score -= 50000;
	}
	nb = checkNbPieces(i, j, player);
	score += nb * 10 + nbcap*2;
	nbHeuristique++;
	if (player == current_player)
		return score;
	return -score;
}