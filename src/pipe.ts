export class Pipe {

    private interval: number
    private speed: number
    private timeSinceLastPipe: number
    private body: HTMLElement
    pipes: { left: number, hole: number}[]
    hole: { minTop: number, maxBottom: number }

    constructor () {
        this.interval = 1500
        this.speed = 0.75
        this.timeSinceLastPipe = 0
        this.hole = { minTop: 150, maxBottom: window.innerHeight - 300}
        this.pipes = []
        this.body = document.body
    }

    generatePipe(): void {
        const newPipe = document.createElement("div");
        const hole = document.createElement("div");
        newPipe.append(hole);
        newPipe.classList.add("pipe")
        hole.classList.add("hole");
        newPipe.style.setProperty("--hole-top", this.randomNumberBetween(this.hole.minTop, this.hole.maxBottom).toString())
    
        const pipe = {
            get left() {
                return parseFloat(getComputedStyle(newPipe).getPropertyValue("--pipe-left"))
            },
            set left(left: number) {
                newPipe.style.setProperty("--pipe-left", left.toString())
            },
            get hole() {
                return parseFloat(getComputedStyle(newPipe).getPropertyValue("--hole-top"))
            },
    
        }
        pipe.left = window.innerWidth
        this.body.append(newPipe)
        this.pipes.push(pipe)
    }

    randomNumberBetween(min: number, max: number): number {
            return Math.floor(Math.random() * (max - min + 1) + min )
        }

    updatePipes(delta: number): void {
        this.timeSinceLastPipe += delta;
        
        if (this.timeSinceLastPipe > this.interval) {
            this.timeSinceLastPipe -= this.interval
            this.generatePipe()
        }
    
        this.pipes.forEach((pipe) => {
            pipe.left = pipe.left - delta * this.speed
        })
    }
}
