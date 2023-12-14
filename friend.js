(function Game() {
    var board = document.getElementById('board');
    var boxes = document.querySelectorAll('li');
    var restart = document.getElementById('restart');
    var resetOne = document.getElementById('reset-1');
    var resetTwo = document.getElementById('reset-2');
    var displayTurn = document.getElementById('player-turn');
    var alerts = document.getElementById('alerts');
    var displayOneScore = document.getElementById('p1-score');
    var displayTwoScore = document.getElementById('p2-score');
  

    var scenario = { 'player1' : 'x', 'player2' : 'o'};
    var gameBoard = [];
    var pOneScore = 0;
    var pTwoScore = 0;
    var turns;
    var currentScenario;
  

    var init = function() {
      turns = 0;
  
      currentScenario = computeScenario();
  
      gameBoard[0] = new Array(3);
      gameBoard[1] = new Array(3);
      gameBoard[2] = new Array(3);
  
      for (var i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener('click', clickHandler, false);
        }
        restart.addEventListener('click', restartHandler, false);
        resetOne.addEventListener('click', resetOneHandler, false);
        resetTwo.addEventListener('click', resetTwoHandler, false);
    }
  
    var clickHandler = function() {
      this.removeEventListener('click', clickHandler);
  
      this.className = currentScenario;
      this.innerHTML = currentScenario;
  
      var position = this.getAttribute('position').split(',');
      gameBoard[position[0]][position[1]] = computeScenario() == 'x' ? 1 : 0;
  
      if (checkStatus()) {
        gameWon();
      }
  
      turns++;
      currentScenario = computeScenario();
      displayTurn.className = currentScenario;
    }
  
    var restartHandler = function() {
      clearEvents();
      init();

      for (var i = 0; i < boxes.length; i++) {
        boxes[i].className = '';
        boxes[i].innerHTML = '';
      }
  
        displayTurn.className = currentScenario;
        alerts.className = '';
      }
  
    var resetOneHandler = function() {
      pOneScore = 0;
      displayOneScore.innerHTML = '';
    }

    var resetTwoHandler = function() {
      pTwoScore = 0;
      displayTwoScore.innerHTML = '';
    }

    var computeScenario = function() {
      return (turns % 2 == 0) ? scenario.player1 : scenario.player2;
    }

    var checkStatus = function() {
      var used_boxes = 0;
  
      for (var rows = 0; rows < gameBoard.length; rows++ ) {
        var row_total = 0;
        var column_total = 0;
  
        for (var columns = 0; columns < gameBoard[rows].length; columns++) {
          row_total += gameBoard[rows][columns];
          column_total += gameBoard[columns][rows];
  
          if (typeof gameBoard[rows][columns] !== "undefined") {
            used_boxes++;
          }
        }
  
        var diagonal_tl_br = gameBoard[0][0] + gameBoard[1][1] + gameBoard[2][2]; // diagonal top left to bottom right
        var diagonal_tr_bl = gameBoard[0][2] + gameBoard[1][1] + gameBoard[2][0]; // diagonal top right to bottom left
  
        if (diagonal_tl_br == 0 || diagonal_tr_bl == 0 || diagonal_tl_br == 3 || diagonal_tr_bl == 3) {
          return true;
        }

        if (row_total == 0 || column_total == 0 || row_total == 3 || column_total == 3) {
          return true;
        }

        if (used_boxes == 9) {
          gameDraw();
        }
      }
    }
  

    var gameDraw = function() {
      alerts.className = 'draw';
      clearEvents();
    }
  
    var clearEvents = function() {
      for(var i = 0; i < boxes.length; i++) {
        boxes[i].removeEventListener('click', clickHandler);
      }
    }
  
    var gameWon = function() {
      clearEvents();
      alerts.className = 'p' + computeScenario() + '-win';
      switch(computeScenario()) {
        case 'x':
          displayOneScore.innerHTML = ++pOneScore;
          break;
        case 'o':
          displayTwoScore.innerHTML = ++pTwoScore;
        }
    }
    board && init();
    })();
