import throttle from 'lodash.throttle';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector('input[name="delay"]'),
  stepInput: document.querySelector('input[name="step"]'),
  amountInput: document.querySelector('input[name="amount"]'),
  button: document.querySelector('button[type="submit"]'),
};

refs.form.addEventListener('input', throttle(localStorageFn, 500));

const STORAGE_KEY = 'promise-key';
const dataObj = {};

function localStorageFn() {
  dataObj[refs.delayInput.name] = refs.delayInput.value;
  dataObj[refs.stepInput.name] = refs.stepInput.value;
  dataObj[refs.amountInput.name] = refs.amountInput.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataObj));
}

const savedData = localStorage.getItem(STORAGE_KEY);
const parsedData = JSON.parse(savedData);

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  refs.button.disabled = true;
  const { delay, step, amount } = parsedData;
  let delayValue = Number(delay);
  const stepValue = Number(step);
  const amountValue = Number(amount);

  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, delayValue);
    delayValue += stepValue;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve(onSuccessFn(position, delay));
      } else {
        reject(onErrorFn(position, delay));
      }
    }, delay);
  });
}

function onSuccessFn(position, delay) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onErrorFn(position, delay) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
