const partition = require('./index');

test('Particao de numeros pequenos', () => {
  expect(partition(1)).toBe('Alcance: 0 Media: 1.00 Mediana: 1.00');
  expect(partition(2)).toBe('Alcance: 1 Media: 1.50 Mediana: 1.50');
  expect(partition(3)).toBe('Alcance: 2 Media: 2.00 Mediana: 2.00');
  expect(partition(4)).toBe('Alcance: 3 Media: 2.50 Mediana: 2.50');
  expect(partition(5)).toBe('Alcance: 5 Media: 3.50 Mediana: 3.50');
});
