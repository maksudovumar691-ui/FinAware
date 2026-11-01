
const quizQuestions = [
    {
        question: "Ты увидел вещь со скидкой, которую не планировал покупать. Что сделаешь?",
        answers: [
            { text: "Куплю сразу, ведь скидка может закончиться", score: 0 },
            { text: "Подумаю, нужна ли мне эта вещь и вписывается ли она в бюджет", score: 2 },
            { text: "Сохраню товар и вернусь к решению позже", score: 2 }
        ]
    },
    {
        question: "Как ты обычно относишься к своим расходам?",
        answers: [
            { text: "Почти не отслеживаю их", score: 0 },
            { text: "Иногда проверяю, куда ушли деньги", score: 1 },
            { text: "Стараюсь понимать свои расходы и планировать их", score: 2 }
        ]
    },
    {
        question: "У тебя появились свободные деньги. Что дальше?",
        answers: [
            { text: "Потрачу их на то, что захочется прямо сейчас", score: 0 },
            { text: "Часть потрачу, а часть постараюсь сохранить", score: 2 },
            { text: "Сначала подумаю о своих целях и планах", score: 2 }
        ]
    },
    {
        question: "Незнакомец обещает гарантированную прибыль, если ты срочно переведёшь деньги. Что сделаешь?",
        answers: [
            { text: "Переведу небольшую сумму ради проверки", score: 0 },
            { text: "Не буду переводить деньги и проверю предложение", score: 2 },
            { text: "Сначала попрошу совета у надёжного взрослого", score: 2 }
        ]
    },
    {
        question: "Ты хочешь купить дорогую вещь, но она не входит в твой бюджет. Как поступишь?",
        answers: [
            { text: "Куплю сейчас, а о расходах подумаю позже", score: 0 },
            { text: "Рассмотрю более доступные варианты или начну копить", score: 2 },
            { text: "Оценю, насколько покупка важна, и отложу решение", score: 2 }
        ]
    },
    {
        question: "Ты заметил, что регулярно тратишь деньги на небольшие покупки. Как поступишь?",
        answers: [
            { text: "Не буду обращать внимания на такие мелкие расходы", score: 0 },
            { text: "Попробую отслеживать их в течение недели", score: 2 },
            { text: "Установлю для таких покупок отдельный лимит", score: 2 }
        ]
    },
    {
        question: "Ты оформил бесплатную пробную подписку, которая скоро станет платной. Что сделаешь?",
        answers: [
            { text: "Ничего, ведь сейчас подписка бесплатная", score: 0 },
            { text: "Проверю дату окончания пробного периода", score: 2 },
            { text: "Оценю, нужна ли мне подписка после пробного периода", score: 2 }
        ]
    },
    {
        question: "Тебе предлагают купить товар значительно дешевле обычной цены на неизвестном сайте. Как поступишь?",
        answers: [
            { text: "Сразу оформлю заказ из-за выгодной цены", score: 0 },
            { text: "Проверю отзывы и надёжность продавца", score: 2 },
            { text: "Сравню предложение с ценами в других магазинах", score: 2 }
        ]
    },
    {
        question: "Ты решил накопить деньги на определённую цель. Какой подход эффективнее?",
        answers: [
            { text: "Откладывать деньги только тогда, когда что-то останется", score: 0 },
            { text: "Определить сумму и регулярно откладывать часть средств", score: 2 },
            { text: "Следить за прогрессом и при необходимости корректировать план", score: 2 }
        ]
    },
    {
        question: "После покупки ты понял, что потратил больше запланированного. Что сделаешь?",
        answers: [
            { text: "Ничего, ведь деньги уже потрачены", score: 0 },
            { text: "Проанализирую причину лишних расходов", score: 2 },
            { text: "Учту эту ситуацию при планировании следующего бюджета", score: 2 }
        ]
    }
];

const quizQuestion = document.getElementById("quiz-question");
const quizAnswers = document.getElementById("quiz-answers");
const quizNext = document.getElementById("quiz-next");
const quizProgressText = document.getElementById("quiz-progress-text");
const quizProgressBar = document.getElementById("quiz-progress-bar");
const quizResult = document.getElementById("quiz-result");
const quizResultTitle = document.getElementById("quiz-result-title");
const quizResultText = document.getElementById("quiz-result-text");
const quizRestart = document.getElementById("quiz-restart");

if (
    quizQuestion && quizAnswers && quizNext && quizProgressText &&
    quizProgressBar && quizResult && quizResultTitle && quizResultText && quizRestart
) {
let currentQuestion = 0;
let totalScore = 0;
let selectedScore = null;

function showQuestion() {
    const question = quizQuestions[currentQuestion];

    quizQuestion.textContent = question.question;
    quizAnswers.replaceChildren();
    quizNext.disabled = true;
    selectedScore = null;

    quizProgressText.textContent =
        `Вопрос ${currentQuestion + 1} из ${quizQuestions.length}`;

    quizProgressBar.style.width =
        `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;

    question.answers.forEach((answer) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "quiz-answer";
        button.textContent = answer.text;

        button.addEventListener("click", () => {
            selectedScore = answer.score;

            document.querySelectorAll(".quiz-answer").forEach((item) => {
                item.classList.remove("selected");
                item.setAttribute("aria-pressed", "false");
            });

            button.classList.add("selected");
            button.setAttribute("aria-pressed", "true");
            quizNext.disabled = false;
        });

        button.setAttribute("aria-pressed", "false");
        quizAnswers.appendChild(button);
    });
}

function showResult() {
    quizQuestion.hidden = true;
    quizAnswers.hidden = true;
    quizNext.hidden = true;
    quizProgressText.textContent = "Тест завершён";
    quizProgressBar.style.width = "100%";
    quizResult.hidden = false;

    if (totalScore <= 7) {
        quizResultTitle.textContent = "Начни с небольших шагов";
        quizResultText.textContent =
            "Попробуй записывать расходы и делать паузу перед необязательными покупками. Финансовые привычки можно постепенно улучшать.";
    } else if (totalScore <= 14) {
        quizResultTitle.textContent = "Ты уже на верном пути";
        quizResultText.textContent =
            "У тебя есть полезные привычки. Попробуй уделять больше внимания планированию расходов и своим долгосрочным целям.";
    } else {
        quizResultTitle.textContent = "Ты внимательно подходишь к решениям";
        quizResultText.textContent =
            "Твои ответы показывают, что ты часто обдумываешь финансовые решения. Продолжай проверять информацию и соотносить расходы со своими целями.";
    }
}

quizNext.addEventListener("click", () => {
    if (selectedScore === null) return;

    totalScore += selectedScore;

    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResult();
    }
});

quizRestart.addEventListener("click", () => {
    currentQuestion = 0;
    totalScore = 0;
    selectedScore = null;

    quizQuestion.hidden = false;
    quizAnswers.hidden = false;
    quizNext.hidden = false;
    quizResult.hidden = true;

    showQuestion();
});

showQuestion();
}
/* =========================================
   FIN AWARE — SCROLL REVEAL ANIMATION
========================================= */

const revealElements = document.querySelectorAll(
    '.content-section h2, ' +
    '.content-section h3, ' +
    '.content-section p, ' +
    '.content-section .card, ' +
    '.content-section .tip-card, ' +
    '.content-section .stat-card, ' +
    '.content-section .quiz-container'
);

revealElements.forEach((element, index) => {
    element.classList.add('scroll-reveal');
});

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});