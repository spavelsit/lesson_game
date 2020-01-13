const background = new Background(bg_count)
const player = new Player()
const enemy = new Enemy(enemy_count)

const input = player.writeScore()

const game = () => {
  clearAll()
  fillAll('black')

  background.draw()
  
  player.startFire()
  player.draw()
  player.move()
  player.collision(enemy._nodes)
  
  enemy.draw()


  input.innerHTML = player.score
}

startGame(game)