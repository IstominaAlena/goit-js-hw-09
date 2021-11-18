const refs = {
  body: document.body,
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  timerId: null,
};

refs.startBtn.addEventListener('click', onBodyClrStart);

function onBodyClrStart() {
  refs.startBtn.disabled = true;
  refs.body.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.stopBtn.addEventListener('click', onBodyClrStop);

function onBodyClrStop() {
  clearInterval(timerId);
  refs.startBtn.disabled = false;
}
