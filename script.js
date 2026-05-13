//board controller
const gameBoard = (function(){

    const board = ['','','','','','','','','']
    
    function reset(){
        board.forEach((e)=>board[board.indexOf(e)] = '') 
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
function gameRunner(player1,player2){
    let round = 0 //round is a singe player move so game have 9 rounds as the tictac grid 
    const {reset,setMarker,getMarker} = gameBoard

    function checkValidMove(position){ //check if slot is free then return true
        return getMarker(position) === ''
    }

    function currenPlayer(){
        return round%2 === 0 ? player1 : player2 
    }

    function addRound(){
        round++
    }

    function makeMove(position){
        let validGame = true
        if (currenPlayer() === player1){
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