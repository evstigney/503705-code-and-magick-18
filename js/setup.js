'use strict';

var setupWindow = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');
setupWindow.classList.remove('hidden');

var WIZARD_NAMES_ARR = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES_ARR = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS_ARR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS_ARR = ['black', 'red', 'blue', 'yellow', 'green'];
var wizardsQuantity = 4;

var similarWizardsList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

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
  var wizardsArr = createWizards(wizardsQuantity);
  for (var i = 0; i < wizardsArr.length; i++) {
    fragment.appendChild(renderWizard(wizardsArr[i]));
  }
  similarWizardsList.appendChild(fragment);
  setupSimilar.classList.remove('hidden');
};

renderWizardsInDocument();
