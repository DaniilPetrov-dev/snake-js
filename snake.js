var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
// Размер одной клеточки на поле — 16 пикселей.
var grid = 16;
var speed = 0; //Переменная, отвечающая за скорость змейки, поменять название
var snake = {
  // Начальные координаты.
  x: 160,
  y: 160,
  // Скорость змейки — в каждом новом кадре змейка смещается по оси Х или У. На старте будет двигаться горизонтально, поэтому скорость по игреку равна нулю.
  dx: grid,
  dy: 0,
  // Тащим за собой хвост, который пока пустой.
  cells: [],
  // Стартовая длина змейки — 4 клеточки
  maxCells: 4
};
var apple = {
  x: 320,
  y: 320
};
var count = 0;
var startButton = document.getElementById('start');

function startScreen() {
	// Показываем стартовый экран, при нажатии на кнопку старт, убираем кнопку, запускаем игровой цикл
	document.addEventListener("click", function(e) {
			if(e.target.id === 'start') {
				console.log('Start session');
				startButton.remove();
				requestAnimationFrame(loop);
			}
	  });
}

// Игровой цикл — основной процесс, внутри которого будет всё происходить.
function loop() {
	// Замедлим скорость игры с 60 кадров в секунду до 15. Для этого пропутим три кадра, отрисовывая только каждый четветрый.
	requestAnimationFrame(loop);
	// Игровой код выполнится только один раз из четырёх, в этом и суть замедления кадров, а пока переменная speed меньше четырёх, код выполняться не будет.
	if (++speed < 4) {
	  return;
	}


	// В блоке ниже очищается игровое поле, обнуляется скорость и змейка двигается с нужной скоростью
	// Обнуляем переменную скорости.
	speed = 0;
	context.clearRect(0, 0, canvas.width, canvas.height);
	snake.x += snake.dx;
	snake.y += snake.dy;


	// В блоке ниже реализуется продолжение движения змейки, когда она достигает края поля, с противоположной стороны.
	//Проверка по горизонтали и по вериткали.
	if (snake.x < 0) {
	  snake.x = canvas.width - grid;
	}
	else if (snake.x >= canvas.width) {
	  snake.x = 0;
	}
	
	if (snake.y < 0) {
	  snake.y = canvas.height - grid;
	}
	else if (snake.y >= canvas.height) {
	  snake.y = 0;
	}


	// Голова змейки должна быть спереди, поэтому добавляем ее координаты в начало массива. Соответственно, последний элемент удаляем из массива, чтобы змейка двигалась, а не растягивалась.
	snake.cells.unshift({ x: snake.x, y: snake.y });
	if (snake.cells.length > snake.maxCells) {
	  snake.cells.pop();
	}


	context.fillStyle = 'red';
	context.fillRect(apple.x, apple.y, grid - 1, grid - 1);


	context.fillStyle = 'green';
	snake.cells.forEach(function (cell, index) {
	  // Делаем зелёные квадратики меньше на один пиксель, чтобы вокруг них образовалась чёрная граница.
	  context.fillRect(cell.x, cell.y, grid - 1, grid - 1);


	  // Проверка ниже увеличивает длинну змейки, если она добралась до яблока, генерирует новое яблоко.
	  if (cell.x === apple.x && cell.y === apple.y) {
		snake.maxCells++;
		apple.x = getRandomInt(0, 25) * grid;
		apple.y = getRandomInt(0, 25) * grid;
	  }


	  //Цикл ниже перебирает клетки змейки и проверяет их координаты. Если есть совпадение - змейка съела себя и игра начинается заново.
	  for (var i = index + 1; i < snake.cells.length; i++) {
		if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
		  snake.x = 160;
		  snake.y = 160;
		  snake.cells = [];
		  snake.maxCells = 4;
		  snake.dx = grid;
		  snake.dy = 0;
		  apple.x = getRandomInt(0, 25) * grid;
		  apple.y = getRandomInt(0, 25) * grid;
		}
	  }
	});

  }


  // Ниже реализуется движение змейки по нажатиям стрелочек. В первой проверке, контролируем повороты змейки: если она движется горизонтали, то может повернуть только по вертикали и наоборот. 
document.addEventListener('keydown', function (e) {
	if (e.which === 37 && snake.dx === 0) {
	  snake.dx = -grid;
	  snake.dy = 0;
	}
	// Стрелка вверх.
	else if (e.which === 38 && snake.dy === 0) {
	  snake.dy = -grid;
	  snake.dx = 0;
	}
	// Стрелка вправо.
	else if (e.which === 39 && snake.dx === 0) {
	  snake.dx = grid;
	  snake.dy = 0;
	}
	// Стрелка вниз.
	else if (e.which === 40 && snake.dy === 0) {
	  snake.dy = grid;
	  snake.dx = 0;
	}
  });

function dieLoop() {
	
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}


startScreen();