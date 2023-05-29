import SnakeBody from './snakeBody.js';

export default class Snake extends SnakeBody {
    snakeHead
    #point
    #keys = {
        previous: null,
        current: null
    }
    #snakeHeadCoordsHistory = []
    static snakeDiameter = 50
    static snakeDelay = 100

    constructor(map, food, point) {
        super(map, food)
        this.#point = point
    }

    setDefaultSnakePosition() {
        this.snakeHead.style.top = `50%`
        this.snakeHead.style.left = `50%`
    }

    initSnakeHead() {
        this.snakeHead = document.querySelector('.snake')
        this.snakeHead.style.width = Snake.snakeDiameter + 'px'
        this.snakeHead.style.height = Snake.snakeDiameter + 'px'
    }

    resetSnake() {
        this.#snakeHeadCoordsHistory = []
        this.snakeBodyElements.forEach(element => element.remove())
        this.snakeBodyElements = []
        this.#keys.current = null
        this.#keys.previous = null
    }

    getSnakeHeadCoords() {
        const snakeRect = this.snakeHead.getBoundingClientRect();
        const mapRect = this.map.map.getBoundingClientRect();

        return {
            x: snakeRect.left - mapRect.left,
            y: snakeRect.top - mapRect.top
        };
    }

    setSnakeCoords(snakeElement, coords) {
        snakeElement.style.top = coords.y + 'px';
        snakeElement.style.left = coords.x + 'px';
    }

    #setHeadCoordsHistory(coords) {
        this.#snakeHeadCoordsHistory.unshift({ x: coords.x, y: coords.y })

        //history has to be longer by only 1 field than snake body elements 
        if (this.#snakeHeadCoordsHistory.length === this.snakeBodyElements.length + 2) {
            this.#snakeHeadCoordsHistory.pop()
        }
    }

    moveSnakeHead(key, coords) {
        this.#keys.current = key

        return setInterval(() => {
            const snakeHasBody = this.snakeBodyElements.length > 0
            this.#setHeadCoordsHistory(coords)

            if (!this.#checkIfItCorrectMove(this.#keys)) 
                key = this.#keys.previous

            this.#setCoords(coords, key)

            if (this.map.checkIfSnakeExceededMap(coords))
                return

            if (snakeHasBody && this.checkIfSnakeAteHisBody(coords, this.#snakeHeadCoordsHistory)) 
                return

            this.#checkIfSnakeAteFood(coords, this.food.coords)
            this.setSnakeCoords(this.snakeHead, coords)
            
            if(snakeHasBody) 
                this.moveSnakeBody(this.#snakeHeadCoordsHistory)

            this.#keys.previous = key

        }, Snake.snakeDelay);
    }

    #setCoords(coords, key) {
        switch (key) {
            case 'a':
                coords.x -= Snake.snakeDiameter
                break;
            case 'w':
                coords.y -= Snake.snakeDiameter
                break;
            case 's':
                coords.y += Snake.snakeDiameter
                break;
            case 'd':
                coords.x += Snake.snakeDiameter
                break;
        }
    }

    #checkIfItCorrectMove(keys) {
        if (!['a', 'w', 's', 'd'].includes(keys.current)) {
            return false
        }

        if (keys.previous === 'a' && keys.current === 'd') {
            return false
        }
        else if (keys.previous === 'd' && keys.current === 'a') {
            return false
        }
        else if (keys.previous === 'w' && keys.current === 's') {
            return false
        }
        else if (keys.previous === 's' && keys.current === 'w') {
            return false
        }

        return true
    }

    #checkIfSnakeAteFood(snakeCoords, foodCoords) {
        if (snakeCoords.x === foodCoords.x && snakeCoords.y === foodCoords.y) {
            this.#eatFood(foodCoords)
        }
    }

    #eatFood(foodCoords) {
        this.#point.addPoint()
        this.grow()
        this.setSnakeBody()
        this.food.deleteFood(foodCoords)
        this.food.generateFoodCoords()
        this.food.addFood()
    }
}