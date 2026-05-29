//board controller
const gameBoard = (function(){

    const board = ['','','','','','','','','']
    
    function reset(){
        board.forEach((e,i)=> board[i] = '') 
    }

    function setMarker(marker,position){
        board[position] = marker
    }

    function getMarker(position){
        return board[position]
    }

    function getBoard(){
        return board
    }

    return{
        reset,
        setMarker,
        getMarker,
        getBoard,
    }
})()

//player creator
function Player(name,marker,score = 0){
    this.name = name
    this.marker = marker
    this.score = score
}

Player.prototype.changeName = function(name){
    this.name = name
}

//game runner
const winningCombination = [
    [0,1,2], // top row
    [3,4,5], // middle row
    [6,7,8], // bottom row
    [0,3,6], // left column
    [1,4,7], // middle column
    [2,5,8], // right column
    [0,4,8], // diagonal top-left to bottom-right
    [2,4,6]  // diagonal top-right to bottom-left
]

function gameRunner(player1,player2){
    let round = 0 //round is a singe player move so game have 9 rounds as the tictac grid so max round is 8
    const {reset,setMarker,getMarker} = gameBoard

    function checkValidMove(position){ //check if slot is free then return true
        return getMarker(position) === '' 
    }

    function checkWin(){
        const marker = previousPlayer().marker

        // Check if ANY combination is a winner
        return winningCombination.some((combination) => {
             // Check if ALL elements in this combination match the marker
            return combination.every((position) => {
                return getMarker(position) === marker
        })
    })
        }

    function checkDraw(){
        return ((round === 9) && !checkWin())
    }

    function currentPlayer(){
        return round%2 === 0 ? player1 : player2 
    }

    function previousPlayer(){
    return round % 2 === 0 ? player2 : player1
    }

    function addRound(){
      round++
        }

    function makeMove(position){
        if (!checkValidMove(position)) return false

        setMarker(currentPlayer().marker , position)
        addRound()
            return true
    }

    function printBoard(){
        console.log(gameBoard.getBoard())
    }

    function reset(){
        gameBoard.reset()
        round = 0
    }

    function playGame(position){
        if(!makeMove(position)){
            console.log('Invalid move try again')
            return
        }
        if(checkWin()){
            console.log(`Game over, ${previousPlayer().name} is winner`)
            return
        }
        if(checkDraw()){
            console.log(`Game over it's a draw`)
            return
        }
        printBoard()
    }

    function debug(){
        console.log({
            board: gameBoard.getBoard(),
            round
    })
}   
    return{
        playGame,
        reset,
        debug,
    }
}

const uiController =  (function(){
    //Elements:
    const cells = document.querySelector('[data-testid]')
    
})()
////////////////////
const player2 = new Player('Bibi' , 'O')
const player1 = new Player('Alex' , 'X')
let game = gameRunner(player1,player2)

