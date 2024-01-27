import { pipes } from "./pipe"

export function htmlStyleElements() {
    const dashboard = document.getElementById("dashboard")!.style
    const bird = document.getElementById("bird")!.style
    const score = document.getElementById("score")!.style
    return {dashboard, score, bird}
}

export function htmlElements() {
    const bird = document.getElementById("bird")!
    const score = document.getElementById("score")!
    return {bird, score}
}

export function resetHTML() {
    pipes.length = 0
    const divPipes = document.querySelectorAll(".pipe")
    divPipes.forEach((element) => element.remove())
    htmlStyleElements().bird.rotate = "0deg"
}

export function showScore(score: number) {
    htmlStyleElements().dashboard!.display = "flex"
    htmlElements().score.textContent = `YOUR SCORE ${score}` 
    htmlStyleElements().score.display = "block"
}