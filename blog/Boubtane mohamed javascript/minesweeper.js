const ROWS = 9;
const COLUMNS = 9;
const MINES = 10;
const GRID = [];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function initModel(rows, columns, mines) {
    for (x = 0; x < columns; x++){
        GRID[x] = [];
        for (y = 0; y < rows; y++){
            GRID[x][y] = false;
        }
    }

    let putMines = 0;

    while (putMines < mines) {
        x = getRandomInt(columns);
        y = getRandomInt(rows);

        if (GRID[x][y] === false) {
            GRID[x][y] = true;

            putMines++;
        }
    }
}

/*
function displayGrid() {
    // ms-box
    const box = document.querySelector("#ms-box");
    // ms-grid
    const grid = document.createElement('div');
    grid.id = 'ms-grid';
    //grille
    const table = document.createElement('table');

    let row, cell;
    for (let y = 0; y < GRID[0].length; y++) {
        row = document.createElement('tr');
        for (let x = 0; x < GRID.length; x++) {
            cell = document.createElement('td');
            // X if there is a mine
            if (GRID[x][y]) {
                cell.innerText = 'X';
            }
            row.appendChild(cell);
        }
        table.append(row);
    }
    grid.appendChild(table);
    box.appendChild(grid);
}
*/

function displayGridJquery(){
    const myElement = $('#ms-box');
    let gridDiv = $(document.createElement('div'));
    gridDiv.attr('id','ms-grid');
    let myTable = $(document.createElement('table'));
    myTable.attr('id', 'ms-table');
    for (let j = 0; j < GRID[0].length; j++) {
        let myRow = $(document.createElement('tr'));
        for (let i = 0; i < GRID.length; i++) {
            let myCell = $(document.createElement('td'));
            if (GRID[i][j]) {
                myCell.text('X');
            }
            else {
                myCell.text(getNumber(i,j));
            }
            myCell.addClass('cell');
            myRow.append(myCell);
            myCell.click(function(e){
                reveal(e.target);
            });
        }
        myTable.append(myRow);
    }
    gridDiv.append(myTable);
    myElement.append(gridDiv);
}

function getNumber(x,y) {
    let mines = 0;
    mines += (y > 0 && GRID[x][y - 1] ? 1 : 0); // Nord
    // console.log(mines);
    mines += (y < GRID[x].length - 1 && GRID[x][y + 1] ? 1 : 0); // Sud
    // console.log(mines);
    if (x > 0) {
        mines += (GRID[x - 1][y] ? 1 : 0); // Ouest
        // console.log(mines);
        mines += (y > 0 && GRID[x - 1][y - 1] ? 1 : 0); // Nord-ouest
        // console.log(mines);
        mines += (y < GRID[x].length - 1 && GRID[x - 1][y + 1] ? 1 : 0); // Sud-ouest
        // console.log(mines);
    }
    if (x < GRID.length - 1) {
        mines += (GRID[x + 1][y] ? 1 : 0); // Est
        // console.log(mines);
        mines += (y > 0 && GRID[x + 1][y - 1] ? 1 : 0); // Nord-est
        // console.log(mines);
        mines += (y < GRID[x].length - 1 && GRID[x + 1][y + 1] ? 1 : 0); // Sud-est
        // console.log(mines);
    }
    return mines;
}

function getPosition(cell) {
    return {
        x : $(cell).index(),
        y : $(cell).parent().index()
    }
}

function reveal(cell) {
    let x = getPosition(cell).x;
    let y = getPosition(cell).y;
    if (!$(cell).hasClass('revealed')){
        $(cell).addClass('revealed');
        let n = getNumber(x,y);
        if(n != 0){
            $(cell).text(n);
        }
        else {
            for(let i = Math.max(x-1,0); i < Math.min(x+2,COLUMNS); i++) {
                for(let j = Math.max(y-1,0); j < Math.min(y+2,ROWS); j++) {
                    let cellule = cellSelect(i,j);
                    if (i != x || j != y) {
                        reveal(cellule);
                    }
                }
            }
        }
    }
}

function cellSelect(i,j){
    return $('#ms-table tr').eq(j).children().eq(i);
}
// fonction endGame je parcour mon tableau est quand il trouve une mines je lui assigne une classe
function endGame() {
  for (let j = 0; j < GRID[0].length; j++) {
    for (let i = 0; i < GRID.length; i++) {
        if (GRID[i][j]) {
          let cell = cellSelect(i,j);
          cell.addClass('mined');
        }
  }
}
}

$(function startGame() {
    initModel(ROWS, COLUMNS, MINES);
    displayGridJquery();
    //console.log(getNumber(1, 1));
}
);
