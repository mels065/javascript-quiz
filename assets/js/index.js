const startQuizBtnEl = document.getElementById("start-quiz-btn");

const startQuizScreenEl = document.getElementById("start-quiz-screen");
const quizScreenEl = document.getElementById("quiz-screen");
const hiScoreScreenEl = document.getElementById("hi-score-screen");

const questionEl = document.getElementById("question");
const answerStatusEl = document.getElementById("answer-status");

const choicesEls = [];
for (let i = 0; i < 4; i++) {
    choicesEls.push(
        document.querySelector(`label[for="choice-${i+1}"]`)
    );
}

let questionIndex = 0;
let timer = 0;
let score = 0;

function startQuiz() {
    startQuizScreenEl.classList.add("hide");
    quizScreenEl.classList.remove("hide");

    renderQuestion();
}

function renderQuestion() {
    questionEl.innerText = questions[questionIndex].question;
    for (let i = 0; i < questions[questionIndex].choices.length; i++) {
        choicesEls[i].innerText = questions[questionIndex].choices[i]
    }

    timer = 60;
    const intervalId = setInterval(function () {
        if (timer <= 0) {
            clearInterval(intervalId);
            // -1 indicates that no choice was selected
            showAnswer(-1);
        }
    }, 1000);
}

function showAnswer(choice) {}

startQuizBtnEl.addEventListener("click", startQuiz);