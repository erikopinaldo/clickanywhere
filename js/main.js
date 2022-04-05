let total = 0 //Click counter
let randomAnswer = Math.floor(Math.random() * 200) //Random number not used yet
const sectionList = document.querySelectorAll('section')

sectionList[randomAnswer].classList.replace('wrong', 'answer')

document.querySelectorAll('.wrong').forEach(item =>
    item.addEventListener('click', checkWrong)
    )
document.querySelector('#fakeClick').addEventListener('click', checkThought)
document.querySelector('.answer').addEventListener('click', checkAnswer)
document.querySelector('button').addEventListener('click', playAgain)

//Response to clicks.

let results = document.querySelector('#results')
let answer = document.querySelector('.answer')
let clickCounter = document.querySelector('.clickCounter')
let clickCounterTwo = document.querySelector('.clickCounterTwo')

//Response to normal wrong clicks.
function checkWrong() {
    const replies = [
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
    let randomNumber = Math.floor(Math.random() * replies.length);
  
    results.innerText = replies[randomNumber]
    answer.innerText = ""
    total = total + 1
    clickCounter.innerText = total
    clickCounterTwo.innerText = total
}

function checkThought() {
    results.innerText = "u really thought"
    answer.innerText = ""
    clickCounter.innerText = total
    clickCounterTwo.innerText = total
}

function checkAnswer() {
    let modal = document.getElementById("myModal");
    results.innerText = "oKKKK"
    answer.innerText = "ur sicccc"
    total = total + 1
    clickCounter.innerText = total
    document.querySelector('#clickLabel').classList.add('hidden')
    clickCounterTwo.classList.add('hidden')
    modal.showModal()
    
}

function playAgain() {
  let modal = document.getElementById("myModal");
  modal.style.display = "none"
  answer.innerText = ""
  window.location = window.location
}
