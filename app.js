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
snake.initSnake()
let intervalId = null
let gameIsLost = false
const myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {})
food.generateFoodCords(Snake.snakeDiameter);
food.addFood()
const modalButton = document.querySelector('#modalButton')
const resetButton = document.querySelector('#resetButton')

document.addEventListener('keydown', function (e) {
    if( ! gameIsLost) {
        let snakeCords = snake.getSnakeCords()
    
        if (intervalId) {
            clearInterval(intervalId)
        } 
    
        intervalId = snake.moveSnake(e.key, snakeCords)
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