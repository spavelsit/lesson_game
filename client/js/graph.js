class Graph {
  constructor(opts = {}) {
    this.x = opts.x
    this.y = opts.y
    this.w = opts.w
    this.h = opts.h
    this.color = opts.color
    this.img = opts.img
    this.speed = opts.speed
  }
  draw() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.w, this.h)
  }

  image() {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
  }
}

const loadImage = (path) => {
  const image = document.createElement('img')

  image.src = path

  return image
}

const clearAll = () => {
  ctx.clearRect(0, 0, width, height)
}

const fillAll = color => {
  ctx.fillStyle = color
  ctx.fillRect(0, 0, width, height);
}