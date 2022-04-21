// // New state score saved to localStorage

if (localStorage.getItem('localClickTotal')) {
  localStorage.setItem('localClickTotal', JSON.stringify([]))
}


// Randomizer
let total = 0 //Click counter
let randomAnswer = Math.floor(Math.random() * 200) //Random number not used yet
const sectionList = document.querySelectorAll('section')

sectionList[randomAnswer].classList.replace('wrong', 'answer')

// Event listeners
document.querySelectorAll('.wrong').forEach(item =>
    item.addEventListener('click', checkWrong)
    )
document.querySelector('#fakeClick').addEventListener('click', checkThought)
document.querySelector('.answer').addEventListener('click', checkAnswer)
document.querySelector('span').addEventListener('click', playAgain)

// Game logic
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
  
    document.querySelector('#results').innerText = replies[randomNumber]
    document.querySelector('.answer').innerText = ""
    total = total + 1
    document.querySelector('#clickCounter').innerText = total
}

function checkThought() {
    document.querySelector('#results').innerText = "u really thought"
    document.querySelector('.answer').innerText = ""
    document.querySelector('#clickCounter').innerText = total
}

function checkAnswer() {
    let modal = document.getElementById("myModal");
    document.querySelector('#results').innerText = "oKKKK"
    document.querySelector('.answer').innerText = "ur sicccc"
    total = total + 1
    document.querySelector('#clickCounter').innerText = total
    modal.showModal()
}

function playAgain() {
  let modal = document.getElementById("myModal");
  modal.style.display = "none"
  document.querySelector('.answer').innerText = ""
  window.location = window.location
}