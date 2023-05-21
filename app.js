import Map from './map.js';
import Snake from './snake.js';
import Food from './food.js'
import Point from './point.js';

const map = new Map;
map.initMap()
const point = new Point
point.initPointCounter() 
const food = new Food(map, Snake.snakeDiameter)
const snake = new Snake(map, food, point)
snake.initSnakeHead()
let intervalId = null
let gameIsLost = false
const myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {})
food.generateFoodCords(Snake.snakeDiameter);
food.addFood()
const modalButton = document.querySelector('#modalButton')
const resetButton = document.querySelector('#resetButton')

document.addEventListener('keydown', function (e) {
    let key = transformKey(e.key)

    if( ! gameIsLost) {
        let snakeCords = snake.getSnakeHeadCords()
    
        if (intervalId) {
            clearInterval(intervalId)
        } 
    
        intervalId = snake.moveSnakeHead(key, snakeCords)
    }
});

map.map.addEventListener('snakeDied', function(e) {
    gameIsLost = true
    clearInterval(intervalId)
    myModal.show()
})

resetButton.addEventListener('click', resetGame)

function resetGame() {
    point.resetPoints()
    snake.setSnakeCords({x: 0, y: 0})
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

    return key
}