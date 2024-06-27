const { Circle, Triangle, Square } = require('./shapes');

test('Circle render method', () => {
  const shape = new Circle('blue');
  expect(shape.render()).toEqual('<circle cx="150" cy="100" r="80" fill="blue" />');
});

test('Triangle render method', () => {
  const shape = new Triangle('blue');
  expect(shape.render()).toEqual('<polygon points="150, 18 244, 182 56, 182" fill="blue" />');
});

test('Square render method', () => {
  const shape = new Square('blue');
  expect(shape.render()).toEqual('<rect x="75" y="50" width="150" height="150" fill="blue" />');
});
