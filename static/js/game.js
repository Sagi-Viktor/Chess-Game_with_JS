
const game = {

    createBoard: function () {
        let gameField = document.querySelector('.chess-board');
        for (let rowNumber=0; rowNumber<8; rowNumber++) {
            this.createRow(gameField, rowNumber);
            let row = document.querySelector(`[data-row="${rowNumber}"]`);
            for (let colNumber=0; colNumber<8; colNumber++) {
                this.createCol(row, colNumber);
            }
        }
    },
    createRow: function (gameField, rowNumber) {
        gameField.insertAdjacentHTML(
            `beforeend`,
            `<div class="row" data-row="${rowNumber}">${rowNumber}</div>`
        );
    },
    createCol: function (row, colNumber) {
        row.insertAdjacentHTML(
            `beforeend`,
            `<div class="col" data-col="${colNumber}">${colNumber}</div>`
        );
    },
}

game.createBoard()