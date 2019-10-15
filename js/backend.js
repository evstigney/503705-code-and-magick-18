'use strict';

window.backend = (function () {
  var URL = 'https://js.dump.academy/code-and-magick';
  var TIMEOUT = 6000;
  var MAP_ERRORS = {
    400: 'неверный запрос',
    401: 'пользователь не авторизован',
    404: 'ничего не найдено',
    500: 'внутренняя ошибка сервера'
  };

  var onTimeout = function (action) {
    var string = 'Данные не загрузились за ' + TIMEOUT + ' ms';
    action(string);
  };

  var getErrorMessage = function (status) {
    var message = 'Ошибка: ';
    message += MAP_ERRORS[status];
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
          onError(getErrorMessage(xhr.status));
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
          onError(getErrorMessage(xhr.status));
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
