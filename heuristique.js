function	heuristique(i, j, player, win1, win2)
{
	var	score = 0;

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
	if (player == current_player)
		return score;
	return -score;
}