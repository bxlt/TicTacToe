const boardHtml = document.getElementById("board");

const gameBoard = (function() {
    const board = [["","",""],["","",""],["","",""]];
    const htmlRow = boardHtml.children;
    const colNum = 3;
    const rowNum = 3;

    const clear = () =>{
        for(const row of board){
            for(let i=0;i<colNum;i++){
                row[i] = "";
            }
        }
        
        for (const row of htmlRow) {
            for(const col of row.children){
                col.textContent = "";
                col.style.pointerEvents = 'auto';
            }    
        }
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
        console.log(r,c,sign);
        let currNode = htmlRow[r].children[c];
        //console.log(currNode);
        if(!currNode.textContent){
            currNode.textContent = sign;
            currNode.style.pointerEvents = 'none';
            board[r][c] = sign;
        }

    }

    const checkRow = (sign)=>{
        let res = false;
        for(let i=0;i<rowNum;i++){
            let count = 0;
            for(let j=0; j<colNum; j++){
                if(board[i][j]===sign){
                    count++;
                }
            }
            if(count==colNum){
                res = true;
                break;
            }
        }
        return res;
    }

    const checkCol = (sign) =>{
        let res = false;
        for(let i=0;i<colNum;i++){
            let count = 0;
            for(let j=0; j<rowNum; j++){
                if(board[j][i]===sign){
                    count++;
                }
            }
            if(count==rowNum){
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
        for(let i=0;i<colNum;i++){
            if(board[i][i]===sign){
                left2right++;
            }
            if(board[i][colNum-1-i]===sign){
                right2left++;
            }
        }
        res = left2right==colNum || right2left==colNum;
        return res;
    }

    const endGame = () =>{
        for (const r of htmlRow){
            for(const c of r.children){
                c.style.pointerEvents = 'none';
            }
        }
    }



    return {board,colNum, rowNum, clear, placeMark, checkWin,endGame};
})();


//factory function for player obj
function player(name,mark){
    
    let point = 0;

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
    const htmlRow = boardHtml.childNodes;
    let count =0;

    const changeTurn = () =>{
        turn = (turn+1)%players.length;
    }

    const restart = ()=>{
        turn = 0;
        count=0;
        board.clear();
        players.forEach((p) =>p.reset());
    }

    const getMark = () =>{
        return players[turn].mark;
    }

    const endGame = () =>{
        board.endGame();
    }


    const setGame = () =>{
        htmlRow.forEach((row) =>{
            const cols = row.childNodes;
            cols.forEach((col) =>{
                
                col.addEventListener('click',function(){
                    if(this.textContent!=="") return;

                    let id = parseInt(this.getAttribute('id').split("-")[1]);
                    console.log(id)
                    let currR = Math.floor(id/gameBoard.rowNum);
                    let currC = id%gameBoard.colNum;
                    board.placeMark(currR,currC, players[turn].mark);
                    count++;
                    console.log(count);
                    if(count===9){
                        console.log('Tie');
                        endGame();
                        return;
                    }

                    if(!board.checkWin(players[turn].mark)){
                        changeTurn();
                    }else {
                        console.log("winner is " + turn);
                        endGame();
                        return;
                    }
                })
            })
        });
    }

    const play = () => {
        let isEnd = false;
        //show board before input
        setGame();

       /*
        while(! isEnd){
            //gameBoard.printBoard();
            let currP = players[turn];
            
            //gameBoard.placeMark(currR, currC, currP.mark);
            //console()
            if(board.checkWin(currP.getMark())){
                
                isEnd=true;
                gameBoard.printBoard();
                console.log("winner is " + turn);
            }else if(count==9){
                isEnd = true;
                console.log("Tie")
            }
        }*/
        
    }

    
    return {play,restart};
})();

const restartBtn = document.getElementById("restart");
restartBtn.addEventListener('click', function(e){
    Game.restart();
    Game.play();
});


Game.play();

