export default class Component {
  constructor(parent, tagName, className, content) {
    this.node = document.createElement(tagName);
    this.node.className = className;
    this.node.textContent = content;
    parent.append(this.node);
  }

  destroy() {
    this.node.remove();
  }
}