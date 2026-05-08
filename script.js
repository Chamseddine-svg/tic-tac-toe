//winning patterns
const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
]

const player1 = Player('Alex' , 'x')
const player2 = Player('Bety' , 'O')

//RUNNERS
const gameBoard = (function(){
    const board = ['','','','','','','','','']
    
    const setPosition = function(position,move){
        board[position] = move
    } 

    const checkEmpty = function(position){
        return (board[position] === '')
    }

    const resetBoard = function(){
        for(let i = 0 ; i < board.length ; i++){
            board[i] = ''
        }
    }

    function logBoard(){  //for console playing to log the current board 
        console.log(board)
    } 

    function isFull(){
        return board.every((spot) => spot !== '')
    }

    function getMarker(spot){
        return board[spot]
    }

    return{
        setPosition,
        checkEmpty,
        resetBoard,
        logBoard,
        isFull,
        getMarker
    }
})()

class Player{
    constructor(name , marker , score = 0) {
        this.name = name
        this.marker = marker
        this.score = score
    }
}

const gameRunner = (function(){
    const {setPosition,checkEmpty,resetBoard,logBoard,isFull,getMarker} = gameBoard
    let marker = Player.marker
    let turn = 0
    
    function checkWin(marker){
        let win = false
        winPatterns.forEach((pattern) => {
            let wincombinatio = true
            pattern.forEach((positionOfPattern)=> {
                if (getMarker(positionOfPattern) != marker){
                    return wincombinatio = false
                })
            }
        )
        return win if wincombinatio
    }

    function makeMove(position){
            setPosition(position,Player.marker)
    }

    
})()


