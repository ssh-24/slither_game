;(() => {
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
    document.addEventListener('keydown', (e) => {
      // 방향키 아닐 시 종료
      if (!/Arrow/gi.test(e.key)) {
        return;
      }
      // 기본동작 제거
      e.preventDefault()
      const direction = getDirection(e.key)
      if (!isDirectionCorrect(direction)) {
        return;
      }
      option.direction = direction;
    })
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
      randomFood();
      // play 함수로 AnimationFrame 호출
      window.requestAnimationFrame(play)
    }
  }

  // Board 생성
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

  const setDirection = (number, value) => {
    while (value < 0) {
      value += number //화면을 벗어날때 더해줌
    }
    return value % number
  }

  const setBody = () => {
    const tail = option.snake[option.snake.length - 1]
    const direction = tail.direction
    let x = tail.x
    let y = tail.y
    switch (direction) {
      // down
      case 1:
        y = setDirection(300, y - 10)
        break
      // up
      case -1:
        y = setDirection(300, y + 10)
        break
      // left
      case -2:
        x = setDirection(300, x + 10)
        break
      // right
      case 2:
        x = setDirection(300, x - 10)
        break
    }
    option.snake.push({ x, y, direction }) // 객체를 추가하여 몸통 증가
  }

  // food 먹게 될 경우
  const getFood = () => {
    const snakeX = option.snake[0].x
    const snakeY = option.snake[0].y
    const foodX = option.food.x
    const foodY = option.food.y
  
    if (snakeX === foodX && snakeY === foodY) {
      option.score++
      $score.innerHTML = `점수 : ${option.score}점`
      setBody() // 몸 성장
      randomFood()
    }
  }

  const randomFood = () => {
    let x = Math.floor(Math.random() * 25) * 10
    let y = Math.floor(Math.random() * 25) * 10
    // some 메서드 활용, 배열 중 일치하는 요소 만나면 return
    // every는 모든 메서드 다 순회 <-> some 은 하나라도 만나면 return
    // 만날 때마다 Food 위치 재지정
    while (option.snake.some((part) => part.x === x && part.y === y)) {
      x = Math.floor(Math.random() * 25) * 10
      y = Math.floor(Math.random() * 25) * 10
    }
    option.food = { x, y } // 위치 할당
  }

  // 움직임 처리
  const playSnake = () => {
    let x = option.snake[0].x
    let y = option.snake[0].y
    switch (option.direction) {
      // down
      case 1:
        y = setDirection(300, y + 10)
        break
      // up
      case -1:
        y = setDirection(300, y - 10)
        break
      // left
      case -2:
        x = setDirection(300, x - 10)
        break
      // right
      case 2:
        x = setDirection(300, x + 10)
        break
    }
    const snake = [{ x, y, direction: option.direction }]
    const snakeLength = option.snake.length
    for (let i = 1; i < snakeLength; ++i) {
      snake.push({ ...option.snake[i - 1] })
    }
    option.snake = snake // 방향 바뀐 snake 할당
  }

  // 방향 구하기, 키보드 key 값에 따라 숫자 반환
  const getDirection = (key) => {
    let direction = 0;
    switch (key) {
      case 'ArrowDown':
        direction = 1
        break
      case 'ArrowUp':
        direction = -1
        break
      case 'ArrowLeft':
        direction = -2
        break
      case 'ArrowRight':
        direction = 2
        break
    }
    return direction
  }

  // 방향 일치 판별, 역방향 이동 통제 예외처리
  const isDirectionCorrect = (direction) => {
    return (
      option.direction === option.snake[0].direction &&
       option.direction !== -direction
    )
  }

  // 최고기록 설정
  const setHighScore = () => {
    const localScore = option.highScore * 1 || 0 // 형변환
    const finalScore = $score.textContent.match(/(\d+)/)[0] * 1 // 정규식 사용
    if (localScore < finalScore) {
      alert(`최고기록 달성! : ${finalScore}점`)
      localStorage.setItem('score', finalScore)
    }
  }

  // 게임오버 체크
  const isGameOver = () => {
    const head = option.snake[0]
    return option.snake.some(
      (body, index) => index !== 0 && head.x === body.x && head.y === body.y
    )
  }

  const play = (timestamp) => {
    start++
    if (option.gameEnd) {
      return;
    }
    if (timestamp - start > 1000 / 10) {
      if (isGameOver()) {
        option.gameEnd = true
        setHighScore()
        alert('게임오버!')
        return;
      }
      playSnake() // 움직임 실행
      buildBoard()
      buildFood(ctx, option.food.x, option.food.y)
      setSnake()
      getFood()
      start = timestamp
    }
    window.requestAnimationFrame(play) // 재귀적 호출
  }

  init()
})()
