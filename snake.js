export default class Snake {
    snakeHead
    #food
    #map
    #point
    #keys = {
        previous: null,
        current: null
    }
    #snakeHeadCoordsHistory = []
    #snakeBodyElements = []
    static snakeDiameter = 50
    static snakeDelay = 150 
    static snakeSpeed = Snake.snakeDiameter

    constructor(map, food, point) {
        this.#map = map
        this.#food = food
        this.#point = point
    }

    setDefaultSnakePosition() {
        this.snakeHead.style.top = `50%`
        this.snakeHead.style.left = `50%`
    }

    initSnakeHead() {
        this.snakeHead = document.querySelector('.snake')
        this.snakeHead.style.width = Snake.snakeDiameter + 'px'
        this.snakeHead.style.height = Snake.snakeDiameter + 'px'
    }

    resetSnake() {
        this.#snakeHeadCoordsHistory = []
        this.#snakeBodyElements.forEach(element => element.remove())
        this.#snakeBodyElements = []
    }

    #setSnakeBody() {
        let snakeBodyElements = Array.from(document.querySelectorAll('.snake'))
        snakeBodyElements.shift()
        this.#snakeBodyElements = snakeBodyElements
    }

    getSnakeHeadCoords() {
        const snakeRect = this.snakeHead.getBoundingClientRect();
        const mapRect = this.#map.map.getBoundingClientRect();

        return {
            x: snakeRect.left - mapRect.left,
            y: snakeRect.top - mapRect.top
        };
    }

    setSnakeCoords(snakeElement, coords) {
        snakeElement.style.top = coords.y + 'px';
        snakeElement.style.left = coords.x + 'px';
    }

    #setHeadCoordsHistory(coords) {
        this.#snakeHeadCoordsHistory.unshift({ x: coords.x, y: coords.y })

        //history has to be longer by only 1 field than snake body elements 
        if (this.#snakeHeadCoordsHistory.length === this.#snakeBodyElements.length + 2) {
            this.#snakeHeadCoordsHistory.pop()
        }
    }

    moveSnakeHead(key, coords) {
        this.#keys.current = key

        return setInterval(() => {
            this.#setHeadCoordsHistory(coords)
            this.#compareFoodCoords(coords, this.#food.coords)
            
            switch (key) {
                case 'a':
                    coords.x -= Snake.snakeSpeed
                    break;
                case 'w':
                    coords.y -= Snake.snakeSpeed
                    break;
                case 's':
                    coords.y += Snake.snakeSpeed
                    break;
                case 'd':
                    coords.x += Snake.snakeSpeed
                    break;
            }

            this.setSnakeCoords(this.snakeHead, coords)
            this.#map.checkIfSnakeDied(coords)

            if (this.#snakeBodyElements.length > 0) {
                this.#moveSnakeBody(this.#snakeHeadCoordsHistory)
            }

        }, Snake.snakeDelay);
    }

    #moveSnakeBody(coords) {
        this.#snakeBodyElements.forEach((element, index) => {
            this.setSnakeCoords(element, coords[index])
        })
    }

    #compareFoodCoords(snakeCoords, foodCoords) {
        if (snakeCoords.x === foodCoords.x && snakeCoords.y === foodCoords.y) {
            this.#eatFood(foodCoords)
        }
    }

    #eatFood(foodCoords) {
        this.#point.addPoint()
        this.#grow()
        this.#setSnakeBody()
        this.#food.deleteFood(foodCoords)
        this.#food.generateFoodCoords()
        this.#food.addFood()
    }

    #grow() {
        const snakeBody = `<div class="snake bg-danger rounded-3"></div>`

        this.#map.map.insertAdjacentHTML('beforeEnd', snakeBody)
    }
}
