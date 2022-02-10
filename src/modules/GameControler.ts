import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from './Snake';

class GameControler {
  foods: Array<Food>;
  snake: Snake;
  scorePanel: ScorePanel;
  direction = '';
  isLive = true;

  constructor(foodNum: number = 2) {
    this.snake = new Snake();
    this.scorePanel = new ScorePanel(10, 5);
    this.foods = [];
    for (let i = 0; i < foodNum; i++) {
      this.foods.push(new Food());
    }

    this.init();
  }

  init() {
    document.addEventListener('keydown', this.keyDownHandler.bind(this));
    this.run();
  }

  keyDownHandler(e: KeyboardEvent) {
    this.direction = e.key;
  }

  run() {
    let X = this.snake.X;
    let Y = this.snake.Y;

    switch (this.direction) {
      case 'ArrowUp' || 'Up':
        Y -= 10;
        break;
      case 'ArrowDown' || 'Down':
        Y += 10;
        break;
      case 'ArrowLeft' || 'Left':
        X -= 10;
        break;
      case 'ArrowRight' || 'Right':
        X += 10;
        break;
    }
    this.direction = '';

    this.checkEat(X, Y);

    try {
      if (this.snake.X !== X) {
        this.snake.X = X;
      } else if (this.snake.Y !== Y) {
        this.snake.Y = Y;
      }
    } catch (e: any) {
      alert(e.message);
      this.isLive = false;
      location.reload();
    }

    this.isLive && setTimeout(() => this.run(), 110 - this.scorePanel.level * 10);
  }

  checkEat(X: number, Y: number) {
    for (let i = 0; i < this.foods.length; i++) {
      if (X === this.foods[i].X && Y === this.foods[i].Y) {
        this.scorePanel.addScore();
        this.foods[i].change();
        this.snake.addBody();

        const maxScore = 1 + this.scorePanel.maxLevel * this.scorePanel.levelStep;
        this.scorePanel.score >= maxScore && alert('SUCCESS!');
      }
    }
  }
}

export default GameControler;