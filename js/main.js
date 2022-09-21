/*----- constants -----*/
const DECK = [];

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
    "Jh": 10,
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
let isWinnerP, isWinnerD, pScore, dScore, pScorePoints, dScorePoints



/*----- cached element references -----*/
const playerCards = document.querySelector(".player-cards");
const dealerCards = document.querySelector(".dealer-cards");
const hitBtn = document.getElementById("hit-btn");
const holdBtn = document.getElementById("hold-btn");
const playBtn = document.getElementById("play-button");
const message = document.getElementById("message");
const resetBtn = document.getElementById("reset-button");


/*----- event listeners -----*/
playBtn.addEventListener("click", function () {
   init();
})

hitBtn.addEventListener("click", handleClickHit);

holdBtn.addEventListener("click", handleClickHold);

resetBtn.addEventListener("click", function () {
    document.location.reload();
})



/*----- functions -----*/
function handleClickHit () {
    if (isWinnerP === undefined) {
        drawCardP();
        countScoreP();
        checkScoreP();
    }
}

function handleClickHold () {
    if (isWinnerD === undefined && isWinnerP === undefined) {
        switchOverlap();
            while (dScorePoints < 17 || !dScorePoints) {
                drawCardD();
                countScoreD();
                checkScoreD();
            }
        checkScoreD();
    }
    hitBtn.removeEventListener("click", handleClickHit)
    holdBtn.removeEventListener("click", handleClickHold);
}

function init() {
    deckBuilder();
    drawCardP();
    drawCardP();
    addCardBack();
    drawCardD();
    document.querySelector(".dealer-cards :nth-child(2)").classList.add("overlap")
    drawCardD();
    render();
    playBtn.style.display = "none";
    resetBtn.style.display = "inline-block";
    document.querySelectorAll(".buttons button").forEach(button => button.classList.remove("opaque"));
}

function deckBuilder() {
    for (let value of VALUES) {
        for (let card of CARDS) {
            DECK.push(card + value);
        }
    }
    DECK.sort((a, b) => 0.5 - Math.random());
}

function drawCardP() {
    const card = document.createElement("img");
    card.setAttribute("src", `cards/${DECK.pop()}.png`);
    playerCards.appendChild(card);
    card.animate([
        {opacity: "0"},
        {opacity: "1"},
    ], {
        duration: 1000,
    });
}

function countScoreP () {
    pScore = document.querySelectorAll(".player-cards img");
    pScoreArray = Array.from(pScore);
    pScorePoints = 0;
    let cardP;
    for (let card of pScore) {
        cardP = card.getAttribute("src").slice(6, 8);
        pScorePoints += POINTS[cardP];
    }
}

function countScoreD() {
    dScore = document.querySelectorAll(".dealer-cards img");
    dScoreArray = Array.from(dScore);
    dScorePoints = 0;
    for (let card of dScore) {
        if (card.getAttribute("src") === "cards/cardback.png") {
            dScorePoints += 0;
        } else {
        let cardD = card.getAttribute("src").slice(6, 8);
        dScorePoints += POINTS[cardD];
        }
    }
}

function drawCardD() {
    const card = document.createElement("img");
    card.setAttribute("src", `cards/${DECK.pop()}.png`);
    dealerCards.appendChild(card);
    card.animate([
        {opacity: "0"},
        {opacity: "1"},
    ], {
        duration: 1000,
    });
}

function addCardBack() {
    const cardBack = document.createElement("img");
    cardBack.setAttribute("src", `cards/cardback.png`);
    dealerCards.appendChild(cardBack);
    cardBack.animate([
        {opacity: "0"},
        {opacity: "1"},
    ], {
        duration: 1000,
    });
}


function render() {
    countScoreD();
    countScoreP();
    checkScoreD();
    checkScoreP();
}

function switchOverlap () {
    document.querySelector(".dealer-cards :nth-child(2)").classList.remove("overlap");
    document.querySelector(".dealer-cards :nth-child(1)").classList.add("overlap");
    document.querySelector(".dealer-cards :nth-child(2)").animate([
        {opacity: "0"},
        {opacity: "1"},
    ], {
        duration: 1000,
    });
}

function checkScoreP () {
    if (pScorePoints > 21) {
        pScoreArray.forEach((card) => {
            if (card.getAttribute("src").slice(6, 7) === "A") {return pScorePoints -= 10}
        });
        if (pScorePoints === 21) {
            isWinnerP = true;
            message.innerText = "You win! You got Backjack!";
            switchOverlap();
        } else if (pScorePoints > 21) {
            isWinnerP = false;
            message.innerText = "You lose! You have over 21 points!";
            switchOverlap();
        }
    } else if (pScorePoints > 21) {
        isWinnerP = false;
        message.innerText = "You lose! You have over 21 points!";
        switchOverlap();
    } else if (pScorePoints === 21) {
        isWinnerP = true;
        message.innerText = "You win! You got Blackjack!";
        switchOverlap();
    }
}

function checkScoreD () {
    if (document.querySelector(".dealer-cards :nth-child(1)").getAttribute("class") === "overlap") {
        if (dScorePoints > 21) {
            pScoreArray.forEach((card) => {
                if (card.getAttribute("src").slice(6, 7) === "A") {return pScorePoints -= 10}
            });
            if (dScorePoints === 21) {
                isWinnerD = true;
                message.innerText = "You lose! Dealer has Blackjack!";
                switchOverlap();
            } else if (pScorePoints > 21) {
                isWinnerD = false;
                message.innerText = "You win! Dealer has over 21 points";
                switchOverlap();
            } else if (dScorePoints > pScorePoints) {
                message.innerText = "You lose! The dealer has more points!";
            } else if (pScorePoints > dScorePoints) {
                message.innerText = "You win! You have more points!";
            }
        } else if (dScorePoints > 21) {
            isWinnerD = false;
            message.innerText = "You win! Dealer has over 21 points";
            switchOverlap();
        } else if (dScorePoints === 21) {
            isWinnerD = true;
            message.innerText = "You lose! Dealer has Blackjack!";
            switchOverlap();
        } else if (dScorePoints === pScorePoints) {
            isWinnerD = null;
            message.innerText = "It's a tie!";
            switchOverlap();
        } else if (dScorePoints > pScorePoints) {
            message.innerText = "You lose! The dealer has more points!";
        } else if (pScorePoints > dScorePoints) {
            message.innerText = "You win! You have more points!";
        }
    }
}
