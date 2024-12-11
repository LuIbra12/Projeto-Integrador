const questions = [
    {
        question: "O que a teologia contemporânea busca integrar com a fé cristã?",
        answers: ["Filosofia e ciência", "Misticismo e ocultismo", "Superstições populares", "Práticas religiosas antigas"],
        correctAnswer: 0 // Índice correspondente à resposta correta: "Filosofia e ciência"
    },
    {
        question: "Qual movimento teológico foi influenciado pelo marxismo e se focou em questões de justiça social?",
        answers: ["Teologia da Libertação", "Teologia Feminista", "Teologia Liberal", "Teologia Neo-ortodoxa"],
        correctAnswer: 0 // Índice correspondente à resposta correta: "Teologia da Libertação"
    },
    {
        question: "Quem foi um dos principais teólogos associados ao movimento da Teologia Neo-ortodoxa?",
        answers: ["Karl Barth", "Gustavo Gutiérrez", "Friedrich Schleiermacher", "Hans Küng"],
        correctAnswer: 0 // Índice correspondente à resposta correta: "Karl Barth"
    },
    {
        question: "A Teologia Queer busca uma interpretação inclusiva da fé cristã para qual grupo?",
        answers: ["Pessoas LGBTQIA+", "Crianças e jovens", "Comunidades indígenas", "Pessoas com deficiência"],
        correctAnswer: 0 // Índice correspondente à resposta correta: "Pessoas LGBTQIA+"
    },
    {
        question: "Qual é o principal desafio da teologia contemporânea em relação à ciência?",
        answers: ["A crescente confiança na ciência para explicar o mundo", "A rejeição de todas as descobertas científicas", "A falta de apoio científico para questões religiosas", "A compatibilidade das descobertas científicas com a fé"],
        correctAnswer: 3 // Índice correspondente à resposta correta: "A compatibilidade das descobertas científicas com a fé"
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
