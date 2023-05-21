import Map from "./map.js"

export default class Food {
    #map
    coords = {
        x: null,
        y: null
    }
    #snakeDiameter

    constructor(map, snakeDiameter) {
        this.#map = map
        this.#snakeDiameter = snakeDiameter
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
        this.coords.x = this.#snakeDiameter * Math.floor(Math.random() * Map.mapDiameter / this.#snakeDiameter);
        this.coords.y = this.#snakeDiameter * Math.floor(Math.random() * Map.mapDiameter / this.#snakeDiameter);
    }

    deleteFood(coords) {
        const foodId = `${coords.x} ${coords.y}`

        const food = document.querySelector(`[data-food-id="${foodId}"]`);
        food.remove();
    }
}