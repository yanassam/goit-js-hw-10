// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timer = document.querySelector('.js-timer');

let userSelectedDate;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      return iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
        iconUrl: './img/vite-logo.png',
      });
    }
    startBtn.disabled = false;
    userSelectedDate = selectedDates[0];
  },
};

flatpickr(input, options); // функ-я из библиотеки input наш из дома options - берем из библиотеки и немного добавляем от себя в методе onClose

startBtn.addEventListener('click', startTimer);

function startTimer(event) {
  const intervalId = setInterval(() => {
    const diff = userSelectedDate - Date.now();
    if (diff <= 0) {
      clearInterval(intervalId);
      return iziToast.success({
        message: 'Game over',
        position: 'topRight',
      });
    }
    const { days, hours, minutes, seconds } = convertMs(diff);

    timer.querySelector('.js-days').textContent = addZero(days);
    timer.querySelector('.js-hours').textContent = addZero(hours);
    timer.querySelector('.js-minutes').textContent = addZero(minutes);
    timer.querySelector('.js-seconds').textContent = addZero(seconds);
  }, 1000);

  startBtn.disabled = true;
  input.disabled = true;
}

function addZero(value) {
  return String(value).padStart(2, '0');
}

// вариант 2
// function startTimer(event) {
//   const intervalId = setInterval(() => {
//     const diff = userSelectedDate - Date.now();
//     const objectDay = convertMs(diff);
//     const newTime = Object.values(objectDay);

//     if (diff <= 0) {
//       clearInterval(intervalId);
//       return alert('Game over');
//     }

//     document.querySelectorAll('.value').forEach((element, index) => {
//       if (index < newTime.length) element.textContent = addZero(newTime[index]);
//     });
//   }, 1000);

//   startBtn.disabled = true;
//   input.disabled = true;
// }

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
