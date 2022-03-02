;(function () {
  'use strict'

  const get = (target) => document.querySelector(target);

  const $canvas = get('.canvas');
  const ctx = $canvas.getContext('2d'); // canvas Context 선언
  const $score = get('.score');
  const $highscore = get('.high-score');
  const $play = get('.js-play');

  // 게임 요소 색상 지정
  const colorSet = {
    board: 'rgb(20, 105, 38)',
    snakeHead: 'rgba(229, 65, 120, 0.929)',
    snakeBody: 'rgba(153, 206, 244, 0.498)',
    food: 'rgb(66, 187, 103)',
  }

  

})()
