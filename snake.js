export default class Snake {
    #snake
    #food
    #map
    #delayIsOver = true
    static snakeDiameter = 50
    static snakeDelay = 150

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

    moveSnake(key) {
        let cords = this.getSnakeCords()

        return setInterval(() => {
            if (this.#delayIsOver) {

                this.#delayIsOver = false

                switch (key) {
                    case 'a':
                        cords.x -= 50
                        this.setSnakeCords(cords)
                        break;
                    case 'w':
                        cords.y -= 50
                        this.setSnakeCords(cords)
                        break;
                    case 's':
                        cords.y += 50
                        this.setSnakeCords(cords)
                        break;
                    case 'd':
                        cords.x += 50
                        this.setSnakeCords(cords)
                        break;
                }
            }

            this.compareFoodCords(cords, this.#food.cords)

            this.#delayIsOver = true
        }, Snake.snakeDelay);
    }

    compareFoodCords(snakeCords, foodCords) {
        if (snakeCords.x === foodCords.x && snakeCords.y === foodCords.y) {
            console.log('you have just eaten food');

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
