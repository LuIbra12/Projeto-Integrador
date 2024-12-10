const questions = [
    {
        question: "1. Qual foi uma das principais críticas dos reformadores à Igreja Católica durante a Reforma?",
        answers: ["A) A venda de indulgências", "B) A proibição da leitura das Escrituras", "C) A falta de universidades", "D) O excesso de sacramentos"],
        correctAnswer: 0
    },
    {
        question: "2. O que os reformadores defendiam com a doutrina “Sola Scriptura”?",
        answers: ["A) Que a Bíblia é a única fonte de autoridade religiosa", "B) Que a tradição da Igreja era mais importante que as Escrituras", "C) Que as Escrituras devem ser interpretadas apenas pelos papas", "D) Que as Escrituras devem ser ignoradas em favor da razão"],
        correctAnswer: 0
    },
    {
        question: "3. Quem foi o principal responsável pela doutrina da “predestinação” durante a Reforma?",
        answers: ["A) Martinho Lutero", "B) João Calvino", "C) Ulrich Zwinglio", "D) John Knox"],
        correctAnswer: 1
    },
    {
        question: "4. Quantos sacramentos foram reconhecidos pelos reformadores protestantes?",
        answers: ["A) Sete", "B) Cinco", "C) Dois", "D) Nenhum"],
        correctAnswer: 2
    },
    {
        question: "5. Qual reformador rejeitou a transformação literal do pão e vinho na Eucaristia?",
        answers: ["A) João Calvino", "B) Martinho Lutero", "C) Ulrich Zwinglio", "D) Teresa de Ávila"],
        correctAnswer: 2
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
        window.location.href = 'linhadotempo.html'; // Redireciona para a Linha do Tempo
    } else {
        window.location.href = 'Ciberfe.html'; // Redireciona de volta para o Quiz
    }
}

function startTimer() {
    timer = setInterval(() => {
        const timerBarInner = document.querySelector('.timer-bar-inner');
        
        if (timeLeft > 0) {
            timeLeft--;
            const percentage = (timeLeft / 15) * 100;  // Calcula a porcentagem de tempo restante
            timerBarInner.style.width = `${percentage}%`;  // Atualiza a largura da barra verde
        } else {
            clearInterval(timer);
            recordAnswer(null); // Chama recordAnswer automaticamente quando o tempo acaba
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