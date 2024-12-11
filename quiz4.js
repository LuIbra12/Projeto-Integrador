const questions = [
    {
        question: "Quem é considerado o pai da teologia protestante no período moderno?",
        answers: ["John Wesley", "Martinho Lutero", "John Calvin", "Thomas Aquinas"],
        correctAnswer: 1 // Índice correspondente à resposta correta: "Martinho Lutero"
    },
    {
        question: "Qual é o principal foco da teologia durante a Reforma Protestante?",
        answers: ["A prática de rituais litúrgicos", "A salvação pela fé, e não pelas obras", "O estudo dos escritos dos Padres da Igreja", "A tradição como fonte principal da fé"],
        correctAnswer: 1 // Índice correspondente à resposta correta: "A salvação pela fé, e não pelas obras"
    },
    {
        question: "Qual movimento teológico do período moderno destacou a importância da razão como meio de entender a fé?",
        answers: ["Humanismo", "Pietismo", "Iluminismo", "Gnosticismo"],
        correctAnswer: 2 // Índice correspondente à resposta correta: "Iluminismo"
    },
    {
        question: "O que caracteriza a teologia liberal no século XIX?",
        answers: ["Ênfase na tradição e nas doutrinas dogmáticas", "Rejeição das Escrituras como fonte de verdade", "A aceitação da crítica histórica e da razão na interpretação bíblica", "Foco exclusivo na teologia reformada"],
        correctAnswer: 2 // Índice correspondente à resposta correta: "A aceitação da crítica histórica e da razão na interpretação bíblica"
    },
    {
        question: "Qual teólogo do período moderno é conhecido por sua obra 'A Ética'?",
        answers: ["Thomas More", "Immanuel Kant", "John Wesley", "Friedrich Schleiermacher"],
        correctAnswer: 1 // Índice correspondente à resposta correta: "Immanuel Kant"
    }
];



let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let timer;
let timeLeft = 15; // Definindo 15 segundos para cada pergunta

function loadQuestion() {
    const questionContainer = document.querySelector('.question-section h1');
    const answerButtons = document.querySelectorAll('.answer');
    const currentQuestion = questions[currentQuestionIndex];

    // Exibe a pergunta
    questionContainer.textContent = currentQuestion.question;

    // Exibe as respostas
    answerButtons.forEach((button, index) => {
        button.textContent = currentQuestion.answers[index];
        button.onclick = () => recordAnswer(index);
    });

    // Reinicia o tempo a cada nova pergunta
    resetTimer();
    startTimer();
}

function recordAnswer(selectedAnswer) {
    // Armazena a resposta do usuário
    userAnswers.push(selectedAnswer);

    // Verifica se a resposta está correta para atualizar a pontuação
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
        score++;
    }

    // Passa para a próxima pergunta ou exibe o resultado
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        displayResult();
    }
}

function displayResult() {
    const questionContainer = document.querySelector('.quiz-container');
    questionContainer.innerHTML = `
        <h1>Quiz Concluído!</h1>
        <p>Você acertou ${score} de ${questions.length} perguntas.</p>
    `;

    questions.forEach((q, index) => {
        const isCorrect = userAnswers[index] === q.correctAnswer;
        const userAnswer = userAnswers[index] !== null ? q.answers[userAnswers[index]] : 'Nenhuma resposta';
        const correctAnswer = q.answers[q.correctAnswer];

        questionContainer.innerHTML += `
            <div>
                <p><strong>${index + 1}. ${q.question}</strong></p>
                <p>Sua resposta: <span style="color: ${isCorrect ? 'green' : 'red'}">${userAnswer}</span></p>
                ${!isCorrect ? `<p>Resposta correta: <span style="color: green">${correctAnswer}</span></p>` : ''}
            </div>
        `;
    });

    // Botão para voltar à página inicial do quiz
    questionContainer.innerHTML += `
        <a href="Quiz.html" class="button">Tentar Novamente</a>
    `;

    // Adiciona a pergunta de confirmação para voltar à Linha do Tempo
    const confirmDiv = document.createElement('div');
    confirmDiv.innerHTML = `
        <p>Deseja voltar para a Linha do Tempo?</p>
        <button onclick="redirectToTimeline(true)">Sim</button>
        <button onclick="redirectToTimeline(false)">Não</button>
    `;
    questionContainer.appendChild(confirmDiv);
}

function redirectToTimeline(answer) {
    if (answer) {
        window.location.href = 'Linhadotempo.html'; // Redireciona para a Linha do Tempo
    } else {
        window.location.href = 'index.html'; // Redireciona de volta para o Quiz
    }
}
function startTimer() {
    timer = setInterval(() => {
        const timerBarInner = document.querySelector('.timer-bar-inner');

        if (timeLeft > 0) {
            timeLeft--;
            const percentage = (timeLeft / 15) * 100;
            timerBarInner.style.width = `${percentage}%`;

            // Alteração de cor com base no tempo restante
            if (timeLeft <= 5) {
                timerBarInner.style.backgroundColor = 'red';
            } else if (timeLeft <= 10) {
                timerBarInner.style.backgroundColor = 'yellow';
            } else {
                timerBarInner.style.backgroundColor = 'green';
            }
        } else {
            clearInterval(timer);
            recordAnswer(null);
        }
    }, 1000);
}



// Função para resetar o temporizador
function resetTimer() {
    timeLeft = 15; // Reseta o tempo para 15 segundos
    document.querySelector('.timer-bar').style.width = '100%';
    clearInterval(timer); // Limpa o temporizador atual
}

window.onload = loadQuestion;
