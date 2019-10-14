'use strict';
window.dialog = (function () {
  var setupWindow = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupOpenIcon = setupOpen.querySelector('.setup-open-icon');
  var setupClose = setupWindow.querySelector('.setup-close');
  var setupUserName = setupWindow.querySelector('.setup-user-name');
  var setupButtonSubmit = setupWindow.querySelector('.button .setup-submit');
  var setupWizardForm = setupWindow.querySelector('.setup-wizard-form');
  var dialogHandle = setupWindow.querySelector('.upload');
  var isOpenForFirstTime = true;
  var setupWindowStartPosition = {};

  var openSetupWindowHandler = function () {
    setupWindow.classList.remove('hidden');
    var setupWindowPosition = {
      x: setupWindow.offsetLeft,
      y: setupWindow.offsetTop
    };
    if (isOpenForFirstTime) {
      setupWindowStartPosition = window.util.cloneObj(setupWindowPosition);
    } else {
      setupWindow.style.left = setupWindowStartPosition.x + 'px';
      setupWindow.style.top = setupWindowStartPosition.y + 'px';
    }
  };

  var closeSetupWindowHandler = function () {
    setupWindow.classList.add('hidden');
    isOpenForFirstTime = false;
  };

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var dragged = false;
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      setupWindow.style.top = (setupWindow.offsetTop - shift.y) + 'px';
      setupWindow.style.left = (setupWindow.offsetLeft - shift.x) + 'px';
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (dragged) {
        var onClickPreventDefault = function (dragEvt) {
          dragEvt.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

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
    setup: setupWindow,
    setupForm: setupWizardForm
  };
})();
