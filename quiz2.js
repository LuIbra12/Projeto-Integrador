const questions = [
    {
        question: "O que a teologia medieval procurava conciliar?",
        answers: ["A fé cristã com a razão humana", "O cristianismo com as religiões pagãs", "A Igreja com o Estado Moderno", "A razão humana com os mistérios do paganismo"],
        correctAnswer: 0 // Índice correspondente à resposta correta: "A fé cristã com a razão humana"
    },
    {
        question: "Qual filósofo e teólogo medieval usou a filosofia aristotélica para sistematizar a teologia cristã?",
        answers: ["Santo Agostinho", "Tomás de Aquino", "Anselmo de Cantuária", "Duns Scoto"],
        correctAnswer: 1 // Índice correspondente à resposta correta: "Tomás de Aquino"
    },
    {
        question: "Qual foi o principal método de ensino utilizado pela escolástica medieval?",
        answers: ["Ensino direto e sem questionamento", "Método dialético com questões, objeções e respostas", "Ensino puramente bíblico sem raciocínio lógico", "Método experimental com provas científicas"],
        correctAnswer: 1 // Índice correspondente à resposta correta: "Método dialético com questões, objeções e respostas"
    },
    {
        question: "Quem foi o autor do 'argumento ontológico' para a existência de Deus?",
        answers: ["Pedro Abelardo", "Anselmo de Cantuária", "Tomás de Aquino", "Guillaume de Ockham"],
        correctAnswer: 1 // Índice correspondente à resposta correta: "Anselmo de Cantuária"
    },
    {
        question: "Qual teólogo medieval é conhecido pela ideia da 'Navalha de Ockham'?",
        answers: ["Duns Scoto", "Guillaume de Ockham", "Tomás de Aquino", "Santo Agostinho"],
        correctAnswer: 1 // Índice correspondente à resposta correta: "Guillaume de Ockham"
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
