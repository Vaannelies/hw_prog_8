
abstract class GameObject extends HTMLElement {
    protected posx: number
    protected posy: number
    protected w: number
    protected h: number
    protected game: Game


    constructor() {
        super()
        this.w = window.innerWidth
        this.h = window.innerHeight
     
      
    }

    abstract update() : void

    protected rand(max: number) : number {
        return(Math.floor(Math.random() * Math.floor(max)))
    }
    
}
// window.customElements.define("gameobject-component", GameObject as any)
