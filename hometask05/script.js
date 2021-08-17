const resultBtn = document.querySelector('.calc__result_btn');
const resetBtn = document.querySelector('.calc__reset_btn');
const result = document.querySelector('.calc__result_input');
const messagesBlock = document.querySelector('.calc__messages');

resultBtn.addEventListener('click', () => {
  let min = document.querySelector(".calc__start").value;
  let max = document.querySelector(".calc__end").value;
  const minSafeNum = Number.MIN_SAFE_INTEGER;
  const maxSafeNum = Number.MAX_SAFE_INTEGER;

  clearMessages();

  if (min.length === 0 || max.length === 0) {
    makeMessageVisible();
    messagesBlock.innerHTML = `You need to fill in the Start and End fields`;

    resetBtn.classList.remove("hidden");
  } else if (isNotSafeNumber()) {
    makeMessageVisible();
    messagesBlock.innerHTML = `What is this crazy number? 
    Let's try greater then ${minSafeNum} and less then ${maxSafeNum}.`;

    resetBtn.classList.remove("hidden");
  } else if (+min > +max) {
    [min, max] = [max, min];

    makeMessageVisible();
    messagesBlock.innerHTML = `I have corrected your choice of numbers, but you'll 
    be careful next time =) The starting number cannot be greater than the ending number.`;

    memoRange();

    resetBtn.classList.remove("hidden");
  } else {
    memoRange();
  }

  function memoRange() {
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        result.value = localStorage.getItem(key);
      } else {
        result.value = range();
        localStorage.setItem(`${min}, ${max}`, range());
      }
    }

    if (isCorrectResult()) {
      makeMessageVisible();
      messagesBlock.innerHTML = `Let's try using simpler numbers.`;

      resetBtn.classList.remove("hidden");
    }

    resetBtn.classList.remove("hidden");
  }

  function range() {
    result.classList.remove("hidden");
    return ((+min + +max) * (+max + 1 - +min)) / 2;
  }

  function makeMessageVisible() {
    result.classList.add("hidden");
    messagesBlock.classList.remove("hidden");
  }

  function isNotSafeNumber() {
    return (
      max > maxSafeNum ||
      min < minSafeNum ||
      min > maxSafeNum ||
      max < minSafeNum
    );
  }

  function isCorrectResult() {
    return result.value > maxSafeNum || result.value < minSafeNum;
  }
});

resetBtn.addEventListener('click', () => {
  clearMessages();
  result.classList.add('hidden');
  resetBtn.classList.add('hidden');
});

function clearMessages() {
  messagesBlock.innerHTML = '';
  messagesBlock.classList.add('hidden');
}
