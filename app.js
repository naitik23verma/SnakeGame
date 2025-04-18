//game constants

let inputdir={
    x:0,
    y:0
};
let speed=prompt("enter the speed you want in your game");
let score=0;
const foodSound=new Audio("food.mp3");
const gameBGM=new Audio("Martin-Garrix-Animals.mp3");
const moveSound=new Audio("move.mp3");
const gameOver=new Audio("mixkit-sad-game-over-trombone-471.wav");
let scor=document.querySelector("#score");
let lastpaint=0;
let snakeArr=[
    {x: 15,y: 13}
]
let food={x:10,y:10};
let board=document.querySelector("#board");

//functions
function main(ct){
    window.requestAnimationFrame(main);
    if ((ct-lastpaint)/1000<1/speed)
    {
        return;
    }
    lastpaint=ct;
    
    gameEngine();
    
}


function iscollide(el){
    for (let i = 1; i < snakeArr.length; i++) {
        if(snakeArr[i].x===snakeArr[0].x && snakeArr[i].y===snakeArr[0].y){
            return true;
        }
        
    }
    if (snakeArr[0].x>=18 || snakeArr[0].y>=18 || snakeArr[0].x<=0 || snakeArr[0].y<=0){
        return true;
    }
}





function gameEngine(){

    if (iscollide(snakeArr)){
        gameOver.play();
        inputdir={
            x:0,
            y:0
        };
        alert("Game over!! press any key to play again");
        snakeArr=[{x:15,y:13}];
        score=0;
        scor.innerHTML="score:"+0;
    }


    if (snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodSound.play();
        score++;
        scor.innerHTML="Score:"+score;
        snakeArr.unshift({x:snakeArr[0].x+inputdir.x,y:snakeArr[0].y+inputdir.y});
        food={x:Math.floor(Math.random()*15)+2,y:Math.floor(Math.random()*15)+2};
    }
    
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+=inputdir.x;
    snakeArr[0].y+=inputdir.y;







    board.innerHTML="";
    snakeArr.forEach((e,index) => {
        snakeElement=document.createElement("div");
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if (index===0){
            snakeElement.classList.add("head");
        }
        else{
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    });
    //display food
    foodElement=document.createElement("div");
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}






//main logic of the game
window.requestAnimationFrame(main);
window.addEventListener("keydown",(e)=>{
    inputdir={x:0,y:1};
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("up");
            inputdir.x=0;
            inputdir.y=-1;
            
            break;
        case "ArrowDown":
            console.log("down");
            inputdir.x=0;
            inputdir.y=1;
            
            break;
        case "ArrowRight":
            console.log("right");
            inputdir.x=1;
            inputdir.y=0;
            
            break;
        case "ArrowLeft":
            console.log("left");
            inputdir.x=-1;
            inputdir.y=0;
            
            break;
    
        default:
            break;
    }
});

