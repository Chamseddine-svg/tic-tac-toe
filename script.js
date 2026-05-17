//board controller
const gameBoard = (function(){

    const board = ['','','','','','','','','']
    
    function reset(){
        board.forEach((e)=>board[e] = '') 
    }

    function setMarker(marker,position){
        board[position] = marker
    }

    function getMarker(position){
        return board[position]
    }


    return{
        reset,
        setMarker,
        getMarker,
    }
})()

//player creator
function Player(name,marker,score = 0){
    this.name = name
    this.marker = marker
    this.score = score

    this.changeName = function(name){
        this.name = name
    }
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
    let round = 0 //round is a singe player move so game have 9 rounds as the tictac grid 
    const {reset,setMarker,getMarker} = gameBoard

    function checkValidMove(position){ //check if slot is free then return true
        return getMarker(position) === ''
    }

    function checkWin(){
    const marker = currentPlayer().marker
    
    // Check if ANY combination is a winner
    return winningCombination.some((combination) => {
        // Check if ALL elements in this combination match the marker
        return combination.every((position) => {
            return getMarker(position) === marker
        })
    })
}

    function currentPlayer(){
        return round%2 === 0 ? player1 : player2 
    }

    function addRound(){
        round++
    }

    function makeMove(position){
        let validGame = true
        if (currentPlayer() === player1){
            log(`Player1`)
            checkValidMove(position) ? (setMarker(player1.marker , position)) : validGame = false ;
        } else {
            log(`player2`)
            checkValidMove(position) ? (setMarker(player2.marker , position)) : validGame = false ;
        }
        if (validGame){addRound()}
        return validGame
    }




   

}


////////////////////
const player2 = new Player('Bibi' , 'O')
const player1 = new Player('Alex' , 'X')