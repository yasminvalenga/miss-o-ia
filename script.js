import { aleatorio, nome } from './aleatorio.js';
import { perguntas } from './perguntas.js';

const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

const botaoIniciar = document.querySelector(".iniciar-btn");
const telaInicial = document.querySelector(".tela-inicial");
const botaoJogarNovamente = document.querySelector(".novamente-btn");

let atual = 0;
let historiaFinal = "";

function substituiNome() {
    for (const pergunta of perguntas) {
        pergunta.enunciado = pergunta.enunciado.replace(/você/gi, nome);

        for (const alternativa of pergunta.alternativas) {
            alternativa.afirmacao = alternativa.afirmacao.map(
                afirmacao => afirmacao.replace(/você/gi, nome)
            );
        }
    }
}

function iniciaJogo() {
    atual = 0;
    historiaFinal = "";

    telaInicial.style.display = "none";

    caixaResultado.classList.remove("mostrar");

    mostraPergunta();
}

function mostraPergunta() {
    caixaResultado.classList.remove("mostrar");

    const perguntaAtual = perguntas[atual];

    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaPerguntas.classList.add("mostrar");

    caixaAlternativas.innerHTML = "";
    caixaAlternativas.classList.add("mostrar");

    for (const alternativa of perguntaAtual.alternativas) {
        const botao = document.createElement("button");

        botao.textContent = alternativa.texto;

        botao.addEventListener("click", function () {
            respostaSelecionada(alternativa);
        });

        caixaAlternativas.appendChild(botao);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    const afirmacoes = aleatorio(opcaoSelecionada.afirmacao);

    historiaFinal += afirmacoes + "\n\n";

    if (opcaoSelecionada.proxima !== undefined) {
        atual = opcaoSelecionada.proxima;
    } else {
        mostraResultado();
        return;
    }

    mostraPergunta();
}

function mostraResultado() {
    caixaPerguntas.textContent =
        `Em 2049, ${nome}, o futuro também depende das suas escolhas!`;

    caixaAlternativas.classList.remove("mostrar");
    caixaResultado.classList.add("mostrar");

    textoResultado.textContent =
        historiaFinal +
        "Fim da missão! Suas decisões mostram como a tecnologia " +
        "pode transformar a sociedade. O futuro depende das escolhas " +
        "que fazemos hoje.";
}

function jogaNovamente() {
    atual = 0;
    historiaFinal = "";

    caixaResultado.classList.remove("mostrar");

    mostraPergunta();
}

substituiNome();

botaoIniciar.addEventListener("click", iniciaJogo);
botaoJogarNovamente.addEventListener("click", jogaNovamente);