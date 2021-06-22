function showHiScores() {
    // Get hi-scores from the local storage
    hiScores = JSON.parse(localStorage.getItem("hiScores"));
    // Disable the ability to submit a hi-score if the score is
    // 0, or if there is the maximum number of displayed hi-scores,
    // and the lowest score is greater than the score for this
    // quiz
    if (score === 0 
        || (hiScores !== null 
            && hiScores.length >= HI_SCORE_LIST_MAX 
            && score < hiScores[hiScores.length - 1].score)) {
        submitHiScoreBtn.disabled = true;
    } else {
        // Allow submission of hi-score otherwise
        submitHiScoreBtn.disabled = false;
    }

    // Show hi-score screen and hide quiz screen
    quizScreenEl.classList.add("hide");
    hiScoreScreenEl.classList.remove("hide");

    // If hi-scores do not exist yet, display message indicating so
    if (hiScores === null) {
        const noScoresYetEl = document.createElement("div");
        noScoresYetEl.classList.add("no-scores-yet");
        noScoresYetEl.textContent = "No scores have been added yet";
        hiScoreListEl.append(noScoresYetEl);
        hiScores = [];
    } else {
        // Otherwise, show hi-scores
        renderScores();
    }
}

function renderScores() {
    // Clear the hi-score list for update
    hiScoreListEl.innerHTML = "";
    // Add each hi-score
    hiScores.forEach(function (score) {
        let li = document.createElement("li");
        li.classList.add("score");
        li.textContent = `${score.initials}: ${score.score}`
        hiScoreListEl.append(li);
    });
}

function submitHiScore() {
    // Get the initial input element
    const initialInputEl = document.querySelector('input[name="hi-score-initial"]');
    // Check to see if initials were entered (between 1 and 3 characters)
    if (initialInputEl.value.length === 0 || initialInput.value.length > 3) return;
    
    // Create new score object
    const newScore = { initials: initialInput.value, score };

    // If hi-score list is at the max, remove the lowest value,
    // add the new one, and sort the list.
    if (hiScores.length >= HI_SCORE_LIST_MAX) {
        hiScores.pop();
    }
    hiScores.push(newScore);
    hiScores = hiScores.sort((a, b) => b.score - a.score);

    // Add new list to the local storage, show new score list,
    // disable the submit button (so the score cannot be submitted
    // more than once), and clear the input
    localStorage.setItem("hiScores", JSON.stringify(hiScores));
    renderScores();
    submitHiScoreBtn.disabled = true;
    initialInput.value = "";
}

submitHiScoreBtn.addEventListener("click", submitHiScore);
playAgainBtn.addEventListener("click", startQuiz);
