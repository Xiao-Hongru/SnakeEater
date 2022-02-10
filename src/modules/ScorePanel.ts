class ScorePanel {
  score = 0;
  level = 1;
  scoreEle: HTMLElement;
  levelEle: HTMLElement;
  maxLevel: number;
  levelStep: number;

  constructor(maxLevel: number = 10, levelStep: number = 10) {
    this.maxLevel = maxLevel;
    this.levelStep = levelStep;
    this.scoreEle = document.getElementById("score")!;
    this.levelEle = document.getElementById("level")!;
  }

  addScore() {
    this.scoreEle.innerHTML = ++this.score + '';
    
    if (this.score % this.levelStep === 0 && this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + '';
    }
  }
}

export default ScorePanel;