
const game = {
    init: function (){
        game.initGame.createGame();
        game.play();
    },

    play: function () {
        this.click.initStepWith();
    },
  
    initGame: {
        createBoard: function () {
            this.setHtmlWithPlayers()
            // debugger;
            let gameField = document.querySelector('.chess-board');
            for (let rowNumber = 0; rowNumber < 8; rowNumber++) {
                this.createRow(gameField, rowNumber);
                let row = document.querySelector(`[data-row-container="${rowNumber}"]`);
                for (let colNumber = 0; colNumber < 8; colNumber++) {
                    this.createCol(row, colNumber);
                }

            }
        },


        setHtmlWithPlayers: function () {
            const playerOne = document.getElementById('player-1').value;
            const playerTwo = document.getElementById('player-2').value;
            let page = document.querySelector('.replace');
            sessionStorage.setItem('player', 'playerOne');
            page.innerHTML = '<h1 class="head">The chess game</h1>\n' +
                '\n' +
                '    <div>\n' +
                `        <h3 class="player-name">${playerOne}</h3>\n` +
                '    </div>\n' +
                '\n' +
                '    <div class="chess-board"></div>\n' +
                '\n' +
                '    <div>\n' +
                `        <h3 class="player-name">${playerTwo}</h3>\n` +
                '    </div>'
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

        placingFigures: function () {

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

            function iteratingRows(row, figures, playerColor) {
                for (let [number, col] of row.entries()) {
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

        coloringBoard: function () {
            const board = document.querySelectorAll('div.chess-board .row');
            for (let [rowIndex, row] of board.entries()) {
                let [evenField, oddField] = (rowIndex % 2 === 0) ? ['white-field', 'black-field'] : ['black-field', 'white-field'];
                row = row.querySelectorAll('.col');
                for (let [colIndex, col] of row.entries()) {
                    (colIndex % 2 === 0) ? col.classList.add(evenField) : col.classList.add(oddField);

                }
            }
        },

        newGameButton: function () {
            let navBar = document.querySelector('nav#nav');
            navBar.innerHTML = `
            <a id="new-game">New Game</a>
            `
            let newGameButton = document.querySelector('nav > a#new-game');
            newGameButton.addEventListener('click', function () {
                main();
            });
        },

        createGame: function () {
            this.newGameButton();
            this.createBoard();
            this.coloringBoard();
            this.placingFigures();
        }
    },

    click: {
        //choose a figure
        initStepWith: function () {
            let figures = game.figureValidation();
            for (let figure of figures) {
                figure.addEventListener('click', this.clickInitStepWith);
            }
        },

        clickInitStepWith: function (event) {
            game.click.removeClickInitStepTo();
            let figure = event.currentTarget;
            sessionStorage.setItem('currentFigure', figure.dataset.name);
            let clickedField = event.currentTarget.parentNode;
            game.stepValidation.getClickedDatas(figure, clickedField);

        },

        removeClickInitStepWith: function () {
            let figures = game.figureValidation();
            for (let figure of figures) {
                figure.removeEventListener('click', this.clickInitStepWith);
            }
        },

        //make the step and remove all step function etc.
        initStepTo: function () {
            let fields = document.querySelectorAll('.valid-step');
            for (let stepField of fields) {
                stepField.addEventListener('click', this.clickInitStepTo);
            }
        },

        clickInitStepTo: function (event) {
            let stepField = event.currentTarget;
            game.click.removeClickInitStepTo();
            game.click.removeClickInitStepWith();
            game.step(stepField);
            //matt lépés validátor
            //this.switchPlayer();

            console.log('JEEEEEEEE')
        },

        removeClickInitStepTo: function () {
            let fields = document.querySelectorAll('.valid-step');
            console.log(fields)
            for (let stepField of fields) {
                stepField.removeEventListener('click', this.clickInitStepTo);
                game.clearStepFields(stepField);

            }
        },

    },

    clearStepFields: function (field) {
        field.classList.remove('valid-step');
    },

    figureValidation: function () {
        let player = sessionStorage.getItem('player');
        let playerColor = (player.includes('Two')) ? 'black' : 'white';
        let figures = document.querySelectorAll(`[data-name *="${playerColor}"]`);
        return figures;
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
            game.click.initStepTo();

        },

        startValidation: function (figureData){
            let figureName = figureData.figure.dataset.name;
            (figureName.includes('king')) ?  this.royalFamily(figureData) :
            (figureName.includes('queen')) ? this.royalFamily(figureData) :
            (figureName.includes('rook')) ?  this.rook(figureData) :
            (figureName.includes('bishop')) ? this.bishop(figureData) :
            (figureName.includes('knight')) ? this.knight(figureData) :
            this.pawn(figureData);
        },

        checkAround: function (firstCoordinate, secCoordinate, rowDirection, direction, figure, enemy){
                if (secCoordinate >= 0 || secCoordinate <= 7){
                    if (checkValidDirection(secCoordinate, direction)) {
                        if (checkValidDirection(firstCoordinate, rowDirection)){
                            let nextField = document.querySelector(`[data-row="${firstCoordinate + rowDirection}"][data-col="${secCoordinate + direction}"]`);
                            if (nextField === null) return;
                            if (nextField.classList.contains('empty')) {
                                nextField.classList.add('valid-step');
                                if (figure === 'knight' || figure === 'king') return;
                                this.checkAround(firstCoordinate+rowDirection, secCoordinate + direction, rowDirection, direction, figure, enemy);
                            } else if (nextField.classList.contains(enemy)){
                                nextField.classList.add('valid-step');
                                //this.isCheck(nextField)
                            }
                        }
                    }
                }

                function checkValidDirection(coordinate, direction){
                return (!(coordinate + direction > 7 || coordinate + direction < 0))
            }
        },

        isCheck: function (field){
            return (field.dataset.name.includes('king'))
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
        let currentFigure = sessionStorage.getItem('currentFigure');
        let figure = document.querySelector(`[data-name=${currentFigure}]`);
	    let fragment = document.createDocumentFragment();
	    fragment.appendChild(figure);
	    stepField.appendChild(fragment);
    },

    switchPlayer: function () {
        // let currentPlayer = document.querySelector('.player');
        // let playerNumber = sessionStorage.getItem('player');
        // ('player-1' === playerNumber) ? playerNumber = 'player-2' : playerNumber = 'player-1';
        // currentPlayer.innerHTML = `<h3>${playerNumber}</h3>`
    },

    initPlayerNames: function () {
        let page = document.querySelector('.replace')
        page.innerHTML = '<h1 class="head">The chess game</h1>' +
            '<div class="login">\n' +
        '       <input type="text" id="player-1">' +
            '   <input type="text" id="player-2">' +
            '   <input type="button" id="player-name-button" value="submit" required minlength="3">' +
            '</div>'
        let nameSubmit = document.getElementById('player-name-button')
        nameSubmit.addEventListener('click', game.init)
    },


    nextRound: function () {
        this.play()
    }
};

const main = function () {
    game.initPlayerNames();
}

main();
