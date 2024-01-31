export class Bird {
    
    private readonly speed: number;
    private readonly jumpSize: number;
    birdXPosition: number
    bird: HTMLElement

    constructor() {
        this.speed = 0.5
        this.jumpSize = 600
        this.birdXPosition = 60
        this.bird = document.getElementById("bird")!
    }

    getCurrentBirdYPosition(): number {
                const rect = this.bird.getBoundingClientRect();
                return rect.y
        }

    birdJump (): void {
        window.addEventListener("keydown", e => {
            if (e.code === "Space") {
                this.bird.style.rotate = "-20deg"
                this.setTop(this.getTop() - this.jumpSize)
            }
        })
    }

    birdFalling (time: number): void {
        if(this.getTop() > this.getCurrentBirdYPosition()){
    
            this.bird.style.rotate = "20deg"
        }
        this.setTop(this.getTop() + time * this.speed)
        }
    
    setStartPosition() {
            this.setTop(window.innerHeight / 2) 
        }

    setTop(top: number): void {
        this.bird.style.setProperty("--bird-top", top.toString())
    }

    getTop(): number {
        return parseFloat(getComputedStyle(this.bird).getPropertyValue("--bird-top"))
    }

}