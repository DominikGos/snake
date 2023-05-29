import Snake from './snake/snake.js';
import { dispatchSnakeDiedEvent } from './events/snakeDeath.js';

export default class Map {
    map
    static mapDiameter = 600

    initMap() {
        this.map = document.querySelector('#map')
        this.map.style.width = Map.mapDiameter + 'px'
        this.map.style.height = Map.mapDiameter + 'px'
    }

    checkIfSnakeExceededMap(coords) {
        if (coords.x < 0 || coords.x + Snake.snakeDiameter > Map.mapDiameter || coords.y < 0 || coords.y + Snake.snakeDiameter > Map.mapDiameter) {
            dispatchSnakeDiedEvent(this.map)

            return true
        }

        return false
    }
}