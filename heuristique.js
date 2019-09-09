// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   heuristique.js                                     :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: lvasseur <marvin@42.fr>                    +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2019/08/05 19:50:37 by lvasseur          #+#    #+#             //
//   Updated: 2019/08/05 19:50:39 by lvasseur         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

var	nbHeuristique = 0;

function checkNbPieces(i, j, player)
{
	var nbpieces = 0;
	var space = 0;
	var counti = 0;
	var countj = 0;

	while ((i+counti > 0 && i+counti <= 18 && j+countj >= 0 && j+countj <= 18) && counti > -3 || (board[i+counti][j] == player && i+counti > 0))
		counti--;
	if (i+counti == 0)
		nbpieces--;
	else if (board[i+counti-1][j] != player && board[i+counti-1][j] != 0)
		nbpieces--;
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
		{
			if (board[i+counti][j] != player && board[i+counti][j] != 0)
				nbpieces--;
			break;
		}
		counti++;
	}

	space = 0;
	counti = 0;
	countj = 0;

	while ((i+counti > 0 && i+counti <= 18 && j+countj >= 0 && j+countj <= 18) && counti > -3 || (board[i+counti][j] == player && i+counti > 0))
		countj--;
	if (j+countj == 0)
		nbpieces--;
	else if (board[i+counti][j+countj-1] != player && board[i+counti][j+countj-1] != 0)
		nbpieces--;
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
		{
			if (board[i+counti][j+countj] != player && board[i+counti][j+countj] != 0)
				nbpieces--;
			break;
		}
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
	if (j+countj == 0 || i+counti == 0)
		nbpieces--;
	else if (board[i+counti-1][j+countj-1] != player && board[i+counti-1][j+countj-1] != 0)
		nbpieces--;
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
		{
			if (board[i+counti][j+countj] != player && board[i+counti][j+countj] != 0)
				nbpieces--;
			break;
		}
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
	if (j+countj == 0 || i+counti == 18)
		nbpieces--;
	else if (board[i+counti+1][j+countj-1] != player && board[i+counti+1][j+countj-1] != 0)
		nbpieces--;
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
		{
			if (board[i+counti][j+countj] != player && board[i+counti][j+countj] != 0)
				nbpieces--;
			break;
		}
		countj++;
		counti--;
	}
	return(-nbpieces);
}

function	check_five(i, j, player)
{
	var counti = 0;
	var countj = 0;
	var space = 0;

	while ((i+counti > 0 && i+counti <= 18 && j+countj >= 0 && j+countj <= 18) && counti > -5 || (board[i+counti][j] == player && i+counti > 0))
		counti--;
	while(i+counti >= 0 && i+counti <= 18 && j+countj >= 0 && j+countj <= 18)
	{
		if (board[i+counti][j+countj] != player && board[i+counti][j+countj] != 0)
			space = 0;
		else
			space++;
		if (space == 5)
			return(true);
		counti++;
	}
	
	counti = 0;
	countj = 0;
	space = 0;
	while ((i+counti > 0 && i+counti <= 18 && j+countj >= 0 && j+countj <= 18) && counti > -5 || (board[i+counti][j] == player && i+counti > 0 && j+countj > 0))
	{
		counti--;
		countj--;
	}
	while(i+counti >= 0 && i+counti <= 18 && j+countj >= 0 && j+countj <= 18)
	{
		if (board[i+counti][j+countj] != player && board[i+counti][j+countj] != 0)
			space = 0;
		else
			space++;
		if (space == 5)
			return(true);
		counti++;
		countj++;
	}

	counti = 0;
	countj = 0;
	space = 0;
	while ((i+counti > 0 && i+counti <= 18 && j+countj >= 0 && j+countj <= 18) && countj > -5 || (board[i+counti][j] == player && j+countj > 0))
		countj--;
	while(i+counti >= 0 && i+counti <= 18 && j+countj >= 0 && j+countj <= 18)
	{
		if (board[i+counti][j+countj] != player && board[i+counti][j+countj] != 0)
			space = 0;
		else
			space++;
		if (space == 5)
			return(true);
		countj++;
	}

	counti = 0;
	countj = 0;
	space = 0;
	while ((i+counti > 0 && i+counti < 18 && j+countj >= 0 && j+countj <= 18) && countj > -5 || (board[i+counti][j] == player && i+counti < 18 && j+countj > 0))
	{
		counti++;
		countj--;
	}
	while(i+counti >= 0 && i+counti <= 18 && j+countj >= 0 && j+countj <= 18)
	{
		if (board[i+counti][j+countj] != player && board[i+counti][j+countj] != 0)
			space = 0;
		else
			space++;
		if (space == 5)
			return(true);
		counti--;
		countj++;
	}
	return(false)
}

function	heuristique(i, j, player, win1, win2, prio, nbcap, nbcapOpponent)
{
	var	score = 0;
	var nb = 0;
	
	if (win1)
	{
		if (current_player == player)
			score += 500000;
		else
			score -= 500000;
	}
	if (win2)
	{
		if (opponent == player)
			score += 500000;
		else
			score -= 500000;
	}
	if (check_five(i, j, player) == true)
		score -= 100;
	nb = checkNbPieces(i, j, player);
	score += nb * 10 + ((player == current_player) ? (nbcap*1000 - nbcapOpponent*500) : (nbcapOpponent*1000-nbcap*500));
	nbHeuristique++;
	//console.log(i, j, nb, nbcap, nbcapOpponent, score);
	if (player == current_player)
		return score;
	return -score;
}
