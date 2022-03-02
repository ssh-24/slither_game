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

  let start = 0;
  let option = {
    highscore: localStorage.getItem('score') || 0,
    gameEnd: true, // 종료 여부
    direction: 2, // 시작방향(오른쪽), 시계방향으로 1 2 3 4
    // 초기 머리 1 몸통 2 로 시작, position과 direction 지정
    snake: [
      { x: 10, y: 10, direction: 2 },
      { x: 10, y: 20, direction: 2 },
      { x: 10, y: 30, direction: 2 },
    ],
    food: { x: 0, y: 0 },
    score: 0,
  }


  // init 안에 Event들을 모아놓고 사용, Node들이 Load 완료 시에 동작하도록.
  const init = () => {
    // document.addEventListener('keydown', (e) => {
    //   // 방향키 아닐 시 종료
    //   if (!/Arrow/gi.test(e.key)) {
    //     return;
    //   }
    //   // 기본동작 제거
    //   e.preventDefault()
    //   const direction = getDirection(e.key)
    //   if (!isDirectionCorrect(direction)) {
    //     return;
    //   }
    //   option.direction = direction;
    // })
  }


  const buildBoard = () => {
    ctx.fillStyle = colorSet.board // 지정된 board 색 받아옴
    ctx.fillRect = (0,0,300,300) // 사각형 그리기
  }

  const buildSnake = (ctx,x,y,head = false) => {
    // head 면 snakeHead 색, 아니면 snakeBody 색
    ctx.fillStyle = head ? colorSet.snakeHead : colorSet.snakeBody
    
  }

  init()
})()
