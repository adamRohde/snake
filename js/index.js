let apple;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let gameOverFlag;

window.onload = () => {
    initGame();
};

function initGame() {
    gameOverFlag = false;

    checkHighScore();
    setupGameBoard();
    setupSnake();
    newApple();
    startGame();
}

function setupGameBoard() {
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    scoreDisplay.textContent = "Click any arrow key to start game";
}

function setupSnake() {
    snake.headPosition.x = 50;
    snake.headPosition.y = 50;
    ctx.fillRect(
        snake.headPosition.xPosition,
        snake.headPosition.yPosition,
        snake.dimensions.width,
        snake.dimensions.height
    );
    snake.tail.push({ x: snake.dimensions.width, y: snake.dimensions.height });
}

function newApple() {
    let key = "generatePosition";
    switch (key) {
        case "generatePosition":
            apple = {
                x: Math.floor(Math.floor(Math.random() * 29) * 10 + 10),
                y: Math.floor(Math.floor(Math.random() * 14) * 10 + 10),
            };
            key = "check";
        case "check":
            let badApple = false;
            for (let i = 0; i < snake.length; i++) {
                if (apple.x == snake.tail[i].x && apple.y == snake.tail[i].y) {
                    console.log("apple on the tail, apple on the tail, apple on the tail!!!");
                    badApple = true;
                }
            }
            if (!badApple) {
                key = "create";
            } else {
                newApple();
                break;
            }
        case "create":
            ctx.fillStyle = "darkgrey";
            ctx.fillRect(apple.x, apple.y, 5, 5);
    }
}

function outOfBounds() {
    if (
        snake.headPosition.x >= 300 ||
        snake.headPosition.x <= 0 ||
        snake.headPosition.y >= 150 ||
        snake.headPosition.y <= 0
    ) {
        direction = "STOP";
        gameOver();
    }
}

let scoreFunction = (function () {
    let score = 0;
    function add() {
        score += 1;
        console.log("the score is -  " + score);
        scoreDisplay.textContent = score;
    }
    return {
        newPoint: function () {
            add();
        },
        resetScore: function () {
            score = 0;
        },
        theScore: function () {
            return score;
        },
    };
})();

function ateTheApple() {
    if (snake.headPosition.x === apple.x && snake.headPosition.y === apple.y) {
        snake.grow();
        newApple();
        scoreFunction.newPoint();
    }
}

function collideWithTail() {
    for (let i = 0; i < snake.length; i++) {
        if ((snake.headPosition.x == snake.tail[i].x) & (snake.headPosition.y == snake.tail[i].y)) {
            console.log("You ran into your own tail dummy!");
            gameOver();
        }
    }
}

function gameOver() {
    checkHighScore();
    snake.tail.length = 1;
    snake.length = 1;
    gameOverFlag = true;
    clearInterval(myTicker);
    scoreFunction.resetScore();
    showGameOverModal();
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function checkHighScore() {
    let currentHigh = score.textContent;
    let highScoreValue = JSON.parse(localStorage.getItem("high_score"));
    if (highScoreValue == null) {
        localStorage.setItem("high_score", JSON.stringify(0));
    } else {
        highScore.textContent = "The current high score is: " + highScoreValue;
        if (parseInt(currentHigh) > parseInt(highScoreValue)) {
            console.log("new high");
            localStorage.setItem("high_score", JSON.stringify(currentHigh));
        }
    }
}
