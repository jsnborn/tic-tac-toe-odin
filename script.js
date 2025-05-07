const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""]; // Initialize the board with empty strings

  const getBoard = () => board; // Returns the current state of the board

  const placeMark = (index, mark) => {
    if (board[index] === "") {
      board[index] = mark;
      return true;
    }
    return false;
  }; // Place a mark on the board at the specified index

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return { getBoard, placeMark, resetBoard };
})();

const Player = (name, mark) => {
  return { name, mark };
};

const GameController = (() => {
  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "O");

  let currentPlayer = player1;
  let gameOver = false;

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  const playRound = (index) => {
    if (gameOver) return;

    const placed = Gameboard.placeMark(index, currentPlayer.mark);
    if (!placed) return;

    const winningCombo = checkWin(currentPlayer.mark);
    if (winningCombo) {
      gameOver = true;
      DisplayController.highlightCells(winningCombo);
      DisplayController.showWinModal(`${currentPlayer.name} wins!`);
      return;
    }

    if (checkTie()) {
      gameOver = true;
      DisplayController.showWinModal("It's a tie!");
      return;
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;
    DisplayController.setMessage(`${currentPlayer.name}'s turn`);
  };

  const checkWin = (mark) => {
    for (let combo of winningCombos) {
      if (combo.every((index) => Gameboard.getBoard()[index] === mark)) {
        return combo; // Return winning combo
      }
    }
    return null;
  };

  const checkTie = () => {
    return Gameboard.getBoard().every((cell) => cell !== "");
  };

  const restart = () => {
    Gameboard.resetBoard();
    currentPlayer = player1;
    gameOver = false;
    DisplayController.render();
    DisplayController.setMessage(`${currentPlayer.name}'s turn`);
    DisplayController.closeWinModal();
  };

  return { playRound, restart };
})();

const DisplayController = (() => {
  const cells = document.querySelectorAll(".cell");
  const message = document.getElementById("message");
  const restartBtn = document.getElementById("restart");
  const restartModalBtn = document.getElementById("restartModal");
  const winModal = document.getElementById("winModal");
  const winMessage = document.getElementById("winMessage");
  const closeModal = document.getElementById("closeModal");

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      GameController.playRound(index);
      render();
    });
  });

  restartBtn.addEventListener("click", () => {
    GameController.restart();
  });

  restartModalBtn.addEventListener("click", () => {
    GameController.restart();
  });

  closeModal.addEventListener("click", () => {
    closeWinModal();
  });

  const render = () => {
    const board = Gameboard.getBoard();
    cells.forEach((cell, index) => {
      if (board[index] === "X") {
        cell.innerHTML = `<span class="x">X</span>`;
      } else if (board[index] === "O") {
        cell.innerHTML = `<span class="o">O</span>`;
      } else {
        cell.innerHTML = "";
        cell.style.backgroundColor = "#ffffffaa"; // reset highlight
      }
    });
  };

  const setMessage = (msg) => {
    message.textContent = msg;
  };

  const highlightCells = (combo) => {
    combo.forEach((index) => {
      cells[index].style.backgroundColor = "#90ee90"; // light green highlight
    });
  };

  const showWinModal = (msg) => {
    winMessage.textContent = msg;
    winModal.style.display = "flex"; // Show the modal
  };

  const closeWinModal = () => {
    winModal.style.display = "none"; // Hide the modal
  };

  return { render, setMessage, highlightCells, showWinModal, closeWinModal };
})();

document.addEventListener("DOMContentLoaded", () => {
  DisplayController.setMessage("Player 1's turn");
  DisplayController.render();
});
