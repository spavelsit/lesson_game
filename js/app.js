const background = new Background(bg_count)
const player = new Player()

const game = () => {
  clearAll()
  fillAll('black')

  background.draw()

  
  player.startFire()
  player.draw()
  player.move()
  
}

startGame(game)