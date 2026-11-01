// Canvas and context
let c = document.querySelector(`#pong`)
let ctx = c.getContext(`2d`)

// Timer to make the game run at 60fps
let timer = setInterval(main, 1000/60)

// Global friction variable
let fy = .97

// Player 1 (p1) setup
let p1 = new Box();
p1.w = 20
p1.h = 150
p1.x = 0 + p1.w/2

//setting up player 2
let p2 = new Box();
p2.w = 20
p2.h = 150
p2.x = 780 + p2.w/2

// Ball setup
let ball = new Box();
ball.w = 20
ball.h = 20
ball.vx = -2
ball.vy = -2
ball.color = `black`

const players = [p1,p2]
players[0] = new Player()
players[1] = new Player()
pad = new Box()
console.log(players[0])
console.log(players[1])

const pads = [pad1,pad2]
pads[0] = players[0].pad
pads[1] = players[1].pad
console.log(pads[0])
console.log(pads[1])

function main()
{
    // Erases the canvas
    ctx.clearRect(0,0,c.width,c.height)
    
    // p1 accelerates when key is pressed 
    if(keys[`w`])
    {
       pads[0].vy += -pads[0].force
    }

    if(keys[`s`])
    {
        pads[0].vy += pads[0].force
    }
//change to up and down arrow keys
    if(keys[`ArrowUp`])
    {
        pads[1].vy += -pads[1].force
    }

    if(keys[`ArrowDown`])
    {
        pads[1].vy += pads[1].force
    }

    // Applies friction
    pads[0].vy *= fy
    pads[1].vy *= fy
    // Player movement
    pads[0].move();
    pads[1].move();

    // Ball movement
    ball.move();

    // p1 collision
    if (pads[0].y < 0+pads[0].h/2)
    {
        pads[0].y = 0+pads[0].h/2
    }
    if (pads[0].y > c.height-pads[0].h/2)
    {
        pads[0].y = c.height-pads[0].h/2
    }

    if (pads[1].y < 0+pads[1].h/2)
    {
        pads[1].y = 0+pads[1].h/2
    }
    if (pads[1].y > c.height-pads[1].h/2)
    {
        pads[1].y = c.height-pads[1].h/2
    }

    // Ball collision 
    if (ball.x < 0)
    {
        ball.x = c.width/2
        ball.y = c.height/2
    }
    if (ball.x > c.width)
    {
        ball.x = c.width/2
        ball.y = c.height/2
    }
    if (ball.y < 0)
    {
        ball.y = 0
        ball.vy = -ball.vy
    }
    if (ball.y > c.height)
    {
        ball.y = c.height
        ball.vy = -ball.vy       
    }

    // p1 with ball collision
    if (ball.collide(pads[0]))
    {
        ball.x = pads[0].x + pads[0].w/2 + ball.w/2
        ball.vx = -ball.vx;
    }

    if (ball.collide(pads[1]))
    {
        ball.x =  pads[1].x - pads[1].w/2 - ball.w/2
        ball.vx = -ball.vx;
    }

    // Draw the objects
    pads[0].draw()
    pads[1].draw()
    ball.draw()
}
