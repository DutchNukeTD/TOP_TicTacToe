let gameboard = function(){
    let board = [[""],[""],[""],
                [""],[""],[""],
                [""],[""],[""]]    

    return function(){
        return board;
    };
}();

function returnGB(gameboard) {
    console.log('[' + gameboard()[0] + ']' + '[' + gameboard()[1] + ']' + '[' + gameboard()[2] + ']' );
    console.log('[' + gameboard()[3] + ']' + '[' + gameboard()[4] + ']' + '[' + gameboard()[5] + ']' );
    console.log('[' + gameboard()[6] + ']' + '[' + gameboard()[7] + ']' + '[' + gameboard()[8] + ']' );
    // return gameboard;
};

// Create player object
const Player = {
    
    score: 0,
    
    sayName: function() {
        console.log(this.name);
    },
    sayValue: function() {
        console.log(this.value);
    },
    sayScore: function() {
        this.score = this.score + 1;
        console.log(this.name + 'has ' + this.score + ' points!');
    },
    
};

// Player1 = 'X'
let playerOne = Object.create(Player);
playerOne.name = 'PlayerOne';
playerOne.value = 'X';

// Player2 = 'O'
let playerTwo = Object.create(Player);
playerTwo.name = 'PlayerTwo';
playerTwo.value = 'O';


// Who's move is it? 
let player = {
    value: 'O',

    getValue: function(){
        if (this.value == 'O'){
            this.value = 'X';
        } else {
            this.value = 'O';
        }
        return this.value;
    }, 

    getMove: function(){
        let move = prompt('Where do you place your mark?');
        if (move === null){
            return;
        } else {
            return move;
        }
    }
};

function addMove( playerValue, playerMove ) {
    gameboard()[playerMove] = playerValue;
    return gameboard;
}

// should be --> addMove( player.getValue(), player.getMove() );

// Check for a draw
function checkForDraw(gameboard){
    gameOptions = 0;
    for (let i = 0; i < gameboard().length; i++) {
        if(gameboard()[i] == ""){
            // it's a match = empty
            // do nothing
        } else {
            gameOptions = gameOptions +1;
        }
    };
    if (gameOptions == gameboard().length){
        console.log("it's a draw, game over!");
        game.end();
    }
};

// All game solutions
verticalOne = [gameboard[0], gameboard[1], gameboard[2]];
verticalTwo = [gameboard[3], gameboard[4], gameboard[5]];
verticalThree = [gameboard[6], gameboard[7], gameboard[8]];

horizontallOne = [gameboard[0], gameboard[3], gameboard[6]];
horizontalTwo = [gameboard[1], gameboard[4], gameboard[7]];
horizontalThree = [gameboard[2], gameboard[5], gameboard[8]];

diagonalOne = [gameboard[0], gameboard[4], gameboard[8]];
diagonalTwo = [gameboard[2], gameboard[4], gameboard[6]];

// Array with each solution. 
solutions = [ verticalOne, verticalTwo, verticalThree, horizontallOne, horizontalTwo, horizontalThree, diagonalOne, diagonalTwo ];


// Loop thru solutions to check if the game has been won. 
function checkSolutions(){
    for (let option = 0; option < solutions.length; option++){
        countX = 0;
        countO = 0;
        for (let i = 0; i < solutions[option].length; i++){
            if (solutions[option][i] == 'x') {
                countX = countX +1; 
            } else if (solutions[option][i] == 'o') {
                countO = countO +1; 
            }
        }
        if (countX == 3){
            console.log('X has won!');
            game.end();
        } else if (countO == 3) {
            console.log('O has won!');
            game.end();
        }
    }
};
// checkSolutions();

// let startGame = true;  --> niet nodig?
const game = {
    start: function(){
        return startGame = true;
    }, 
    end: function(){
        return startGame = false;
    }
}


function GameControl() {
    // start Game
    // while true game keeps running
    // let startGame = function(){
    //     return true;
    // }

    game.start();

    while(startGame == true){
        // create gameboard
        returnGB(gameboard);
        getPlayerInput(player);
        // addMove(gameboard, move, player)
        // checkSolutions();
        // checkForDraw(gameboard);

    }
};

// GameControl();
