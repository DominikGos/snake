import Map from './map.js';
import Snake from './snake.js';
import Food from './food.js'
import Point from './point.js';

const map = new Map;
map.initMap()
const point = new Point
point.initPointCounter() 
const food = new Food(map)
const snake = new Snake(map, food, point)
snake.initSnakeHead()
snake.setDefaultSnakePosition()
let intervalId = null
let gameIsLost = false
const myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {})
food.generateFoodCoords(Snake.snakeDiameter);
food.addFood()
const resetButton = document.querySelector('#resetButton')
let timeElapsed = null 
let start = null
let end = null 

document.addEventListener('keydown', function (e) {
    if(gameIsLost) {
        return
    }

    end = Date.now();
    
    if(start === null) {
        timeElapsed = Snake.snakeDelay + 1
    } else {
        timeElapsed = end - start;
    }

    let key = transformKey(e.key)

    if(timeElapsed > Snake.snakeDelay) {

        let snakeCoords = snake.getSnakeHeadCoords()
        
        if (intervalId) {
            clearInterval(intervalId)
        } 
    
        intervalId = snake.moveSnakeHead(key, snakeCoords)
    }

    start = Date.now();
});

map.map.addEventListener('snakeDied', function(e) {
    gameIsLost = true
    clearInterval(intervalId)
    myModal.show()
})

resetButton.addEventListener('click', resetGame)

function resetGame() {
    snake.resetSnake()
    point.resetPoints()
    snake.setDefaultSnakePosition()
    gameIsLost = false
    myModal.hide()
}

function transformKey(key) {
    switch (key) {
        case 'ArrowLeft':
            key = 'a'
            break;
        case 'ArrowUp':
            key = 'w'
            break;
        case 'ArrowRight':
            key = 'd'
            break;
        case 'ArrowDown':
            key = 's'
            break;
    }

    key = key.toLowerCase()

    return key
}