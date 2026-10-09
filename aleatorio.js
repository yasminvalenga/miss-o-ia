const nomes = [
    "Fernanda",
    "Gabriel",
    "Amanda",
    "Marcelo",
    "Giuliana",
    "Gustavo",
    "Maria Eduarda"
];

export function aleatorio(lista) {
    const posicao = Math.floor(Math.random() * lista.length);
    return lista[posicao];
}

export const nome = aleatorio(nomes);