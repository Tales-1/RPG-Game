const heroAbid = document.getElementById("hero-abid")
const heroHamzah = document.getElementById("hero-hamzah")
const gameContainer = document.getElementById("game-container")
const cardContainer = document.getElementById("card-container")
const startBtn = document.getElementById("start-game")
const firstPage = document.getElementById("first-page")


// let secondPage = `
//                 <div class="gc__secondpage>

//                 <div class="gc__cardcontainer>

//                 <div class="gc__card" id="hero-abid">
//                 <strong class="card__name gc--white">Bald Abid</strong>
//                 <img src="./imgs/bald abid(1).png" alt="Bald abid" class="bald-abid">
//                 </div>

//         `
// FLAGS

let chosenCharacter;
let enemy = new Character(characterData[2])
let isGame = false;
let characterSelected = false;
let playerTurn = false;
let playerMove = false;
// EVENT LISTENERS

window.addEventListener("load",()=>{
    let cardMenu = characterData.map((item)=>{
        if(item.type === "hero"){
        
            return (`<div class="gc__card gc__card--styles gc-hover" id=${item.id}>
                <div class="image-holder"><img src=${item.img} alt=${item.name} class="img"></div>
                <div class="info-container">
                    <span class="level">Level 10</span>
                    <h2 class="card__name">${item.name}</h2>
                    <p class="descriptor">${item.descriptor}</p>
                </div>
                
                <section class="moves-container moves-select-page">
                    <h3 class="moves-title">MOVES</h3>
                    <span class="option">${item.moves[0].name}</span>
                    <span class="option">${item.moves[1].name}</span>
                </section>
                </div>`)
            }
    
    })
    cardMenu = cardMenu.join("")
    cardContainer.innerHTML = cardMenu
})


cardContainer.addEventListener("click",(e)=>{
    const targetCard = e.target.closest("div")
    if(!targetCard || targetCard.id==="card-container") return
    unselectCards()
    targetCard.classList.add("selected")
    selectCard(targetCard.id)
})

startBtn.addEventListener("click",()=>{
    if(characterSelected){
        startGame()
        firstPage.classList.add("hidden")
        render()
    }    
})





// FUNCTIONS .

function unselectCards(){
    const cardChildren = Array.from(cardContainer.children)
    cardChildren.forEach((card)=>{
        card.classList.remove("selected")
    })
    
}

function selectCard(card){
    characterData.forEach((char)=>{
        if(char.id === card){
            char.selected = true
            chosenCharacter = new Character(char)
        }
    })
    characterSelected = true;
}


function attack(){
    if(playerTurn){
        enemy.takeDamage(chosenCharacter.damageDealt())
        playerTurn = false;
        render()
        if(enemy.dead){
            endGame()
        } else if(!playerTurn){
            setTimeout(()=>{
                chosenCharacter.takeDamage(12)
                playerTurn = true
                render()
                if(chosenCharacter.dead){
                    endGame()
                }
            },500)
    }
    
}}


 function selectMove(){
      chosenCharacter.selectOpt()
 }

function render(){
    gameContainer.innerHTML = `
                        <div class="gc--pagestyles">
                        <h1 class="gc__title gc--white">${playerTurn ? "Your Turn" : "Enemy turn"}</h1>
                          <div class="gc__cardcontainer">
                             ${chosenCharacter.cardHtml()}
                             ${enemy.cardHtml()}
                            </div>
                            <button class="attack">Attack</button>
                         </div>`
    selectMove()
    const attackBtn = document.querySelector(".attack")
    attackBtn.addEventListener("click",attack)

}


function startGame(){
    isGame = true;
    playerTurn = true
    playerMove = true
}

function endGame(){
    const endMessage = chosenCharacter.hp === 0  && enemy.hp === 0 ? 
    "No victors - everyone died" : chosenCharacter.hp > 0 ? "You win!" : "Bald Jawad Wins!"

    setTimeout(()=>{
        gameContainer.innerHTML = `
                        <div class="gc--pagestyles">
                            <div class="gc__msgcontainer">
                                <h1 class="endmessage">${endMessage}</h1>
                                <img src=${chosenCharacter.img} alt=${chosenCharacter.id}class="img">
                                <button class="play-again">Play Again!</button>
                                </div>
                         </div>`
    },2000)
}
