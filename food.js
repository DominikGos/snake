import Map from "./map.js"

export default class Food {
    #map
    cords = {
        x: null,
        y: null
    }
    #snakeDiameter

    constructor(map, snakeDiameter) {
        this.#map = map
        this.#snakeDiameter = snakeDiameter
    }

    addFood() {
        const foodId = `${this.cords.x} ${this.cords.y}`
        const food = `
            <div data-food-id="${foodId}" class="food bg-success rounded-3" style="top: ${this.cords.y}px; left: ${this.cords.x}px;"></div>
        `
        this.#map.map.insertAdjacentHTML('afterBegin', food)
    }

    generateFoodCords() {
        this.cords.x = this.#snakeDiameter * Math.floor(Math.random() * Map.mapDiameter / this.#snakeDiameter);
        this.cords.y = this.#snakeDiameter * Math.floor(Math.random() * Map.mapDiameter / this.#snakeDiameter);
    }

    deleteFood(cords) {
        const foodId = `${cords.x} ${cords.y}`

        const food = document.querySelector(`[data-food-id="${foodId}"]`);
        food.remove();
    }
}