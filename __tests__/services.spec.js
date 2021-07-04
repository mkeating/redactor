const { generateRedactedWordList, redactText } = require('../api/services');

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

// check for subwords, capitalization
describe('redactText', () => {
  test('it should replace a single word', () => {
    const words = ['lorem'];
    const text = 'lorem ipsum';
    expect(redactText(words, text)).toEqual('XXXX ipsum');
  });

  test('it should replace all instances of a single word', () => {
    const words = ['lorem'];
    const text = 'lorem ipsum lorem';
    expect(redactText(words, text)).toEqual('XXXX ipsum XXXX');
  });

  test('it should replace all instances of multiple words', () => {
    const words = ['lorem', 'ipsum'];
    const text = 'lorem ipsum lorem dolor foo bar ipsum';
    expect(redactText(words, text)).toEqual('XXXX XXXX XXXX dolor foo bar XXXX');
  });

  test('it should handle punctuation', () => {
    const words = ['lorem'];
    const text = 'lorem! ipsum lorem';
    expect(redactText(words, text)).toEqual('XXXX! ipsum XXXX');
  });

  test('it should handle subwords', () => {
    const words = ['lorem'];
    const text = 'lorem ipsum barloremfoo';
    expect(redactText(words, text)).toEqual('XXXX ipsum barloremfoo');
  });
})