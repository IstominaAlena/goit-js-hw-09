import throttle from 'lodash.throttle';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();

  const formElements = new FormData(evt.currentTarget);
  const dataObj = {};

  formElements.forEach((value, name) => (dataObj[name] = value));

  let delayValue = Number(dataObj.delay);
  const stepValue = Number(dataObj.step);
  const amountValue = Number(dataObj.amount);

  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        onSuccessFn({ position, delay });
      })
      .catch(({ position, delay }) => {
        onErrorFn({ position, delay });
      });
    delayValue += stepValue;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSuccessFn({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onErrorFn({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
