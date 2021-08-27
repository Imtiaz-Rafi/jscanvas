let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

// c.fillStyle = 'rgba(255,0,0,0.5)';
// c.fillRect(100,100,100,100);

// c.fillStyle = 'rgba(0,255,0,0.5)';
// c.fillRect(300,200,100,100);

// c.fillStyle = 'rgba(0,0,255,0.5)';
// c.fillRect(100,400,100,100);
// console.log(canvas);

//Line
// c.beginPath();
// c.moveTo(50,300);
// c.lineTo(300,100);
// c.lineTo(400,300);
// c.strokeStyle = "Red";
// c.stroke();

//Arc / Circle
// c.beginPath();
// c.arc(200,300,30,0, Math.PI*2,false);
// c.strokeStyle = "Blue";
// c.stroke();

// for(let i=0;i<50;i++){
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;

//     c.beginPath();
//     c.arc(x, y, 30.0, Math.PI*2, false);
//     c.strokeStyle = "Blue";
//     c.stroke();
// }

let mouse = {
    x: undefined,
    y: undefined
}
let colorArray = [
    '#2C3E50',
    '#E74C3C',
    '#ECF0F1',
    '#3498DB',
    '#2980B9',
];

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});
window.addEventListener('resize',function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

const maxradius = 40;

function Circle(x,y,dx,dy,radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minradius = radius;
    this.colorArray = colorArray[Math.floor(Math.random()*colorArray.length)];
    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius,0, Math.PI*2,false);
        c.fillStyle = this.colorArray;
        c.fill();
    }
    this.update = function(){
        this.draw();
        if(this.x+ this.radius > innerWidth || this.x- this.radius < 0){
            this.dx = -this.dx;
        }
        if(this.y+ this.radius > innerHeight || this.y-this.radius < 0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        if(mouse.x-this.x <50 && mouse.x-this.x > -50 && mouse.y-this.y < 50 && mouse.y-this.y > -50){
            if(this.radius <maxradius ){
                this.radius+=1;
            }
        }else if(this.radius > this.minradius){
            this.radius-=1;
        }

    }
}
let array = [];

function init() {
    array = []
    for(let i=0;i<1500;i++){
        let radius = Math.random()*3 +1;
        let x = Math.random()*(innerWidth-radius*2) + radius;
        let y = Math.random()*(innerHeight-radius*2) + radius;
        let dx = (Math.random()-0.5);
        let dy = (Math.random()-0.5);
        
        array.push(new Circle(x,y,dx,dy,radius));
    }
}
//console.log(array);

function animate(){
    requestAnimationFrame(animate);
    // console.log("cholbe gari sisimpure");
    c.clearRect(0,0,innerWidth,innerHeight);
    for(let i=0;i<array.length;i++){
        array[i].update();
    }
}
init();
animate();