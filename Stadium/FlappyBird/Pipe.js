class Pipe {
    constructor(index) {
        index = index%5;
        this.top = canvas.height/5*index;
        console.log(this.top);
        this.bottom = canvas.height/2-this.top;
        this.x = canvas.width;
        this.width = 10;
        this.speed = 5;
    }

    show() {
        context.beginPath();
        context.lineWidth = "4";
        context.fillStyle = "white";
        context.rect(this.x, 0, this.width, this.top);
        context.rect(this.x, canvas.height-this.bottom, this.width, this.bottom);
        context.fill();
    }

    update() {
        this.x -= this.speed;
    }

    hits(bird) {
        if (bird.x === this.x) {
            if (bird.y < this.top || bird.y > canvas.height-this.bottom) {
                return true;
            }
        }
        return false;
    }
}