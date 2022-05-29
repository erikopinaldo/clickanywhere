// Push to staging test

// New state (i.e. first time ever playing) score saved to localStorage
if (!localStorage.getItem('localClickTotal')) {
  localStorage.setItem('localClickTotal', JSON.stringify([]))
}

// Create array containing all playable sections
const sectionList = document.querySelectorAll('section')

// Give each section a numbered id
let count = 1
for (let i = 0; i < sectionList.length; i++) {
  sectionList[i].setAttribute('id', count.toString())
  count++
}

// Add event listeners to all playable sections
sectionList.forEach(item => item.addEventListener('click', checkSection))

// Add event listener to hidden end-game modal
document.querySelector('button').addEventListener('click', playAgain)

// Random number generator to use as answer key
let randomAnswer = Math.floor(Math.random() * (sectionList.length + 1)) //Random number not used yet
console.log(randomAnswer)

// This constructor is used to load up a new Game object for each new session
class Game {
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
  scoreIncrement() {
    return this.total += 1
  }
  checkWrong() {
    let randomNumber = Math.floor(Math.random() * this.wrongReplies.length)

    this.scoreIncrement()
    results.innerText = this.wrongReplies[randomNumber]
    this.clickCounter.innerText = this.total
  }
  getScoreHistory() {
    let localClickTotal = JSON.parse(localStorage.getItem('localClickTotal'))
    localClickTotal.push(this.total)
    localStorage.setItem('localClickTotal', JSON.stringify(localClickTotal))

    let scoreArr = JSON.parse(localStorage.getItem('localClickTotal'))
    let lowestScore = Math.min(...scoreArr)
    document.querySelector('.score').innerText = lowestScore
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
}

let game = new Game()

function checkSection(selection) {
  let guess = Number(selection.target.id)
  console.log(guess)

  if (guess === randomAnswer) return game.showAnswerModal()
  else return game.checkWrong()
}

function playAgain() { 
  game.modal.style.display = "none"
  window.location = window.location
}