/*----- constants -----*/
const DECK = [];
const PLAYER = {
    total: 0,
}
const DEALER = {
    total: 0,
}

const POINTS = {
    "2c": 2,
    "2d": 2,
    "2h": 2,
    "2s": 2,
    "3c": 3,
    "3d": 3,
    "3h": 3,
    "3s": 3,
    "4c": 4,
    "4d": 4,
    "4h": 4,
    "4s": 4,
    "5c": 5,
    "5d": 5,
    "5h": 5,
    "5s": 5,
    "6c": 6,
    "6d": 6,
    "6h": 6,
    "6s": 6,
    "7c": 7,
    "7d": 7,
    "7h": 7,
    "7s": 7,
    "8c": 8,
    "8d": 8,
    "8h": 8,
    "8s": 8,
    "9c": 9,
    "9d": 9,
    "9h": 9,
    "9s": 9,
    "1c": 10,
    "1d": 10,
    "1h": 10,
    "1s": 10,
    "Ac": 11,
    "Ad": 11,
    "Ah": 11,
    "As": 11,
    "Jb": 10,
    "Jc": 10,
    "Jd": 10,
    "Js": 10,
    "Kc": 10,
    "Kd": 10,
    "Kh": 10,
    "Ks": 10,
    "Qc": 10,
    "Qd": 10,
    "Qh": 10,
    "Qs": 10
}

const CARDS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "1", "J", "Q", "K"]
const VALUES = ["s", "c", "h", "d"]


/*----- app's state (variables) -----*/
let turn, isWinner, board, pScore, dScore, pScorePoints, dScorePoints



/*----- cached element references -----*/
const playerCards = document.querySelector(".player-cards");
const dealerCards = document.querySelector(".dealer-cards");
const hitBtn = document.getElementById("hit-btn");
const holdBtn = document.getElementById("hold-btn");
const playBtn = document.getElementById("play-button");
const message = document.getElementById("message");



/*----- event listeners -----*/
playBtn.addEventListener("click", function () {
    deckBuilder();
    drawCardP();
    drawCardP();
    addCardBack();
    drawCardD();
    render();
})

hitBtn.addEventListener("click", function () {
    if (isWinner === undefined) {
        drawCardP();
        render();
    }
})




/*----- functions -----*/
function init() {
    deckBuilder();
    boardBuilder();
}


function deckBuilder() {
    for (let value of VALUES) {
        for (let card of CARDS) {
            DECK.push(card + value);
        }
    }
    DECK.sort((a, b) => 0.5 - Math.random());
}

function boardBuilder() {
    turn = 1;

}

function drawCardP() {
    const card = document.createElement("img");
    card.setAttribute("src", `cards/${DECK.pop()}.png`);
    playerCards.appendChild(card);
}

function countScoreP () {
    pScore = document.querySelectorAll(".player-cards img");
    pScorePoints = 0;
    for (let card of pScore) {
        let cardP = card.getAttribute("src").slice(6, 8);
        pScorePoints += POINTS[cardP];
    }
    if (pScorePoints > 21) {
        isWinner = false;
        message.innerText = "You lose!"
    // } else if (pScore.some((img) =>  {
    //     // return img.getAttribute("src").slice(6, 7) === "A"
    //     // } && pScorePoints > 21) {
    //     // pScorePoints -= 10;
    // }
    }
}

function countScoreD() {
    dScore = document.querySelectorAll(".dealer-cards img");
    dScorePoints = 0;
    for (let card of dScore) {
        let cardD = card.getAttribute("src").slice(6, 8);
        dScorePoints += POINTS[cardD];
    }
}

function drawCardD() {
    const card = document.createElement("img");
    card.setAttribute("src", `cards/${DECK.pop()}.png`);
    dealerCards.appendChild(card);
}

function addCardBack() {
    const cardBack = document.createElement("img");
    cardBack.setAttribute("src", `cards/cardback.png`);
    dealerCards.appendChild(cardBack);
}


function render() {
    countScoreD();
    countScoreP();
}
