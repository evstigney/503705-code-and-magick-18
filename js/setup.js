'use strict';

var setupWindow = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');
setupWindow.classList.remove('hidden');

var wizardNamesArr = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardSurnamesArr = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColorsArr = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColorsArr = ['black', 'red', 'blue', 'yellow', 'green'];
var wizardsQuantity = 4;

var similarWizardsList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

var getRandomNumber = function (minNumber, maxNumber) {
  var min = Math.ceil(minNumber);
  var max = Math.floor(maxNumber);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomValue = function (arr) {
  var min = 0;
  var max = arr.length - 1;
  var index = getRandomNumber(min, max);
  return arr[index];
};

var createWizardName = function (names, surnames) {
  var name = getRandomValue(names);
  var surname = getRandomValue(surnames);
  return name + ' ' + surname;
};

var createWizards = function (names, surnames, coatColors, eyesColors, quantity) {
  var wizards = [];
  for (var i = 1; i <= quantity; i++) {
    var wizard = {
      name: createWizardName(names, surnames),
      coatColor: getRandomValue(coatColors),
      eyesColor: getRandomValue(eyesColors)
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

var wizardsArr = createWizards(wizardNamesArr, wizardSurnamesArr, coatColorsArr, eyesColorsArr, wizardsQuantity);
for (var i = 0; i < wizardsArr.length; i++) {
  fragment.appendChild(renderWizard(wizardsArr[i]));
}
similarWizardsList.appendChild(fragment);
setupSimilar.classList.remove('hidden');
