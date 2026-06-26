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
            return true
        }
        if(checkDraw()){
            console.log(`Game over it's a draw`)
            return true
        }
        printBoard()
        return true
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
        previousPlayer,
    }
}

////////////////////
const player1 = new Player('player 1' , 'X')
const player2 = new Player('player 2' , 'O')
let game = gameRunner(player1,player2)
////////////////////
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
    const {getMarker , getBoard , reset} = gameBoard
    const {reset : resetGameRunner , checkValidMove , checkDraw , checkWin , previousPlayer, currentPlayer , playGame} = game

    function renderBoard(){
        const board = getBoard()
        cells.forEach((cell,index) =>{
            cell.textContent = board[index]
        })
    }

    function renderGameState(){
        if(checkWin()) {statusElement.textContent = `Game Over ${previousPlayer().name} is Winner`}
        else if(checkDraw()){statusElement.textContent = "Game Over It's a Draw"}
        else {statusElement.textContent = "Game Running"}
    }

    function highlightActivePlayerCase(){
        const playersElements = [playerOElement,playerXElement]
        playersElements.forEach(playerElement =>{
            playerElement.setAttribute('class' , 'player')
        })
        
        //Check Draw and don't highlight any player
        if(checkDraw()){ return }
        
        //Check Win and highlight winner player
        //NB:winner is previous player since we are counting turns so even after a win the turn will add up and the active player will be next player even if games stops
        if(checkWin()){
            const winner = previousPlayer()
            if(winner.marker === 'X'){
                playerXElement.setAttribute('class' , 'player active')
            }else{
                playerOElement.setAttribute('class' , 'player active')
            }
            return
        }

        //Check active player while game running (not win and not draw)
        if(currentPlayer().marker === 'X'){
            playerXElement.setAttribute('class' , 'player active')
        }else{
            playerOElement.setAttribute('class' , 'player active')
        }
    }

    function makePlayerMoves(){
        cells.forEach((cell , index) =>{
            cell.addEventListener('click' , ()=>{
                if (checkDraw() || checkWin()){
                    renderGameState()
                    renderBoard()
                    return
                }
                const play = playGame(Number(cell.getAttribute('data-index')))
                if (play){
                    renderBoard()
                    renderGameState()
                    highlightActivePlayerCase()
                }
            })
        })
    }

    function changePlayerName(){
        nameFields = [playerXNameInput , playerONameInput]
        players = [player1 , player2]
        nameFields.forEach((field , index) =>{
            field.addEventListener('change' , ()=>{
                const name = field.value.trim()
                if (name){
                    players[index].changeName(name)
                }
            })
        })
    }

    function uiResetButton(){
        resetButton.addEventListener('click' , ()=> {
            reset()
            resetGameRunner()
            renderBoard()
            highlightActivePlayerCase()
        })
    }
    return{
        makePlayerMoves,
        changePlayerName,
        uiResetButton,
    }
})(game , gameBoard)

//calling functions attached to event listeners
uiController.makePlayerMoves()
uiController.changePlayerName()
uiController.uiResetButton()
