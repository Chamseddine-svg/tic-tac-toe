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
    let round = 0
    const {setMarker,getMarker} = gameBoard

    function checkValidMove(position){
        return getMarker(position) === '' 
    }

    function checkWin(){
        const marker = previousPlayer().marker
        return winningCombination.some((combination) => {
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
            return false
        }
        if(checkWin()){
            console.log(`Game over, ${previousPlayer().name} is winner`)
            return false
        }
        if(checkDraw()){
            console.log(`Game over it's a draw`)
            return false
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
        checkDraw,
        checkWin,
        currentPlayer,
        checkValidMove,
    }
}

////////////////////
const player2 = new Player('Bibi' , 'O')
const player1 = new Player('Alex' , 'X')
let game = gameRunner(player1,player2)

const uiController = (function(game , gameBoard){
    //Elements:
    const cells = document.querySelectorAll('[data-index]')
    const statusElement = document.querySelector('[data-testid="status"]')
    const resetButton = document.querySelector('[data-testid="reset-button"]')
    const playerXNameInput = document.querySelector('[data-testid="input-player-x"]')
    const playerONameInput = document.querySelector('[data-testid="input-player-o"]')
    const playerXElement = document.querySelector('[data-testid="player-x"]')
    const playerOElement = document.querySelector('[data-testid="player-o"]')
    //imports:
    const {getMarker,getBoard} = gameBoard
    const {checkValidMove ,checkDraw , checkWin , currentPlayer , playGame} = game

    function renderBoard(){
        const board = getBoard()
        cells.forEach((cell,index) =>{
            cell.textContent = board[index]
        })
    }

    function renderGameState(){
        if(checkWin()) {statusElement.textContent = "Game Over We Have a winner"}
        else if(checkDraw()){statusElement.textContent = "Game Over It's a Draw"}
        else {statusElement.textContent = "Game Running"}
    }

    function highlightActivePlayerCase(){
        const playersElements = [playerOElement,playerXElement]
        playersElements.forEach(playerElement =>{
            playerElement.setAttribute('class' , 'player')
        })
        if(currentPlayer().marker === 'X'){
            playerXElement.setAttribute('class' , 'player active')
        }else{
            playerOElement.setAttribute('class' , 'player active')
        }
    }

    function getPLayerMoves(){
        cells.forEach((cell , index) =>{
            cell.addEventListener('click' , ()=>{
                playGame(Number(cell.getAttribute('data-index')))
                renderBoard()
                renderGameState()
                highlightActivePlayerCase()
            })
        })
    }

    return{
        getPLayerMoves,
    }
})(game , gameBoard)

uiController.getPLayerMoves()