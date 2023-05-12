export default class Food {
    #map 
    cords = {
        x: null,
        y: null
    }

    constructor(map) {
        this.#map = map 
    }

    addFood() {
        const food = `
            <div class="food bg-success rounded-3" style="top: ${this.cords.y}px; left: ${this.cords.x}px;"></div>
        `

        this.#map.insertAdjacentHTML('afterBegin', food)
    }

    generateFoodCords(snakeDiameter) {
        const mapDiameter = this.#map.offsetWidth
        this.cords.x = snakeDiameter * Math.floor(Math.random() * mapDiameter / snakeDiameter);
        this.cords.y = snakeDiameter * Math.floor(Math.random() * mapDiameter / snakeDiameter);

        console.log( this.cords);
    }
}