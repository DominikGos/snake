export default class Snake {
    #snake
    #food
    #map
    #keys = {
        previous: null,
        current: null
    }
    static snakeDiameter = 50
    static snakeDelay = 10
    static snakeSpeed = 2

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
        const mapRect = this.#map.map.getBoundingClientRect();

        return {
            x: snakeRect.left - mapRect.left,
            y: snakeRect.top - mapRect.top
        };
    }

    setSnakeCords(cords) {
        this.#snake.style.top = cords.y + 'px';
        this.#snake.style.left = cords.x + 'px';
    }

    moveSnake(key, cords) {
        this.#keys.current = key 

        return setInterval(() => {
            if (this.#map.checkIfSnakeCanChangeDirection(cords)) {
                key = this.#keys.current
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

            this.#keys.previous = key 
            this.setSnakeCords(cords)
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
}
