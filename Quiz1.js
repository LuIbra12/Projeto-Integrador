const questions = [
    {
        question: "1. Qual é o principal objetivo dos Pais da Igreja durante o período patrístico?",
        answers: ["A) Combater o Império Romano", "B) Estabelecer e defender a ortodoxia cristã", "C) Expandir o cristianismo para outros continentes", "D) Criar evangelhos"],
        correctAnswer: 1
    },
    {
        question: "2. Qual concílio ecumênico emitiu o Credo Niceno?",
        answers: ["A) Concílio de Calcedônia", "B) Concílio de Nicéia", "C) Concílio de Éfeso", "D) Concílio de Trento"],
        correctAnswer: 1
    },
    {
        question: "3. Quem foi o autor da tradução da Bíblia para o latim conhecida como Vulgata?",
        answers: ["A) São Jerônimo ", "B) Santo Agostinho", "C) São Gregório de Nazianzo", "D) Irineu de Lyon "],
        correctAnswer: 0
    },
    {
        question: "4. O que foi o foco principal das discussões no Concílio de Calcedônia? ",
        answers: ["A) A natureza de Cristo", "B) A autoridade papal", "C) O poder dos imperadores romanos", "D) O crescimento da Igreja na Ásia "],
        correctAnswer: 0
    },
    {
        question: "5. Quem foi fundamental na definição da doutrina da Trindade durante o período patrístico? ",
        answers: ["A) São João Crisóstomo", "B) São Gregório de Nazianzo", "C) Irineu de Lyon", "D) São Jerônimo"],
        correctAnswer: 1
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