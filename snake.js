import { dispatchSnakeDiedEvent } from './events/snakeDeath.js';

export default class Snake {
    snakeHead
    #food
    #map
    #point
    #keys = {
        previous: null,
        current: null
    }
    #snakeHeadCoordsHistory = []
    #snakeBodyElements = []
    static snakeDiameter = 50
    static snakeDelay = 100

    constructor(map, food, point) {
        this.#map = map
        this.#food = food
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
        this.#snakeBodyElements.forEach(element => element.remove())
        this.#snakeBodyElements = []
        this.#keys.current = null
        this.#keys.previous = null
    }

    #setSnakeBody() {
        let snakeBodyElements = Array.from(document.querySelectorAll('.snake'))
        snakeBodyElements.shift()
        this.#snakeBodyElements = snakeBodyElements
    }

    getSnakeHeadCoords() {
        const snakeRect = this.snakeHead.getBoundingClientRect();
        const mapRect = this.#map.map.getBoundingClientRect();

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
        if (this.#snakeHeadCoordsHistory.length === this.#snakeBodyElements.length + 2) {
            this.#snakeHeadCoordsHistory.pop()
        }
    }

    moveSnakeHead(key, coords) {
        this.#keys.current = key

        return setInterval(() => {
            const snakeHasBody = this.#snakeBodyElements.length > 0
            this.#setHeadCoordsHistory(coords)

            if (!this.#checkIfItCorrectMove(this.#keys)) 
                key = this.#keys.previous

            this.#setCoords(coords, key)

            if (this.#map.checkIfSnakeExceededMap(coords))
                return

            if (snakeHasBody && this.#checkIfSnakeAteHisBody(coords, this.#snakeHeadCoordsHistory)) 
                return

            this.#checkIfSnakeAteFood(coords, this.#food.coords)
            this.setSnakeCoords(this.snakeHead, coords)
            
            if(snakeHasBody) 
                this.#moveSnakeBody(this.#snakeHeadCoordsHistory)

            this.#keys.previous = key

        }, Snake.snakeDelay);
    }

    #moveSnakeBody(coordsHistory) {
        this.#snakeBodyElements.forEach((element, index) => {
            this.setSnakeCoords(element, coordsHistory[index])
        })
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
        this.#grow()
        this.#setSnakeBody()
        this.#food.deleteFood(foodCoords)
        this.#food.generateFoodCoords()
        this.#food.addFood()
    }

    #grow() {
        const snakeBody = `<div class="snake bg-danger rounded-3"></div>`

        this.#map.map.insertAdjacentHTML('beforeEnd', snakeBody)
    }

    #checkIfSnakeAteHisBody(snakeHeadCoords, coordsHistory) {
        let snakeAteHisTail = false

        coordsHistory.forEach(singleCoords => {
            if (snakeHeadCoords.x === singleCoords.x && snakeHeadCoords.y === singleCoords.y) {
                dispatchSnakeDiedEvent(this.#map.map)
                snakeAteHisTail = true
            }
        });

        return snakeAteHisTail
    }
}