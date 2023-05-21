export default class Snake {
    #snakeHead
    #food
    #map
    #point
    #keys = {
        previous: null,
        current: null
    }
    #snakeHeadCordsHistory = []
    #snakeBodyElements = []
    static snakeDiameter = 50
    static snakeDelay = 50
    static snakeSpeed = 5

    constructor(map, food, point) {
        this.#map = map
        this.#food = food
        this.#point = point
    }

    initSnakeHead() {
        this.#snakeHead = document.querySelector('.snake')
        this.#snakeHead.style.width = Snake.snakeDiameter + 'px'
        this.#snakeHead.style.height = Snake.snakeDiameter + 'px'
    }

    #setSnakeBody() {
        let snakeBodyElements = Array.from(document.querySelectorAll('.snake')) 

        snakeBodyElements.shift()
        
        this.#snakeBodyElements = snakeBodyElements
    }

    getSnakeHeadCords() {
        const snakeRect = this.#snakeHead.getBoundingClientRect();
        const mapRect = this.#map.map.getBoundingClientRect();

        return {
            x: snakeRect.left - mapRect.left,
            y: snakeRect.top - mapRect.top
        };
    }

    setSnakeCords(snakeElement, cords) {
        snakeElement.style.top = cords.y + 'px';
        snakeElement.style.left = cords.x + 'px';
    }

    #setHeadCordsHistory(cords) {
        this.#snakeHeadCordsHistory.push({x: cords.x, y: cords.y})

        //history has to be longer by only 1 field
        if(this.#snakeHeadCordsHistory.length === this.#snakeBodyElements.length + 2) {
            this.#snakeHeadCordsHistory.shift()
        } 
    }

    moveSnakeHead(key, cords) {
        this.#keys.current = key

        return setInterval(() => {
            const snakeCanChangeDirection = this.#map.checkIfSnakeCanChangeDirection(cords)

            if (snakeCanChangeDirection) {
                this.#setHeadCordsHistory(cords)
                this.#compareFoodCords(cords, this.#food.cords)
                this.#map.checkIfSnakeDied(cords)
                key = this.#keys.current
                
                console.table(this.#snakeHeadCordsHistory);
            } else {
                key = this.#keys.previous
                    ? key = this.#keys.previous
                    : key = this.#keys.current
            }

            switch (key) {
                case 'a':
                    cords.x -= Snake.snakeSpeed
                    break;
                case 'w':
                    cords.y -= Snake.snakeSpeed
                    break;
                case 's':
                    cords.y += Snake.snakeSpeed
                    break;
                case 'd':
                    cords.x += Snake.snakeSpeed
                    break;
            }

            this.setSnakeCords(this.#snakeHead, cords)
            
            if(this.#snakeBodyElements.length > 0) {
                if(this.#snakeHeadCordsHistory[1]) {
                    this.#moveSnakeBody(this.#snakeHeadCordsHistory[1], key)
                } 
            }

            this.#keys.previous = key
        }, Snake.snakeDelay);
    }

    #moveSnakeBody(cords, key) {
        this.#snakeBodyElements.forEach(element => {
            this.setSnakeCords(element, cords)
        })
        
    }

    #compareFoodCords(snakeCords, foodCords) {
        if (snakeCords.x === foodCords.x && snakeCords.y === foodCords.y) {
            this.#eatFood(foodCords)
        }
    }

    #eatFood(foodCords) {
        this.#point.addPoint()
        this.#grow()
        this.#setSnakeBody()
        this.#food.deleteFood(foodCords)
        this.#food.generateFoodCords()
        this.#food.addFood()
    }

    #grow() {
        const snakeBody = `<div class="snake bg-danger rounded-3"  data-number="${this.#point.points}"></div>`

        this.#map.map.insertAdjacentHTML('beforeEnd', snakeBody)
    }
}
