import './style.css'
import { birdJump, setStartPosition } from './bird'
import { handleStart } from './menu'

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


birdJump()
handleStart()
setStartPosition()
