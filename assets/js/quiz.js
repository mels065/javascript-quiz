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
