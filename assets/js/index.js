const startQuizBtnEl = document.getElementById("start-quiz-btn");

const startQuizScreenEl = document.getElementById("start-quiz-screen");
const quizScreenEl = document.getElementById("quiz-screen");
const hiScoreScreenEl = document.getElementById("hi-score-screen");

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const timerEl = document.getElementById("timer");
const answerResultEl = document.getElementById("answer-result");

let choicesBtnsEls = [];

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
        let choiceBtnEl = document.createElement("button")
        choiceBtnEl.setAttribute("id", `choice-${i+1}`);
        choiceBtnEl.classList.add("choice-btn");
        choiceBtnEl.innerText = questions[questionIndex].choices[i];
        choicesEl.append(choiceBtnEl);
        choicesBtnsEls.push(choiceBtnEl);
    }

    timer = 60;
    timerEl.innerText = timer;
    const intervalId = setInterval(function () {
        if (timer <= 0) {
            clearInterval(intervalId);
            // -1 indicates that no choice was selected
            showAnswer(-1);
        } else {
            timer--;
            timerEl.innerText = timer;
        }
    }, 1000);

    for (let i = 0; i < questions[questionIndex].choices.length; i++) {
        choicesBtnsEls[i].addEventListener("click", function (event) {
            clearInterval(intervalId);
            showAnswer(i);
        });
    }
}

function showAnswer(choice) {
    for (let i = 0; i < choicesBtnsEls.length; i++) {
        choicesBtnsEls[i].setAttribute("disabled", true);
    }

    if (choice === questions[questionIndex].answer) {
        answerResultEl.classList.add("correct");
        answerResultEl.innerText = "Correct!"
    } else {
        answerResultEl.classList.add("wrong");
        answerResultEl.innerText = "Wrong";
    }
    
    for (let i = 0; i < questions[questionIndex].choices.length; i++) {
        if (i === questions[questionIndex].answer) {
            choicesBtnsEls[i].classList.add("correct");
        } else {
            choicesBtnsEls[i].classList.add("wrong");
        }
    }

    setTimeout(function () {
        answerResultEl.innerText = "";
        answerResultEl.classList.remove("correct");
        answerResultEl.classList.remove("wrong");
        choicesEl.innerHTML = "";
        choicesBtnsEls = [];

        questionIndex++;
        if (questionIndex < questions.length) {
            renderQuestion();
        }
    }, 5000);
}

startQuizBtnEl.addEventListener("click", startQuiz);
