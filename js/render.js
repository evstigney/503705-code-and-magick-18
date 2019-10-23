'use strict';

window.render = (function () {
  var WIZARDS_QUANTITY = 4;

  var setupSimilar = document.querySelector('.setup-similar');
  var similarWizardsList = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();

  var wizards = [];

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var renderWizardsInDocument = function (data) {
    var waitBlock = document.querySelector('.setup-footer').querySelector('.wait-block');
    if (waitBlock) {
      waitBlock.remove();
    }
    wizards = data;
    for (var i = 0; i < WIZARDS_QUANTITY; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
      similarWizardsList.appendChild(fragment);
      setupSimilar.classList.remove('hidden');
    }
  };

  return {
    wizardsList: similarWizardsList,
    renderWizards: renderWizardsInDocument
  };
})();
