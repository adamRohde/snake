const snake = {
    size: 5,
    length: 1,
    color: "black",
    dimensions: { width: 5, height: 5 },
    headPosition: { x: 50, y: 50 },
    tail: [],

    grow: function () {
        this.length += 1;
    },
    move: function () {
        if (snake.length > 0) {
            switch (direction) {
                case "STOP":
                    break;

                case "UP":
                    handleSnakeMove("y", -10);
                    break;

                case "DOWN":
                    handleSnakeMove("y", 10);
                    break;

                case "LEFT":
                    handleSnakeMove("x", -10);
                    break;

                case "RIGHT":
                    handleSnakeMove("x", 10);
                    break;
            }
        }
        //Tail Maintenance
        if (snake.tail.length > snake.length + 1) {
            snake.tail.splice(snake.tail.length - (snake.length + 1), 1);
        }
        outOfBounds();
        collideWithTail();
        ateTheApple();
    },
};

function handleSnakeMove(pos, delta) {
    ctx.clearRect(
        snake.tail[snake.tail.length - snake.length].x,
        snake.tail[snake.tail.length - snake.length].y,
        snake.dimensions.width,
        snake.dimensions.height
    );
    //----------------
    snake.headPosition[pos] += delta;
    ctx.fillStyle = "black";
    ctx.fillRect(
        snake.headPosition.x,
        snake.headPosition.y,
        snake.dimensions.width,
        snake.dimensions.height
    );
    //----------------
    snake.tail.push({ x: snake.headPosition.x, y: snake.headPosition.y });
}

function startGame() {
    myTicker = setInterval((direction) => {
        snake.move(direction);
    }, 200);
}
