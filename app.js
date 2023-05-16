import Map from './map.js';
import Snake from './snake.js';
import Food from './food.js'

const map = new Map;
map.initMap()
const food = new Food(map, Snake.snakeDiameter)
const snake = new Snake(map, food)
snake.initSnake()
let intervalId = null
let gameIsLost = false
const myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {})
food.generateFoodCords(Snake.snakeDiameter);
food.addFood()
const resetButton = document.querySelector('#resetButton')
resetButton.style.display = 'none'

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
    resetButton.style.display = 'block'
})