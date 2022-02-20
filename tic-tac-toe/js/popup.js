import Component from "./component.js";

export default class Popup extends Component {
  constructor(parent, tagName, className, content, msg) {
    super(parent, tagName, className, content)
    this.title = new Component(this.node, 'h2', '', `Game over!`);
    this.message = new Component(this.node, 'p', '', `${msg}`);
    this.resetBtn = new Component(this.node, 'button', 'popup-btn btn', `Play Again`);
    this.menuBtn = new Component(this.node, 'button', 'popup-btn btn', `Main Menu`);
    this.resetBtn.node.onclick = () => this.onReset();
    this.menuBtn.node.onclick = () => this.onMenu();
  }
}