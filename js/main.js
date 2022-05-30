// New state (i.e. first time ever playing) score saved to localStorage
if (!localStorage.getItem('scoreHistoryArray')) {
  localStorage.setItem('scoreHistoryArray', JSON.stringify([]))
}

// Create array containing all playable sections
const sectionList = document.querySelectorAll('section')

// Give each section a numbered id and an event listener
let count = 1
for (let i = 0; i < sectionList.length; i++) {
  sectionList[i].setAttribute('id', count.toString())
  sectionList[i].addEventListener('click', makeGuess)
  count++
}

// Add event listener to hidden end-game modal
document.querySelector('button').addEventListener('click', playAgain)

// This constructor is used to load up a new Game object for each new session
class Game {
  // The randomAnswer is a private property, and represents the ID of the correct section
  // correctSection is also private and represents the section element with the ID matching the randomAnswer
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
    this.modalCurrentScore = document.querySelector('.modalCurrentScore')
    this.wrongReplies = [
      "not quite",
      "really?",
      "no not there",
      "getting close... jk",
      "git gud",
      "what're u trying",
      "hello?",
      "no",
      "imagine though?",
      "💀😂"
      ]
  }
  // Mostly for troubleshooting purposes. Reveal the id of the correct section
  hint() {
    console.log("hint: " + this.#randomAnswer)
  }
  // Increment the number of clicks that you made, and update both the main page clickCounter and the hidden modal clickCounter
  scoreIncrement() {
    this.total += 1
    this.clickCounterList.forEach(clickCounter => clickCounter.innerText = this.total)
  }
  showWrongReply() {
    // Get a random number, so that we can choose a wrongReply to show to the user at random
    let randomNumber = Math.floor(Math.random() * this.wrongReplies.length)
    this.results.innerText = this.wrongReplies[randomNumber]
  }
  showAnswer() {
    // Display the win-condition text in both the center heading, and inside the correct section itself
    this.results.innerText = "oKKKK"
    this.#correctSection.innerText = "nice"
    
    // Hide the mainClickCounter and wrongReplies text on the main page because the modal should be the focus
    this.clickLabel.classList.add('hidden')
    this.mainClickCounter.classList.add('hidden')
    
    // Before showing the end-game modal, updateScoreHistory reveals your best score
    this.updateScoreHistory()
    this.modal.showModal()
  }
  updateScoreHistory() {
    // Push score for current session into your score history array
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

// makeGuess is called when you click a section on the page
function makeGuess(selection) {
  // selection.target.id is a string, so we need to change it to a number
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