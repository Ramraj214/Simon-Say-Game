let gameSeq = [];
let userSeq = [];
let scores = [];

let btns = ["yellow","red","purple","green"];
let started = false;
let level = 0;

let h2 = document.querySelector('h2');
document.addEventListener("keypress",function(){
    if(started == false){
        console.log("Game stated");
        started = true;
        levelUp();
    }
})

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    },250);
}

function printHighScore(){
    let record = 0;
    for(let score of scores){
        if(record < score){
            record = score;
        }
    }
    let h2 = document.querySelector('.High-score');
    h2.innerText = `High Score : ${record}`;
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randomColor = btns[randIdx];
    gameSeq.push(randomColor);
    console.log(gameSeq);
    let randBtn = document.querySelector(`.${randomColor}`)
    //random btn choosen
    gameFlash(randBtn);
}

function checkAns(idx){
    //console.log('current level : ' , level);
    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        scores.push(level);
        h2.innerHTML = `GAME OVER! Your score was <b>${level}</b> <br>press any key to restart.`;
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor = 'white';
        },150);
        printHighScore();
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);
    userColor = this.classList[1];
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll('.btn');
for(let btn of allBtns){
    btn.addEventListener('click',btnPress);
}

function reset(){
    started = false;
    level = 0;
    gameSeq = [];
    userSeq =[];
}
