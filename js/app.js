/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector('.deck');
const restart = document.querySelector('.restart');
let card = document.getElementsByClassName('card');
let matchCard = document.getElementsByClassName('match');
let cards = [...card];
let matchedCards = [];
/* Variables for move tracking */
let moves = document.querySelector('.moves');
let moveCount, cardFlipCount = 0;
/* Variables for star rating */
let starPanel = document.querySelector('.stars');
let star = document.getElementsByClassName('fa-star');
let stars = [...star];
/* Variables for timer */
let timer = document.querySelector('.timer');
let min, sec, time;
let resultOverlay = document.querySelector('.resultOverlay');



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/**
 * Execute the game. Create facedown shuffled card HTML 
 * with shuffle function.
 */
function init() {
    matchedCards = [];
    cards = shuffle(cards);
    // distribute shuffled cards to the game board
    for (let c of cards) {
        deck.appendChild(c);
        c.classList.remove('open', 'match', 'show', 'disabled', 'mismatch');
    }
    // reset star rating
    for (let s of stars) {
        s.style.visibility = 'visible';
    }
    // reset move count
    cardFlipCount = 0;
    moveCount = 0;
    moves.innerHTML = `Moves: ${moveCount}`;
    // reset timer
    sec, min = 0;
    timer.innerHTML = '0 min(s) 0 sec(s)'
    clearInterval(time);
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/**
 * Matching logic via className of 2 cards. Reflect visually
 * via html class and corresponding css selectors. Handle 
 * timing of counting moves and ratings. 
 * 
 * @param {*} event trigger on mouse click on a card
 */
function checkMatch(event) {
    let cardTarget = event.target;
    if (cardTarget.matches('.card')) {
        // reveal card for every mouseclick on an 'enabled' card
        cardTarget.classList.add('open', 'show');
        matchedCards.push(cardTarget);
        startTime();
        if (matchedCards.length === 2) {
            starRate();
            if (matchedCards[0].lastElementChild.className === matchedCards[1].lastElementChild.className) {
                matchedCards[0].classList.add('match');
                matchedCards[1].classList.add('match');
                matchedCards = [];
            } else {
                matchedCards[0].classList.add('mismatch');
                matchedCards[1].classList.add('mismatch');
                // Add 0.5 sec delay for disable to allow for 0.35s mismatch animation 
                // to finish and a little extra time for visually pleasing disable to 
                // hidden transition
                disableCards();
                setTimeout(() => {
                    matchedCards[0].classList.remove('open', 'show', 'mismatch');
                    matchedCards[1].classList.remove('open', 'show', 'mismatch');
                    enableCards();
                    matchedCards = [];
                }, 450);
            }
        }
    }
    resultModal();
}

/**
 * 'Disable' card by adding disabled class
 */
function disableCards() {
    for (let c of cards) {
        c.classList.add('disabled');
    }
}

/**
 * 'Enable' card by removing disabled class
 */
function enableCards() {
    for (let c of cards) {
        c.classList.remove('disabled');
    }
}

/**
 * Track number of moves where 1 move = 1 pair selection. 
 * Incorporates rating for convenience of implementation.
 */
function starRate() {
    moveCount++;
    moves.innerHTML = `Moves: ${moveCount}`;
    // Adjust star rating based on moveCount
    if (moveCount >= 14 && moveCount <= 18) {
        stars[stars.length - 1].style.visibility = 'collapse';
    } else if (moveCount > 18) {
        stars[stars.length - 2].style.visibility = 'collapse';
    }
}

/**
 * Increment sec every second. Increment min every 60 sec.
 */
function startTime() {
    cardFlipCount++;
    if (cardFlipCount === 1) {
        // start time on first move, account for 1 second delay
        // from setInterval in startTime()
        sec = 1, min = 0;
        time = setInterval(() => {
            timer.innerHTML = min + 'min(s) ' + sec + 'sec(s)';
            sec++;
            if (sec === 60) {
                min++;
                sec = 0;
            }
        }, 1000)
    }
}

/**
 * Modal to display result metrics for the game instance
 */
function resultModal() {
    if (matchCard.length === 16) {
        // Stop and store results
        clearInterval(time);
        document.getElementById('cardFlipCount').innerHTML = cardFlipCount;
        document.getElementById('moveCount').innerHTML = moveCount;
        document.getElementById('timer').innerHTML = timer.innerHTML;
        document.getElementById('resultStarPanel').innerHTML = starPanel.innerHTML;

        resultOverlay.classList.add('show');
    }
}

/**
 * If play again then close result modal and restart game
 */
function resultInit() {
    resultOverlay.classList.remove('show');
    init();
}

/**
 * Initialize game on loading app.js
 */
init();

/**
 * Shared event listener for a mouseclick
 */
deck.addEventListener('click', checkMatch, false);
restart.addEventListener('click', init, false);