var Game = function(player1, player2) {

	var self = {};
	
	var combinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
	
	var player1;
	var player2;
	var currentPlayer;
	var winnerPlayer;
	var moveCounter = 0;
	
	var grid = new Grid();
	
	this.player1 = player1;
	this.player2 = player2;
	
	var losNumber = Math.floor((Math.random() * 2));
    if (losNumber == 0) {
    currentPlayer = player1;
		} else {
    currentPlayer = player2;
	}
	
	self.getPlayer1 = function () {
		return player1;
	};
	
	self.getPlayer2 = function () {
		return player2;
	};
	
	self.checkWin = function () {
		winnerPlayer = null;
		for (i = 0; i < combinations.length; i++) {
			var pos1 = combinations[i][0];
			var pos2 = combinations[i][1];
			var pos3 = combinations[i][2];
			
			if ((grid.getSymbol(pos1) == grid.getSymbol(pos2)) && ((grid.getSymbol(pos3) == grid.getSymbol(pos2))) && (grid.getSymbol(pos3) == grid.getSymbol(pos1))) {
                if (grid.getSymbol(pos1) == player1.getSymbol()) {
                    winnerPlayer = player1;
                    player1.setPoints(player1.getPoints() + 1);
                    return true;
                } else if (grid.getSymbol(pos1) == player2.getSymbol()) {
                    winnerPlayer = player2;
                    player2.setPoints(player2.getPoints() + 1);
                    return true;
                }
            }
		}
		return false;
	};
	
	self.playerMove = function (position) {
		if (grid.isPositionAvaiable(position) && !self.checkWin()) {
			grid.setPosition(position, currentPlayer.getSymbol());
			self.switchPlayer();
		}
		//grid.showGrid();
	};
	
	self.getWinnerPlayer = function () {
		return winnerPlayer;
	};
	
	self.switchPlayer = function() {
		moveCounter++;
		if (currentPlayer.getSymbol() == player1.getSymbol()) {
			currentPlayer = player2;
		} else {
			currentPlayer = player1;
		}
	};
	
	self.getCurrentPlayer = function() {
		return currentPlayer;
	};
	
	self.getMoveCounter = function () {
		return moveCounter;
	};
	
	self.resetMoveCounter = function () {
		moveCounter = 0;
	};
	
	self.getGrid = function () {
		return grid;
	};
	
return self;

};