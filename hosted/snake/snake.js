const gameBoard = document.getElementById('game-board');
const boardWidth = 20;
const boardHeight = 20;
const totalCells = boardWidth * boardHeight;
let snake = [{ x: 10, y: 10 }];
let direction = 'RIGHT';
let food = null;
let gameInterval;
let score = 0;

// Create the game grid
function createGameBoard() {
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    gameBoard.appendChild(cell);
  }
  placeFood();
  updateBoard();
}

// Get the cell by position (x, y)
function getCell(x, y) {
  return gameBoard.children[y * boardWidth + x];
}

// Update the game board to reflect the snake and food
function updateBoard() {
  // Clear the board
  Array.from(gameBoard.children).forEach(cell => {
    cell.textContent = '蛇';
    cell.classList.remove('snake', 'food');
  });

  // Render the snake
  snake.forEach(segment => {
    const cell = getCell(segment.x, segment.y);
    cell.classList.add('snake');
  });

  // Render the food
  const foodCell = getCell(food.x, food.y);
  foodCell.classList.add('food');
}

// Move the snake
function moveSnake() {
  const head = { ...snake[0] };

  if (direction === 'UP') head.y--;
  if (direction === 'DOWN') head.y++;
  if (direction === 'LEFT') head.x--;
  if (direction === 'RIGHT') head.x++;

  // Check if the snake hits the wall
  if (head.x < 0 || head.x >= boardWidth || head.y < 0 || head.y >= boardHeight) {
    endGame();
    return;
  }

  // Check if the snake hits itself
  if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    endGame();
    return;
  }

  // Add new head to snake
  snake.unshift(head);

  // Check if the snake eats food
  if (head.x === food.x && head.y === food.y) {
    score++;
    placeFood();
  } else {
    snake.pop(); // Remove the last segment
  }

  updateBoard();
}

// Place food at a random location
function placeFood() {
  const x = Math.floor(Math.random() * boardWidth);
  const y = Math.floor(Math.random() * boardHeight);
  food = { x, y };
}

// Handle keyboard input for controlling the snake
function handleKeyPress(event) {
  if (event.key === 'ArrowUp' && direction !== 'DOWN') {
    direction = 'UP';
  } else if (event.key === 'ArrowDown' && direction !== 'UP') {
    direction = 'DOWN';
  } else if (event.key === 'ArrowLeft' && direction !== 'RIGHT') {
    direction = 'LEFT';
  } else if (event.key === 'ArrowRight' && direction !== 'LEFT') {
    direction = 'RIGHT';
  }
}

// End the game
function endGame() {
  clearInterval(gameInterval);
  alert('輸了！拿到了' + score + '分');
}

// Start the game
function startGame() {
  snake = [{ x: 10, y: 10 }];
  direction = 'RIGHT';
  score = 0;
  placeFood();
  updateBoard();
  gameInterval = setInterval(moveSnake, 200); // Game speed
}

// Initialize the game
createGameBoard();
startGame();
document.addEventListener('keydown', handleKeyPress);
