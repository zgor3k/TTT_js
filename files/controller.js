﻿var setImage = function (position, symbol) {
	if (symbol == "CROSS") {
		$(fieldTabs[position]).find(".cross").css("display","block");
	} else {
		$(fieldTabs[position]).find(".ring").css("display","block");
	}
};

var disabledFields = function () {
        $(".gridding").unbind("click", playerMove);
		$(".gridding").css("cursor","auto");
};

var enabledFields = function () {
        $(".gridding").on("click", playerMove);
		$(".gridding").css("cursor","pointer");
};

var drawGrid = function () {
	var imageX = "CROSS";
	var imageO = "RING";

    for (var i = 0; i < fieldTabs.length; i++) {
        if (game.getGrid().getSymbol(i) == "CROSS") {
            setImage(i, imageX);
        } else if (game.getGrid().getSymbol(i) == "RING") {
            setImage(i, imageO);
        }
    }
};

var setNewGame = function (player1,player2) {
	fieldTabs = [field0, field1, field2, field3, field4, field5, field6, field7, field8];
	
    this.game = new Game(player1, player2);
};

var setPoints = function () {
   $(".rankingPlayer1").text(game.getPlayer1().getPoints());
   $(".rankingPlayer2").text(game.getPlayer2().getPoints());
};

var setCurrentPlayerImg = function () {
    if (game.getCurrentPlayer().getSymbol() == "CROSS") {
	    $(".currentPlayer").find(".ring").css("display","none");
        $(".currentPlayer").find(".cross").css("display","block");
    } else {
        $(".currentPlayer").find(".cross").css("display","none");
        $(".currentPlayer").find(".ring").css("display","block");
    }
};

var playerMove = function() {
	var fieldNumber = $(this).attr("id").slice(5);
	game.playerMove(fieldNumber);
	drawGrid();

	if (game.checkWin()) {
		disabledFields();
		setPoints();
		alert("The winner is: " + game.getWinnerPlayer().getName());
		$("#next").show();
	} else {
		setCurrentPlayerImg();
		if (game.getMoveCounter() == 9) {
			disabledFields();
			alert("DRAW GAME");
			$("#next").show();
		}
	}
};

var resetGame = function() {
	game.getPlayer1().setPoints(0);
	game.getPlayer2().setPoints(0);
	setPoints();
	game.getGrid().resetGrid();
	game.resetMoveCounter();
	enabledFields();
	setCurrentPlayerImg();
	drawGrid();
	$("#next").hide();
};

var resetField = function () {
	game.getGrid().resetGrid();
	game.resetMoveCounter();
	enabledFields();
	setCurrentPlayerImg();
	drawGrid();
	$("#next").hide();
};

$(document).ready(function() {
var game = new Game();
var field0 = $("#field0");
var field1 = $("#field1");
var field2 = $("#field2");
var field3 = $("#field3");
var field4 = $("#field4");
var field5 = $("#field5");
var field6 = $("#field6");
var field7 = $("#field7");
var field8 = $("#field8");

$(".gridding").on("click", playerMove);
$("button#next").on("click", resetField);
$("button#reset").on("click", resetGame);

var player1 = new Player("KÓŁKO",Symbol.RING);
var player2 = new Player("KRZYŻYK",Symbol.CROSS);
setNewGame(player1,player2);
setCurrentPlayerImg();
});




