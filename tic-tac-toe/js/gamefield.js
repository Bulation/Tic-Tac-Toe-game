import Component from "./component.js";

export default class GameField extends Component {
  constructor(parent, tagName, className, content, size) {
    super(parent, tagName, className, content)
    this.rows = [];
    this.columns = [];
    for (let i = 0; i < size; i++) {
      this.rows.push(new Component(this.node, 'div', 'row', ''));
      this.columns.push([]);
      for (let j = 0; j < size; j++) {
        this.columns[i].push(new Component(this.rows[i].node, 'div', 'column', ''));
        this.columns[i][j].node.onclick = () => {
          this.onFieldUpdate(i, j);
          this.columns[i][j].node.textContent = this.displayPlayerTurn(i, j);
        }
      }
    }
  }
}