'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var TEXT_INDENT_X = 130;
var TEXT_INDENT_Y = 30;
var FONT_SIZE = 16;
var LINE_HEIGHT = FONT_SIZE + 10;
var HISTOGRAM_POSITION_Y = 90;
var HISTOGRAM_MAX_HEIGHT = 150;
var HISTOGRAM_WIDTH = 40;
var HISTOGRAM_GAP = 50;

var getRandomNumber = function (minNumber, maxNumber) {
  var min = Math.ceil(minNumber);
  var max = Math.floor(maxNumber);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getMaxValueArr = function (arr) {
  var maxValue = arr[0];
  for (var i = 1; i < arr.length - 1; i++) {
    arr[i] = arr[i];
    if (maxValue < arr[i]) {
      maxValue = arr[i];
    }
  }
  return maxValue;
};

var renderWinMessage = function (ctx, line, startY) {
  var positionY = TEXT_INDENT_Y + FONT_SIZE + startY;
  ctx.fillStyle = 'black';
  ctx.font = 'FONT_SIZE PT Mono';
  ctx.fillText(line, TEXT_INDENT_X, positionY);
};

var renderWinRect = function (ctx) {
  ctx.fillStyle = 'white';
  ctx.fillRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderWinCloud = function (ctx, color) {

};

var renderHistogram = function (ctx, name, coeff, color, height) {
  var histogramX = TEXT_INDENT_X + coeff * (HISTOGRAM_WIDTH + HISTOGRAM_GAP);
  var histogramY = HISTOGRAM_POSITION_Y + HISTOGRAM_MAX_HEIGHT - height;
  var histogramTextY = HISTOGRAM_POSITION_Y + HISTOGRAM_MAX_HEIGHT + LINE_HEIGHT;
  ctx.fillStyle = 'black';
  ctx.fillText(name, histogramX, histogramTextY);

  ctx.fillStyle = color;
  ctx.fillRect(histogramX, histogramY, HISTOGRAM_WIDTH, height);
};

var getColorSaturate = function (hue) {
  var saturate = getRandomNumber(1, 100);
  var color = 'hsl(' + hue + ', ' + saturate + '%, 50%)';
  return color;
};

window.renderStatistics = function (ctx, names, times) {
  var color = 'yellow';
  var maxTime = Math.floor(getMaxValueArr(times));
  var currentHeight = 0;

  renderWinRect(ctx);
  renderWinMessage(ctx, 'Ура вы победили!', 0);
  renderWinMessage(ctx, 'Список результатов:', LINE_HEIGHT);

  for (var i = 0; i <= names.length - 1; i++) {
    color = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : getColorSaturate(240);
    currentHeight = times[i] * HISTOGRAM_MAX_HEIGHT / maxTime;
    currentHeight = Math.round(currentHeight);
    renderHistogram(ctx, names[i], i, color, currentHeight);
  }
};
