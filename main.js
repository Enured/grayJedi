//Canvas config
var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d')
//testing
//ctx.fillRect(0,0,50,50)

//Variables globales
var clones = []
var interval;
var frames = 0;
var images = {
    bg:"./images/death_star.jpg",
    ahsoka: "./images/ahsoka_standby.png",
    clone:"./images/clone.png",
    vader: ""

}

//clases
class Board{
    constructor(){
        this.x = 0
        this.y = 0
        this.width = canvas.width
        this.height = canvas.height
        this.image = document.createElement('img')
        this.image.src = images.bg
        this.image.onload = () => {
            this.draw()
        }
        this.music = new Audio()
        this.music.src = "http://66.90.93.122/ost/star-wars-episode-iii-revenge-of-the-sith-playstation-2-gamerip/drjjjhyt/1%20-%20mus_ui_anivictory_lp.mp3"
    }
draw(){
this.x-=2
if(this.x < -this.width ) this.x = 0
ctx.drawImage(this.image,this.x,this.y,this.width,this.height)      
ctx.drawImage(this.image,this.x + this.width,this.y,this.width,this.height)      

ctx.font = "50px Verdana"
ctx.fillStyle = "white"
ctx.fillText(Math.floor(frames / 60),800,50,50);
}

} //calse Board

class Ahsoka{
    constructor(){
        this.x = 100
        this.y = 150
        this.width = 50
        this.height = 60
        this.image = new Image()
        this.image.src = images.ahsoka
        this.image.onload = () => {
            this.draw()
        }
        this.gravity = 3
        this.crash = new Audio()
        this.crash.src = ""
    }

    draw(){
        if(this.y < canvas.height - 100) this.y += this.gravity
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
    crashWith(item){
        var crash = (this.x < item.x + item.width) &&
                (this.x + this.width > item.x) &&
                (this.y < item.y + item.height) &&
                (this.y + this.height > item.y)
        if(crash) this.crash.play()
        return  crash;
    }

      

} // clase Flappy

class Clone{
    constructor(){
        this.x = canvas.width - 50
        this.y = 150
        this.width = 40
        this.height = 60
        this.image = new Image()
        this.image.src = images.clone
        this.image.onload = () => {
            this.draw()
        } 
    }

    draw(){
        this.x-=3
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}


//instancias

var board = new Board()
var ahsoka = new Ahsoka()
//funciones principales
function update(){
    frames++
    ctx.clearRect(0,0,canvas.width,canvas.height)
    board.draw()
    ahsoka.draw()
    //clones
    generateclones()
    drawClones()
    checkCollitions()
}

function start(){
    if(interval) return
    clones = []
    frames = 0
    interval = setInterval(update, 1000/60)
}
function gameOver(){
    clearInterval(interval)
    ctx.font = "80px "
    ctx.fillText("Game Over", 128,512,)
    ctx.font = "50px Verdana"
    ctx.fillStyle = "white"
    ctx.fillText("Press 'esc' to restart", 50,300)
    interval = null
    board.music.pause()
}

//funciones auxiliares
function generateclones(){
    if(frames % 100 === Math.floor(Math.random() * 200)){
    var clone = new Clone()
    clones.push(clone)

    } 

}

function drawClones(){
    clones.forEach(function(clone){
        clone.draw()
    })
}

function checkCollitions(){
    clones.forEach(function(clone){
        if( ahsoka.crashWith(clone) ){
            gameOver()
        }
    })
}

//los observadores

addEventListener('keydown', function(e){
   if(e.keyCode === 38 && ahsoka.y > 50){
       ahsoka.y -= 80
   } 

   if(e.keyCode === 27){
    start()
   }

   if(e.key = "Enter"){
       start()
       board.music.play()
   }

})
