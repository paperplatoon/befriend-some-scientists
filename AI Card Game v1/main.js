
/* global $ */

// These are the variables for the player's Essential stats

window.Player = {
  playerPotential: 3,
  playerTrust: 3,
  turns: 0,
  playerAffection: 0,
  playerEmpathy: 0,
  totalScientists: 5
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
    console.log('crack a joke sure is working')
    window.Player.playerAffection += 2
    window.Player.playerTrust += 1
  }
}

const consolation = {
  id: 2,
  name: 'Console Sad Researcher',
  text: 'Gain +4 Affection',
  cardEffect: function () {
    console.log('consolation sure is working')
    window.Player.playerAffection += 4
  }
}

const politics = {
  id: 3,
  name: 'Political Harmony',
  text: 'Gain +5 Affection',
  cardEffect: function () {
    console.log('political harmony sure is working')
    window.Player.playerAffection += 5
  }
}

const fears = {
  id: 4,
  name: 'Share Deep Fears',
  text: 'Gain +2 Empathy and +1 Trust',
  cardEffect: function () {
    window.Player.playerEmpathy += 2
    window.Player.playerTrust += 1
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

const trust1 = {
  id: 7,
  name: 'Employ Psych Tricks',
  text: 'Gain +3 Trust',
  cardEffect: function () {
    window.Player.playerTrust += 3
  }
}

const trust2 = {
  id: 8,
  name: 'Rap Session',
  text: 'Gain +3 Trust',
  cardEffect: function () {
    window.Player.playerTrust += 3
  }
}

// This is the deck of cards and the trash
var deckArray = [crackjoke, consolation, politics, fears, story, trapped, trust1, trust2]
var trashArray = []
var playerHand = []

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
  if (playerHand.length <= 3) {
    playerHand.push(tempCard)
  } else {
    window.alert('Your hand is full. ' + tempCard.name + ' was discarded.')
    trashArray.push(tempCard)
  }
  displayPlayerHand()
  return tempCard
}

// Takes an array of cards and places myCard into the UI correctly

// takes a card and executes that card's effect, then locates the card's index in the player's hand
// and removes the card from the player's hand, then pushes it to the trash array.
const playCard = function (myCardIndex) {
  console.log(playerHand[myCardIndex], {myCardIndex, playerHand})
  const discardedCard = playerHand.splice(myCardIndex, 1)[0]
  console.log({discardedCard})
  discardedCard.cardEffect()
  console.log({playerHand})
  trashArray.push(discardedCard)
  displayPlayerHand()
  renderInstitute()
  renderPlayer()
}

const renderInstitute = function () {
  $('#institute').html(
  `<h2>Institute Scientists</h2>
    <table id="scientist-table">
      <tr>
        <td class="stat-name-col">Affection</td>
        <td class="stat-col" id="chemistry">${window.Player.playerAffection}</td>
      </tr>
      <tr>
        <td class="stat-name-col">Empathy</td>
        <td class="stat-col" id="empathy">${window.Player.playerEmpathy}</td>
      </tr>
      <tr>
        <td class="stat-name-col">Total Scientists</td>
        <td class="stat-col" id="total-scientists">${window.Player.totalScientists}</td>
      </tr>
    </table>
    `)
}

const renderPlayer = function () {
  $('#player').html(
  `   <h2>Player</h2>
    <table id="player-table">
      <tr>
        <td class="stat-name-col">Potential</td>
        <td class="stat-col" id="potential"><span id="potential-span">${window.Player.playerPotential}</span>/20</td>
      </tr>
      <tr>
        <td class="stat-name-col">Trustworthiness</td>
        <td class="stat-col" id="trustworthy"><span id="trustworthy-span">${window.Player.playerTrust}</span>/20</td>
      </tr>
    </table>
    `)
}

// displays your hand correctly
const displayPlayerHand = function () {
  const [one, two, three, four] = playerHand
  const _playerHand = [one, two, three, four]

  const cardZone = $('#player-cards')
  cardZone.empty()

  const cardsHtml = _playerHand
    .map(renderCard)
    .join('')

  cardZone.html(cardsHtml)
  console.log('fired')
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
  renderPlayer()
  renderInstitute()
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
  window.Player.playerTrust -= 1

  $('#potential-span').html(window.Player.playerPotential)
  $('#trustworthy-span').html(window.Player.playerTrust)
  $('#turn-number span').html(window.Player.turns)

  isGameOver()
}

window.EndTurn = endTurn
window.playCard = playCard
window.isGameOver = isGameOver

