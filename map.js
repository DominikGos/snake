import Snake from './snake.js';

export default class Map {
    map

    initMap() {
        this.map = document.querySelector('#map')
    }

    checkIfSnakeCanChangeDirection(cords) {
        const moduloX = cords.x % Snake.snakeDiameter
        const moduloY = cords.y % Snake.snakeDiameter
        const moduloXisCorrect = moduloX === 0
        const moduloYisCorrect = moduloY === 0

        if (
            (cords.x === 0 && cords.y === 0) ||
            (cords.x === 0 && moduloYisCorrect) ||
            (cords.y === 0 && moduloXisCorrect) ||
            (moduloXisCorrect && moduloYisCorrect)
        ) {
            return true
        }

        return false
    }

    checkIfSnakeDied(cords) {
        const mapWidth = this.map.offsetWidth

        if (cords.x < 0 || cords.x + Snake.snakeDiameter > mapWidth || cords.y < 0 || cords.y + Snake.snakeDiameter > mapWidth) {

            this.#dispatchSnakeDiedEvent()
            //display modal 
        }
    }

    #dispatchSnakeDiedEvent() {
        const snakeDied = new CustomEvent("snakeDied", {
            detail: {},
        });

        this.map.dispatchEvent(snakeDied)
    }
}