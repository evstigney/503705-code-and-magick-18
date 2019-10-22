'use strict';

window.render = (function () {
  var WIZARDS_QUANTITY = 4;

  var setupSimilar = document.querySelector('.setup-similar');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();

  var createWizards = function (data) {
    var dataArr = window.util.getRandomArr(data, WIZARDS_QUANTITY);
    var wizards = [];
    for (var i = 0; i < dataArr.length; i++) {
      var wizard = {
        name: dataArr[i].name,
        coatColor: dataArr[i].colorCoat,
        eyesColor: dataArr[i].colorEyes
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

  var renderWizardsInDocument = function (data) {
    var waitBlock = document.querySelector('.setup-footer').querySelector('.wait-block');
    if (waitBlock) {
      waitBlock.remove();
    }
    var wizardsArr = createWizards(data);
    for (var i = 0; i < wizardsArr.length; i++) {
      fragment.appendChild(renderWizard(wizardsArr[i]));
      window.setup.similarWizardsList.appendChild(fragment);
      setupSimilar.classList.remove('hidden');
    }
  };

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

  var loadSuccessHandler = function (data) {
    if (typeof data === 'object') {
      renderWizardsInDocument(data);
    } else {
      var errorMessage = 'Некорректный тип данных';
      loadFailHandler(errorMessage);
    }
  };

  var saveSuccessHandler = function (message) {
    renderLoadPopup(message, 'success');
  };

  window.backend.load(loadSuccessHandler, loadFailHandler);

  window.dialog.setupForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(window.dialog.setupForm), saveSuccessHandler, loadFailHandler);
    window.dialog.setup.classList.add('hidden');
    evt.preventDefault();
  });
})();
