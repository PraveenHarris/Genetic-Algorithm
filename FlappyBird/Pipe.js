class Pipe {
    constructor() {
        this.top = 400;
        this.bottom = 30;
        this.x = canvas.width;
        this.width = 10;
        this.speed = 5;
    }

    show() {
        context.beginPath();
        context.lineWidth = "4";
        context.fillStyle = "white";
        context.rect(this.x, 0, this.width, this.top);
        context.fill();
    }

    update() {
        this.x -= this.speed;
    }

    hits(bird) {
        if (bird.x === this.x) {
            if (bird.y < this.top) {
                return true;
            }
        }
        return false;
    }
}