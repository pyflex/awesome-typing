const stateToClass = {
  correct: "success",
  incorrect: "danger",
  current: "default",
};

let startTime;

const recentWordLengthQueue = [];
export const checkChars = (input, currentWord, stateData, wordClass) => {
  if (stateData.wordsTyped === 0) {
    startTime = new Date();
  }

  let data = {
    typeData: stateData,
    wordWithClass: wordClass,
    completed: false,
    typingCompleted: false,
    wpm: null,
    accuracy: null,
  };

  // alternative way of checking if char is the DELETE button
  recentWordLengthQueue.push(input.length);
  if (recentWordLengthQueue.length > 1) {
    if (input.length < recentWordLengthQueue[0]) {
      recentWordLengthQueue.shift();
      data.wpm = calculateWpm(startTime, data.typeData.correctCharsTyped);
      data.accuracy = calculateAcc(
        data.typeData.correctCharsTyped,
        data.typeData.incorrectCharsTyped
      );
      return data;
    }
    recentWordLengthQueue.shift();
  }

  let { typeData, wordWithClass } = data;
  const { correct, incorrect, current } = stateToClass;

  const arrayInput = input.split("");
  const inputLength = arrayInput.length;
  const currentWordChar = currentWord.split("")[inputLength - 1];
  const currentInputChar = arrayInput[inputLength - 1];
  data.completed = false;
  data.typingCompleted = false;

  // prevents users from spamming spacebar
  if (input === "" || input === " ") return null;

  // if key === mellanslag, indicating that the user wants to move on the next word
  if (currentInputChar === " ") {
    if (`${currentWord} ` === input) {
      wordWithClass[typeData.wordsTyped] = correct;
      typeData.wordsTyped++;
      typeData.correctWords++;
    } else {
      wordWithClass[typeData.wordsTyped] = incorrect;
      typeData.wordsTyped++;
      typeData.incorrectWords++;
    }

    data.completed = true;

    // adjusts differences between indexes and just getting the length
    // checks if all wordstyped is equal to the length of wordwithclass words, indicating that the user has finished
    if (typeData.wordsTyped === Object.keys(wordWithClass).length - 1) {
      data.typingCompleted = true;
    } else {
      // makes the next word look default, since we incremented wordstyped earlier
      wordWithClass[typeData.wordsTyped] = current;
    }

    data.accuracy = calculateAcc(
      data.typeData.correctCharsTyped,
      data.typeData.incorrectCharsTyped
    );
    data.wpm = calculateWpm(startTime, data.typeData.correctCharsTyped);
    return data;
  }

  // if we use the delete button, then this comes handy, restoring class to inital state if words match:
  // need to check so that backspace does not equal backspace
  if (currentWord.slice(0, input.length) === input) {
    wordWithClass[typeData.wordsTyped] = current;
    typeData.correctCharsTyped++;
    data.accuracy = calculateAcc(
      data.typeData.correctCharsTyped,
      data.typeData.incorrectCharsTyped
    );
    data.wpm = calculateWpm(startTime, data.typeData.correctCharsTyped);
    return data;
  }

  if (currentWordChar === currentInputChar) {
    if (wordWithClass[typeData.wordsTyped] === incorrect) {
      typeData.incorrectCharsTyped++;
      data.accuracy = calculateAcc(
        data.typeData.correctCharsTyped,
        data.typeData.incorrectCharsTyped
      );
      data.wpm = calculateWpm(startTime, data.typeData.correctCharsTyped);
      return data;
    }
    typeData.correctCharsTyped++;
    wordWithClass[typeData.wordsTyped] =
      wordWithClass[typeData.wordsTyped] === incorrect ? incorrect : current;
  } else {
    typeData.incorrectCharsTyped++;
    wordWithClass[typeData.wordsTyped] = incorrect;
  }

  data.accuracy = calculateAcc(
    data.typeData.correctCharsTyped,
    data.typeData.incorrectCharsTyped
  );
  data.wpm = calculateWpm(startTime, data.typeData.correctCharsTyped);
  return data;
};

const calculateWpm = (startTime, charsTyped) => {
  let passedTime = (new Date() - startTime) / 1000;
  if (passedTime < 1) return "Calculating...";
  let avgLength = 5;
  let multiple = 60 / passedTime;
  let total = multiple * charsTyped;
  let wpm = (total / avgLength).toFixed(0);
  return wpm;
};

const calculateAcc = (correctCharsTyped, incorrectCharsTyped) => {
  const totalCharsTyped = correctCharsTyped + incorrectCharsTyped;
  const accPercentage = ((correctCharsTyped / totalCharsTyped) * 100).toFixed(
    2
  );

  return accPercentage;
};

export const wordsWithClass = (words) => {
  let wordAndClass = {};
  for (let i = 0; i <= words.length; i++) {
    wordAndClass[i] = "";
  }

  return wordAndClass;
};
