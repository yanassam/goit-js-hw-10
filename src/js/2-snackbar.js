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

  function checkValue(checkedInput) {
    return new Promise((resolve, reject) => {
      if (checkedInput === 'rejected') {
        return setTimeout(
          () => reject(`Rejected promise in ${delay}ms`),
          delay
        );
      }
      setTimeout(
        () => resolve(`\u2705 Fulfilled promise in ${delay}ms`),
        delay
      );
    });
  }

  checkValue(checkedInput)
    .then(response => {
      console.log(response);
      iziToast.success({
        message: response,
        position: 'topRight',
        iconUrl: '',
      });
    })
    .catch(error => {
      console.log(error);
      iziToast.error({
        message: error,
        position: 'topRight',
      });
    });

  form.reset();
}
