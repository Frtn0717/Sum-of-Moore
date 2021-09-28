const resultBtn = document.querySelector('.calc__result_btn');
const resetBtn = document.querySelector('.calc__reset_btn');
const result = document.querySelector('.calc__result_input');
const messagesBlock = document.querySelector('.calc__messages');
const cache = {};


const clearMessages = () => {
  messagesBlock.innerHTML = '';
  messagesBlock.classList.add('hidden');
}

const calculate = () => {
  const startInput = document.querySelector('.calc__start').value;
  const endInput = document.querySelector('.calc__end').value;
  const minSafeNum = Number.MIN_SAFE_INTEGER;
  const maxSafeNum = Number.MAX_SAFE_INTEGER;

  let min = startInput === '' ? null : Number(startInput);
  let max = endInput === '' ? null : Number(endInput);

  const isNotSafeNumber = () => {
    return (
      max > maxSafeNum ||
      min < minSafeNum ||
      min > maxSafeNum ||
      max < minSafeNum
    );
  };

  function range() {
    result.classList.remove('hidden');
    return ((min + max) * (max + 1 - min)) / 2;
  };

  function makeMessageVisible() {
    result.classList.add('hidden');
    messagesBlock.classList.remove('hidden');
  };

  function showMessage(messageText) {
    messagesBlock.innerHTML = messageText;
  };

  if (min > max) {
    [min, max] = [max, min];

    makeMessageVisible();
    showMessage(`I have corrected your choice of numbers, but you'll 
      be careful next time =) The starting number cannot be greater than the ending number.`);

    result.classList.remove('hidden');
    resetBtn.classList.remove('hidden');
  };

  if (min === null || max === null) {
    makeMessageVisible();
    showMessage(`You need to fill in the Start and End fields`);

    result.classList.add('hidden');
    resetBtn.classList.remove('hidden');
    return;
  };

  if (isNotSafeNumber()) {
    makeMessageVisible();
    showMessage(`What is this crazy number? 
    Let's try greater then ${minSafeNum} and less then ${maxSafeNum}.`);

    result.classList.add('hidden');
    resetBtn.classList.remove('hidden');
    return;
  };

  if (
    (!Number.isInteger(min) || !Number.isInteger(max)) &&
    (typeof min === 'number' && typeof max === 'number')
     ) {
    makeMessageVisible();
    showMessage(`Please, use only integer numbers.`);

    result.classList.add('hidden');
    resetBtn.classList.remove('hidden');
    return;
  };

  function memoRange(f) {
    result.classList.remove('hidden');
    resetBtn.classList.remove('hidden');

    return () => {
      const key = `${min}, ${max}`;

      if (cache[key]) {
        console.log('from cache');
        return cache[key];
      };

      const value = f();

      if (value > maxSafeNum || value < minSafeNum) {

        makeMessageVisible();
        showMessage(`Let's try using simpler numbers.`);
        result.classList.add('hidden');

      } else {

        console.log('calculated');
        cache[key] = value;
        return value;

      };      
    };

  };

    const cachedResult = memoRange(range);
    result.value = cachedResult(min, max);
};

const resetForm = () => {
  clearMessages();
  result.classList.add('hidden');
  resetBtn.classList.add('hidden');
};
