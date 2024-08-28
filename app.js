"use strict";
const startBtn = document.getElementById("start-btn");
const quizCont = document.getElementById("quiz-container");
const resultCont = document.getElementById("result-container");
const quesCont = document.getElementById("question-container");
const ansCont = document.getElementById("answer-container");
const nextBtn = document.getElementById("next-button");
const retryBtn = document.getElementById("retry-button");
const timerNo = document.getElementById("timer-no");
const numberOfQues = document.getElementById("number-of-ques");
const totalQues = document.getElementById("total-ques");
const quizData = [
    {
        questions: "What is the sum of 130+125+191?",
        options: ["335", "456", "446", "426"],
        answer: "446",
    },
    {
        questions: "If we minus 712 from 1500, how much do we get?",
        options: ["788", "778", "768", "758"],
        answer: "788",
    },
    {
        questions: "50 times of 8 is equal to:",
        options: ["80", "400", "800", "4000"],
        answer: "400",
    },
    {
        questions: "110 divided by 10 is:",
        options: ["11", "10", "5", "None of these"],
        answer: "11",
    },
    {
        questions: "20+(90÷2) is equal to:",
        options: ["50", "55", "65", "60"],
        answer: "65",
    },
    {
        questions: "The product of 82 and 5 is:",
        options: ["400", "410", "420", "None of these"],
        answer: "410",
    },
    {
        questions: "Find the missing terms in multiple of 3: 3, 6, 9, __, 15",
        options: ["10", "11", "12", "13"],
        answer: "12",
    },
    {
        questions: "Solve 24÷8+2.",
        options: ["5", "6", "8", "12"],
        answer: "5",
    },
    {
        questions: "Solve: 300 – (150×2)",
        options: ["150", "100", "50", "0"],
        answer: "0",
    },
    {
        questions: "The product of 121 x 0 x 200 x 25 is",
        options: ["1500", "0", "4000", "None of these"],
        answer: "0",
    },
];
let currentQuestionIndex = 0;
let timerInterval;
const TIMER_DURATION = 10;
let correctAnswersCount = 0;
function initializeQuiz() {
    quizCont.style.display = 'block';
    resultCont.style.display = 'none';
    startBtn.style.display = 'none';
    retryBtn.style.display = 'none';
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    updateQuestionNumber();
    loadQues();
}
startBtn.addEventListener("click", initializeQuiz);
function loadQues() {
    if (ansCont) {
        ansCont.innerHTML = '';
    }
    if (currentQuestionIndex < quizData.length) {
        const ques = quizData[currentQuestionIndex];
        if (quesCont) {
            quesCont.innerText = `Q${currentQuestionIndex + 1}. ${ques.questions}`;
        }
        ques.options.forEach((option) => {
            const ansBtn = document.createElement("button");
            ansBtn.innerText = option;
            ansBtn.classList.add("flex", "w-full", "border-cyan-400", "border", "my-1", "rounded", "items-start", "p-2", "text-sm", "leading-loose");
            ansCont.appendChild(ansBtn);
            ansBtn.addEventListener("click", () => {
                if (option === ques.answer) {
                    ansBtn.classList.add("bg-green-200");
                    correctAnswersCount++;
                }
                else {
                    ansBtn.classList.add("bg-red-200");
                }
                disableOptions();
                if (nextBtn) {
                    nextBtn.style.display = 'block';
                }
                if (timerInterval) {
                    clearInterval(timerInterval);
                }
            });
        });
        startTimer();
    }
}
function disableOptions() {
    const buttons = ansCont.querySelectorAll("button");
    buttons.forEach((button) => {
        button.disabled = true;
    });
}
function startTimer() {
    let timeRemaining = TIMER_DURATION;
    if (timerNo) {
        timerNo.innerText = timeRemaining.toString();
    }
    timerInterval = setInterval(() => {
        timeRemaining--;
        if (timerNo) {
            timerNo.innerText = timeRemaining.toString();
        }
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            disableOptions();
            if (nextBtn) {
                nextBtn.style.display = 'block';
            }
            loadNextQuestion();
        }
    }, 1000);
}
function loadNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        updateQuestionNumber();
        loadQues();
    }
    else {
        showResults();
    }
}
function showResults() {
    quizCont.style.display = 'none';
    resultCont.style.display = 'block';
    retryBtn.style.display = 'block';
    if (resultCont) {
        const resultMessage = `Quiz completed! You answered ${correctAnswersCount} out of ${quizData.length} questions correctly.`;
        document.getElementById("result-message").innerText = resultMessage;
    }
}
function restartQuiz() {
    resultCont.style.display = 'none';
    startBtn.style.display = 'block';
    retryBtn.style.display = 'none';
}
function updateQuestionNumber() {
    if (numberOfQues && totalQues) {
        numberOfQues.innerText = (currentQuestionIndex + 1).toString();
        totalQues.innerText = quizData.length.toString();
    }
}
startBtn.addEventListener("click", initializeQuiz);
nextBtn.addEventListener("click", () => {
    loadNextQuestion();
});
retryBtn.addEventListener("click", () => {
    restartQuiz();
});
