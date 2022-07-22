const heroAbid = document.getElementById("hero-abid")
const heroHamzah = document.getElementById("hero-hamzah")
const gameContainer = document.getElementById("game-container")
const cardContainer = document.getElementById("card-container")
const startBtn = document.getElementById("start-game")
const firstPage = document.getElementById("first-page")
const battleDialogue = document.getElementById("battle-dialogue")

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
let switchTurn = false
// EVENT LISTENERS

window.addEventListener("load",()=>{
   cardContainer.innerHTML = displayPage()
})


cardContainer.addEventListener("click",(e)=>{
    const targetCard = e.target.closest("div")
    let initiateCard
    if(!targetCard || targetCard.id==="card-container") return
    unselectCards()
    if(targetCard.classList.contains("gc__card")){
        targetCard.classList.add("selected")
        initiateCard = targetCard
    } 
    else{
        targetCard.parentElement.classList.add("selected")
        initiateCard = targetCard.parentElement
    }
    console.log(initiateCard.id)
    selectCard(initiateCard.id)
})

startBtn.addEventListener("click",()=>{
    if(characterSelected){
        startGame()
        firstPage.classList.add("hidden")
        render()
    }    
    console.log("clicked")
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
        battleDialogueHtml()
        toggleBattleDialogue()
        render()
        
        
        if(enemy.dead){
            endGame()
        } else if(!playerTurn){
            setTimeout(()=>{
                chosenCharacter.takeDamage(enemy.damageDealt())
                battleDialogueHtml()
                toggleBattleDialogue()
                render()
                if(chosenCharacter.dead){
                    endGame()
                }
            },1500)
    }
    
}}
 
function battleDialogueHtml(){
    if(playerTurn){
        battleDialogue.innerHTML = chosenCharacter.battleDialogueHtml()
    } else { 
        battleDialogue.innerHTML = enemy.battleDialogueHtml()}

}

function toggleBattleDialogue(){
    if(playerTurn){
        battleDialogue.classList.add("translate")
    } else { 
        setTimeout(()=>{
            battleDialogue.classList.remove("translate")
        },1800)
    }
    
}

 function selectMove(){
      chosenCharacter.selectOpt()
 }

function render(){
    if(switchTurn){playerTurn = !playerTurn}
    switchTurn = true
    gameContainer.style.height = "initial"
    gameContainer.innerHTML = `
                        <div class="gc--pagestyles" id="second-page">
                        <h1 class="gc__title gc--white">${playerTurn ? "Your Turn" : "Enemy turn"}</h1>
                          <div class="gc__cardcontainer--active">
                             ${chosenCharacter.cardHtml()}
                             <button class="attack">Attack</button>
                             ${enemy.cardHtml()}
                            </div>
                           
                         </div>`
    selectMove()
    const attackBtn = document.querySelector(".attack")
    attackBtn.addEventListener("click",attack)

}


function startGame(){
    isGame = true;
    playerTurn = true
}

function displayPage(){
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
    return cardMenu
}

function endGame(){
    const endMessage = chosenCharacter.hp === 0  && enemy.hp === 0 ? 
    "No victors - everyone died" : chosenCharacter.hp > 0 ? "You win!" : "Bald Jawad Wins!"
    setTimeout(()=>{
        gameContainer.innerHTML = `
                        <div class="gc--pagestyles" id="end-pg">
                            <div class="gc__msgcontainer">
                                <h1 class="endmessage">${endMessage}</h1>
                                <img src=${chosenCharacter.img} alt=${chosenCharacter.id} class="end-img">
                                <button id="play-again">Play Again!</button>
                                </div>
                         </div>`
       
            const playAgain = document.getElementById("play-again")
            playAgain.addEventListener("click",()=>{
                    window.location.reload()
            })
    },1200)
        

     
}
