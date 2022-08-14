import Component from "./component.js";
import Game from "./game.js";
import Settings from "./settings.js";
import StartPage from "./startpage.js";
import GameField from "./gamefield.js";
import Popup from "./popup.js";
import SettingsModel from "./settingsmodel.js";
import Records from "./records.js";
import RecordsTable from "./recordstable.js";

export default class Controller {
  constructor(node) {
    this.node = node;
    this.settingsModel = new SettingsModel();
    this.size = this.settingsModel.settings.select;
    if (this.settingsModel.settings.playerX) {
      this.player = 'x'
    } else {
      this.player = 'o'
    }
    this.records = new Records();
    this.main = new Component(this.node, 'main', '', '');
    this.footer = new Component(this.node, 'footer', 'footer', '');
    this.footerContainer = new Component(this.footer.node, 'div', 'footer-container', '');
    this.github = new Component(this.footerContainer.node, 'a', 'footer-item footer__github', 'Bulation');
    this.github.node.href = 'https://github.com/Bulation';
    this.year = new Component(this.footerContainer.node, 'time', 'footer-item footer__year', '2022');
    this.title = new Component(this.main.node, 'h1', '', 'Tic-Tac Toe');
    this.mainCycle();
  }

  mainCycle() {
    const startPage = new StartPage(this.main.node, 'div', 'start-page');
    startPage.onStart = () => {
      startPage.destroy();
      this.gameCycle();
    }
    startPage.onSettings = () => {
      startPage.destroy();
      const settingsWrapper = new Component(this.node, 'div', 'popup-wrapper', '');
      const settings = new Settings(settingsWrapper.node, 'div', 'settings-container', '', this.settingsModel.getData());
      settings.onSave = () => {
        this.size = settings.select.node.value;
        if (settings.playerO.node.checked) {
          this.player = settings.playerO.node.value;
        } else {
          this.player = settings.playerX.node.value;
        }
        this.settingsModel.setData({ 'select': settings.select.node.value, 'playerX': settings.playerX.node.checked, 'playerO': settings.playerO.node.checked});
        settingsWrapper.destroy();
        settings.destroy();
        this.mainCycle();
      }
      settings.onClose = () => {
        settingsWrapper.destroy();
        settings.destroy();
        this.mainCycle();
      }
    }
    startPage.onRecords = () => {
      startPage.destroy();
      const recordsTableWrapper = new Component(this.node, 'div', 'popup-wrapper', '');
      const recordsTable = new RecordsTable(recordsTableWrapper.node, 'table', 'records-container', '', this.records.getGames());
      recordsTable.onClose = () => {
        recordsTableWrapper.destroy();
        recordsTable.destroy();
        this.mainCycle();
      }
    }
  }

  gameCycle() {
    const game = new Game(this.size, this.player)
    const field = new GameField(this.main.node, 'div', 'field', '', this.size);
    field.onFieldUpdate = (row, col) => {
      game.nextTurn(row, col);
      if (game.isFinished()) {
        const popupWrapper = new Component(this.node, 'div', 'popup-wrapper', '');
        const movesCount = game.getTurnCount();
        let popup;
        if (game.isDraw()) {
          popup = new Popup(popupWrapper.node, 'div', 'popup', '', `It's a draw!`);
          this.records.setGame({ winnerName: 'draw', moves: movesCount, size: this.size });
        }
        else {
          const winner = game.getWinner();
          popup = new Popup(popupWrapper.node, 'div', 'popup', '', `${winner} won in ${movesCount} moves`);
          this.records.setGame({ winnerName: winner, moves: movesCount, size: this.size });
        }
        popup.onReset = () => {
          field.destroy();
          popup.destroy();
          popupWrapper.destroy();
          this.gameCycle();
        }
        popup.onMenu = () => {
          field.destroy();
          popup.destroy();
          popupWrapper.destroy();
          this.mainCycle();
        }
      }
    };
    field.displayPlayerTurn = (row, col) => {
      return game.getFieldValue(row, col);
    }
  }
}