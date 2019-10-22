'use strict';

window.setup = (function () {
  var setupWizardCoat = window.dialog.setup.querySelector('.setup-wizard .wizard-coat');
  var setupWizardCoatValue = window.dialog.setup.querySelector('input[name="coat-color"]');
  var setupWizardEyes = window.dialog.setup.querySelector('.setup-wizard .wizard-eyes');
  var setupWizardEyesValue = window.dialog.setup.querySelector('input[name="eyes-color"]');
  var setupWizardFireball = window.dialog.setup.querySelector('.setup-fireball-wrap');
  var setupWizardFireballValue = window.dialog.setup.querySelector('input[name="fireball-color"]');
  var similarWizardsList = document.querySelector('.setup-similar-list');

  var COAT_COLORS_ARR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS_ARR = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS_ARR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var changeSetupColor = function (arr, color) {
    var currentColor = color;
    var index = 1;
    for (var i = 0; i < arr.length; i++) {
      if (currentColor === arr[i]) {
        index = (i + 1) % arr.length;
      }
    }
    currentColor = arr[index];
    return currentColor;
  };

  setupWizardCoat.addEventListener('click', function (evt) {
    var currentColor = changeSetupColor(COAT_COLORS_ARR, evt.target.style.fill);
    evt.target.style.fill = currentColor;
    setupWizardCoatValue.value = evt.target.style.fill;
  });

  setupWizardEyes.addEventListener('click', function (evt) {
    var currentColor = changeSetupColor(EYES_COLORS_ARR, evt.target.style.fill);
    evt.target.style.fill = currentColor;
    setupWizardEyesValue.value = evt.target.style.fill;
  });

  setupWizardFireball.addEventListener('click', function () {
    var currentColor = window.util.convertRgbToHex(setupWizardFireball.style.backgroundColor);
    var newColor = changeSetupColor(FIREBALL_COLORS_ARR, currentColor);
    var newBackground = 'background: ' + newColor + ';';
    setupWizardFireball.setAttribute('style', newBackground);
    setupWizardFireballValue.value = setupWizardFireball.style.backgroundColor;
  });

  return {
    similarWizardsList: similarWizardsList
  };
})();
