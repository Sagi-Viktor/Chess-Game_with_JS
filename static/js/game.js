const game = {
    init: function (){
        this.createBoard()
        this.coloringBoard()
        this.placingFigures()
    },

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

    placingFigures: function (){

        const chessFigures = {
            0: "left-rook",
            1: "left-knight",
            2: "left-bishop",
            3: "queen",
            4: "king",
            5: "right-bishop",
            6: "right-knight",
            7: "right-rook"
        };

        const chessPawns = {
            0: "pawn-1",
            1: "pawn-2",
            2: "pawn-3",
            3: "pawn-4",
            4: "pawn-5",
            5: "pawn-6",
            6: "pawn-7",
            7: "pawn-8"
        };

        let rowOfBlackFigures = document.querySelectorAll(`[data-row="0"] .col`);
        let rowOfBlackPawns = document.querySelectorAll(`[data-row="1"] .col`);
        let rowOfWhiteFigures = document.querySelectorAll(`[data-row="6"] .col`);
        let rowOfWhitePawns = document.querySelectorAll(`[data-row="7"] .col`);

        iteratingRows(rowOfBlackFigures, chessFigures, "black");
        iteratingRows(rowOfBlackPawns, chessPawns, "black");
        iteratingRows(rowOfWhiteFigures, chessPawns, "white");
        iteratingRows(rowOfWhitePawns, chessFigures, "white");

        function iteratingRows(row, figures, playerColor){
            for (let [number, col] of row.entries()){
                let figureName = figures[number];
                col.insertAdjacentHTML(
                    `beforeend`,
                    `<div class="figure" data-name="${playerColor}-${figureName}" draggable="true"></div>`
            );
        }
        }

    },

    coloringBoard : function () {
        const board = document.querySelectorAll('div.chess-board .row');
        for (let [rowIndex, row] of board.entries()) {
            let [evenField, oddField] = (rowIndex % 2 === 0) ? ['white', 'black'] : ['black', 'white'];
            row = row.querySelectorAll('.col');
            for (let [colIndex, col] of row.entries()) {
                (colIndex % 2 === 0) ? col.classList.add(evenField) : col.classList.add(oddField);

            }

        }
    }
}

game.init();


