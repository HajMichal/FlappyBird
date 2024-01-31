import { Bird } from "./bird";
import { Pipe } from "./pipe";

export class Game {

    private gameLost: boolean;
    private lastTime: number | null;
    private dashboard: HTMLElement | null = null;
    private score: HTMLElement | null = null;
    private bird: Bird;
    private pipe: Pipe;

    constructor() {
        this.gameLost = false;
        this.lastTime = null;
        this.bird = new Bird();
        this.pipe = new Pipe();

        document.addEventListener("DOMContentLoaded", () => {
            this.dashboard = document.getElementById("dashboard")!;
            this.score = document.getElementById("score")!;
        });
    }

    handleStart(): void {
        document.addEventListener("keypress", this.startProcedure.bind(this), { once: true });
    }

    startProcedure(): void {
        if (this.dashboard) {
            this.dashboard.style.display = "none";
        }
        window.requestAnimationFrame(this.updateLoop.bind(this));
    }

    updateLoop(time: number): void {
        if (this.gameLost) {
            this.gameLost = false;
            return;
        }
        if (this.lastTime == null) {
            this.lastTime = time;
            window.requestAnimationFrame(this.updateLoop.bind(this));
            return;
        }
        const delta = time - this.lastTime;
        this.lastTime = time;
        this.bird.birdFalling(delta);
        this.pipe.updatePipes(delta);
        this.loseGame();
        window.requestAnimationFrame(this.updateLoop.bind(this));
    }

    loseGame(): void {
        const currentBirdYPosition = this.bird.getCurrentBirdYPosition();
        const closestPipe = this.pipe.pipes[this.pipe.pipes.length - 2];
        if (currentBirdYPosition <= 0 || currentBirdYPosition >= window.innerHeight ||
            (closestPipe && closestPipe.left < 60 && closestPipe.left > 0 &&
                (closestPipe.hole > currentBirdYPosition || closestPipe.hole + 220 < currentBirdYPosition))) {
            this.gameLost = true;
            this.lastTime = null;
            this.showScore(this.pipe.pipes.length - 1);
            this.resetHTML();
            this.bird.setStartPosition();
            this.handleStart();
        }
    }

    showScore(score: number): void {
        if (this.dashboard && this.score) {
            this.dashboard.style.display = "flex";
            this.score.textContent = `YOUR SCORE ${score}`;
            this.score.style.display = "block";
        }
    }

    resetHTML(): void {
        this.pipe.pipes.length = 0;
        const divPipes = document.querySelectorAll(".pipe");
        divPipes.forEach((element) => element.remove());
        if (this.bird.bird.style) {
            this.bird.bird.style.rotate = "0deg";
        }
    }
}

