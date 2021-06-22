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

submitHiScoreBtn.addEventListener("click", submitHiScore);
playAgainBtn.addEventListener("click", startQuiz);
