
const game = {
    init: function (){
        this.createBoard()
        this.coloringBoard()
        this.placingFigures()
    },

    play: function () {
        this.initStepWith();

    },

    createBoard: function () {
        let gameField = document.querySelector('.chess-board');
        for (let rowNumber = 0; rowNumber < 8; rowNumber++) {
            this.createRow(gameField, rowNumber);
            let row = document.querySelector(`[data-row-container="${rowNumber}"]`);
            for (let colNumber = 0; colNumber < 8; colNumber++) {
                this.createCol(row, colNumber);
            }
        }
    },

    createRow: function (gameField, rowNumber) {
        gameField.insertAdjacentHTML(
            `beforeend`,
            `<div class="row" data-row-container="${rowNumber}">${rowNumber + 1}</div>`
        );
    },

    createCol: function (row, colNumber) {
        row.insertAdjacentHTML(
            `beforeend`,
            `<div class="col empty" data-row="${row.dataset.rowContainer}" data-col="${colNumber}"></div>`
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

        let rowOfBlackFigures = document.querySelectorAll(`[data-row-container="0"] .col`);
        let rowOfBlackPawns = document.querySelectorAll(`[data-row-container="1"] .col`);
        let rowOfWhiteFigures = document.querySelectorAll(`[data-row-container="6"] .col`);
        let rowOfWhitePawns = document.querySelectorAll(`[data-row-container="7"] .col`);

        iteratingRows(rowOfBlackFigures, chessFigures, "black");
        // iteratingRows(rowOfBlackPawns, chessPawns, "black");
        // iteratingRows(rowOfWhiteFigures, chessPawns, "white");
        iteratingRows(rowOfWhitePawns, chessFigures, "white");

        function iteratingRows(row, figures, playerColor){
            for (let [number, col] of row.entries()){
                let figureName = figures[number];
                col.insertAdjacentHTML(
                    `beforeend`,
                    `<div class="figure" data-name="${playerColor}-${figureName}" data-move="0" draggable="true"></div>`
                );

                col.classList.remove('empty');
                col.classList.add(`${playerColor}-fig-on`);
            }
        }
        // let rookField = document.querySelector(`[data-row="4"][data-col="3"]`);
        // rookField.insertAdjacentHTML(
        //         `beforeend`,
        //         `<div class="figure" data-name="white-queen" data-move="0" draggable="true"></div>`
        //     );
        // rookField.classList.remove('empty');
        // rookField.classList.add(`white-fig-on`);
    },

    coloringBoard : function () {
        const board = document.querySelectorAll('div.chess-board .row');
        for (let [rowIndex, row] of board.entries()) {
            let [evenField, oddField] = (rowIndex % 2 === 0) ? ['white-field', 'black-field'] : ['black-field', 'white-field'];
            row = row.querySelectorAll('.col');
            for (let [colIndex, col] of row.entries()) {
                (colIndex % 2 === 0) ? col.classList.add(evenField) : col.classList.add(oddField);

            }
        }
    },

    initStepWith: function () {
        let figures = this.figureValidation();
        for (let figure of figures) {
            figure.addEventListener('click', this.initValidStepClick_1);
        }
    },

    initValidStepClick_1: function (event) {
        game.clearStepFields(document.querySelectorAll('.col')); // deletes the valid moves
        let figure = event.currentTarget;
        figure.setAttribute('data-clicked', 'true');
        let clickedField = event.currentTarget.parentNode;
        game.stepValidation.getClickedDatas(figure, clickedField)
    },


    removeInitStepWith_1: function () {
        let figures = this.figureValidation();
        for (let figure of figures) {
            figure.removeEventListener('click', this.initValidStepClick_1);
        }
    },

    initStepTo: function () {
        this.initRemoveValidMoveClick_2()
        this.changeFigureDiv()
        let fields = document.querySelectorAll('.valid-step');
        // console.log(fields)
        for (let stepField of fields) {
            stepField.addEventListener('click', this.initValidMoveClick_2);
        }

    },

    initValidMoveClick_2: function (event) {
        //debugger;
        let stepField = event.currentTarget;
        let fields = document.querySelectorAll('.valid-step');
        game.step(stepField);
        game.clearStepFields(fields);
        console.log('JEEEEEEEE')

        //this.switchPlayer()
        //this.nextRound()
    },

    initRemoveValidMoveClick_2: function() {
        let fields = document.querySelectorAll('.col');
        console.log(fields)
        for (let stepField of fields) {
            stepField.removeEventListener('click', this.initValidMoveClick_2);
        }
    },

    clearStepFields: function (fields) {
        for (let field of fields) field.classList.remove('valid-step');
        this.initRemoveValidMoveClick_2();
        //for (let field of fields) field.replaceWith(field.cloneNode(true));

    },

    figureValidation: function () {
        let player = document.querySelector(`[data-player]`).dataset.player;
        let playerColor = (player.includes('2')) ? 'black' : 'white';
        let figures = document.querySelectorAll(`[data-name *="${playerColor}"]`);
        return figures;
    },

    changeFigureDiv: function () {

    },

    stepValidation: {

        getClickedDatas: function (figure, clickedField) {
            const figureData = {
                fields: document.querySelectorAll('div.col'),
                range: (figure.dataset.name.includes('black')) ? 'positive' : 'negative',
                type: (figure.dataset.name.includes('black')) ? 'black' : 'white',
                enemy: (figure.classList.contains('black-fig-on')) ? 'white-fig-on' : 'black-fig-on',
                figure: figure,
                row: clickedField.dataset.row,
                col: clickedField.dataset.col,
                currentColumn: clickedField
            }
            sessionStorage.setItem('stepFromRow', clickedField.dataset.row);
            sessionStorage.setItem('stepFromCol', clickedField.dataset.col);


            this.startValidation(figureData);
            game.initStepTo();

        },

        startValidation: function (figureData){
            let figureType = figureData.figure.dataset.name;
            (figureType.includes('king')) ?  this.royalFamily(figureData) :
            (figureType.includes('queen')) ? this.royalFamily(figureData) :
            (figureType.includes('rook')) ?  this.rook(figureData) :
            (figureType.includes('bishop')) ? this.bishop(figureData) :
            (figureType.includes('knight')) ? this.knight(figureData) :
            this.pawn(figureData);
        },

        checkAround: function (firstCoordinate, secCoordinate, rowDirection, direction, figure, enemy){
            console.log(enemy)
                if (secCoordinate >= 0 || secCoordinate <= 7){
                    if (checkValidDirection(secCoordinate, direction)) {
                        if (checkValidDirection(firstCoordinate, rowDirection)){
                            let nextField = document.querySelector(`[data-row="${firstCoordinate + rowDirection}"][data-col="${secCoordinate + direction}"]`);
                            if (nextField === null) return;
                            debugger;
                            if (nextField.classList.contains('empty')) {
                                nextField.classList.add('valid-step');
                                if (figure === 'knight' || figure === 'king') return;
                                this.checkAround(firstCoordinate+rowDirection, secCoordinate + direction, rowDirection, direction);
                            } else if (nextField.classList.contains(enemy)){
                                console.log(enemy)
                            }
                        }
                    }
                }

                function checkValidDirection(coordinate, direction){
                if (coordinate + direction > 7 || coordinate + direction < 0){
                    return false;
                } else {return true}
            }
        },

        royalFamily: function (figureData) {
            let clickedCol = +figureData.col;
            let clickedRow = +figureData.row;
            let figure;
            (figureData.figure.dataset.name.includes('king')) ? figure = 'king' : figure = 'queen';
            let enemy = figureData.enemy;

            this.checkAround(clickedRow, clickedCol, 0, +1, figure, enemy);
            this.checkAround(clickedRow, clickedCol, +1, 0, figure, enemy);
            this.checkAround(clickedRow, clickedCol, -1, 0, figure, enemy);
            this.checkAround(clickedRow, clickedCol, 0, -1, figure, enemy);
            this.checkAround(clickedRow, clickedCol, +1, +1, figure, enemy);
            this.checkAround(clickedRow, clickedCol, -1, -1, figure, enemy);
            this.checkAround(clickedRow, clickedCol, -1, +1, figure, enemy);
            this.checkAround(clickedRow, clickedCol, +1, -1, figure, enemy);
        },

        rook: function (figureData) {
            let clickedCol = +figureData.col;
            let clickedRow = +figureData.row;
            let enemy = figureData.enemy;

            this.checkAround(clickedRow, clickedCol, 0, +1, 'rook', enemy);
            this.checkAround(clickedRow, clickedCol, +1, 0, 'rook', enemy);
            this.checkAround(clickedRow, clickedCol, -1, 0, 'rook', enemy);
            this.checkAround(clickedRow, clickedCol, 0, -1, 'rook', enemy);
        },

        bishop: function (figureData) {
            let clickedCol = +figureData.col;
            let clickedRow = +figureData.row;
            let figure = 'bishop';
            let enemy = figureData.enemy

            this.checkAround(clickedRow, clickedCol, +1, +1, figure, enemy);
            this.checkAround(clickedRow, clickedCol, -1, -1, figure, enemy);
            this.checkAround(clickedRow, clickedCol, -1, +1, figure, enemy);
            this.checkAround(clickedRow, clickedCol, +1, -1, figure, enemy);
        },

        knight: function (figureData) {
            let clickedCol = +figureData.col;
            let clickedRow = +figureData.row;
            let enemy = figureData.enemy;

            this.checkAround(clickedRow, clickedCol, +1, +2, 'knight', enemy)
            this.checkAround(clickedRow, clickedCol, +1, -2, 'knight', enemy)
            this.checkAround(clickedRow, clickedCol, +2, -1, 'knight', enemy)
            this.checkAround(clickedRow, clickedCol, +2, +1, 'knight', enemy)
            this.checkAround(clickedRow, clickedCol, -1, -2, 'knight', enemy)
            this.checkAround(clickedRow, clickedCol, -1, +2, 'knight', enemy)
            this.checkAround(clickedRow, clickedCol, -2, +1, 'knight', enemy)
            this.checkAround(clickedRow, clickedCol, -2, -1, 'knight', enemy)

        },

        pawn: function (figureData) {
            let validRow = document.querySelectorAll(`[data-row="${(figureData.range === 'positive') ? +figureData.row + 1 : +figureData.row - 1}"]`);
            let [figFront, figFrontLeft, figFrontRight] = [validRow[+figureData.col], validRow[+figureData.col - 1], validRow[+figureData.col + 1]];
            if (figFront.classList.contains('empty')) {
                figFront.classList.add('valid-step');
                if (+figureData.figure.dataset.move === 0) {
                    let validStep = document.querySelector(`[data-col="${figureData.col}"][data-row="${(figureData.range === 'positive') ? +figureData.row + 2 : +figureData.row - 2}"]`);
                    validStep.classList.add('valid-step');
                }
            }
            if (figFrontLeft && figFrontLeft.classList.contains(figureData.enemy)) {
                    figFrontLeft.classList.add('valid-step');
                }
            if (figFrontRight && figFrontRight.classList.contains(figureData.enemy)) {
                    figFrontRight.classList.add('valid-step');
            }
        }
    },

    step: function (stepField) {
        let figure = document.querySelector(`[data-clicked="true"]`);
        stepField.innerHTML = figure.outerHTML;
        figure.remove();
        stepField.querySelector('div').removeAttribute('data-clicked');
    },

    switchPlayer: function () {
        game.removeInitStepWith_1()
        let currentPlayer = document.querySelector('.player');
        let playerNumber = currentPlayer.dataset['player'];
        ('player-1' === playerNumber) ? playerNumber = 'player-2' : playerNumber = 'player-1';
        currentPlayer.innerHTML = `<h3>${playerNumber}</h3>`
    },

    nextRound: function () {
        this.play()
    }
};

game.init();
game.play();
