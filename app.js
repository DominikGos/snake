import Map from './map.js';
import Snake from './snake/snake.js';
import Food from './food.js'
import Point from './point.js';
import Game from './game.js';

const map = new Map;
const point = new Point
const food = new Food(map)
const snake = new Snake(map, food, point)
const lossModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {})
const resetButton = document.querySelector('#resetButton')

const game = new Game(snake, point, food, map, lossModal) 

game.setGame()

document.addEventListener('keydown', function (e) {
    game.runGame(e)
});

map.map.addEventListener('snakeDied', function(e) {
    game.loseGame()
})

resetButton.addEventListener('click', function(e) {
    game.resetGame()
})