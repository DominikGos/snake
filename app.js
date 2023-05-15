import Snake from './snake.js';
import Food from './food.js'

const map = document.querySelector('#map');
const food = new Food(map, Snake.snakeDiameter)
const snake = new Snake(map, food)
snake.initSnake()
let intervalId = null

food.generateFoodCords(Snake.snakeDiameter);
food.addFood()

document.addEventListener('keydown', function (e) {
    let snakeCords = snake.getSnakeCords()

    if (intervalId) {
        clearInterval(intervalId)
    } 

    intervalId = snake.moveSnake(e.key, snakeCords)
});