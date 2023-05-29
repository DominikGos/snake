import { dispatchSnakeDiedEvent } from '../events/snakeDeath.js';

export default class SnakeBody {
    snakeBodyElements = []
    map 
    food

    constructor(map, food) {
        this.map = map
        this.food = food
    }

    grow() {
        const snakeBody = `<div class="snake bg-danger rounded-3"></div>`

        this.map.map.insertAdjacentHTML('beforeEnd', snakeBody)
    }

    checkIfSnakeAteHisBody(snakeHeadCoords, coordsHistory) {
        let snakeAteHisTail = false

        coordsHistory.forEach(singleCoords => {
            if (snakeHeadCoords.x === singleCoords.x && snakeHeadCoords.y === singleCoords.y) {
                dispatchSnakeDiedEvent(this.map.map)
                snakeAteHisTail = true
            }
        });

        return snakeAteHisTail
    }

    setSnakeBody() {
        let snakeBodyElements = Array.from(document.querySelectorAll('.snake'))
        snakeBodyElements.shift()
        this.snakeBodyElements = snakeBodyElements
    }
    
    moveSnakeBody(coordsHistory) {
        this.snakeBodyElements.forEach((element, index) => {
            this.setSnakeCoords(element, coordsHistory[index])
        })
    }
}