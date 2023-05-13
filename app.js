import Snake from './snake.js';
import Food from './food.js'

const map = document.querySelector('#map');
const food = new Food(map, Snake.snakeDiameter)
const snake = new Snake(map, food)
snake.initSnake()
let intervalId = null
let previousKey = null
let timeElapsed = null 
let start = null
let end = null 

food.generateFoodCords(Snake.snakeDiameter);
food.addFood()

document.addEventListener('keydown', function (e) {
    end = Date.now();
    const keys = {
        current: e.key,
        previous: previousKey
    }

    if(start === null) {
        timeElapsed = Snake.snakeDelay + 1
    } else {
        timeElapsed = end - start;
    }
    
    let snakeCords = snake.getSnakeCords()

    if (intervalId) {
        clearInterval(intervalId)
    } 

    intervalId = snake.moveSnake(keys, snakeCords)
    previousKey = e.key
    start = Date.now();
});