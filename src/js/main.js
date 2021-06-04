'use strict';

document.addEventListener('DOMContentLoaded', function () {

  //! сброс событя на ссылках (для теста)
  document.querySelectorAll('a').forEach(link => link.addEventListener('click', (e) => e.preventDefault()));

  //! tab-focus only
  document.body.addEventListener('mousedown', function () {
    document.body.classList.add('using-mouse');
  });

  document.body.addEventListener('keydown', function (e) {
    if (e.code === 'Tab') {
      document.body.classList.remove('using-mouse');
    }
  });

  //! form
  const sendForm = () => {
    const forms = document.querySelectorAll('.form');
    const inputs = document.querySelectorAll('.form__input');
    const modalMsg = document.querySelector('.thanks');
    const modalForm = document.querySelector('.request');
    const status = document.querySelector('.thanks__text');
    const closeBtns = document.querySelectorAll('.modal__close');
    const callBtns = document.querySelectorAll('.call');

    callBtns.forEach(call => {
      call.addEventListener('click', (e) => {
        e.preventDefault();
        modalForm.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });

    closeBtns.forEach(close => {
      close.addEventListener('click', (e) => {
        e.preventDefault();
        modalForm.style.display = 'none';
        modalMsg.style.display = 'none';
        document.body.style.overflow = '';
      });
    });

    const message = {
      loading: 'загрузка...',
      success: 'спасибо',
      fail: 'ошибка'
    };

    const postData = async (url, data) => {

      if (modalForm.style.display === 'flex') {
        modalForm.style.display = 'none';
      }
      status.textContent = message.loading;
      modalMsg.style.display = 'flex';
      document.body.style.overflow = 'hidden';

      let result = await fetch(url, {
        method: 'POST',
        body: data
      });

      return await result.text();
    };

    const clearInputs = () => {
      inputs.forEach(item => {
        item.value = '';
      });
    };

    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        postData('server.php', formData)
          .then(result => {
            console.log(result);
            status.textContent = message.success;
          })
          .catch(() => status.textContent = message.fail)
          .finally(() => {
            clearInputs();
            setTimeout(() => {
              modalMsg.style.display = 'none';
              document.body.style.overflow = '';
            }, 4000);
          });
      });
    });
  };
  sendForm();

  //! Load more

  const loadMore = () => {
    const buttons = document.querySelectorAll('.block__load-link');
    const cards = document.querySelectorAll('.block__card');

    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        if (button.classList.contains('load-reviews')) {
          cards.forEach(card => {
            if (card.classList.contains('reviews__card') && card.classList.contains('hidden')) {
              card.classList.remove('hidden');
            }
          });
        }
        if (button.classList.contains('load-articles')) {
          cards.forEach(card => {
            if (card.classList.contains('articles__card')) {
              card.classList.remove('hidden');
            }
          });
        }
      });
    });
  };
  loadMore();






});
