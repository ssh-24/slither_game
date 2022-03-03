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
    snakeHead: 'rgba(255, 235, 138, 0.929)',
    snakeBody: 'rgba(244, 225, 153, 0.63)',
    food: 'rgba(194, 97, 97, 1)',
  }

  let start = 0; // animationFrame 사용하기 위한 변수
  let option = {
    highScore: localStorage.getItem('score') || 0,
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

  $play.onclick = () => {
    if (option.gameEnd) {
      option = {
        highScore: localStorage.getItem('score') || 0,
        gameEnd: false,
        direction: 2,
        snake: [
          { x: 10, y: 10, direction: 2 },
          { x: 10, y: 20, direction: 2 },
          { x: 10, y: 30, direction: 2 },
        ],
        food: { x: 0, y: 0 },
        score: 0,
      }
      $score.innerHTML = `점수 : 0점`
      $highscore.innerHTML = `최고점수 : ${option.highScore}점`
      // 랜덤 Food 생성
      // randomFood();
      // play 함수로 AnimationFrame 호출
      window.requestAnimationFrame(play)
    }
  }

  const buildBoard = () => {
    ctx.fillStyle = colorSet.board // 지정된 board 색 받아옴
    ctx.fillRect(0, 0, 300, 300) // 사각형 그리기(색상 채우면서)
  }


  // snake 생성
  const buildSnake = (ctx, x, y, head = false) => {
    // head 면 snakeHead 색, 아니면 snakeBody 색
    ctx.fillStyle = head ? colorSet.snakeHead : colorSet.snakeBody
    ctx.fillRect(x, y, 10, 10)
  }


  // food 생성
  const buildFood = (ctx, x, y) => {
    ctx.beginPath()
    ctx.fillStyle = colorSet.food
    ctx.arc(x + 5, y + 5, 5, 0, 2 * Math.PI) // 원 그리기, 꼭짓점 고려해서 +5 처리
    ctx.fill() // 색상 채우기
  }


  const setSnake = () => {
    for (let i = option.snake.length - 1; i >= 0; --i) {
      buildSnake(ctx, option.snake[i].x, option.snake[i].y, i === 0)
    }
  }


  const play = (timestamp) => {
    start++
    if (option.gameEnd) {
      return;
    }

    if (timestamp - start > 1000 / 10) {
      buildBoard()
      buildFood(ctx, option.food.x, option.food.y)
      setSnake()
      start = timestamp
    }
    window.requestAnimationFrame(play) // 재귀적 호출

    // if (isGameOver()) {
    //   option.gameEnd = true
    //   setHighScore()
    //   alert('게임오버!')
    //   return;
    // }
  }

  init()
})()
