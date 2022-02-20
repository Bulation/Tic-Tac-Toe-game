import Component from "./component.js";

export default class StartPage extends Component {
  constructor(parent, tagName, className, content) {
    super(parent, tagName, className, content);
    this.startBtn = new Component(this.node, 'button', 'btn', 'Play');
    this.startBtn.node.onclick = () => this.onStart();
    this.settingsBtn = new Component(this.node, 'button', 'btn', 'Settings');
    this.settingsBtn.node.onclick = () => this.onSettings();
    this.recordsBtn = new Component(this.node, 'button', 'btn', 'Last 10 Games');
    this.recordsBtn.node.onclick = () => this.onRecords();
  }

  destroy() {
    this.node.remove();
  }
}