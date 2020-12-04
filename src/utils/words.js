const randomIntFromInterval = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generate = (count = 20, wordList) => {
  let i;
  const wordArray = [];
  for (i = 0; i < count; i++) {
    const randomNumber = randomIntFromInterval(0, 999);

    wordArray.push(wordList[randomNumber]);
  }
  return wordArray;
};

export default generate;
