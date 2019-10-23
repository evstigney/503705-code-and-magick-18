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
      for (var key in RatingValue) {
        if (window.setup.mainWizard[key] === wizard[key]) {
          wizard.rating += RatingValue[key];
        }
      }
    });
    return wizards;
  };

  var loadSuccessHandler = function (data) {
    if (typeof data === 'object') {
      data.forEach(function (element) {
        wizardsServerData.push(element);
        element.rating = 0;
        sortedWizards.push(element);
      });

      sortedWizards = getRating(sortedWizards).sort(function (a, b) {
        var result = 0;
        if (a.rating < b.rating) {
          result = 1;
        }
        if (a.rating > b.rating) {
          result = -1;
        }
        return result;
      });

      window.render.renderWizards(sortedWizards);

    } else {
      var errorMessage = 'Некорректный тип данных';
      window.popup.onError(errorMessage);
    }
  };

  window.backend.load(loadSuccessHandler, window.popup.onError);

  return {
    wizards: wizardsServerData,
    sortedWizards: sortedWizards
  };
})();
