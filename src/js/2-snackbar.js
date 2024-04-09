// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', addResult);

function addResult(event) {
  event.preventDefault();

  const checkedInput = form.querySelector('input[name="state"]:checked').value;
  const input = form.querySelector('input[name="delay"]');
  const delay = Number(input.value);

  const promise = new Promise((resolve, reject) => {
    if (checkedInput === 'rejected') {
      return setTimeout(
        () => reject(`❌ Rejected promise in ${delay}ms`),
        delay
      );
    } else {
      setTimeout(() => resolve(`✅ Fulfilled promise in ${delay}ms`), delay);
    }
  });

  promise
    .then(response => {
      iziToast.success({
        message: response,
        position: 'topRight',
        iconUrl: null,
      });
    })
    .catch(error => {
      iziToast.error({
        message: error,
        position: 'topRight',
        iconUrl: null,
      });
    });

  form.reset();
}
