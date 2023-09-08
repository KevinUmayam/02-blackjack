// HTML References 
const btnPedir = document.querySelector('#btnPedir')
const btnNuevo = document.querySelector('#btnNuevo')
const btnDetener = document.querySelector('#btnDetener')
const smallHTML = document.querySelectorAll('small')
const playerCardsDiv = document.querySelector('#jugador-cartas')
const compCardsDiv = document.querySelector('#computadora-cartas')

let deck = [];
const tipos = ["C", "D", "H", "S"]
const specialCases = ["A", "J", "Q", "K"]

let playerPoints = 0;
compPoints = 0;

// esta funcion crea un nuevo deck con orden aliatorio
const createDeck = () => {

    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo)
        }
    }

    for (let tipo of tipos) {
        for (let special of specialCases) {
            deck.push(special + tipo)
        }
    }
    deck = _.shuffle(deck)
};

createDeck()

// esta funcion me permite agarrar una carta 
const callCard = () => {
    if (deck.lenght === 0) {
        throw 'No ay mas cartas en el deck'
    }
    let card = deck.pop()
    return card
}

// evaluar el valor de la carta 
const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);
    return (isNaN(value)) ?
        (value === 'A') ? 11 : 10
        : (value * 1)
}

//comp turn 

const compTurn = (minPoints) => {

    do {
        const card = callCard()
        compPoints = compPoints + cardValue(card)
        console.log(compPoints);
        smallHTML[1].innerText = compPoints

        const imgCard = document.createElement('img')
        imgCard.src = `assets/cartas/${card}.png`
        imgCard.classList.add('carta')
        compCardsDiv.append(imgCard)
        if (minPoints > 21) {
            break
        }
    } while ((compPoints < minPoints) && (minPoints <= 21));
}

// events 

btnPedir.addEventListener('click', () => {
    const card = callCard()
    playerPoints = playerPoints + cardValue(card)
    console.log(playerPoints);
    smallHTML[0].innerText = playerPoints

    const imgCard = document.createElement('img')
    imgCard.src = `assets/cartas/${card}.png`
    imgCard.classList.add('carta')
    playerCardsDiv.append(imgCard)

    if (playerPoints > 21) {
        console.warn("YOU HAVE LOST THE GAME");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        compTurn(playerPoints)
    } else if (playerPoints === 21) {
        console.warn("21! You Win");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    }
})

btnDetener.addEventListener('click', () => {
    btnDetener.disabled = true;
    btnPedir.disabled = true;
    compTurn(playerPoints)
})