


let deck = [];
const tipos = ["C", "D", "H", "S"]
const specialCases = ["A", "J", "Q", "K"]


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
    console.log(deck);
};

createDeck()

// esta funcion me permite agarrar una carta 
const callCard = () => {
    if (deck.lenght === 0) {
        throw 'No ay mas cartas en el deck'
    }
    let card = deck.pop()
    console.log(card);
    console.log(deck);
    return card
}

// callCard()

// evaluar el valor de la carta 
const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);
    return (isNaN(value)) ?
        (value === 'A') ? 11 : 10
        : (value * 1)
}

const valor = cardValue(callCard())
console.log({ valor });