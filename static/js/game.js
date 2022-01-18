
const game = {

    init: function () {
        this.createBoard();
    },
    play: function () {
        this.initStepWith();
        this.initStepTo();
    },
    createBoard: function () {
        let gameField = document.querySelector('.chess-board');
        for (let rowNumber = 0; rowNumber < 8; rowNumber++) {
            this.createRow(gameField, rowNumber);
            let row = document.querySelector(`[data-row="${rowNumber}"]`);
            for (let colNumber = 0; colNumber < 8; colNumber++) {
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
    initStepWith: function () {
        let fields = document.querySelectorAll('.col');
        for (let field of fields) {
            if ("field.figure in figureValidation()") {
                field.addEventListener('click')
            }
        }
    },
    initStepTo: function () {
        let fields = document.querySelectorAll('.col');
        for (let field of fields) {
            if (field in this.stepValidation()) {
                field.addEventListener('click', function (event) {
                    this.switchPlayer()
                //
                    this.nextRound()
                });
            }
        }
    },
    stepValidation: function () {
        return "valid fields";
    },
    figureValidation: function () {
        return "players all figure coordinates";
    },
    switchPlayer: function () {
        let currentPlayer = document.querySelector('.player');
        let playerNumber = currentPlayer.dataset['player'];
        ('player-1' === playerNumber) ? playerNumber = 'player-2' : playerNumber = 'player-1';
        currentPlayer.innerHTML = `<h3>${playerNumber}</h3>`
    },
    nextRound: function () {
        game.play()
    }
}

game.init();
game.play();