import Snake from './snake.js';

export default class Map {
    map
    static mapDiameter = 500

    initMap() {
        this.map = document.querySelector('#map')
        this.map.style.width = Map.mapDiameter + 'px'
        this.map.style.height = Map.mapDiameter + 'px'
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
        if (cords.x < 0 || cords.x + Snake.snakeDiameter > Map.mapDiameter || cords.y < 0 || cords.y + Snake.snakeDiameter > Map.mapDiameter) {

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