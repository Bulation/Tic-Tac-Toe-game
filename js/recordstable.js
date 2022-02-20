import Component from "./component.js";

export default class RecordsTable extends Component {
  constructor(parent, tagName, className, content, tableArray) {
    super(parent, tagName, className, content);
    this.thead = new Component(this.node, 'thead', '', '');
    new Component(this.thead.node, 'th', '', '№');
    new Component(this.thead.node, 'th', '', 'Winner');
    new Component(this.thead.node, 'th', '', 'Count of moves');
    new Component(this.thead.node, 'th', '', 'Table size');
    let tbody = new Component(this.node, 'tbody', '', '');
    for (let i = 0; i < tableArray.length; i++) {
      let tr = new Component(tbody.node, 'tr', '', '');
      new Component(tr.node, 'td', '', `${i+1}`);
      new Component(tr.node, 'td', '', `${tableArray[i].winnerName}`);
      new Component(tr.node, 'td', '', `${tableArray[i].moves}`);
      new Component(tr.node, 'td', '', `${tableArray[i].size}`);
    }
    this.closeBtn = new Component(this.node, 'div', 'records-close', '');
    this.closeBtn.node.onclick = () => this.onClose();
  }
}