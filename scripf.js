const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
canvas.width = 20*box;
canvas.height = 20*box;

let snake = [];
snake[0] = { x: 9*box, y: 10*box};

let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};

let score = 0;
let direction;

document.addEventListener('keydown', setDirection);

function setDirection(event){
    if (event.keyCode == 37 && direction != 'RIGHT') direction = 'LEFT';
    else if (event.keyCode == 38 && direction != 'DOWN') direction = 'UP';
    else if (event.keyCode == 39 && direction != 'LEFT') direction = 'RIGHT';
    else if (event.keyCode == 40 && direction != 'UP') direction = 'DOWN';

}

function collision(newHead, snakeArray){
    for(let i = 0; i < snakeArray.length; i++){
        if (newHead.x == snakeArray[i].x && newHead.y == snakeArray[i].y) {
            return true;
        }
    }
    return false;
}

function draw(){
    ctx.clearRect(0,0, canvas.width, canvas.height);

    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = i == 0 ? 'green' : 'white';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'red';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == 'LEFT') snakeX -= box;
    if(direction == 'UP') snakeY -= box;
    if(direction == 'RIGHT') snakeX += box;
    if(direction == 'DOWN') snakeY += box;

    if(snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (
        snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)
    ){
        clearInterval(game);
        alert(`Game Over! Your score: ${score}`);

    }
    
    snake.unshift(newHead);

    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText(score, 2 * box, 1.5 * box);
}

let game = setInterval(draw, 100);
