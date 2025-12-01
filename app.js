function gerarNumeroSecreto(){
    console.log('Função gerarNumeroSecreto foi chamada');
    let numeroEscolhido = parseInt(Math.random() * quantDeNumSort + 1); 
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        console.log('Número já sorteado, gerando outro número...');
        return gerarNumeroSecreto();        
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function mensageminicial(){
    mostraNaTela('h1', 'Jogo do número secreto');
    mostraNaTela('p', 'Digite um número entre 1 e 100:');
}

function reiniciarJogo(){
    totalDaLista = listaDeNumerosSorteados.length;
    if (totalDaLista == quandoLimparLista){
        listaDeNumerosSorteados = [];
        console.log('Lista de números sorteados reiniciada.');
        listaDeNumerosSorteados
    }
    numeroTentativas = 0;
    numeroSecreto = gerarNumeroSecreto();
    limparCampo();    
    console.log('Número secreto é: ' + numeroSecreto);
    mensageminicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    
}

function verificarChute(){
    let chute = document.querySelector('input').value;
    numeroTentativas++;
    if (chute == numeroSecreto){
        mostraNaTela('h1', 'Você acertou!');
        let palavraTentativa = numeroTentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagem = `Você acertou o número secreto ${numeroSecreto} em ${numeroTentativas} ${palavraTentativa}!`;
        mostraNaTela('p', mensagem);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (chute < numeroSecreto){
        mostraNaTela('h1', 'Tente novamente!');
        mostraNaTela('p', 'O número secreto é maior!');
    } else if (chute > numeroSecreto){
        mostraNaTela('h1', 'Tente novamente!');
        mostraNaTela('p', 'O número secreto é menor!');
    }
        console.log('Número de tentativas: ' + numeroTentativas);  
        limparCampo();  
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}
   
function narrarTexto(texto) {
    let utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = "pt-BR";
    utterance.rate = 1.3;
    speechSynthesis.speak(utterance);
}

//Essa função ativa o áudio no carregamento da página para acelerar a primeira narração.
function ativaAudio () {window.onload = () => {
    const warmup = new SpeechSynthesisUtterance(" ");
    warmup.volume = 1;
    speechSynthesis.speak(warmup);
    };
}


function mostraNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        narrarTexto(texto);         
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
    
}

ativaAudio();
mensageminicial();
let quantDeNumSort = 50;
console.log('Quantidade de números para sortear: ' + quantDeNumSort);
let quandoLimparLista = quantDeNumSort /  2;
console.log('A lista de números sorteados será limpa após ' + quandoLimparLista + ' Numeros sorteados.');
let listaDeNumerosSorteados = [];
let numeroSecreto = gerarNumeroSecreto();
console.log('Número secreto é: ' + numeroSecreto);
let numeroTentativas = 0;



