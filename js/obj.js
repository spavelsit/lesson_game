class Background {
  constructor(count) {
    this._count = count
  }

  _nodes = []

  add(x, w, h, speed, color_idx) {
    this._nodes.push(new Graph({x, y: -10, w, h, speed, color: stars_colors[color_idx]}))
  }

  draw() {
    if (this._nodes.length < this._count) {
      this.add(random(0, width), random(1, 2), random(1, 2),  random(1, 3), random(0, stars_colors.length - 1))
    }

    this._nodes.map((el, idx) => {
      if (el.y > height) {
        this._nodes.splice(idx, 1)
      } else {
        el.draw();
        el.y += el.speed;
      }
    })
  }
}

class Player {
  constructor() {}

  _bullet = []

  _lastFire = Date.now()

  _player = new Graph({
    img: img_starship,
    x: (width / 2) - 50,
    y: height - 110,
    w: 100,
    h: 100
  })

  draw() {
    this._player.image()
  }

  move() {
    if (key.isDown('KeyD') && this._player.x < width - 110) this._player.x += player_speed
    if (key.isDown('KeyA') && this._player.x > 10) this._player.x -= player_speed
    if (key.isDown('KeyW') && this._player.y > 10) this._player.y -= player_speed
    if (key.isDown('KeyS') && this._player.y < height - 110) this._player.y += player_speed
  }

  startFire() {
    if (this._bullet.length !== 0) {
      this._bullet.map((el, idx) => {
        if (el.y < -50) {
          this._bullet.splice(idx, 1)
        } else {
          el.image()
          el.y -= bullet_speed
        }
      })
    }

    if (key.isDown('Space') && Date.now() - this._lastFire > 300) {
      this._bullet.push(new Graph({
        img: img_bullet,
        x: this._player.x,
        y: this._player.y,
        w: 100,
        h: 100
      }))

      this._lastFire = Date.now()
    }
  }
}