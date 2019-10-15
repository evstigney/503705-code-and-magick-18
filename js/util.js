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
    },
    cloneObj: function (obj) {
      var clonedObj = {};
      if (typeof obj !== 'object') {
        clonedObj = null;
      } else {
        for (var key in obj) {
          if (key) {
            clonedObj[key] = obj[key];
          }
        }
      }
      return clonedObj;
    },
    convertRgbToHex: function (rgb) {
      rgb = rgb.slice(4, -1);
      rgb = rgb.split(', ');
      var hex = '#';
      for (var i = 0; i < rgb.length; i++) {
        rgb[i] = Number(rgb[i]).toString(16);
        hex += rgb[i];
      }
      return hex;
    },
    getMaxValueArr: function (arr) {
      var maxValue = arr[0];
      for (var i = 1; i < arr.length; i++) {
        if (maxValue < arr[i]) {
          maxValue = arr[i];
        }
      }
      return maxValue;
    },
    getRandomArr: function (arr, quantity) {
      var randomArr = [];
      var flag = true;
      for (var i = 0; i < quantity; i++) {
        var currentIndex = this.getRandomNumber(0, arr.length - 1);
        if (i > 0) {
          for (var j = 0; j < randomArr.length; j++) {
            flag = true;
            if (arr[currentIndex] === randomArr[j] && currentIndex !== j) {
              flag = false;
              --i;
              break;
            }
          }
        }
        if (flag) {
          randomArr.push(arr[currentIndex]);
        }
      }
      return randomArr;
    },
  };
})();
