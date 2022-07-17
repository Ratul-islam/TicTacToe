//targeting Html elements
const box = document.getElementsByClassName('box');
const board = document.querySelector('.board');
const gameEndAction = document.querySelector(".winNotification")
const gameEndTxt = document.querySelector(".winMassage");
var x_class = 'x';
var o_class = 'o';
var x_turn;
// var gameWon = false;
var winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
var restart = document.querySelector('.RestartBtn');







// use array forEach method to loop through every boxes and trigger click events
// Since we only need to click a box once, I added a condition that will only allow to register only one click for each box
gameStart()

restart.addEventListener('click', ()=> {
    gameStart()
})

function gameStart(){
    
    Array.from(box).forEach(items => {
        items.classList.remove('x')
        items.classList.remove('o')
    });
    Array.from(box).forEach(items => {
        items.addEventListener('click', clickHandler ,{ once: true })
    });
    gameEndAction.style.display = 'none';
}
//this is a function to check which cell has been clicked and change turn and call other functions


function clickHandler(a){
    //this variable defines which box hs been clicked
    const targetedBox = a.target;
    // this variable contains a ternary operator. it is saying if x_turn == true, then activeClass = x_class. otherwise activeClass = o_class 
    const activeClass = x_turn ? x_class : o_class;
    // Calling a function to change turns for classes only. this function has been defined bellow
    // this functions parameter are targetedBox and activeClass, to use these local constants outside in another function 
    changeTurnsForClasses(targetedBox, activeClass);

    if(checkWin(activeClass)){
        gameState(false);
    }else if(ifDraw()){
        gameState(true)
    }else{
    changeTurnsforPlayer()
    hoverState()
    }
}

function gameState(draw) {
    if(draw == true) {
        gameEndAction.style.display = 'block';
        gameEndTxt.innerHTML = "Draw!";
    }else {
        gameEndAction.style.display = 'block';
        
        gameEndTxt.innerHTML = `${x_turn ? "X" : "O"} wins`;
    }
}

// function to change classes
function changeTurnsForClasses(targetedBox, activeClass){
    targetedBox.classList.add(activeClass)
}
// function to change player turns
function changeTurnsforPlayer(){
    x_turn = !x_turn
}
// function to check if any of the winning combinations are of the same class 
function checkWin(activeClass){
    return winningCombinations.some(combination => {
        return combination.every(index  => {
            return box[index].classList.contains(activeClass);
    })   
})
};
// function to display preview
function hoverState() {
    if(x_turn){
        board.classList.add(x_class);
        board.classList.add(x_class);
        board.classList.remove(o_class);
    }else{
        board.classList.add(o_class);
        board.classList.remove(x_class);
        board.classList.add(o_class);
    }
 }


 function ifDraw(){
    let a = Array.from(box);
    return [...a].every(items => {
       return items.classList.contains(x_class) || items.classList.contains(o_class)
    });
 }
