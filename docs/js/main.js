"use strict";
class GameObject extends HTMLElement {
    constructor() {
        super();
        this.w = window.innerWidth;
        this.h = window.innerHeight;
    }
    rand(max) {
        return (Math.floor(Math.random() * Math.floor(max)));
    }
}
class Bomb extends GameObject {
    constructor(g) {
        super();
        this.game = g;
        let foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this);
        this.posy = this.rand(-this.h);
        this.posx = this.rand(this.w);
    }
    update() {
        this.style.transform = `translate(${this.posx}px, ${this.posy}px)`;
        this.draw();
        this.addEventListener("click", () => this.handleClick());
    }
    draw() {
        if (this.posy > this.h) {
            this.posy = 0;
            this.posx = this.rand(this.w);
            this.game.destroyBuilding();
        }
        else {
            this.posy += this.rand(10);
        }
    }
    handleClick() {
        console.log("Ik ben aangeklikt.");
        this.posy = this.rand(-500);
        this.posx = this.rand(this.w);
        this.game.scorePoint();
    }
}
window.customElements.define("bomb-component", Bomb);
class Car extends GameObject {
    constructor(g) {
        super();
        this.game = g;
        let foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this);
        this.posx = this.rand(this.w);
        this.posy = this.h - 200;
        this.addEventListener("click", () => this.handleClick());
    }
    update() {
        this.style.transform = `translate(${this.posx}px, ${this.posy}px)`;
        this.draw();
    }
    draw() {
        if (this.posx > this.w) {
            this.posx = this.rand(-this.w);
        }
        else {
            this.posx += 10;
        }
    }
    handleClick() {
        this.game.resetBuildings();
    }
}
window.customElements.define("car-component", Car);
class Game {
    constructor() {
        this.score = 0;
        this.destroyed = 0;
        this.bombs = [];
        this.movex = 0;
        this.textfield = document.getElementsByTagName("textfield")[0];
        this.statusbar = document.getElementsByTagName("bar")[0];
        this.car = new Car(this);
        for (let i = 0; i < 4; i++) {
            this.bombs.push(new Bomb(this));
        }
        this.gameLoop();
    }
    gameLoop() {
        if (this.destroyed < 4) {
            console.log("updating the game");
            this.car.update();
            for (let i = 0; i < this.bombs.length; i++) {
                let bombItem = this.bombs[i];
                bombItem.update();
            }
            requestAnimationFrame(() => this.gameLoop());
        }
    }
    destroyBuilding() {
        this.destroyed++;
        console.log("buildings destroyed " + this.destroyed);
        this.movex -= 72;
        this.statusbar.style.backgroundPositionX = this.movex + "px";
    }
    scorePoint() {
        console.log("punt erbij");
        this.score++;
        this.textfield.innerHTML = "Score: " + this.score;
    }
    resetBuildings() {
        this.destroyed = 0;
        this.statusbar.style.backgroundPositionX = "0px";
        this.movex = 0;
    }
}
window.addEventListener("load", () => new Game());
//# sourceMappingURL=main.js.map