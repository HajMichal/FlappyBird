import { birdFalling, getBirdXY, setStartPosition } from "./bird";
import { htmlStyleElements, resetHTML, showScore } from "./elements";
import { updatePipes, pipes } from "./pipe";

let gameLost: boolean;
let lastTime: number | null;


export function handleStart() {
    document.addEventListener("keypress", startProcedure, {once: true})
}

function startProcedure () {
    setStartPosition()
    if(htmlStyleElements()) {
        htmlStyleElements().dashboard!.display = "none";
        window.requestAnimationFrame(updateLoop);
    }

}

export function updateLoop(time: number) {
    if(gameLost) {
        gameLost = false
        return   
    }
    if( lastTime == null) {
        lastTime = time;
        window.requestAnimationFrame(updateLoop);
        return
    }
    const delta = time - lastTime;
    lastTime = time;
    birdFalling(delta)
    updatePipes(delta)
    window.requestAnimationFrame(updateLoop)
    loseGame();
}

export function loseGame() {
    const {y: currentYPosition} = getBirdXY()
    const closestPipe = pipes[pipes.length - 2]
    if (currentYPosition < 0 || 
        currentYPosition > window.innerHeight || 
        (closestPipe?.left < 60 && closestPipe?.left > 0 && (closestPipe?.hole > currentYPosition || closestPipe?.hole + 260 < currentYPosition))
        ) {
        gameLost = true;
        lastTime = null

        showScore(pipes.length - 1)
        resetHTML()
        htmlStyleElements().dashboard!.display = "flex"
        setStartPosition()
        handleStart()
    }
}