
"use strict"


let cvs = document.getElementById('canvas');
let ctx = cvs.getContext('2d');

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottem = new Image();

// Привязка изображений к переменным.
bird.src = 'img/flappy_bird_bird.png';
bg.src = 'img/flappy_bird_bg.png';
fg.src = 'img/flappy_bird_fg.png';
pipeUp.src = 'img/flappy_bird_pipeUp.png';
pipeBottem.src = 'img/flappy_bird_pipeBottom.png';

// Звук.
let fly = new Audio();
let scoreAudio = new Audio();

fly.src = 'audio/fly.mp3';
scoreAudio.src = 'audio/score.mp3';

// Расстояние между препядствиями по вертикали.
let gap = 90;

// Подпрыгивание птицы при нажатии на какую-либо кнопку.
document.addEventListener('keydown', moveUp);

function moveUp() {
    yPosition -= 20;
    fly.play();
}

// Сщздание блоков.
let pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0,
}

let score = 0;

// Позиция птицы.
let xPosition = 10;
let yPosition = 200;
let gravity = 1.3;

function draw() {
    ctx.drawImage(bg, 0, 0);

    for(let i = 0; i < pipe.length; i++) {    
       ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
       ctx.drawImage(pipeBottem, pipe[i].x, pipe[i].y + pipeUp.height + gap);

       pipe[i].x--;
        
       // Генерация новых блоков.
       if(pipe[i].x == 90) {
           pipe.push({
               x : cvs.width,
               y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
           });
       }

       // Отслеживание прикосновений.
       if(xPosition + bird.width >= pipe[i].x && xPosition <= pipe[i].x + pipeUp.width 
        && (yPosition <= pipe[i].y + pipeUp.height || yPosition + bird.height >= pipe[i].y + pipeUp.height + gap)
        || yPosition +bird.height >= cvs.height - fg.height) {
            // Перезагрузка страницы
            location.reload();
            
        }

        if(pipe[i].x == 5) {
            score++; 
            scoreAudio.play();
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);

    ctx.drawImage(bird, xPosition, yPosition);

    // Падение птицы под действием грывитации.
    yPosition += gravity;

    ctx.fillStyle = '#000';
    ctx.font = '30px Verdana';
    ctx.fillText('Счет: ' + score, 90, cvs.height - 50);

    requestAnimationFrame(draw);
    
}
// Загрузка функции graw после загрузки элемента pipeBottem.
pipeBottem.onload = draw;
