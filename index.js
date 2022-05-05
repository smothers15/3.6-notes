const cardList = document.querySelector('.cardList');
const lifeScoreLabel = document.getElementById('total');
const gameScoreLabel = document.getElementById('game');
const restart = document.getElementById('restart');
let lifeScore = 0;
let gameScore = 0;

buildBoard();
//addCard('test');

let interval = setInterval(function(){
    addCard(cardList.children.length+1)
}, 2000);

function addCard(value){
    let card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('active');
    card.innerHTML = value;
    cardList.appendChild(card);
}

function buildBoard(){
    for(let i=0;i<12;i++){
        addCard('starter');
    }
}

cardList.addEventListener('click', function(e){
    console.log(e.target);
    if(e.target.classList.contains('inactive')){
        lifeScore = lifeScore+2;
        gameScore = gameScore+2;
        lifeScoreLabel.textContent = `Total Score: ${lifeScore}`;
        gameScoreLabel.textContent = `Current Game Score: ${gameScore}`;
    }
    if(e.target.classList.contains('active')){
        lifeScore++;
        gameScore++;
        lifeScoreLabel.textContent = `Score: ${lifeScore}`;
        gameScoreLabel.textContent = `Score: ${gameScore}`;
    }
    if(e.target.matches('.cardList')){
        return
    }
    if(e.target.classList.contains('active')){
        e.target.classList.remove('active');
        e.target.classList.add('inactive');
        return
    }
    e.target.remove();

    let children = cardList.children;
    if(children.length <1){
        clearInterval(interval);
        interval=null;
        lifeScoreLabel.classList.remove('hidden');
        gameScoreLabel.classList.remove('hidden');
        restart.classList.remove('hidden');
    }
});

restart.addEventListener('click', function(){
    gameScore=0;
    lifeScoreLabel.classList.add('hidden');
    gameScoreLabel.classList.add('hidden');
    restart.classList.add('hidden');
    buildBoard();
    if(!interval){
        interval = setInterval(function(){
            addCard(cardList.children.length+1)
        }, 2000)
    }
})