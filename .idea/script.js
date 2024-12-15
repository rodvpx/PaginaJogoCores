// Lista de cores em inglês
const colors = ["Red", "Blue", "Green", "Yellow", "Purple", "Orange", "Pink", "Brown"];

// Lista de nomes das cores em português
const colorNames = ["Vermelho", "Azul", "Verde", "Amarelo", "Roxo", "Laranja", "Rosa", "Marrom"];

// Variáveis para armazenar a pontuação, o tempo restante e o histórico de pontuações
let score = 0;
let time = 90;
let timer;
let history = [];

// Função para iniciar o jogo
function startGame() {
    document.getElementById('start-btn').disabled = true; // Desativa o botão de início
    score = 0; // Reinicia a pontuação
    time = 90; // Define o tempo inicial
    document.getElementById('score').textContent = score; // Atualiza a pontuação exibida
    document.getElementById('time').textContent = time; // Atualiza o tempo exibido
    document.getElementById('feedback').textContent = ''; // Limpa o feedback
    nextQuestion(); // Gera a próxima pergunta
    timer = setInterval(updateTime, 1000); // Inicia o temporizador que atualiza o tempo a cada segundo
}

// Função para gerar a próxima pergunta
function nextQuestion() {
    const colorIndex = Math.floor(Math.random() * colors.length); // Seleciona um índice de cor aleatoriamente
    const displayColor = colors[Math.floor(Math.random() * colors.length)]; // Seleciona uma cor de exibição aleatoriamente
    document.getElementById('color-name').textContent = colorNames[colorIndex]; // Define o texto do nome da cor
    document.getElementById('color-name').style.color = displayColor; // Define a cor do texto

    const buttons = document.querySelectorAll('.option'); // Seleciona todos os botões de opção
    const correctButton = Math.floor(Math.random() * buttons.length); // Seleciona um botão correto aleatoriamente
    buttons[correctButton].style.backgroundColor = colors[colorIndex]; // Define a cor de fundo do botão correto
    buttons[correctButton].dataset.correct = true; // Marca o botão como correto

    // Define as cores de fundo dos botões incorretos
    buttons.forEach((button, index) => {
        if (index !== correctButton) {
            let wrongColorIndex;
            do {
                wrongColorIndex = Math.floor(Math.random() * colors.length);
            } while (wrongColorIndex === colorIndex);
            button.style.backgroundColor = colors[wrongColorIndex];
            button.dataset.correct = false; // Marca o botão como incorreto
        }
        button.classList.remove('wrong'); // Remove a classe de erro do botão
    });
}

// Função para verificar a resposta do usuário
function checkAnswer(button) {
    if (button.dataset.correct === "true") {
        score++; // Incrementa a pontuação se a resposta estiver correta
        document.getElementById('score').textContent = score; // Atualiza a pontuação exibida
        document.getElementById('feedback').textContent = ''; // Limpa o feedback
    } else {
        time -= 10; // Deduz 10 segundos do tempo se a resposta estiver incorreta
        document.getElementById('time').textContent = time; // Atualiza o tempo exibido
        button.classList.add('wrong'); // Adiciona a classe de erro ao botão
        document.getElementById('feedback').textContent = 'Resposta incorreta!'; // Exibe o feedback de erro
    }
    nextQuestion(); // Gera a próxima pergunta
}

// Função para atualizar o tempo restante
function updateTime() {
    if (time > 0) {
        time--; // Decrementa o tempo
        document.getElementById('time').textContent = time; // Atualiza o tempo exibido
    } else {
        clearInterval(timer); // Para o temporizador quando o tempo acabar
        alert(`Fim do jogo! Sua pontuação foi: ${score}`); // Exibe a pontuação final
        history.push(score); // Adiciona a pontuação ao histórico
        document.getElementById('history').textContent = `Histórico de Pontuação: ${history.join(', ')}`; // Atualiza o histórico exibido
        document.getElementById('start-btn').disabled = false; // Habilita o botão de início
    }
}

// Função para reiniciar o jogo
function restartGame() {
    clearInterval(timer); // Para o temporizador
    startGame(); // Inicia o jogo novamente
}

// Evento para exibir o histórico de pontuações quando a página for carregada
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('history').textContent = `Histórico de Pontuação: ${history.join(', ')}`;
});
