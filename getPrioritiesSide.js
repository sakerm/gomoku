// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   getPrioritiesSide.js                               :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: lvasseur <marvin@42.fr>                    +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2019/08/05 19:50:12 by lvasseur          #+#    #+#             //
//   Updated: 2019/08/05 19:50:13 by lvasseur         ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

function	my_include(big, tab)
{
	for (var j = 0; j < big.length; j++)
		for (var i = 0; i < big[j].length; i++)
			if (big[j][i][0] == tab[0] && big[j][i][1] == tab[1])
				return true;
	return false;
}

function	fusion_tab(tab, tmpCoords)
{
	for (var i = 0; i < tmpCoords.length; i++)
		if (my_include([tab], tmpCoords[i]) == false)
			tab.push(tmpCoords[i].slice());
	return tab;
}

function	is_valuable_line_v(i, target, jstart, jend)
{
	var	count_1 = 0;
	var	count_2 = 0;

	for (var j = jstart; j <= jend; j++)
	{
		if (board[i][j] == current_player)
		{
			count_1++;
			count_2 = 0;
		}
		else if (board[i][j] == opponent)
		{
			count_2++;
			count_1 = 0;
		}
		if (count_1 == target || count_2 == target)
			return true;
	}
	return false;
}

function	getPrioritiesVertical(free, locked, topLeft, botRight, target)
{
	var		current_color;
	var		opened_left;
	var		opened_right;
	var		nbPieces;
	var		tmpCoords;
	var		bonusRange = 2;
	var		nbThree;

	if (target == 4)
		bonusRange = 1;
	for (var i = 0; i <= botRight[0]; i++)
	{
		if (is_valuable_line_v(i, target, topLeft[1], botRight[1]))
		{
			for (var j = topLeft[1]; j <= botRight[1] - (target - 1); j++)
			{
				tmpCoords = [];
				nbPieces = 0;
				current_color = 0;
				opened_right = true;
				opened_left = true;
				if (current_color == 0 && board[i][j] != 0)
					current_color = board[i][j];
				if (j - 1 >= 0 && board[i][j - 1] == 0 && current_color != 0 && my_include([tmpCoords], [i, j-1]) == false && detectThree(i, j-1, current_color) < 2)
					tmpCoords.push([i, j-1]);
				else
					opened_left = false;
				if (current_color != 0)
				{
					for (var k = j; k < j+target+bonusRange && k <= 18; k++)
					{
						if (board[i][k] == current_color)
							nbPieces++;
						else if (board[i][k] == 0 && my_include([tmpCoords], [i, k]) == false && detectThree(i, k, current_color) < 2)
							tmpCoords.push([i, k]);
						else
							break ;
						if (nbPieces == target)
						{
							if (k + 1 <= 18 && board[i][k+1] == 0 && my_include([tmpCoords], [i, k+1]) == false && detectThree(i, k+1, current_color) < 2)
								tmpCoords.push([i, k+1]);
							else
								opened_right = false;
							if (opened_right && opened_left)
								free = fusion_tab(free, tmpCoords);
							else if ((!opened_right && opened_left) || (opened_right && !opened_left) || target == 4)
								locked = fusion_tab(locked, tmpCoords);
						}
					}
				}
			}
		}
	}
}

function	is_valuable_line_h(i, target, jstart, jend)
{
	var	count_1 = 0;
	var	count_2 = 0;

	for (var j = jstart; j <= jend; j++)
	{
		if (board[j][i] == current_player)
		{
			count_1++;
			count_2 = 0;
		}
		else if (board[j][i] == opponent)
		{
			count_2++;
			count_1 = 0;
		}
		if (count_1 == target || count_2 == target)
			return true;
	}
	return false;
}

function	getPrioritiesHorizontal(free, locked, topLeft, botRight, target)
{
	var		current_color;
	var		opened_left;
	var		opened_right;
	var		nbPieces;
	var		tmpCoords;
	var		bonusRange = 2;

	if (target == 4)
		bonusRange = 1;
	for (var i = topLeft[1]; i <= botRight[1]; i++)
	{
		if (is_valuable_line_h(i, target, topLeft[0], botRight[0]))
		{
			for (var j = topLeft[0]; j <= botRight[0] - (target - 1); j++)
			{
				tmpCoords = [];
				nbPieces = 0;
				current_color = 0;
				opened_right = true;
				opened_left = true;
				if (current_color == 0 && board[j][i] != 0)
					current_color = board[j][i];
				if (j - 1 >= 0 && board[j-1][i] == 0 && current_color != 0 && my_include([tmpCoords], [j-1, i]) == false && detectThree(j-1, i, current_color) < 2)
					tmpCoords.push([j-1, i]);
				else
					opened_left = false;
				if (current_color != 0)
				{
					for (var k = j; k < j+target+bonusRange && k <= 18; k++)
					{
						if (board[k][i] == current_color)
							nbPieces++;
						else if (board[k][i] == 0 && my_include([tmpCoords], [k, i]) == false && detectThree(k, i, current_color) < 2)
							tmpCoords.push([k, i]);
						else
							break ;
						if (nbPieces == target)
						{
							if (k + 1 <= 18 && board[k+1][i] == 0 && my_include([tmpCoords], [k+1, i]) == false && detectThree(k+1, i, current_color) < 2)
								tmpCoords.push([k+1, i]);
							else
								opened_right = false;
							if (opened_right && opened_left)
								free = fusion_tab(free, tmpCoords);
							else if ((!opened_right && opened_left) || (opened_right && !opened_left) || target == 4)
								locked = fusion_tab(locked, tmpCoords);
						}
					}
				}
			}
		}
	}
}

function	is_valuable_line_d1(i, target)
{
	var	count_1 = 0;
	var	count_2 = 0;

	for (var j = 0; j <= 18; j++)
	{
		if (board[j][i - j] == current_player)
		{
			count_1++;
			count_2 = 0;
		}
		else if (board[j][i - j] == opponent)
		{
			count_2++;
			count_1 = 0;
		}
		if (count_1 == target || count_2 == target)
			return true;
	}
	return false;
}

function	getPrioritiesDiag1(free, locked, target)
{
	var		current_color;
	var		opened_left;
	var		opened_right;
	var		nbPieces;
	var		tmpCoords;
	var		bonusRange = 2;

	if (target == 4)
		bonusRange = 1;
	for (var i = 4; i <= 18; i++)
	{
		if (is_valuable_line_d1(i, target))
		{
			for (var j = 0; j <= 14 && i - j >= 0; j++)
			{
				tmpCoords = [];
				nbPieces = 0;
				current_color = 0;
				opened_right = true;
				opened_left = true;
				if (current_color == 0 && board[j][i - j] != 0)
					current_color = board[j][i - j];
				if (j-1 >= 0 && board[j-1][i-(j-1)] == 0 && current_color != 0 && my_include([tmpCoords], [j-1, i-(j-1)]) == false && detectThree(j-1, i-(j-1), current_color) < 2)
					tmpCoords.push([j-1, i-(j-1)]);
				else
					opened_left = false;
				if (current_color != 0)
				{
					for (var k = j; k < j+target+bonusRange && i - k >= 0 && k <= 18; k++)
					{
						if (board[k][i-k] == current_color)
							nbPieces++;
						else if (board[k][i-k] == 0 && my_include([tmpCoords], [k, i-k]) == false && detectThree(k, i-k, current_color) < 2)
							tmpCoords.push([k, i-k]);
						else
							break ;
						if (nbPieces == target)
						{
							if (k + 1 <= 18 && board[k+1][i-(k+1)] == 0 && my_include([tmpCoords], [k+1, i-(k+1)]) == false && detectThree(k+1, i-(k+1), current_color) < 2)
								tmpCoords.push([k+1, i-(k+1)]);
							else
								opened_right = false;
							if (opened_right && opened_left)
								free = fusion_tab(free, tmpCoords);
							else if ((!opened_right && opened_left) || (opened_right && !opened_left) || target == 4)
								locked = fusion_tab(locked, tmpCoords);
						}
					}
				}
			}
		}
	}
}

function	is_valuable_line_d1_2(j, target)
{
	var	count_1 = 0;
	var	count_2 = 0;

	for (var i = 0; i+j <= 18; i++)
	{
		if (board[i+j][18-i] == current_player)
		{
			count_1++;
			count_2 = 0;
		}
		else if (board[i+j][18-i] == opponent)
		{
			count_2++;
			count_1 = 0;
		}
		if (count_1 == target || count_2 == target)
			return true;
	}
	return false;
}

function	getPrioritiesDiag1_2(free, locked, target)
{
	var		current_color;
	var		opened_left;
	var		opened_right;
	var		nbPieces;
	var		tmpCoords;
	var		bonusRange = 2;

	if (target == 4)
		bonusRange = 1;
	for (var j = 1; j <= 14; j++)
	{
		if (is_valuable_line_d1_2(j, target))
		{
			for (var i = 0; i <= 18 && i + j <= 18; i++)
			{
				tmpCoords = [];
				nbPieces = 0;
				current_color = 0;
				opened_right = true;
				opened_left = true;
				if (current_color == 0 && board[i+j][18-i] != 0)
					current_color = board[i+j][18-i];
				if (i+j-1 >= 0 && board[i+j-1][18-(i-1)] == 0 && current_color != 0 && my_include([tmpCoords], [i+j-1, 18-(i-1)]) == false && detectThree(i+j-1, 18-(i-1), current_color) < 2)
					tmpCoords.push([i+j-1, 18-(i-1)]);
				else
					opened_left = false;
				if (current_color != 0)
				{
					for (var k = i; k < i+target+bonusRange && k <= 18 && k+j <= 18; k++)
					{
						if (board[k+j][18-k] == current_color)
							nbPieces++;
						else if (board[k+j][18-k] == 0 && my_include([tmpCoords], [k+j, 18-k]) == false && detectThree(k+j, 18-k, current_color) < 2)
							tmpCoords.push([k+j, 18-k]);
						else
							break ;
						if (nbPieces == target)
						{
							if (k+j+1 <= 18 && board[k+j+1][18-(k+1)] == 0 && my_include([tmpCoords], [k+j+1, 18-(k+1)]) == false && detectThree(k+j+1, 18-(k+1), current_color) < 2)
								tmpCoords.push([k+j+1, 18-(k+1)]);
							else
								opened_right = false;
							if (opened_right && opened_left)
								free = fusion_tab(free, tmpCoords);
							else if ((!opened_right && opened_left) || (opened_right && !opened_left) || target == 4)
								locked = fusion_tab(locked, tmpCoords);
						}
					}
				}
			}
		}
	}
}

function	is_valuable_line_d2(j, target)
{
	var	count_1 = 0;
	var	count_2 = 0;

	for (var i = 18; i >= 18-j; i--)
	{
		if (board[j-(18-i)][i] == current_player)
		{
			count_1++;
			count_2 = 0;
		}
		else if (board[j-(18-i)][i] == opponent)
		{
			count_2++;
			count_1 = 0;
		}
		if (count_1 == target || count_2 == target)
			return true;
	}
	return false;
}

function	getPrioritiesDiag2(free, locked, target)
{
	var		current_color;
	var		opened_left;
	var		opened_right;
	var		nbPieces;
	var		tmpCoords;
	var		bonusRange = 2;

	if (target == 4)
		bonusRange = 1;
	for (var j = 4; j <= 18; j++)
	{
		if (is_valuable_line_d2(j, target))
		{
			for (var i = 18; i >= 18-j; i--)
			{
				tmpCoords = [];
				nbPieces = 0;
				current_color = 0;
				opened_right = true;
				opened_left = true;
				if (current_color == 0 && board[j-(18-i)][i] != 0)
					current_color = board[j-(18-i)][i];
				if (j-(18-i)-1 >= 0 && board[j-(18-i)-1][i-1] == 0 && current_color != 0 && my_include([tmpCoords], [j-(18-i)-1, i-1]) == false && detectThree(j-(18-i)-1, i-1, current_color) < 2)
					tmpCoords.push([j-(18-i)-1, i-1]);
				else
					opened_left = false;
				if (current_color != 0)
				{
					for (var k = i; k < i+target+bonusRange && k <= 18 && j-(18-k) >= 0; k++)
					{
						if (board[j-(18-k)][k] == current_color)
							nbPieces++;
						else if (board[j-(18-k)][k] == 0 && my_include([tmpCoords], [j-(18-k), k]) == false && detectThree(j-(18-k), k, current_color) < 2)
							tmpCoords.push([j-(18-k), k]);
						else
							break ;
						if (nbPieces == target)
						{
							if (j-(18-k)+1 <= 18 && board[j-(18-k)+1][k+1] == 0 && my_include([tmpCoords], [j-(18-k)+1, k+1]) == false && detectThree(j-(18-k)+1, k+1, current_color) < 2)
								tmpCoords.push([j-(18-k)+1, k+1]);
							else
								opened_right = false;
							if (opened_right && opened_left)
								free = fusion_tab(free, tmpCoords);
							else if ((!opened_right && opened_left) || (opened_right && !opened_left) || target == 4)
								locked = fusion_tab(locked, tmpCoords);
						}
					}
				}
			}
		}
	}
}

function	is_valuable_line_d2_2(j, target)
{
	var	count_1 = 0;
	var	count_2 = 0;

	for (var i = 0; j+i <= 18; i++)
	{
		if (board[j+i][i] == current_player)
		{
			count_1++;
			count_2 = 0;
		}
		else if (board[j+i][i] == opponent)
		{
			count_2++;
			count_1 = 0;
		}
		if (count_1 == target || count_2 == target)
			return true;
	}
	return false;
}

function	getPrioritiesDiag2_2(free, locked, target)
{
	var		current_color;
	var		opened_left;
	var		opened_right;
	var		nbPieces;
	var		tmpCoords;
	var		bonusRange = 2;

	if (target == 4)
		bonusRange = 1;
	for (var j = 14; j >= 1; j--)
	{
		if (is_valuable_line_d2_2(j, target))
		{
			for (var i = 0; j+i <= 18; i++)
			{
				tmpCoords = [];
				nbPieces = 0;
				current_color = 0;
				opened_right = true;
				opened_left = true;
				if (current_color == 0 && board[j+i][i] != 0)
					current_color = board[j+i][i];
				if (j+i-1 >= 0 && board[j+i-1][i-1] == 0 && current_color != 0 && my_include([tmpCoords], [j+i-1, i-1]) == false && detectThree(j+i-1, i-1, current_color) < 2)
					tmpCoords.push([j+i-1, i-1]);
				else
					opened_left = false;
				if (current_color != 0)
				{
					for (var k = i; k < i+target+bonusRange && j+k <= 18; k++)
					{
						if (board[j+k][k] == current_color)
							nbPieces++;
						else if (board[j+k][k] == 0 && my_include([tmpCoords], [j+k, k]) == false && detectThree(j+k, k, current_color) < 2)
							tmpCoords.push([j+k, k]);
						else
							break ;
						if (nbPieces == target)
						{
							if (j+k+1 <= 18 && board[j+k+1][k+1] == 0 && my_include([tmpCoords], [j+k+1, k+1]) == false && detectThree(j+k+1, k+1, current_color) < 2)
								tmpCoords.push([j+k+1, k+1]);
							else
								opened_right = false;
							if (opened_right && opened_left)
								free = fusion_tab(free, tmpCoords);
							else if ((!opened_right && opened_left) || (opened_right && !opened_left) || target == 4)
								locked = fusion_tab(locked, tmpCoords);
						}
					}
				}
			}
		}
	}
}
