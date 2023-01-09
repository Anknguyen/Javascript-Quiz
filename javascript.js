
var isWin = false;
var timer;
var timerCount;
var answer = false;
var score = 0;
var questionNum = 0;
let questionElement = document.getElementById("question")
let answerButtonsElement = document.getElementById("answer-buttons")
var currentQuestionIndex = 0;

const startButton = document.getElementById('start-button')
const nextButton = document.getElementById('next-button')

startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  nextQuestion()
})

// Starts quiz
function startQuiz() {
  isWin = false;
  timerCount = 120;
  
  // Runs timer and next question
  nextButton.diabled = true;
  startButton.disabled = true;
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  startTimer()
  nextQuestion()
}


function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    var timeElement = document.querySelector(".timer")
    timerCount--;
    timeElement.textContent = timerCount;

    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      loseGame();
    }
  }, 1000);
}

// Goes to the next question and checks if the current question index is lower than the total number of questions
function nextQuestion() {
  if(currentQuestionIndex < questions.length){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
  }
else //if question index is above array length the quiz ends
{
  resetState()
  questionElement.innerText = "Your score is " + score;
  clearInterval(timer);
  startButton.innerText = 'Restart'
  startButton.disabled = false;
  nextButton.disabled = true;
  currentQuestionIndex = 0;
  timer = 0;
}
}

function showQuestion(question) {
  // Shows question
  questionElement.innerText = question.question
  // Creates new buttons for the answers
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

//Runs if time runs out
function loseGame() {
  questionElement.innerText = "Time's up!"
  resetState()
  startButton.innerText = 'Restart'
  startButton.disabled = false;
  nextButton.disabled = true;
}

//Deletes all question buttons
function resetState() {
  nextButton.disabled = true;
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

//Determines if the selected answer is correct
function selectAnswer(e) {
  const userAnswer = e.target
  nextButton.disabled = false;
  const currentQuestion = shuffledQuestions[currentQuestionIndex]
  currentQuestion.answers.forEach(answer => {
    if (userAnswer.innerText == answer.text) {
      if(answer.correct){
        score++
      }
    }
  })
}

//Questions array
const questions = [
  {
    question: "What is 1+1?",
    answers: [
      {text: "2", correct: true},
      {text: "4", correct: false},
      {text: "3", correct: false},
      {text: "1", correct: false}
    ]
  },
  {
    question: "What is 3*5?",
    answers: [
      {text: "843", correct: false},
      {text: "4136", correct: false},
      {text: "237", correct: false},
      {text: "15", correct: true}
    ]
  },
  {
    question: "How cool is javascript?",
    answers: [
      {text: "Not at all", correct: false},
      {text: "Somewhat", correct: false},
      {text: "Meh", correct: false},
      {text: "The coolest", correct: true}
    ]
  },
  {
    question: "How hard was this quiz?",
    answers: [
      {text: "Not at all", correct: true},
      {text: "Very hard", correct: false},
      {text: "Beyond diffcult", correct: false},
      {text: "Easiest quiz of my life", correct: true}
    ]
  }
]