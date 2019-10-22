'use strict';

window.popup = (function () {
  var renderLoadPopup = function (message, incident) {
    var errorBlock = document.createElement('div');
    var removeErrorBlock = function () {
      errorBlock.remove();
    };
    errorBlock.style = 'position: absolute; z-index: 100; padding: 30px; text-align: center;';
    errorBlock.style.width = 'auto';
    errorBlock.style.height = 'auto';
    errorBlock.style.fontSize = '30px';
    errorBlock.style.backgroundColor = (incident !== 'error') ? 'blue' : 'red';
    errorBlock.style.border = '3px solid black';
    errorBlock.style.color = 'white';
    errorBlock.style.top = '50%';
    errorBlock.style.left = '50%';
    errorBlock.style.transform = 'translateX(-50%)';
    errorBlock.textContent = message;
    document.body.insertAdjacentElement('afterbegin', errorBlock);
    setTimeout(removeErrorBlock, 3000);
  };

  var loadFailHandler = function (message) {
    renderLoadPopup(message, 'error');
  };

  var saveSuccessHandler = function (message) {
    renderLoadPopup(message, 'success');
  };

  return {
    onError: loadFailHandler,
    onSuccess: saveSuccessHandler
  };
})();
