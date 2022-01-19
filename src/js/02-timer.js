import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  intervalId: null,
};

let deadline = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateCheckFn(selectedDates[0]);
  },
};

refs.startBtn.disabled = true;

flatpickr('input#datetime-picker', options);
const inputFp = document.querySelector('input#datetime-picker')._flatpickr;

function dateCheckFn(deadline) {
  if (deadline < options.defaultDate) {
    Notify.warning('Please choose a date in the future');
    refs.startBtn.disabled = true;
    return;
  }
  refs.startBtn.disabled = false;
}

refs.startBtn.addEventListener('click', startCounterFn);

function startCounterFn() {
  localStorage.setItem('deadline', inputFp.selectedDates[0]);
  deadline = new Date(localStorage.getItem('deadline'));
  refs.startBtn.disabled = true;

  refs.intervalId = setInterval(() => {
    const diff = deadline - new Date();

    if (diff <= 0) {
      stopCounterFn();
      refs.startBtn.disabled = false;

      return;
    }

    const { days, hours, minutes, seconds } = convertMs(diff);

    document.querySelector('[data-days]').textContent = padAddFn(days);
    document.querySelector('[data-hours]').textContent = padAddFn(hours);
    document.querySelector('[data-minutes]').textContent = padAddFn(minutes);
    document.querySelector('[data-seconds]').textContent = padAddFn(seconds);
  }, 1000);
}

function stopCounterFn() {
  clearInterval(refs.intervalId);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function padAddFn(value) {
  return String(value).padStart(2, '0');
}

console.log(deadline);
