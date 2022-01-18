
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
            `<div class="row" data-row="${rowNumber}">${rowNumber + 1}</div>`
        );
    },
    createCol: function (row, colNumber) {
        row.insertAdjacentHTML(
            `beforeend`,
            `<div class="col" data-col="${colNumber}"></div>`
        );
    },














































    coloringBoard : function () {
        const board = document.querySelectorAll('div.chess-board .row');
        console.log(board)
        for (let [rowIndex, row] of board.entries()) {
            let [evenField, oddField] = (rowIndex % 2 === 0) ? ['white', 'black'] : ['black', 'white'];
            row = row.querySelectorAll('.col');
            for (let [colIndex, col] of row.entries()) {
                (colIndex % 2 === 0) ? col.classList.add(evenField) : col.classList.add(oddField);

            }

        }
    }
}

game.createBoard()
game.coloringBoard()