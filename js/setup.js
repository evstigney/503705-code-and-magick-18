'use strict';
(function () {
  var setupSimilar = document.querySelector('.setup-similar');
  var setupWizardCoat = window.dialog.setup.querySelector('.setup-wizard .wizard-coat');
  var setupWizardCoatValue = window.dialog.setup.querySelector('input[name="coat-color"]');
  var setupWizardEyes = window.dialog.setup.querySelector('.setup-wizard .wizard-eyes');
  var setupWizardEyesValue = window.dialog.setup.querySelector('input[name="eyes-color"]');
  var setupWizardFireball = window.dialog.setup.querySelector('.setup-fireball-wrap');
  var setupWizardFireballValue = window.dialog.setup.querySelector('input[name="fireball-color"]');
  var similarWizardsList = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();

  var WIZARD_NAMES_ARR = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES_ARR = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS_ARR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS_ARR = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS_ARR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARDS_QUANTITY = 4;

  var createWizardName = function () {
    var name = window.util.getRandomValue(WIZARD_NAMES_ARR);
    var surname = window.util.getRandomValue(WIZARD_SURNAMES_ARR);
    return name + ' ' + surname;
  };

  var createWizards = function (quantity) {
    var wizards = [];
    for (var i = 0; i < quantity; i++) {
      var wizard = {
        name: createWizardName(),
        coatColor: window.util.getRandomValue(COAT_COLORS_ARR),
        eyesColor: window.util.getRandomValue(EYES_COLORS_ARR)
      };
      wizards.push(wizard);
    }
    return wizards;
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  var renderWizardsInDocument = function () {
    var wizardsArr = createWizards(WIZARDS_QUANTITY);
    for (var i = 0; i < wizardsArr.length; i++) {
      fragment.appendChild(renderWizard(wizardsArr[i]));
    }
    similarWizardsList.appendChild(fragment);
    setupSimilar.classList.remove('hidden');
  };

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

  renderWizardsInDocument();

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
})();
