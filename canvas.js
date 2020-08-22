const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: undefined,
    y: undefined,
}
addEventListener('resize', ()=> {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

const gravity = 0.04
const friction = 0.99
class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x        = x;
        this.y        = y;
        this.radius   = radius;
        this.color    = color;
        this.velocity = velocity;
        this.alpha    = 1;
    }
    draw() {
        c.save()
        c.globalAlpha = this.alpha
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
        c.restore()
    }

    update() {
        this.draw()
        this.velocity.x *= friction
        this.velocity.y *= friction
        this.velocity.y += gravity
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.alpha -= 0.005
    }
}

let particles
function init() {
    particles = []
}

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0, 0, 0, 0.05)'
    c.fillRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle, i) => {
        if (particle.alpha > 0) {
            particle.update()
        } else {
            particles.splice(i, 1)
        }
    })
}

init()
animate()

addEventListener('click', (event) =>
    {
        mouse.x = event.clientX
        mouse.y = event.clientY

        const particleCount = 330
        const angleIncrement = Math.PI * 2 / particleCount
        const power = 6;
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
        for (let i = 0; i < particleCount; i++) {
            var radius = Math.floor( Math.random() * 4 ) + 2;
            console.log(radius)
            particles.push(new Particle(mouse.x, mouse.y, 1, color, {
                x:Math.cos(particleCount * i) * Math.random() * power,
                y:Math.sin(particleCount * i) * Math.random() * power,
            }))
        }
    })



