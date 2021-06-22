const HI_SCORE_LIST_MAX = 10;

const startQuizBtnEl = document.getElementById("start-quiz-btn");
const submitHiScoreBtn = document.getElementById("submit-hi-score-btn");
const playAgainBtn = document.getElementById("play-again-btn");

const startQuizScreenEl = document.getElementById("start-quiz-screen");
const quizScreenEl = document.getElementById("quiz-screen");
const hiScoreScreenEl = document.getElementById("hi-score-screen");

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score")
const answerResultEl = document.getElementById("answer-result");
const hiScoreListEl = document.getElementById("hi-score-list");

let choicesBtnsEls = [];

let questionIndex = 0;
let timer = 0;
let score = 0;
let hiScores = null;
let intervalId;

function startQuiz() {
    questionIndex = 0;
    score = 0;
    timer = 60;
    timerEl.innerText = timer;
    scoreEl.innerText = score;
    intervalId = setInterval(function () {
        if (timer <= 0) {
            clearInterval(intervalId);
            showHiScores();
        } else {
            timer--;
            timerEl.innerText = timer;
        }
    }, 1000);

    if (!startQuizScreenEl.classList.contains("hide")) startQuizScreenEl.classList.add("hide");
    if (!hiScoreScreenEl.classList.contains("hide")) hiScoreScreenEl.classList.add("hide");
    quizScreenEl.classList.remove("hide");

    renderQuestion();
}

function renderQuestion() {
    questionEl.innerText = questions[questionIndex].question;
    choicesEl.innerHTML = "";
    choicesBtnsEls = [];

    for (let i = 0; i < questions[questionIndex].choices.length; i++) {
        let choiceBtnEl = document.createElement("button")
        choiceBtnEl.setAttribute("id", `choice-${i+1}`);
        choiceBtnEl.classList.add("choice-btn");
        choiceBtnEl.innerText = questions[questionIndex].choices[i];
        choicesEl.append(choiceBtnEl);
        choicesBtnsEls.push(choiceBtnEl);
    }

    for (let i = 0; i < questions[questionIndex].choices.length; i++) {
        choicesBtnsEls[i].addEventListener("click", function (event) {
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
        score++;
        scoreEl.innerText = score;
    } else {
        answerResultEl.classList.add("wrong");
        answerResultEl.innerText = "Wrong";
        timer -= 10;
        if (timer < 0) timer = 0;
        timerEl.innerText = timer;
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

        questionIndex++;
        if (questionIndex < questions.length) {
            renderQuestion();
        } else {
            clearInterval(intervalId);
            timerEl.innerText = 0;
            showHiScores();
        }
    }, 2000);
}

function showHiScores() {
    hiScores = JSON.parse(localStorage.getItem("hiScores"));
    if (score === 0 
        || (hiScores !== null 
            && hiScores.length >= HI_SCORE_LIST_MAX 
            && score < hiScores[hiScores.length - 1].score)) {
        submitHiScoreBtn.disabled = true;
    } else {
        submitHiScoreBtn.disabled = false;
    }

    quizScreenEl.classList.add("hide");
    hiScoreScreenEl.classList.remove("hide");

    if (hiScores === null) {
        const noScoresYetEl = document.createElement("div");
        noScoresYetEl.classList.add("no-scores-yet");
        noScoresYetEl.textContent = "No scores have been added yet";
        hiScoreListEl.append(noScoresYetEl);
        hiScores = [];
    } else {
        renderScores();
    }
}

function renderScores() {
    hiScoreListEl.innerHTML = "";
    hiScores.forEach(function (score) {
        let li = document.createElement("li");
        li.classList.add("score");
        li.textContent = `${score.initials}: ${score.score}`
        hiScoreListEl.append(li);
    });
}

function submitHiScore(event) {
    event.preventDefault();

    const initialInput = document.querySelector('input[name="hi-score-initial"]');
    if (initialInput.value.length === 0 || initialInput.value.length > 3) return;
    
    const newScore = { initials: initialInput.value, score };

    if (hiScores.length >= HI_SCORE_LIST_MAX) {
        hiScores.pop();
    }
    hiScores.push(newScore);
    hiScores = hiScores.sort((a, b) => b.score - a.score);

    localStorage.setItem("hiScores", JSON.stringify(hiScores));
    renderScores();
    submitHiScoreBtn.disabled = true;
    initialInput.value = "";
}

startQuizBtnEl.addEventListener("click", startQuiz);
submitHiScoreBtn.addEventListener("click", submitHiScore);
playAgainBtn.addEventListener("click", startQuiz);
