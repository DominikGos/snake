export default class Snake {
    #snake
    #map
    snakeDelay = 150
    #delayIsOver = true

    constructor(map) {
        this.#map = map
    }

    initSnake() {
        this.#snake = document.querySelector('#snake')
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
            this.#delayIsOver = true 
        }, this.snakeDelay);
    }
}
