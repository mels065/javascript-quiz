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
