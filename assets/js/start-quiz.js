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

startQuizBtnEl.addEventListener("click", startQuiz);
