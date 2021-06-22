// Event handler that starts quiz
function startQuiz() {
    // Reset game state
    questionIndex = 0;
    score = 0;
    timer = 60;
    // Assign timer and score to display
    timerEl.innerText = timer;
    scoreEl.innerText = score;
    intervalId = setInterval(function () {
        if (timer <= 0) {
            // When timer reaches 0, then clear interval and go to hi-score
            // screen
            clearInterval(intervalId);
            showHiScores();
        } else {
            // Decrease timer by 1 second, and display new time
            timer--;
            timerEl.innerText = timer;
        }
    }, 1000);

    // This function is used interchangeably between moving from the
    // start screen and hi-score screen, so check to see if the
    // hide class is absent before adding it.
    if (!startQuizScreenEl.classList.contains("hide")) startQuizScreenEl.classList.add("hide");
    if (!hiScoreScreenEl.classList.contains("hide")) hiScoreScreenEl.classList.add("hide");
    quizScreenEl.classList.remove("hide");

    // Display the first question
    renderQuestion();
}

startQuizBtnEl.addEventListener("click", startQuiz);
