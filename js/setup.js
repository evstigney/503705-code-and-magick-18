'use strict';

var setupWindow = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');
var setupOpen = document.querySelector('.setup-open');
var setupOpenIcon = setupOpen.querySelector('.setup-open-icon');
var setupClose = setupWindow.querySelector('.setup-close');
var setupUserName = setupWindow.querySelector('.setup-user-name');
var setupWizardCoat = setupWindow.querySelector('.setup-wizard .wizard-coat');
var setupWizardCoatValue = setupWindow.querySelector('input[name="coat-color"]');
var setupWizardEyes = setupWindow.querySelector('.setup-wizard .wizard-eyes');
var setupWizardEyesValue = setupWindow.querySelector('input[name="eyes-color"]');
var setupWizardFireball = setupWindow.querySelector('.setup-fireball-wrap');
var setupWizardFireballValue = setupWindow.querySelector('input[name="fireball-color"]');
var setupButtonSubmit = setupWindow.querySelector('.button .setup-submit');
var setupWizardForm = setupWindow.querySelector('.setup-wizard-form');
var similarWizardsList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

var WIZARD_NAMES_ARR = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES_ARR = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS_ARR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS_ARR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS_ARR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_QUANTITY = 4;

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;


var getRandomNumber = function (minNumber, maxNumber) {
  return Math.floor(Math.random() * (Math.floor(maxNumber) - Math.ceil(minNumber) + 1)) + Math.ceil(minNumber);
};

var getRandomValue = function (arr) {
  var index = getRandomNumber(0, arr.length - 1);
  return arr[index];
};

var createWizardName = function () {
  var name = getRandomValue(WIZARD_NAMES_ARR);
  var surname = getRandomValue(WIZARD_SURNAMES_ARR);
  return name + ' ' + surname;
};

var createWizards = function (quantity) {
  var wizards = [];
  for (var i = 0; i < quantity; i++) {
    var wizard = {
      name: createWizardName(),
      coatColor: getRandomValue(COAT_COLORS_ARR),
      eyesColor: getRandomValue(EYES_COLORS_ARR)
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

var openSetupWindowHandler = function () {
  setupWindow.classList.remove('hidden');
};

var closeSetupWindowHandler = function () {
  setupWindow.classList.add('hidden');
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

var convertRgbToHex = function (rgb) {
  rgb = rgb.slice(4, -1);
  rgb = rgb.split(', ');
  var hex = '#';
  for (var i = 0; i < rgb.length; i++) {
    rgb[i] = Number(rgb[i]).toString(16);
    hex += rgb[i];
  }
  return hex;
};

renderWizardsInDocument();

setupOpen.addEventListener('click', function () {
  openSetupWindowHandler();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE && document.activeElement === setupOpenIcon) {
    openSetupWindowHandler();
  }
});

setupClose.addEventListener('click', function () {
  closeSetupWindowHandler();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE && document.activeElement === setupClose) {
    closeSetupWindowHandler();
  }
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE && !setupWindow.classList.contains('hidden') && document.activeElement !== setupUserName) {
    closeSetupWindowHandler();
  }
  if (evt.keyCode === ENTER_KEYCODE && document.activeElement === setupButtonSubmit) {
    setupWizardForm.submit();
  }
});

setupUserName.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    evt.preventDefault();
  }
});

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
  var currentColor = convertRgbToHex(setupWizardFireball.style.backgroundColor);
  var newColor = changeSetupColor(FIREBALL_COLORS_ARR, currentColor);
  var newBackground = 'background: ' + newColor + ';';
  setupWizardFireball.setAttribute('style', newBackground);
  setupWizardFireballValue.value = setupWizardFireball.style.backgroundColor;
});
