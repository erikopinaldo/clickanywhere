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
  #randomAnswer = Math.floor(Math.random() * (sectionList.length + 1)) 
  constructor() {
    this.total = 0
    this.clickCounter = document.querySelector('.clickCounter')
    this.modal = document.getElementById("myModal");
    this.modalCurrentScore = document.querySelector('.modalCurrentScore')
    this.clickLabel = document.querySelector('#clickLabel')
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
  scoreIncrement() {
    return this.total += 1
  }
  showWrongReply() {
    // Get a random number, so that we can choose a wrongReply to show to the user at random
    let randomNumber = Math.floor(Math.random() * this.wrongReplies.length)
    results.innerText = this.wrongReplies[randomNumber]
    this.scoreIncrement()
    this.clickCounter.innerText = this.total
  }
  showAnswerModal() {
    results.innerText = "oKKKK"
    this.scoreIncrement()
    this.modalCurrentScore.innerText = this.total
    
    // Hide the clickCounter and wrongReplies text on the main page because the modal should be the focus
    this.clickLabel.classList.add('hidden')
    this.clickCounter.classList.add('hidden')
    
    // Before actually showing the modal, get getScoreHistory reveals your best score
    this.getScoreHistory()
    this.modal.showModal()
  }
  getScoreHistory() {
    // Push score for current session into your score history array
    let scoreHistoryArray = JSON.parse(localStorage.getItem('scoreHistoryArray'))
    scoreHistoryArray.push(this.total)
    localStorage.setItem('scoreHistoryArray', JSON.stringify(scoreHistoryArray))

    // Look at the updated score history array, and display the lowest score
    let lowestScore = Math.min(...scoreHistoryArray)
    document.querySelector('.score').innerText = lowestScore
  }
  getGuessResult(guess) {
    if (guess === this.#randomAnswer) return this.showAnswerModal()
    else return this.showWrongReply()
  }
}

let game = new Game()

// makeGuess is called when you click a section on the page
function makeGuess(selection) {
  // selection.target.id is a string, so we need to change it to a number
  let guess = Number(selection.target.id)
  console.log("guess: " + guess)

  game.getGuessResult(guess)
}

// Refresh the page to start a new session
function playAgain() { 
  game.modal.style.display = "none"
  window.location = window.location
}