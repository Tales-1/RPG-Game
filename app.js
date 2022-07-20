const heroAbid = document.getElementById("hero-abid")
const heroHamzah = document.getElementById("hero-hamzah")
const gameContainer = document.getElementById("game-container")
const cardContainer = document.getElementById("card-container")
const startGame = document.getElementById("start-game")


// FLAGS

let isGame = false;
let characterSelected = false;
let playerTurn = false;
let playerMove = false;
let enemyAlive = false;

// EVENT LISTENERS


cardContainer.addEventListener("click",(e)=>{
    const targetCard = e.target.closest("div")
    if(!targetCard || targetCard.id==="card-container") return
    console.log(targetCard)
    const cardChildren = Array.from(cardContainer.children)
    cardChildren.forEach((card)=>{
        card.classList.remove("selected")
    })
    targetCard.classList.add("selected")
    characterSelected = true;
})

startGame.addEventListener("click",()=>{

})



// FUNCTIONS 

