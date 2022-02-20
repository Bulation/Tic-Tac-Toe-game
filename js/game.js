export default class Game {
    constructor(size, player) {
      this.currentPlayer = player;
      this.rows = size;
      this.initGameField();
      this.turns = 0;
    }

    setSize(value) {
      this.rows = value;
    }

    setPlayer(value) {
      this.currentPlayer = value;
    }

    initGameField() {
      this.gameField = [];
      for (let i = 0; i < this.rows; i++) {
        this.gameField.push([]);
        for (let j = 0; j < this.rows; j++) {
          this.gameField[i].push(null);
        }
      }
    }

    getCurrentPlayerSymbol() {
        return this.currentPlayer;
    }

    nextTurn(rowIndex, columnIndex) {
        if (this.gameField[rowIndex][columnIndex]) {
            return;
        }
        this.gameField[rowIndex][columnIndex] = this.currentPlayer;
        if (this.currentPlayer == 'x') {
            this.currentPlayer = 'o';
        }
        else {
            this.currentPlayer = 'x';
        }
        this.setTurnCount();
    }

    setTurnCount() {
      this.turns++;
    }

    getTurnCount() {
      return this.turns;
    }

    isFinished() {
        if (this.getWinner() || this.isDraw() || this.noMoreTurns()) {
            return true;
        }
        return false;
    }

    getWinner() {
        let xMainDiagonal = 0;
        let oMainDiagonal = 0;
        let xAsideDiagonal = 0;
        let oAsideDiagonal = 0;
        for (let i = 0; i < this.gameField.length; i++) {
            let x = 0;
            let o = 0;
            if (this.gameField[i].every(player => player == "x") || this.gameField[i].every(player => player == "o")) {
                return this.gameField[i][0];
            }
            for (let j = 0; j < this.gameField[i].length; j++) {
                if (this.gameField[j][i] == 'x') {
                    x++;
                }
                if (this.gameField[j][i] == "o") {
                    o++;
                }
                if (i == j && this.gameField[j][i] == 'x') {
                    xMainDiagonal++;
                }
                if (i == j && this.gameField[j][i] == "o") {
                    oMainDiagonal++;
                }
                if (i + j == this.rows - 1 && this.gameField[i][j] == "x") {
                    xAsideDiagonal++;
                }
                if (i + j == this.rows - 1 && this.gameField[i][j] == "o") {
                    oAsideDiagonal++;
                }
            }
            if (x == this.rows) {
                return "x";
            }
            if (o == this.rows) {
                return "o";
            }
        }
        if (xMainDiagonal == this.rows || xAsideDiagonal == this.rows) {
            return 'x';
        }
        if (oMainDiagonal == this.rows || oAsideDiagonal == this.rows) {
            return 'o';
        }
        return null;
    }

    noMoreTurns() {
        for (let arr of this.gameField) {
            if (arr.includes(null)) {
                return false;
            }
        }
        return true;
    }

    isDraw() {
        if (this.noMoreTurns() && this.getWinner() == null) {
            return true;
        }
        return false;
    }

    getFieldValue(rowIndex, colIndex) {
      return this.gameField[rowIndex][colIndex];
    }
}