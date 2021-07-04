module.exports = {
  generateRedactedWordList: (words) => {
    // get phrases between single or double quotes
    const phrases = words.match(/(?<=").*?(?=")|(?<=').*?(?=')/g);
    // remove those phrases, and split on space and comma
    const splits = words.replace(/"[^"]+"|'[^']+'/g, '').split(/[\s,]+/g).filter((item) => item.length > 0);
    // join together and clean up any whitespace
    const result = phrases ? splits.concat(phrases).map((item) => item.trim()) : splits;
    return result;
  },
};
