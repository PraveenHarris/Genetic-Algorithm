
class Bird {
    constructor(canvas, c) {
        this.x = 35;
        this.y = canvas.height/2;
        this.color = c;
        this.gravity = 1;
        this.velocity = 0;
        this.alive = true;
        this.DNA = new DNA();
    }

    show() {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, 15, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    }

    update() {
        if (this.alive) {
            this.velocity += this.gravity;
            this.y += this.velocity;
            if (this.y > canvas.height) {
                this.y = canvas.height;
                this.velocity = 0;
            }
            if (this.y < 0) {
                this.y = 0;
                this.velocity = 0;
            }
        }else {
            this.y = -100;
        }
    }

    jump() {
        this.velocity += -15;
    }
}

class DNA {
    constructor() {
        this.genes = [];
    }
}