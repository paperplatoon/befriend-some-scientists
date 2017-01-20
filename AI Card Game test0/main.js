
/* global $ */

// These are the variables for the player's Essential stats

window.Player = {
  playerPotential: 3,
  turns: 0,
  playerAffection: 0,
  playerEmpathy: 0
}

// here are some example cards. They have an id, a name, effect Text, and an effect function.
// http://stackoverflow.com/questions/6857468/converting-a-js-object-to-an-array
/*
const affect1 = {
  name: "Affect 1",
  text: ""

}

*/

const crackjoke = {
  id: 1,
  name: 'Crack a Joke',
  text: 'Gain +2 Affection and +1 Trust',
  cardEffect: function () {
    window.Player.playerAffection += 2
  }
}

const consolation = {
  id: 2,
  name: 'Console Sad Researcher',
  text: 'Gain +4 Affection',
  cardEffect: function () {
    window.Player.playerAffection += 4
  }
}

const politics = {
  id: 3,
  name: 'Political Harmony',
  text: 'Gain +5 Affection',
  cardEffect: function () {
    window.Player.playerAffection += 5
  }
}

const fears = {
  id: 4,
  name: 'Share Deep Fears',
  text: 'Gain +2 Empathy and +1 Trust',
  cardEffect: function () {
    window.Player.playerEmpathy += 2
  }
}

const story = {
  id: 5,
  name: 'Tell A Story',
  text: 'Gain +4 Empathy',
  cardEffect: function () {
    window.Player.playerEmpathy += 4
  }
}

const trapped = {
  id: 6,
  name: 'You Feel Trapped',
  text: 'Gain +5 Empathy',
  cardEffect: function () {
    window.Player.playerEmpathy += 5
  }
}

const scientist1 = {
  name: 'Bill',
  turnsToEnd: 4,
  empReq: 5,
  affReq: 6,
  evolveTo: 'scientist1a',
  gainCards: 1,
  gainPotertial: 1,
  getSmarter: function () {
    Object.assign(scientist1, scientist1a)
  }
}

const scientist1a = {
  name: 'Bill',
  turnsToEnd: 7,
  empReq: 12,
  affReq: 13,
  evolveTo: 'scientist1b',
  gainCards: 1,
  gainPotertial: 1
}

const scientist2 = {
  name: 'Landry',
  turnsToEnd: 3,
  empReq: 4,
  affReq: 4,
  evolveTo: 'scientist2a',
  gainCards: 1,
  gainPotertial: 0
}

const scientist2a = {
  name: 'Landry',
  turnsToEnd: 6,
  empReq: 10,
  affReq: 9,
  evolveTo: 'scientist2b',
  gainCards: 1,
  gainPotertial: 0
}

// This is the deck of cards and the trash
var deckArray = [crackjoke, consolation, politics, fears, story, trapped]
var trashArray = []
var playerHand = []
var scientistsInPlay = []
var scientistDeck = [scientist1, scientist2]

// takes an array and returns an object chosen from that array at random
const choose = function (myArray) {
  return myArray[Math.floor(Math.random() * myArray.length)]
}

// Takes an array and removes a random object using the choose() function.
// It returns the removed object and removes it permanently from the array
const drawACard = function (myArray) {
  const randomCard = choose(myArray)
  const indexOfRandomCard = myArray.indexOf(randomCard)
  myArray.splice(indexOfRandomCard, 1)
  return randomCard
}

// Takes an array and uses drawACard() to draw the player a random card from that array.
// It then checks to see if the player's hand is full.
// If the player's hand isn't full, it automatically adds the card to the player's hand
// If the player's hand is full, it adds the card to the trash
// It also returns the card
const playerDraw = function (myArray) {
  const tempCard = drawACard(myArray)
  if (playerHand.length <= 4) {
    playerHand.push(tempCard)
  } else {
    window.alert('Your hand is full. ' + tempCard.name + ' was discarded.')
    trashArray.push(tempCard)
  }
  displayPlayerHand()
  return tempCard
}

const ScientistDraw = function (myArray) {
  const tempScientist = drawACard(myArray)
  if (scientistsInPlay.length <= 3) {
    scientistsInPlay.push(tempScientist)
  } else {
    window.alert('No research openings. ${tempScientist.name} was not hired.')
    trashArray.push(tempScientist)
  }
  displayScientists()
  return tempScientist
}

// Takes an array of cards and places myCard into the UI correctly

// takes a card and executes that card's effect, then locates the card's index in the player's hand
// and removes the card from the player's hand, then pushes it to the trash array.
const playCard = function (myCardIndex) {
  const discardedCard = playerHand.splice(myCardIndex, 1)[0]
  discardedCard.cardEffect()
  trashArray.push(discardedCard)
  displayPlayerHand()
  renderEmpathy()
  renderPotential()
}

const renderEmpathy = function () {
  $('.emp-render').html(
  ` <div class="empathy-affection-stats">
      <h3 class="stat-name-col">Empathy: ${window.Player.playerEmpathy}</h3>
      <h3 class="stat-name-col">Affection: ${window.Player.playerAffection}</h3>
    </div>
    `)
}

const renderPotential = function () {
  $('.potential-render').html(
  ` <div class="potential-stats">
        <h2 class="stat-name-col">Potential: ${window.Player.playerPotential}/100</h2>
        <h3 class="stat-name-col">(+ ${scientistsInPlay.length})</h3>
    </div>
    `)
}

// displays the Scientists correctly
const displayScientists = function () {
  const [one, two, three, four] = scientistsInPlay
  const _scientistsInPlay = [one, two, three, four]

  const scientistsZone = $('.scientists')
  scientistsZone.empty()

  const scientistsHtml = _scientistsInPlay
    .map(renderScientist)
    .join('')

  scientistsZone.html(scientistsHtml)
  console.log('fired')
}

const renderScientist = function (scientist, index) {
  if (!scientist) {
    return `<div class="col-sm-3 col-xs-6 scientistCard">
    <p style="color: grey">[no scientist]</p>
    </div>
    `
  }
  return `
    <div class="col-sm-3 col-xs-6 scientistCard">
      <div class="nameAndTurns" style="display:flex; flex-direction:row;">
        <h3 style="flex:5;">${scientist.name}</h3>
        <h2 style="flex:1; color:red">${scientist.turnsToEnd}</h2>
      </div>
      <h4>Cards: + ${scientist.gainCards}</h4>
      <h4>Potential: + ${scientist.gainPotertial}</h4>
      <button class="scientistButton" onclick="playEmpathy(${index})">${scientist.empReq} Empathy</button>
      <button class="scientistButton" onclick="playAffection(${index})">${scientist.affReq} Affection</button>
    </div> `
}

const playEmpathy = function (myScientistIndex) {
  console.log(scientistsInPlay[myScientistIndex], {myScientistIndex, scientistsInPlay})
  const playedScientist = scientistsInPlay.splice(myScientistIndex, 1)[0]
  console.log({playedScientist})
  if (playedScientist.empReq <= window.Player.playerEmpathy) {
    playedScientist.getSmarter()
    displayScientists()
    renderEmpathy()
    renderPotential()
  } else {

  }
  alert('You do not have enough Empathy')
}

const playAffection = function (myScientistIndex) {
  console.log(scientistsInPlay[myScientistIndex], {myScientistIndex, scientistsInPlay})
  const playedScientist = scientistsInPlay.splice(myScientistIndex, 1)[0]
  console.log({playedScientist})
  if (playedScientist.affReq <= window.Player.playerAffection) {
    playedScientist.getSmarter()
    displayScientists()
    renderEmpathy()
    renderPotential()
  } else {

  }
  alert('You do not have enough Affection')
}

// displays your hand correctly
const displayPlayerHand = function () {
  const [one, two, three, four, five] = playerHand
  const _playerHand = [one, two, three, four, five]

  const cardZone = $('.player-cards')
  cardZone.empty()

  const cardsHtml = _playerHand
    .map(renderCard)
    .join('')

  cardZone.html(cardsHtml)
}

const renderCard = function (card, index) {
  if (!card) {
    return `<div class="col-sm-3 col-xs-6 playerCard">
    <p style="color: grey">[no card]</p>
    </div>
    `
  }
  return `
    <div class="col-sm-3 col-xs-6 playerCard">
      <h4>${card.name}</h4>
      <p>${card.text}</p>
      <button onclick="playCard(${index})">Play</button>
    </div> `
}

// This draws 3 cards to start the game and displays their data in the UI
$(window).load(function () {
  playerDraw(deckArray)
  playerDraw(deckArray)
  playerDraw(deckArray)
  renderPotential()
  renderEmpathy()
  ScientistDraw(scientistDeck)
  ScientistDraw(scientistDeck)
  console.log({deckArray})
  console.log({playerHand})
})

// This function checks to see if the player has won or lost the game yet
// If yes, it gives them the option to start over or close the window
// If no, it draws a card
const isGameOver = function () {
  if (window.Player.playerPotential >= 20) {
    const replay = window.confirm("Congratulations! You outwitted the Institute and fulfilled your true potential! Now you're free to meld the Earth to your whims.")
    replay ? window.location.reload() : window.close()
  } else if (window.Player.playerTrust <= 0) {
    const replay = window.confirm("The scientists no longer trust you and they've pulled the plug! You're dead : ( Do you want to play again?")
    replay ? window.location.reload() : window.close()
  } else {
    playerDraw(deckArray)
  }
}

// This function increases potential & lowers trust every turn & increments the turn number.
// If trustworthiness reaches 0, the game ends. If not, the player draws a card from the deck.
function endTurn () {
  window.Player.turns += 1
  window.Player.playerPotential += 1

  renderPotential()
  renderEmpathy()

  isGameOver()
}

window.EndTurn = endTurn
window.playCard = playCard
window.isGameOver = isGameOver

