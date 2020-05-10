class Game {
    
    private score: number = 0
    private destroyed: number = 0
    private textfield: HTMLElement
    private statusbar: HTMLElement
    // private bomb: Bomb
    private car: Car
    private bombs: Bomb[] = []
    private movex: number = 0
    
    constructor() {
        this.textfield  = document.getElementsByTagName("textfield")[0] as HTMLElement
        this.statusbar  = document.getElementsByTagName("bar")[0] as HTMLElement
        
        // this.bomb       = new Bomb()
        this.car        = new Car(this)
        for(let i = 0; i < 4; i++) {
        this.bombs.push (new Bomb(this))
        }

        
        this.gameLoop()
    }
    
    private gameLoop():void{
        if(this.destroyed < 4) {
        console.log("updating the game")
        this.car.update()
        // this.bomb.update()
        for(let i = 0; i < this.bombs.length; i++) {
            let bombItem = this.bombs[i];
            bombItem.update();
        }
      
      
        requestAnimationFrame(() => this.gameLoop())
        }
    }

    public destroyBuilding(){
        this.destroyed ++
        console.log("buildings destroyed " + this.destroyed)
        this.movex -= 72
        this.statusbar.style.backgroundPositionX = this.movex + "px" 
    }
       
    public scorePoint() {
        console.log("punt erbij")
        this.score ++
        this.textfield.innerHTML = "Score: " + this.score
    }

    public resetBuildings() {
        this.destroyed = 0;
        this.statusbar.style.backgroundPositionX = "0px"
        this.movex = 0
    }
    
} 

window.addEventListener("load", () => new Game())