'use strict';

window.sort = (function () {
  var wizardsServerData = [];
  var sortedWizards = [];

  var RatingValue = {
    'colorCoat': 5,
    'colorEyes': 3,
    'colorFireball': 1
  };

  var getRating = function (wizards) {
    wizards.forEach(function (wizard) {
      wizard.rating = 0;
      for (var key in RatingValue) {
        if (window.setup.mainWizard[key] === wizard[key]) {
          wizard.rating += RatingValue[key];
        }
      }
    });
    return wizards;
  };

  var sortByValue = function (a, b) {
    var result = 0;
    if (a.rating < b.rating) {
      result = 1;
    }
    if (a.rating > b.rating) {
      result = -1;
    }
    return result;
  };

  var renderSortedWizards = function () {
    sortedWizards = getRating(wizardsServerData.slice()).sort(sortByValue);
    window.render.renderWizards(sortedWizards);
    return sortedWizards;
  };

  var renderWizardsHandler = function () {
    var renderedWizards = window.render.wizardsList.querySelectorAll('.setup-similar-item');
    for (var i = 0; i < renderedWizards.length; i++) {
      renderedWizards[i].remove();
    }
    renderSortedWizards();
  };

  var loadSuccessHandler = function (data) {
    if (typeof data === 'object') {
      data.forEach(function (element) {
        wizardsServerData.push(element);
      });

      renderSortedWizards();

      window.setup.wizardCoat.addEventListener('click', renderWizardsHandler);
      window.setup.wizardEyes.addEventListener('click', renderWizardsHandler);
      window.setup.wizardFireball.addEventListener('click', renderWizardsHandler);
    } else {
      var errorMessage = 'Некорректный тип данных';
      window.popup.onError(errorMessage);
    }
  };

  window.backend.load(loadSuccessHandler, window.popup.onError);
})();
