import Snake from './snake.js';
import Food from './food.js'

const map = document.querySelector('#map');
const food = new Food(map)
const snake = new Snake(map)
snake.initSnake()
let intervalId = null
let previousKey = null
let timeElapsed = null 
let start = null
let end = null 

food.generateFoodCords(snake.snakeDiameter);
food.addFood()
document.addEventListener('keydown', function (e) {
    end = Date.now();
    
    if(start === null) {
        timeElapsed = snake.snakeDelay + 1
    } else {
        timeElapsed = end - start;
    }
    
    if(timeElapsed > snake.snakeDelay) { //if time is less than delay, just wait and make move
        if (intervalId && e.key !== previousKey) {
            clearInterval(intervalId)
            intervalId = snake.moveSnake(e.key)
        } else if (intervalId === null) {
            intervalId = snake.moveSnake(e.key)
        }
        
        previousKey = e.key
    } 
    
    start = Date.now();
});