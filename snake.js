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
    static snakeDelay = 10
    static snakeSpeed = 5

    constructor(map, food, point) {
        this.#map = map
        this.#food = food
        this.#point = point
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
        this.#snakeHeadCoordsHistory.push({x: coords.x, y: coords.y})

        //history has to be longer by only 1 field than snake body elements 
        if(this.#snakeHeadCoordsHistory.length === this.#snakeBodyElements.length + 2) {
            this.#snakeHeadCoordsHistory.shift()
        } 
    }

    moveSnakeHead(key, coords) {
        this.#keys.current = key

        return setInterval(() => {
            const snakeCanChangeDirection = this.#map.checkIfSnakeCanChangeDirection(coords)
            let snakeBodyIntervalId = null 

            if (snakeCanChangeDirection) {
                this.#setHeadCoordsHistory(coords)
                this.#compareFoodCoords(coords, this.#food.coords)
                this.#map.checkIfSnakeDied(coords)
                key = this.#keys.current
                
                if(this.#snakeBodyElements.length > 0) {
                    if(snakeBodyIntervalId)
                        clearInterval(snakeBodyIntervalId)

                    snakeBodyIntervalId = this.#moveSnakeBody(this.#snakeHeadCoordsHistory, key)
                }

            } else {
                key = this.#keys.previous
                    ? key = this.#keys.previous
                    : key = this.#keys.current
            }

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
            
            this.#keys.previous = key
        }, Snake.snakeDelay);
    }

    #moveSnakeBody(coords, key) {

        //return setInterval(() => {
            this.#snakeBodyElements.forEach((element, index) => {
                this.setSnakeCoords(element, coords[index])
            
              /*   switch (key) {
                    case 'a':
                        coords[index].x -= Snake.snakeSpeed
                        break;
                    case 'w':
                        coords[index].y -= Snake.snakeSpeed
                        break;
                    case 's':
                        coords[index].y += Snake.snakeSpeed
                        break;
                    case 'd':
                        coords[index].x += Snake.snakeSpeed
                        break;
                } */
            })


        //}, Snake.snakeDelay);
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
        const snakeBody = `<div class="snake bg-danger rounded-3"  data-number="${this.#point.points}">${this.#point.points}</div>`

        this.#map.map.insertAdjacentHTML('beforeEnd', snakeBody)
    }
}
