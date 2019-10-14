'use strict';

window.backend = (function () {
  var URL = 'https://js.dump.academy/code-and-magick';
  var TIMEOUT = 6000;

  var onTimeout = function (action) {
    var string = 'Данные не загрузились за ' + TIMEOUT + ' ms';
    action(string);
  };

  var renderErrorMessage = function (status) {
    var message = 'Произошла ошибка при загрузке';
    switch (status) {
      case 400:
        message = 'Неверный запрос';
        break;

      case 401:
        message = 'Пользователь не авторизован';
        break;

      case 404:
        message = 'Ничего не найдено';
        break;

      case 500:
        message = 'Внутренняя ошибка сервера';
    }
    return message;
  };
  return {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = TIMEOUT;
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError(renderErrorMessage(xhr.status));
        }
      });
      xhr.addEventListener('timeout', function () {
        onTimeout(onError);
      });
      xhr.open('GET', URL + '/data');
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = TIMEOUT;

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad('Данные успешно загружены!');
        } else {
          onError(renderErrorMessage(xhr.status));
        }
      });
      xhr.addEventListener('timeout', function () {
        onTimeout(onError);
      });
      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
