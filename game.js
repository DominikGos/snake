import Snake from './snake/snake.js';

export default class Game {
    gameIsLost = false
    intervalId = null
    snake
    point
    food
    map
    lossModal
    start
    end

    constructor(snake, point, food, map, lossModal) {
        this.snake = snake
        this.point = point
        this.food = food
        this.map = map
        this.lossModal = lossModal
    }

    setGame() {
        this.map.initMap()
        this.snake.initSnakeHead()
        this.snake.setDefaultSnakePosition()
        this.food.generateFoodCoords(Snake.snakeDiameter);
        this.food.addFood()
        this.point.initPointCounter() 
    }

    runGame(e) {
        if (this.gameIsLost) {
            return
        }

        let timeElapsed = null
        this.end = Date.now();

        if (this.start === null) {
            timeElapsed = Snake.snakeDelay + 1
        } else {
            timeElapsed = this.end - this.start;
        }

        let key = this.transformKey(e.key)

        if (timeElapsed > Snake.snakeDelay) {

            let snakeCoords = this.snake.getSnakeHeadCoords()

            if (this.intervalId) {
                clearInterval(this.intervalId)
            }

            this.intervalId = this.snake.moveSnakeHead(key, snakeCoords)
        }

        this.start = Date.now();
    }

    loseGame() {
        this.gameIsLost = true
        clearInterval(this.intervalId)
        this.lossModal.show()
    }

    resetGame() {
        this.snake.resetSnake()
        this.point.resetPoints()
        this.gameIsLost = false
        this.lossModal.hide()
    }

    transformKey(key) {
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
}