
class Bomb extends GameObject {
    public game: Game
    
    constructor(g:Game) {
        super()
        this.game = g

        let foreground  = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this);
        
        this.posy = this.rand(-this.h)
        this.posx = this.rand(this.w)
    }

    public update():void {
        this.style.transform = `translate(${this.posx}px, ${this.posy}px)`
        this.draw()
        // this.addEventListener("click", this.handleClick(this.game)).bind(this)
        this.addEventListener("click", () => this.handleClick())
        this.addEventListener("touchstart", () => this.handleClick())
        // this.onclick(()=>{this.game.scorePoint})
    }  

    private draw() {

        if(this.posy > this.h) {
            this.posy= 0
            this.posx = this.rand(this.w)
            this.game.destroyBuilding()
        } else {
            this.posy+=this.rand(10)
        }
    }

    private handleClick() {
        
        console.log("Ik ben aangeklikt.");
        this.posy= this.rand(-500)
        this.posx = this.rand(this.w)

        this.game.scorePoint()
    }

}

window.customElements.define("bomb-component", Bomb as any)
