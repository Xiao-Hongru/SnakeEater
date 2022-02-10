
class Food {
  // 属性指向食物对应元素
  element: HTMLElement;

  constructor() {
    this.element = document.createElement("div");
    this.element.setAttribute("class","food");
    this.change();
    document.getElementById("stage")?.appendChild(this.element);
  }

  // 获取食物坐标
  get X() {
    return this.element.offsetLeft;
  }

  get Y() {
    return this.element.offsetTop;
  }

  //修改食物位置
  change() {
    //生成随机位置 0-290,一格10
    const left = Math.round(Math.random() * 29) * 10;
    const top = Math.round(Math.random() * 29) * 10;
    this.element.style.left = left + 'px';
    this.element.style.top = top + 'px';
  }
}

export default Food;




