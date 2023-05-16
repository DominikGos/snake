export default class Point {
    points = 0
    #counter

    initPointCounter() {
        this.#counter = document.querySelector('#counter')
    }

    addPoint() {
        this.points ++
        this.#setPointCounterContent()
    }

    resetPoints() {
        this.points = 0
        this.#setPointCounterContent()
    }

    #setPointCounterContent() {
        this.#counter.textContent = this.points
    }
}
