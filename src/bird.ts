import { htmlStyleElements, htmlElements } from "./elements";

const BIRD_SPEED = 0.5

export function birdJump () {
    let clickedSpace = 0
    window.addEventListener("keydown", e => {
        if (e.code === "Space") {
            clickedSpace ++;
            htmlStyleElements().bird.rotate = "-20deg"
            setTop(getTop() - 600)
        }
    })
}

export function setStartPosition() {
    setTop(window.innerHeight / 2) 
}

export function getBirdXY() {
        const rect = htmlElements().bird.getBoundingClientRect();
        console.log({x: rect.x, y: rect.y })
        return {x: rect.x, y: rect.y}
}

export function birdFalling (time: number) {
    if(getTop() > getBirdXY().y){

        htmlStyleElements().bird.rotate = "20deg"
    }
    setTop(getTop() + time * BIRD_SPEED)
    getBirdXY()
    }


export function getTop() {
    return parseFloat(getComputedStyle(htmlElements().bird).getPropertyValue("--bird-top"))
}

export function setTop(top: number) {
    htmlStyleElements().bird.setProperty("--bird-top", top.toString())
}
