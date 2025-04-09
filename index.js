const gameBoard = (function() {
    const board = [["","",""],["","",""],["","",""]];
    const col = 3;
    const row = 3;

    const clear = () =>{
        board = [["","",""],["","",""],["","",""]];
    }

    const checkWin = (sign) =>{
        //1.check row
        //2.check col
        //3.check cross
        return checkRow(sign) || checkCol(sign)||checkDiag(sign);
    }

    const playMark = (r,c,sign) =>{
        if(board[r][c]===""){
            board[r][c] = sign;
        }
    }

    const checkRow = (sign)=>{
        let res = false;
        for(let i=0;i<row;i++){
            let count = 0;
            for(let j=0; i<col; j++){
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
            for(let j=0; i<row; j++){
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



    return {board}
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
    return {name,mark,getPoint, addPoint };
}