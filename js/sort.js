'use strict';

window.sort = (function () {
  var wizardsServerData = [];
  var sortedWizards = [];

  var RatingValue = {
    'colorCoat': 5,
    'colorEyes': 3,
    'colorFireball': 1
  };
/*
  var setRating = function (param) {
    if (window.setup.mainWizard[param] === wizard[param]) {
      wizard.rating += RatingValue[param];
    }

  };
*/
  var getRating = function (wizards) {
    wizards.forEach(function (wizard) {
      if (window.setup.mainWizard.colorCoat === wizard.colorCoat) {
        wizard.rating += 5;
      }
      if (window.setup.mainWizard.colorEyes === wizard.colorEyes) {
        wizard.rating += 3;
      }
      if (window.setup.mainWizard.colorFireball === wizard.colorFireball) {
        wizard.rating += 1;
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
