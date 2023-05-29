import Map from "./map.js"
import Snake from './snake/snake.js';

export default class Food {
    #map
    coords = {
        x: null,
        y: null
    }

    constructor(map) {
        this.#map = map
    }

    addFood() {
        const foodId = `${this.coords.x} ${this.coords.y}`
        const food = `
            <div data-food-id="${foodId}" style="top: ${this.coords.y}px; left: ${this.coords.x}px;" class="food d-flex justify-content-center align-items-center">
                <div class="food-body bg-success rounded-3"></div>
            </div>
        `
        this.#map.map.insertAdjacentHTML('afterBegin', food)
    }

    generateFoodCoords() {
        this.coords.x = Snake.snakeDiameter * Math.floor(Math.random() * Map.mapDiameter / Snake.snakeDiameter);
        this.coords.y = Snake.snakeDiameter * Math.floor(Math.random() * Map.mapDiameter / Snake.snakeDiameter);
    }

    deleteFood(coords) {
        const foodId = `${coords.x} ${coords.y}`

        const food = document.querySelector(`[data-food-id="${foodId}"]`);
        food.remove();
    }
}