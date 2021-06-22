function renderQuestion() {
    // Display the question
    questionEl.innerText = questions[questionIndex].question;
    choicesEl.innerHTML = "";

    // Display the available choices for the question
    choicesBtnsEls = [];
    for (let i = 0; i < questions[questionIndex].choices.length; i++) {
        let choiceBtnEl = document.createElement("button")
        choiceBtnEl.setAttribute("id", `choice-${i+1}`);
        choiceBtnEl.classList.add("choice-btn");
        choiceBtnEl.innerText = questions[questionIndex].choices[i];
        // Add event listener for when the button choice is clicked
        choiceBtnEl.addEventListener("click", function (event) {
            showAnswer(i);
        });
        choicesEl.append(choiceBtnEl);
        choicesBtnsEls.push(choiceBtnEl);
    }
}

function showAnswer(choice) {
    // Disable all choice buttons after one of them has been clicked
    for (let i = 0; i < choicesBtnsEls.length; i++) {
        choicesBtnsEls[i].setAttribute("disabled", true);
    }

    if (choice === questions[questionIndex].answer) {
        // If the choice was correct, then display that it was right
        answerResultEl.classList.add("correct");
        answerResultEl.innerText = "Correct!"
        // Increment and update score
        score++;
        scoreEl.innerText = score;
    } else {
        // Otherwise, display that it was wrong
        answerResultEl.classList.add("wrong");
        answerResultEl.innerText = "Wrong";
        // Decrease timer as penalty
        timer -= 10;
        // Make sure the timer does not go below 0, and update
        // displayed timer
        if (timer < 0) timer = 0;
        timerEl.innerText = timer;
    }
    
    // Show all wrong answers and the correct one (red for wrong,
    // green for correct)
    for (let i = 0; i < questions[questionIndex].choices.length; i++) {
        if (i === questions[questionIndex].answer) {
            choicesBtnsEls[i].classList.add("correct");
        } else {
            choicesBtnsEls[i].classList.add("wrong");
        }
    }

    setTimeout(function () {
        // Clear the answer result element
        answerResultEl.innerText = "";
        answerResultEl.classList.remove("correct");
        answerResultEl.classList.remove("wrong");

        // Increment index to fetch next question
        questionIndex++;
        if (questionIndex < questions.length) {
            renderQuestion();
        } else {
            // If the index is greater than the question array
            // length, clear the interval, set the timer to 0,
            // and show the hi-scores
            clearInterval(intervalId);
            timerEl.innerText = 0;
            showHiScores();
        }
    }, 2000);
}
