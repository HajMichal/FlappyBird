const PIPE_INTERVAL = 1500
const PIPE_SPEED = 0.75;

export const pipes: { left: number; hole: number }[] = []
let timeSinceLastPipe =0

function generatePipe() {
    const newPipe = document.createElement("div");
    const hole = document.createElement("div");
    newPipe.append(hole);
    newPipe.classList.add("pipe")
    hole.classList.add("hole");
    newPipe.style.setProperty("--hole-top", randomNumberBetween(150, window.innerHeight - 300).toString())

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
    document.body.append(newPipe)
    pipes.push(pipe)
}

function randomNumberBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min )
}


export function updatePipes(delta: number) {
    timeSinceLastPipe += delta;
    
    if (timeSinceLastPipe > PIPE_INTERVAL) {
        timeSinceLastPipe -= PIPE_INTERVAL
        generatePipe()
    }

    pipes.forEach((pipe) => {
        pipe.left = pipe.left - delta * PIPE_SPEED
    })
}

