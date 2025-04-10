const gameBoard = (function() {
    const board = [["","",""],["","",""],["","",""]];
    const col = 3;
    const row = 3;

    const clear = () =>{
        board = [["","",""],["","",""],["","",""]];
    }

    const printBoard = () => {
        board.forEach(function(row) {
            console.log(row);
          });
    }

    const checkWin = (sign) =>{
        //1.check row
        //2.check col
        //3.check cross
        return checkRow(sign) || checkCol(sign)||checkDiag(sign);
    }

    const placeMark = (r,c,sign) =>{
        if(board[r][c]===""){
            board[r][c] = sign;
        }
    }

    const checkRow = (sign)=>{
        let res = false;
        for(let i=0;i<row;i++){
            let count = 0;
            for(let j=0; j<col; j++){
                if(board[i][j]===sign){
                    count++;
                }
            }
            if(count==col){
                res = true;
                break;
            }
        }
        return res;
    }

    const checkCol = (sign) =>{
        let res = false;
        for(let i=0;i<col;i++){
            let count = 0;
            for(let j=0; j<row; j++){
                if(board[j][i]===sign){
                    count++;
                }
            }
            if(count==row){
                res = true;
                break;
            }
        }
        return res;
    }

    const checkDiag = (sign) =>{
        let res = false;

        let left2right = 0;
        let right2left = 0
        for(let i=0;i<col;i++){
            if(board[i][i]===sign){
                left2right++;
            }
            if(board[i][col-1-i]===sign){
                right2left++;
            }
        }
        res = left2right==col || right2left==col;
        return res;
    }



    return {board,clear, placeMark, checkWin,printBoard};
})();


//factory function for player obj
function player(name,mark){
    
    const point = 0;

    const getPoint= ()=>{
        return point;
    }

    const addPoint = ()=>{
        point++;
    }

    const getMark = () =>{
        return mark;
    }

    const reset = () =>{
        point = 0;
    }

    const askInput = () => {
        console.log("its player" + name);
        let r = prompt("Enter row");
        let c = prompt("Enter col")
        console.log("Row-"+r+" Col-"+c);
        return [parseInt(r), parseInt(c)];
    }

    return {name,mark,getPoint, addPoint,reset,askInput,getMark};
}

const Game = (function() {
    const board = gameBoard;
    const players = [player('1','X') ,player('2','O')];
    let turn = 0;

    const changeTurn = () =>{
        turn = (turn+1)%players.length;
    }

    const play = () => {
        let winner;
        let isEnd = false;
        //show board before input
        

        while(! isEnd){
            gameBoard.printBoard();
            let currP = players[turn];
            let [currR, currC] = currP.askInput();
            gameBoard.placeMark(currR, currC, currP.mark);
            //console()
            if(board.checkWin(currP.getMark())){
                winner = turn;
                isEnd=true;
                gameBoard.printBoard();
            }else{
                changeTurn();
            }
        }
        console.log("winner is " + winner);
    }

    
    return {play};
})();

Game.play();