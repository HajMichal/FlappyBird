import { Bird } from './bird'
import { Game } from './menu'
import './style.css'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
  <div id="dashboard" >
    <h1 id="title" >PRESS ANY KEY TO START</h1>
    <h2 id="score" />
  </div>
  <div id="bird">
    <img src="/bird.png" alt="bird" />
  </div>
  </div>
`


const bird = new Bird()
const game = new Game()

bird.setStartPosition()
game.handleStart()
bird.birdJump()
