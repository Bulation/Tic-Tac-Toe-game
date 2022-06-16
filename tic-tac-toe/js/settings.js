import Component from "./component.js";

export default class Settings extends Component {
  constructor(parent, tagName, className, content, settings) {
    super(parent, tagName, className, content)
    this.title = new Component(this.node, 'h2', '', 'Settings');
    this.closeBtn = new Component(this.node, 'div', 'close', '');
    this.selectContainer = new Component(this.node, 'div', 'select-container', '');
    this.selectTitle = new Component(this.selectContainer.node, 'h3', 'select-title', 'Select size:');
    this.select = new Component(this.selectContainer.node, 'select', '', '');
    for (let i = 3; i <= 6; i++) {
      const option = new Component(this.select.node, 'option', '', `${i}`);
      option.node.value = i;
    }
    this.select.node.value = settings.select;
    this.playerContainer = new Component(this.node, 'div', 'player-container', '');
    this.playerTitle = new Component(this.playerContainer.node, 'h3', 'player-title', 'Choose a player:');
    this.playerXLabel = new Component(this.playerContainer.node, 'label', 'player-title', 'X');
    this.playerX = new Component(this.playerXLabel.node, 'input', 'player-x', '');
    this.playerX.node.type = 'radio';
    this.playerX.node.name = 'player';
    this.playerX.node.value = 'x';
    this.playerX.node.checked = settings.playerX;
    this.playerOLabel = new Component(this.playerContainer.node, 'label', 'player-title', 'O');
    this.playerO = new Component(this.playerOLabel.node, 'input', 'player-o', '');
    this.saveBtn = new Component(this.node, 'button', 'popup-btn btn', 'Save');
    this.playerO.node.type = 'radio';
    this.playerO.node.name = 'player';
    this.playerO.node.value = 'o';
    this.playerO.node.checked = settings.playerO;
    this.closeBtn.node.onclick = () => this.onClose();
    this.saveBtn.node.onclick = () => this.onSave();
  }
}