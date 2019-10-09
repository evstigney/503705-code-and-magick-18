'use strict';

window.util = (function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomNumber: function (minNumber, maxNumber) {
      return Math.floor(Math.random() * (Math.floor(maxNumber) - Math.ceil(minNumber) + 1)) + Math.ceil(minNumber);
    },
    getRandomValue: function (arr) {
      var index = this.getRandomNumber(0, arr.length - 1);
      return arr[index];
    }
  };
})();
