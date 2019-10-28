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

  var renderWaitBlock = function () {
    var waitBlock = setupWindow.querySelector('.wait-block');
    if (!waitBlock) {
      waitBlock = document.createElement('div');
      waitBlock.classList.add('wait-block');
      waitBlock.style = 'padding: 20px; text-align: center;';
      waitBlock.style.color = 'white';
      waitBlock.textContent = 'Минуточку, маги готовятся...';
      setupWindow.querySelector('.setup-footer').insertAdjacentElement('afterbegin', waitBlock);
    }
  };

  var openSetupWindowHandler = function () {
    setupWindow.classList.remove('hidden');
    var wizard = setupWindow.querySelector('.setup-similar-item');
    if (!wizard) {
      renderWaitBlock();
    }
    var setupWindowPosition = new window.Coordinate(setupWindow.offsetLeft, setupWindow.offsetTop);

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
    var startCoords = new window.Coordinate(evt.clientX, evt.clientY);
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = new window.Coordinate(startCoords.x - moveEvt.clientX, startCoords.y - moveEvt.clientY);
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

  setupWizardForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(setupWizardForm), window.popup.onSuccess, window.popup.onError);
    setupWindow.classList.add('hidden');
    evt.preventDefault();
  });

  return {
    setup: setupWindow,
    setupForm: setupWizardForm
  };
})();
