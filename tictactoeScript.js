let gameboard = function(){
    let board = [[""],[""],[""],
                [""],[""],[""],
                [""],[""],[""]]

    return function(){
        return board;
    };
}();

// Exicuted when game.end(); 
function resetGB(gameboard){
    for (let i = 0; i < gameboard().length; i++) {
        gameboard()[i] = '';
    }
    return gameboard;
};

function returnGB(gameboard) {
    console.log('[' + gameboard()[0] + ']' + '[' + gameboard()[1] + ']' + '[' + gameboard()[2] + ']' );
    console.log('[' + gameboard()[3] + ']' + '[' + gameboard()[4] + ']' + '[' + gameboard()[5] + ']' );
    console.log('[' + gameboard()[6] + ']' + '[' + gameboard()[7] + ']' + '[' + gameboard()[8] + ']' );
    return gameboard;
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
        console.log(this.value +' Where do you want to place your mark?');
        return this.value;
    }, 

    // resetValue = game always starts with player 'X' first. 
    resetValue: function(){
        return this.value = 'O';
    },

    getMove: function(){
        let move = prompt(this.value + 'Where do you place your mark?'); 
        if (move === null){
            game.end();
        } else {
            return move;
        }
    }
};

function addMove( playerValue, playerMove ) {
    // Check if gameboard spot is empty
    if (gameboard()[playerMove] == ''){
        gameboard()[playerMove] = playerValue;
        return gameboard;
    } else if (playerMove == null) {
        game.end();
    } else { // gameboard spot is already taken, ask again. 
        console.log('This spot is already taken, choose a different one!');
        addMove( playerValue, player.getMove() );
    }
};

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
        returnGB(gameboard);
        console.log("it's a draw, game over!");
        dialogText.innerHTML = "It's a draw, game over!";
        dialog.showModal();
        game.end();
    }
};

function getGB() {
    // All game solutions
    verticalOne = [gameboard()[0], gameboard()[1], gameboard()[2]];
    verticalTwo = [gameboard()[3], gameboard()[4], gameboard()[5]];
    verticalThree = [gameboard()[6], gameboard()[7], gameboard()[8]];

    horizontallOne = [gameboard()[0], gameboard()[3], gameboard()[6]];
    horizontalTwo = [gameboard()[1], gameboard()[4], gameboard()[7]];
    horizontalThree = [gameboard()[2], gameboard()[5], gameboard()[8]];

    diagonalOne = [gameboard()[0], gameboard()[4], gameboard()[8]];
    diagonalTwo = [gameboard()[2], gameboard()[4], gameboard()[6]];

    // Array with each solution. 
    solutions = [ verticalOne, verticalTwo, verticalThree, horizontallOne, horizontalTwo, horizontalThree, diagonalOne, diagonalTwo ];
    return solutions;
};


// Loop thru solutions to check if the game has been won. 
function checkSolutions(){
    getGB();
    for (let option = 0; option < solutions.length; option++){
        countX = 0;
        countO = 0;
        for (let i = 0; i < solutions[option].length; i++){
            if (solutions[option][i] == 'X') {
                countX = countX +1; 
            } else if (solutions[option][i] == 'O') {
                countO = countO +1; 
            }
        }
        if (countX == 3){
            returnGB(gameboard);
            let nameX = document.querySelector('#PlayerOne');
            if (nameX.value == '') {
                console.log('X has won!');
                dialogText.innerHTML = "X has won!";
                dialog.showModal();
            } else {
                console.log(nameX.value + ' has won!');
                dialogText.innerHTML = nameX.value+ " has won!";
                dialog.showModal();
            }
            game.end();
        } else if (countO == 3) {
            returnGB(gameboard);
            let nameO = document.querySelector('#PlayerTwo');
            if (nameO.value == '') {
                console.log('O has won!');
                dialogText.innerHTML = "O has won!";
                dialog.showModal();                
            } else {
                console.log(nameO.value + ' has won!');
                dialogText.innerHTML = nameO.value+ " has won!";
                dialog.showModal();
            }
            game.end();
        }
    }
    // console.log('Check done!'); conform that check is done. 
};

// let startGame = true;  --> niet nodig?
const game = {
    start: function(){
        return startGame = true;
    }, 
    end: function(){
        resetGB(gameboard); // reset gameboard for new game. 
        player.resetValue(); // Set first player back to 'X'
        return startGame = false;
    }
}


function GameControl() {
    game.start();

    while(startGame == true){
        // create gameboard
        returnGB(gameboard);
        // addMove( player.getValue(), player.getMove() );
        checkSolutions(gameboard);
        checkForDraw(gameboard);
    }
};

// GameControl(); // Aan vanaf het begin?


/////////////////////////////////////////////////////////
// HTML INTERACTION //
/////////////////////////////////////////////////////////

const buttons = document.querySelectorAll('.Button');
buttons.forEach((button) => {
    button.addEventListener("click", (event)=>{
        if (event.target.classList.contains('Button')) {
            playerValue = player.getValue();
            buttonNumber = button.className.split('_')[1];
            if (gameboard()[buttonNumber] == ''){
                gameboard()[buttonNumber] = playerValue;
                button.innerHTML = playerValue;
                checkSolutions(gameboard);
                checkForDraw(gameboard);
            } else { // gameboard spot is already taken, ask again. 
                player.getValue(); // keeping the same player value!
            }
        }
    })
});

const dialog = document.querySelector('.dialog');
let dialogText = document.querySelector('.dialogText');

const dialogButton = document.querySelector('.dialogButton');
dialog.addEventListener("click", (event) =>{
    resetGB(gameboard);
    buttons.forEach((button) => {
        button.innerHTML = "";
    })
    dialog.close();
});
