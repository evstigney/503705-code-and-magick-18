'use strict';
window.dialog = (function () {
  var setupWindow = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupOpenIcon = setupOpen.querySelector('.setup-open-icon');
  var setupClose = setupWindow.querySelector('.setup-close');
  var setupUserName = setupWindow.querySelector('.setup-user-name');
  var setupButtonSubmit = setupWindow.querySelector('.button .setup-submit');
  var setupWizardForm = setupWindow.querySelector('.setup-wizard-form');

  var openSetupWindowHandler = function () {
    setupWindow.classList.remove('hidden');
  };

  var closeSetupWindowHandler = function () {
    setupWindow.classList.add('hidden');
  };

  setupOpen.addEventListener('click', function () {
    openSetupWindowHandler();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (document.activeElement === setupOpenIcon) {
      window.util.isEnterEvent(evt, openSetupWindowHandler);
    }
  });

  setupClose.addEventListener('click', function () {
    closeSetupWindowHandler();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (document.activeElement === setupClose) {
      window.util.isEnterEvent(evt, closeSetupWindowHandler);
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (!setupWindow.classList.contains('hidden') && document.activeElement !== setupUserName) {
      window.util.isEscEvent(evt, closeSetupWindowHandler);
    }
    if (document.activeElement === setupButtonSubmit) {
      window.util.isEnterEvent(evt, setupWizardForm.submit());
    }
  });

  setupUserName.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, evt.preventDefault());
  });

  return {
    setup: setupWindow
  };
})();
