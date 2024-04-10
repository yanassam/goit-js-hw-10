// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', addResult);

function creatPromise(state, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'rejected') {
        reject({ delay });
      } else if (state === 'fulfilled') {
        resolve({ delay });
      }
    }, delay);
  });
}

function addResult(event) {
  event.preventDefault();

  const checkedInput = form.querySelector('input[name="state"]:checked').value;
  const input = form.querySelector('input[name="delay"]');
  const delay = Number(input.value);

  creatPromise(checkedInput, delay)
    .then(response => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${response.delay}ms`,
        position: 'topRight',
        backgroundColor: '#A8E4A0',
      });
    })
    .catch(error => {
      iziToast.error({
        message: `❌ Rejected promise in ${error.delay}ms`,
        position: 'topRight',
      });
    });

  form.reset();
}
