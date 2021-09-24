/**
 * Desafio:
 *
 * Na teoria dos números, partição de um inteiro positivo n é uma forma de decomposição de n como soma de inteiros positivos.
 * Duas somas são consideradas iguais se, e somente se, possuírem o mesmo número de parcelas e as mesmas parcelas, mesmo que em ordem diferente.
 * Por exemplo, 4 pode ser particionado em: `4, 3 + 1, 2 + 2, 2 + 1 + 1, 1 + 1 + 1 + 1`.
 *
 * Podemos considerar:
 * `particoes(4) -> [[4],[3,1],[2,2],[2,1,1],[1,1,1,1]]` e
 * `particoes(5) -> [[5],[4,1],[3,2],[3,1,1],[2,2,1],[2,1,1,1],[1,1,1,1,1]]`.
 *
 * O número de partes em uma partição cresce rapidamente. Para `n = 50` teremos 204.226 partes, para `n = 80` teremos 15.796.476 partes.
 * Por isso, é importante levar em consideração a performance da sua implementação.
 *
 * A sua tarefa será a seguinte:
 *
 * 1 - você receberá por parâmetro um número `n` (n sendo um inteiro, 1 <= n <= 50), deverá calcular as partições de `n`, devendo obter algo como:
 * `particoes(n) -> [[n],[n-1,1],[n-2,2],...,[1,1,...,1]]`. A ordem dos valores não importa, pois essa parte não é testada.
 *
 * 2 - Para cada sub-array de particoes(n), calcular o seu produto, removendo os valores duplicados.
 * Se `n = 5`, depois de remover os duplicados, teremos:
 * `prod(5) -> [1,2,3,4,5,6]` (esse resultado está ordenado, mas a ordenação não faz parte do teste)
 * Para `n = 8`, teremos:
 * `prod(8) -> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 16, 18]`
 *
 * 3 - Calcular o intervalo, a média e a mediana do produto `prod(n)` no formato abaixo:
 * `"Alcance: X Media: Y Mediana: Z"`
 *
 * Para `n = 5`, o resultado final será:
 * `"Alcance: 5 Media: 3.50 Mediana: 3.50"`
 *
 * Alcance (X) é um inteiro, Media (Y) e Mediana (Z) são números decimais arredondados na segunda casa decimal.
 *
 * Observações:
 * `Alcance` : diferença entre o maior e o menor valor.
 * `Media` : Para calcular a média, some todos os números e divida pela quantidade de números.
 * `Mediana` : A mediana é o numero que separa a metade superior da metade inferior da sequencia de valores. (https://pt.wikipedia.org/wiki/Mediana_(estat%C3%ADstica))
 *
 * Voce pode testar o seu codigo rodando o comando `npm run test` no terminal
 * e tambem pode alterar o arquivo `index.test.js` se desejar.
 * Apos enviado, seu codigo sera validado com outros cenarios de teste tambem.
 *
 * @example `partition(5)` retorna `"Alcance: 5 Media: 3.50 Mediana: 3.50"`
 * @param n valor inteiro (1 <= n <= 50) para usar como base do calculo
 * @returns string contendo Alcance, Media e Mediana calculado da sequencia de n
 */

function partition(n) {
  //Cria uma Matriz com as Partições, coleta os produtos de cada um, e remove os valores duplicados.
  const prod = removeDuplicate(product(makePartition(n)));
  return `Alcance: ${range(prod)} Media: ${twoDecimals(
    average(prod)
  )} Mediana: ${twoDecimals(median(prod))}`;
}

function makePartition(n) {
  const ns = [[n]];
  let finished = false;
  while (!finished) {
    // pega o ultimo de NS pra trabalhar em
    let currentWork = ns[ns.length - 1].slice(0);
    // começa do ultimo até chegar no primeiro do trabalho atual
    let achado = false;
    for (let i = currentWork.length - 1; i >= 0; i--) {
      // se o atual for maior que 1
      if (!achado) {
        if (currentWork[i] > 1) {
          // tira 1 do atual
          currentWork[i] -= 1;
          if (currentWork.length > i + 1) {
            // e adiciona 1 ao proximo
            currentWork[i + 1] += 1;
          } else {
            // ou adcionar 1 ao proximo espaco na array
            currentWork.push(1);
          }
          achado = true;
          ns.push(currentWork);
        }
      }
    }
    if (!achado) {
      finished = true;
    }
  }
  return ns;
}

function product(ns) {
  const productPartition = [];
  // Itera por toda array e vai multiplicando os valores
  ns.map((a) => productPartition.push(a.reduce((a, b) => a * b)));
  return productPartition;
}

function range(array) {
  //Diferença entre maior número da array, e menor número
  return Math.max(...array) - Math.min(...array);
}

function average(array) {
  //Itera a array somando todos os itens, e divide pelo tamanho da mesma
  return array.reduce((a, b) => a + b, 0) / array.length;
}

function median(array) {
  const mid = Math.floor(array.length / 2),
    nums = [...array].sort((a, b) => a - b);
  return array.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

function removeDuplicate(array) {
  //Cria um set de valores únicos da array
  return [...new Set(array)];
}

function twoDecimals(value) {
  //Deixa o número apenas com 2 casas decimais
  return value.toFixed(2);
}

module.exports = partition;
