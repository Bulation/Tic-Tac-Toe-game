export default class SettingsModel {
  constructor() { 
    this.settings = JSON.parse(localStorage.getItem('settings')) || { select: 3, playerX: true, playerO: false};
  }
  setData(settings) {
    this.settings = settings;
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }
  getData() {
    return this.settings;
  }
}