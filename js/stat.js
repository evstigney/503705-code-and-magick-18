'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var TEXT_INDENT_X = 160;
  var TEXT_INDENT_Y = 15;
  var FONT_SIZE = 16;
  var LINE_HEIGHT = FONT_SIZE + 5;
  var HISTOGRAM_POSITION_Y = 100;
  var HISTOGRAM_MAX_HEIGHT = 150;
  var HISTOGRAM_WIDTH = 40;
  var HISTOGRAM_GAP = 50;

  var renderWinMessage = function (ctx, line, startY) {
    var positionY = TEXT_INDENT_Y + FONT_SIZE + startY;
    ctx.fillStyle = 'black';
    ctx.font = 'FONT_SIZE PT Mono';
    ctx.fillText(line, TEXT_INDENT_X, positionY);
  };

  var renderWinRect = function (ctx, positionX, positionY, color) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(positionX + 10, positionY + 10, CLOUD_WIDTH, CLOUD_HEIGHT);
    ctx.fillStyle = color;
    ctx.fillRect(positionX, positionY, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var renderHistogram = function (ctx, name, coeff, color, height, time) {
    var histogramX = TEXT_INDENT_X + coeff * (HISTOGRAM_WIDTH + HISTOGRAM_GAP);
    var histogramY = HISTOGRAM_POSITION_Y + HISTOGRAM_MAX_HEIGHT - height;
    var histogramTextY = HISTOGRAM_POSITION_Y + HISTOGRAM_MAX_HEIGHT + LINE_HEIGHT;
    var histogramTimeY = HISTOGRAM_POSITION_Y + HISTOGRAM_MAX_HEIGHT - height - FONT_SIZE;
    ctx.fillStyle = 'black';
    ctx.fillText(name, histogramX, histogramTextY);
    ctx.fillText(time, histogramX, histogramTimeY);

    ctx.fillStyle = color;
    ctx.fillRect(histogramX, histogramY, HISTOGRAM_WIDTH, height);
  };

  var getColorSaturate = function (hue) {
    var saturate = window.util.getRandomNumber(1, 100);
    var color = 'hsl(' + hue + ', ' + saturate + '%, 50%)';
    return color;
  };

  window.renderStatistics = function (ctx, names, times) {
    var color = 'yellow';
    var maxTime = Math.floor(window.util.getMaxValueArr(times));
    var currentHeight = 0;
    var currentTime = 0;

    renderWinRect(ctx, CLOUD_X, CLOUD_Y, 'white');
    renderWinMessage(ctx, 'Ура вы победили!', 0);
    renderWinMessage(ctx, 'Список результатов:', LINE_HEIGHT);

    for (var i = 0; i < names.length; i++) {
      color = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : getColorSaturate(240);
      currentHeight = times[i] * HISTOGRAM_MAX_HEIGHT / maxTime;
      currentHeight = Math.round(currentHeight);
      currentTime = Math.floor(times[i]);
      renderHistogram(ctx, names[i], i, color, currentHeight, currentTime);
    }
  };
})();
