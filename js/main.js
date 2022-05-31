// New state (i.e. first time ever playing) score array saved to localStorage
if (!localStorage.getItem('scoreHistoryArray')) {
  localStorage.setItem('scoreHistoryArray', JSON.stringify([]))
}

// Create array containing all playable sections
const sectionList = document.querySelectorAll('section')

// Give each section a numbered ID and an event listener
let count = 1
for (let i = 0; i < sectionList.length; i++) {
  sectionList[i].setAttribute('id', count.toString())
  sectionList[i].addEventListener('click', makeGuess)
  count++
}

// Add event listener to hidden end-game modal
document.querySelector('button').addEventListener('click', playAgain)

// Add event listener for keypresses (only used to trigger hint())
window.addEventListener('keydown', keyPress => {
  if (keyPress.key === '`') game.hint()
});

// This constructor is used to load up a new Game object for each new session
class Game {
  // #randomAnswer is a private property, and represents the ID of the correct section
  // #correctSection is also private and represents the section element with the ID matching #randomAnswer
  #randomAnswer = Math.floor((Math.random() * sectionList.length) + 1)
  #correctSection = document.getElementById(`${this.#randomAnswer}`) 
  constructor() {
    this.scoreHistoryArray = JSON.parse(localStorage.getItem('scoreHistoryArray'))
    this.total = 0
    this.results = document.getElementById('results')
    this.clickLabel = document.getElementById('clickLabel')
    this.clickCounterList = document.querySelectorAll('.clickCounter')
    this.mainClickCounter = document.getElementById('mainClickCounter')
    this.modal = document.getElementById("myModal");
    this.wrongReplies = [
      "not quite",
      "try another",
      "no not there",
      "that's not it",
      "keep looking",
      "try again",
      "look harder",
      "no",
      "nahh",
      "nope"
      ]
  }
  // Mostly for troubleshooting purposes. Reveal the id of the correct section in the console, as well as visually highlight the solution section
  hint() {
    console.log("hint: " + this.#randomAnswer)
    this.#correctSection.style.backgroundColor = 'rgba(75,181,67,0.3)' 
  }
  // Increment the player's running click total, and update both the main page clickCounter and the hidden modal clickCounter text
  scoreIncrement() {
    this.total += 1
    this.clickCounterList.forEach(clickCounter => clickCounter.innerText = this.total)
  }
  showWrongReply() {
    // Get a random number to act as the selected index for the wrongReplies array. Display this selection in the DOM
    let randomNumber = Math.floor(Math.random() * this.wrongReplies.length)
    this.results.innerText = this.wrongReplies[randomNumber]
  }
  showAnswer() {
    // Visually highlight the solution section after the player clicks it
    this.#correctSection.style.backgroundColor = 'rgb(75,181,67)' 
    
    // Hide the center text on the main page because the modal should be the focus
    this.results.classList.add('hidden')
    this.clickLabel.classList.add('hidden')
    this.mainClickCounter.classList.add('hidden')
    
    // Before showing the end-game modal, updateScoreHistory reveals the player's best score
    this.updateScoreHistory()
    this.modal.showModal()
  }
  updateScoreHistory() {
    // Push score for player's current session into the score history array
    this.scoreHistoryArray.push(this.total)
    localStorage.setItem('scoreHistoryArray', JSON.stringify(this.scoreHistoryArray))

    // Look at the updated score history array, and display the lowest score
    let lowestScore = Math.min(...this.scoreHistoryArray)
    document.querySelector('.score').innerText = lowestScore
  }
  getGuessResult(guess) {
    if (guess === this.#randomAnswer) return this.showAnswer()
    else return this.showWrongReply()
  }
}

let game = new Game()

// makeGuess is called when the player clicks a section on the page
function makeGuess(selection) {
  // selection.target.id is a string. We need to change it to a number so that it can be compared against the previously generated random number key
  let guess = Number(selection.target.id)
  console.log("guess: " + guess)

  game.scoreIncrement()
  game.getGuessResult(guess)
}

// Refresh the page to start a new session
function playAgain() { 
  game.modal.style.display = "none"
  window.location = window.location
}