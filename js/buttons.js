let direction;

const scoreDisplay = document.getElementById("score");
const highScore = document.getElementById("high-score");

document.onkeydown = function (e) {
    e.preventDefault();
    if (e.key == " ") {
        direction = "STOP";
    }

    if (e.key == "ArrowUp") {
        direction = "UP";
    }
    if (e.key == "ArrowDown") {
        direction = "DOWN";
    }

    if (e.key == "ArrowLeft") {
        direction = "LEFT";
    }

    if (e.key == "ArrowRight") {
        direction = "RIGHT";
    }
    if (gamOverModal == true) {
        if (e.key == " ") {
            hideGameOverModal();
            initGame();
        }
    }
};

let gamOverModal = null;
document.getElementById("close-gameover-modal").addEventListener("click", () => {
    hideGameOverModal();
    initGame();
});

function hideGameOverModal() {
    document.getElementById("game-over").style.display = "none";
    gamOverModal = null;
}

function showGameOverModal() {
    document.getElementById("game-over").style.display = "block";
    gamOverModal = true;
}
