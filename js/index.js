const statusDisplay = document.querySelector('.game--status');
const gameContainer = document.querySelector('.game--container');

let currentPlayer = "X";
let X = [];
let O = [];
let ALL = [];
let lengthParams = 0;
let winningConditions = [];

function handleCellSize() {
    var v = document.getElementById("select").value;
    var z = parseInt(v) * parseInt(v)
    var x = "";

    lengthParams = parseInt(v)

    for (let i = 0; i < parseInt(z); i++) {
        x = x + '<div id='+i+' data-cell-index="' + i + '" class="cell" onclick="handleCellClick('+i+')"></div>'
    }

    let win = []

    // HORIZONTAL
    for (var i = 0; i < parseInt(v); i++) {
        win.push([]);
        for (var j = 0; j < parseInt(v); j++) {
            win[i][j] = parseInt(v) * i + j;
        }
    }

   
    winningConditions = win
    gameContainer.style.gridTemplateColumns = "repeat(" + v + ", auto)"
    gameContainer.innerHTML = x

}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}


function handleCellClick(index) {

    const clickedCellIndex = index;
    console.log('params', lengthParams);
    console.log('X PARAMS', X)
    console.log('O PARAMS', O)

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if(currentPlayer === "X") {
        X.push(index)
        ALL.push(index)
    }else{
        O.push(index)
        ALL.push(index)
    }

    document.getElementById(index).innerHTML = currentPlayer;

    if(ALL.length === (lengthParams*lengthParams)){
        alert("DRAW");
        document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
        X = []
        O = []
        ALL = []
        return;
    }


    if(X.length === lengthParams){
        const xsort = X.slice().sort();
        for(let i = 0; i<winningConditions.length; i++){
         
            if(JSON.stringify(winningConditions[i]) === JSON.stringify(xsort)){
                alert("X WIN")
                document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
                X = []
                O = []
                ALL = []
                return;
            }
        }
        X = []
        

    }else if(O.length === lengthParams){
        const osort = O.slice().sort();
        for(let i = 0; i<winningConditions.length; i++){
          
            if(JSON.stringify(winningConditions[i]) === JSON.stringify(osort)){
                alert("O WIN")
                document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
                X = []
                O = []
                ALL = []
                return;
            }
        }
        O = []

    }

}

