export default class Snake {
    #snake
    #food
    #map
    snakeCanChangeDirection = true
    static snakeDiameter = 50
    static snakeDelay = 20
    static snakeSpeed = 5

    constructor(map, food) {
        this.#map = map
        this.#food = food
    }

    initSnake() {
        this.#snake = document.querySelector('#snake')
        this.#snake.style.width = Snake.snakeDiameter + 'px'
        this.#snake.style.height = Snake.snakeDiameter + 'px'
    }

    getSnakeCords() {
        const snakeRect = this.#snake.getBoundingClientRect();
        const mapRect = this.#map.getBoundingClientRect();

        return {
            x: snakeRect.left - mapRect.left,
            y: snakeRect.top - mapRect.top
        };
    }

    setSnakeCords(cords) {
        this.#snake.style.top = cords.y + 'px';
        this.#snake.style.left = cords.x + 'px';
    }

    moveSnake(keys, cords) {
        let nextKey = null
        let key = null
        
        return setInterval(() => {

            if (this.checkIfSnakeCanChangeDirection(cords)) {
                if (nextKey)
                    key = nextKey
                else
                    key = keys.current
            } else {
                if (!nextKey) {
                    key = keys.previous
                        ? key = keys.previous
                        : key = keys.current

                    nextKey = keys.current
                } 
            }

            switch (key) {
                case 'a':
                    cords.x -= Snake.snakeSpeed
                    this.setSnakeCords(cords)
                    break;
                case 'w':
                    cords.y -= Snake.snakeSpeed
                    this.setSnakeCords(cords)
                    break;
                case 's':
                    cords.y += Snake.snakeSpeed
                    this.setSnakeCords(cords)
                    break;
                case 'd':
                    cords.x += Snake.snakeSpeed
                    this.setSnakeCords(cords)
                    break;
            }
            this.compareFoodCords(cords, this.#food.cords)
        }, Snake.snakeDelay);
    }

    compareFoodCords(snakeCords, foodCords) {
        if (snakeCords.x === foodCords.x && snakeCords.y === foodCords.y) {
            this.eatFood(foodCords)
        }
    }

    eatFood(foodCords) {
        //add point
        this.#food.deleteFood(foodCords)
        this.#food.generateFoodCords()
        this.#food.addFood()
    }

    checkIfSnakeCanChangeDirection(cords) {
        const moduloX = cords.x % Snake.snakeDiameter
        const moduloY = cords.y % Snake.snakeDiameter
        const moduloXisCorrect = moduloX === 0
        const moduloYisCorrect = moduloY === 0

        if (
            (cords.x === 0 && cords.y === 0) ||
            (cords.x === 0 && moduloYisCorrect) ||
            (cords.y === 0 && moduloXisCorrect) ||
            (moduloXisCorrect && moduloYisCorrect)
        ) {
            // console.log('now you can change direction');
            return true
        }

        return false
    }
}
