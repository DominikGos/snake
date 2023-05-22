import Snake from './snake.js';

export default class Map {
    map
    static mapDiameter = 500

    initMap() {
        this.map = document.querySelector('#map')
        this.map.style.width = Map.mapDiameter + 'px'
        this.map.style.height = Map.mapDiameter + 'px'
    }

    checkIfSnakeCanChangeDirection(coords) {
        const moduloX = coords.x % Snake.snakeDiameter
        const moduloY = coords.y % Snake.snakeDiameter
        const moduloXisCorrect = moduloX === 0
        const moduloYisCorrect = moduloY === 0

        if (
            (coords.x === 0 && coords.y === 0) ||
            (coords.x === 0 && moduloYisCorrect) ||
            (coords.y === 0 && moduloXisCorrect) ||
            (moduloXisCorrect && moduloYisCorrect)
        ) {
            return true
        }

        return false
    }

    checkIfSnakeDied(coords) {
        if (coords.x < 0 || coords.x + Snake.snakeDiameter > Map.mapDiameter || coords.y < 0 || coords.y + Snake.snakeDiameter > Map.mapDiameter) {

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