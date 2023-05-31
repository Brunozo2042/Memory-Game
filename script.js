const FRONT = "front"
const BACK = "back"
const CARD = "card"
const FLIP = "flip"
var nAtt = document.getElementById("nAtt")

let techs = [
    'bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react'
]

let cards = [];

startGame();

function startGame() {
    cards = creatCards(techs)
    shuffle(cards)
    //console.log(cards)
    buildBoard(cards)
}

function buildBoard(cards) {
    var board = document.getElementById("board")

    cards.forEach(card => {

        //cria a div card
        var cardEl = document.createElement('div')
        cardEl.id = card.id
        cardEl.classList.add(CARD)
        cardEl.dataset = card.icon
        cardEl.addEventListener('click', flipCard)

        //cria a div front
        var front = document.createElement('div')
        front.classList.add(FRONT)

        //cria a imagem 
        var img = document.createElement('img')
        img.src = "./images/" + card.icon + ".png"

        //adiciona a imagem na div front
        front.appendChild(img)

        //cria a div back
        var back = document.createElement('div')
        back.innerHTML = '&lt/&gt'
        back.classList.add(BACK)

        //adiciona os elementos front e back no elemento card
        cardEl.appendChild(front)
        cardEl.appendChild(back)

        //adiciona a carta no tabuleiro
        board.appendChild(cardEl)

    });
}

function shuffle(cards) {
    var currentIndex = cards.length
    var randomIndex = 0

    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]]
    }
}

function creatCards(techs) {

    for (let tech of techs) {

        cards.push(createPair(tech));
    }

    return cards.flatMap(pair => pair)

    //console.log(cards)

}

function createPair(tech) {

    return [{
        id: cretaId(tech),
        icon: tech,
        flipped: false
    }, {
        id: cretaId(tech),
        icon: tech,
        flipped: false
    }]

}

function cretaId(tech) {
    return tech + parseInt(Math.random() * 10000)
}

//console.log(cards)
//Game

var lockMode = false
var card1, card2;
var nTurns = 0

function flipCard() {
    if (setCard(this.id)) {
        this.classList.add(FLIP)
        if (card1 && card2) {
            nTurns++
            if (match()) {
                card1.flipped = true
                card2.flipped = true
                clearCards()
                if (gameOver()) {
                    var GO = document.getElementById('gameOver')
                    var attempts = document.getElementById('attempts')
                    attempts.innerHTML = (nTurns) + " Attempts"
                    GO.style.display = "flex"
                }
            } else {
                if (!card2) {
                    return
                }
                setTimeout(() => {


                    var cardView1 = document.getElementById(card1.id)
                    var cardView2 = document.getElementById(card2.id)

                    cardView1.classList.remove(FLIP)
                    cardView2.classList.remove(FLIP)
                    clearCards()
                }, 1000);
            }
            console.log(nTurns)
            nAtt.innerHTML = nTurns
        }
    }
}

function setCard(id) {
    var card = cards.filter(card => card.id === id)[0]

    if (card.flipped || lockMode) {
        return false
    }

    if (!card1) {
        card1 = card
    } else {
        card2 = card
        lockMode = true
    }
    return true
}

function match() {
    return card1.icon === card2.icon
}

function clearCards() {
    card1 = null
    card2 = null
    lockMode = false
}

function gameOver() {
    for (var i = 1; i < cards.length; i++) {
        if (!cards[i].flipped) {
            return false
        }
    }
    return true
}

function restart() {
    window.location.reload()
}