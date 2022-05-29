// New state (i.e. first time ever playing) score saved to localStorage
if (!localStorage.getItem('localClickTotal')) {
  localStorage.setItem('localClickTotal', JSON.stringify([]))
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
  #randomAnswer = Math.floor(Math.random() * (sectionList.length + 1)) //Random number not used yet
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
  hint() {
    console.log("hint: " + this.#randomAnswer)
  }
  scoreIncrement() {
    return this.total += 1
  }
  showWrongReply() {
    let randomNumber = Math.floor(Math.random() * this.wrongReplies.length)

    this.scoreIncrement()
    results.innerText = this.wrongReplies[randomNumber]
    this.clickCounter.innerText = this.total
  }
  showAnswerModal() {
    this.scoreIncrement()
    
    results.innerText = "oKKKK"

    this.modalCurrentScore.innerText = this.total
    this.clickLabel.classList.add('hidden')
    this.clickCounter.classList.add('hidden')
    this.getScoreHistory()
    this.modal.showModal()
  }
  getScoreHistory() {
    let localClickTotal = JSON.parse(localStorage.getItem('localClickTotal'))
    localClickTotal.push(this.total)
    localStorage.setItem('localClickTotal', JSON.stringify(localClickTotal))

    let scoreArr = JSON.parse(localStorage.getItem('localClickTotal'))
    let lowestScore = Math.min(...scoreArr)
    document.querySelector('.score').innerText = lowestScore
  }
  getGuessResult(guess) {
    if (guess === this.#randomAnswer) return this.showAnswerModal()
    else return this.showWrongReply()
  }
}

let game = new Game()

function makeGuess(selection) {
  let guess = Number(selection.target.id)
  console.log("guess: " + guess)

  game.getGuessResult(guess)
}

function playAgain() { 
  game.modal.style.display = "none"
  window.location = window.location
}