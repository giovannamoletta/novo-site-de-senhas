document.addEventListener('DOMContentLoaded', () => {
    // Inicializar os elementos
    setupBackgroundEmojis();
    setupEventListeners();
    generatePassword(); // Gera uma inicial por padrão
});

// 1. ESPALHAR EXATAMENTE 67 EMOJIS (GATOS E O NÚMERO 67)
function setupBackgroundEmojis() {
    const bgContainer = document.getElementById('emoji-background');
    const emojisPool = ['🐱', '🐈', '🐈‍⬛', '🐾', '67', '😻', '😸'];
    const totalEmojis = 67; // Conforme o requisito estrito

    for (let i = 0; i < totalTotals(totalEmojis); i++) {
        const span = document.createElement('span');
        span.classList.add('bg-emoji');
        
        // Seleção aleatória do pool
        span.innerText = emojisPool[Math.floor(Math.random() * emojisPool.length)];
        
        // Posicionamento aleatório na tela
        span.style.top = `${Math.random() * 95}vh`;
        span.style.left = `${Math.random() * 95}vw`;
        
        // Tamanhos levemente variados para efeito estético
        span.style.fontSize = `${Math.random() * (2 - 1.2) + 1.2}rem`;

        // Interatividade: foge levemente quando o mouse passa perto
        span.addEventListener('mouseover', () => {
            span.style.transform = `scale(1.4) rotate(${Math.random() * 360}deg)`;
            span.style.opacity = '0.8';
            setTimeout(() => {
                span.style.transform = 'scale(1) rotate(0deg)';
                span.style.opacity = '0.25';
            }, 1000);
        });

        bgContainer.appendChild(span);
    }
}

// Gambiarra limpa para garantir exatamente o número correto no loop
function totalTotals(n) { return n; }

// 2. FUNÇÃO CRIPTOGRÁFICA SEGURA DE GERAR SENHA (Boas Práticas da Internet)
function generatePassword() {
    const length = parseInt(document.getElementById('length-slider').value);
    const hasUpper = document.getElementById('chk-uppercase').checked;
    const hasLower = document.getElementById('chk-lowercase').checked;
    const hasNumber = document.getElementById('chk-numbers').checked;
    const hasSymbol = document.getElementById('chk-symbols').checked;

    const charSets = {
        upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lower: 'abcdefghijklmnopqrstuvwxyz',
        number: '0123456789',
        symbol: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    let allowedChars = '';
    if (hasUpper) allowedChars += charSets.upper;
    if (hasLower) allowedChars += charSets.lower;
    if (hasNumber) allowedChars += charSets.number;
    if (hasSymbol) allowedChars += charSets.symbol;

    if (allowedChars === '') {
        document.getElementById('password-input').value = 'Selecione uma opção!';
        return;
    }

    let password = '';
    
    /* USO DO window.crypto.getRandomValues:
       Diferente do Math.random(), que é previsível, esta API gera valores 
       verdadeiramente aleatórios e adequados para segurança cibernética.
    */
    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
        const randomIndex = randomValues[i] % allowedChars.length;
        password += allowedChars[randomIndex];
    }

    document.getElementById('password-input').value = password;
}

// 3. CONFIGURAÇÃO DOS EVENTOS (Event Listeners)
function setupEventListeners() {
    const slider = document.getElementById('length-slider');
    const lengthVal = document.getElementById('length-val');
    const genBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const keyBtns = document.querySelectorAll('.key-btn');
    const funDisplay = document.getElementById('fun-display');

    // Sincronizar o slider numérico
    slider.addEventListener('input', (e) => {
        lengthVal.innerText = e.target.value;
    });

    // Botão de Gerar
    genBtn.addEventListener('click', () => {
        generatePassword();
        // Feedback visual interativo no botão
        genBtn.innerText = "🐾 Gerado com Sucesso! 🐾";
        setTimeout(() => genBtn.innerText = "🐾 Gerar Senha Segura 🐾", 1000);
    });

    // Botão de Copiar com API Clipboard segura
    copyBtn.addEventListener('click', () => {
        const pwdInput = document.getElementById('password-input');
        if (pwdInput.value && pwdInput.value !== 'Selecione uma opção!') {
            navigator.clipboard.writeText(pwdInput.value).then(() => {
                copyBtn.innerText = "✅ Copiado!";
                setTimeout(() => copyBtn.innerText = "📋 Copiar", 1500);
            }).catch(() => {
                alert("Erro ao copiar a senha.");
            });
        }
    });

    // Teclas Interativas de Entretenimento (Sons textuais de Gatinhos)
    const catPhrases = [
        "Miau! Que senha forte! 🐾",
        "Purrrr... Segurança em primeiro lugar! 🐱",
        "Você clicou em um gatinho da sorte! ✨",
        "Nenhum hacker consegue quebrar esse miado! 🦁",
        "Design Rosa aprovado por felinos! 💖",
        "67 abraços de gato para você! 🐈"
    ];

    keyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Sorteia uma frase divertida de gato ao interagir com as teclas
            const randomPhrase = catPhrases[Math.floor(Math.random() * catPhrases.length)];
            funDisplay.innerText = `${btn.getAttribute('data-sound')} ${randomPhrase}`;
            
            // Adiciona uma animação temporária na tecla
            btn.style.backgroundColor = '#ff85a1';
            btn.style.color = '#fff';
            setTimeout(() => {
                btn.style.backgroundColor = '';
                btn.style.color = '';
            }, 300);
        });
    });
}