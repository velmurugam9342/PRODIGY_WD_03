const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

const xScoreEl = document.getElementById("xScore");
const oScoreEl = document.getElementById("oScore");
const drawScoreEl = document.getElementById("drawScore");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

// SCORES
let xWins = 0, oWins = 0, draws = 0;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

resetBtn.addEventListener("click", resetGame);

function handleCellClick(e) {
    const index = e.target.dataset.index;

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    checkWinner();
}

function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {

            document.querySelector(`[data-index="${a}"]`).classList.add("win");
            document.querySelector(`[data-index="${b}"]`).classList.add("win");
            document.querySelector(`[data-index="${c}"]`).classList.add("win");

            statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
            updateScore(currentPlayer);
            gameActive = false;
            return;
        }
    }

    if (!board.includes("")) {
        statusText.textContent = "It's a Draw! 🤝";
        draws++; 
        drawScoreEl.textContent = draws;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function updateScore(player) {
    if (player === "X") {
        xWins++;
        xScoreEl.textContent = xWins;
    } else {
        oWins++;
        oScoreEl.textContent = oWins;
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X's Turn";

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("win");
    });
}

/* ----------------------------
   DARK / LIGHT MODE SWITCHING
----------------------------- */

const themeBtn = document.getElementById("themeBtn");
let theme = localStorage.getItem("theme") || "dark";

setTheme(theme);

themeBtn.onclick = () => {
    theme = theme === "dark" ? "light" : "dark";
    setTheme(theme);
};

function setTheme(mode) {
    document.body.className = mode;
    localStorage.setItem("theme", mode);
    themeBtn.textContent = mode === "dark" ? "Light Mode ☀" : "Dark Mode 🌙";
}
