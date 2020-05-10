class Car extends GameObject {

    public game:Game


    constructor(g:Game) {
        super()

        this.game = g
        let foreground  = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this);
        
        this.posx = this.rand(this.w)
        this.posy = this.h - 200
        this.addEventListener("click", () => this.handleClick())
        this.addEventListener("touchstart", () => this.handleClick())
    }
  

    public update():void {
        this.style.transform = `translate(${this.posx}px, ${this.posy}px)`
        this.draw()
    }

    private draw() {
        
        if(this.posx > this.w) {
            this.posx=this.rand(-this.w)
        } else {
            this.posx+=10
        }
    }

    handleClick() {
        this.game.resetBuildings()
    }
}

window.customElements.define("car-component", Car as any)
