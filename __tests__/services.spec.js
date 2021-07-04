const { generateRedactedWordList } = require('../api/services');

describe('generateRedactedWordList', () => {
  test('it should split on space', () => {
    const input = 'Hello world Boston Red Sox';
    const output = ['Hello', 'world', 'Boston', 'Red', 'Sox'];
    expect(generateRedactedWordList(input)).toEqual(output);
  });

  test('it should split on comma', () => {
    const input = 'Hello,world,Boston,Red,Sox';
    const output = ['Hello', 'world', 'Boston', 'Red', 'Sox'];
    expect(generateRedactedWordList(input)).toEqual(output);
  });

  test('it should split on a mix of spaces and commas', () => {
    const input = 'Hello,world Boston,Red, Sox';
    const output = ['Hello', 'world', 'Boston', 'Red', 'Sox'];
    expect(generateRedactedWordList(input)).toEqual(output);
  });

  test('it should handle double quotes', () => {
    const input = 'Hello world "Boston Red Sox"';
    const output = ['Hello', 'world', 'Boston Red Sox'];
    expect(generateRedactedWordList(input)).toEqual(output);
  });

  test('it should handle single quotes', () => {
    const input = "Hello world 'Boston Red Sox'";
    const output = ['Hello', 'world', 'Boston Red Sox'];
    expect(generateRedactedWordList(input)).toEqual(output);
  });

  test('it should handle a mix of double and single quotes', () => {
    const input = `Hello world 'Boston Red Sox' "something else"`;
    const output = ['Hello', 'world', 'Boston Red Sox', 'something else'];
    expect(generateRedactedWordList(input)).toEqual(output);
  });
});