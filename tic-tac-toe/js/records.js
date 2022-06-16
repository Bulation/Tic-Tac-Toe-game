export default class Records {
  constructor() {
    this.lastTenGames = JSON.parse(localStorage.getItem('lastGames')) || [];
    this.lastTenGames = Array.from(this.lastTenGames).slice(-10);
  }

  setGame(game) {
    this.lastTenGames.push(game);
    localStorage.setItem('lastGames', JSON.stringify(this.lastTenGames));
  }

  getGames() {
    return this.lastTenGames.slice(-10);
  }
}