class Snake {
  container: HTMLElement;
  head: HTMLElement;
  body: HTMLCollection;

  constructor() {
    this.container = document.getElementById("snake")!;
    this.head = document.querySelector("#snake>div")!;
    this.body = this.container.getElementsByTagName("div");
  }

  get X(): number {
    return this.head.offsetLeft;
  }
  get Y(): number {
    return this.head.offsetTop;
  }

  set X(value: number) {
    this.setPosition(value, 'X');
  }

  set Y(value: number) {
    this.setPosition(value, 'Y');
  }

  setPosition(value: number, direction: string) {
    if (value > 290 || value < 0) {
      throw new Error('GAME OVER!');
    }

    if (this.body[1]) {
      if (direction === 'X' && value === (this.body[1] as HTMLElement).offsetLeft) {
        if (value < this.head.offsetLeft) {
          value = this.head.offsetLeft + 10;
        } else {
          value = this.head.offsetLeft - 10;
        }
      }

      if (direction === 'Y' && value === (this.body[1] as HTMLElement).offsetTop) {
        if (value < this.head.offsetTop) {
          value = this.head.offsetTop + 10;
        } else {
          value = this.head.offsetTop - 10;
        }
      }
    }

    this.moveBody();

    // move head
    if (direction === 'X') {
      this.head.style.left = value + 'px';
    } else if (direction === 'Y') {
      this.head.style.top = value + 'px';
    }

    // head touch body
    for (let i = this.body.length - 1; i > 0; i--) {
      const bd = this.body[i] as HTMLElement;
      if (bd.offsetLeft === this.head.offsetLeft && bd.offsetTop === this.head.offsetTop) {
        throw new Error('GAME OVER!');
      }
    }

  }

  addBody() {
    this.container.appendChild(document.createElement("div"))
  }

  moveBody() {
    for (let i = this.body.length - 1; i > 0; i--) {
      let top = (this.body[i - 1] as HTMLElement).offsetTop;
      let left = (this.body[i - 1] as HTMLElement).offsetLeft;
      (this.body[i] as HTMLElement).style.top = top + 'px';
      (this.body[i] as HTMLElement).style.left = left + 'px';
    }
    // console.log(this.body);
  }

}


export default Snake;