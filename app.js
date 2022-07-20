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
let enemyAlive = false;
let playerAlive = false;
// EVENT LISTENERS

window.addEventListener("load",()=>{
    let cardMenu = characterData.map((item)=>{
        if(item.type === "hero"){
        
            return (`<div class="gc__card" id=${item.id}>
                <strong class="card__name gc--white">${item.name}</strong>
                <img src=${item.img} alt=${item.name} class="img">
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
        firstPage.classList.add("hidden")
        render()
        selectMove()
        attack()
        
    }    
})

const attackBtn = document.querySelector(".attack")


// FUNCTIONS 


function attack(){
    const attackBtn = document.querySelector(".attack")
    attackBtn.addEventListener("click",()=>{
        console.log(chosenCharacter)
    })
}

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
            chosenCharacter = char
        }
    })
    characterSelected = true;
}

function selectMove(arr){
    const moves = document.querySelector(".moves")
        moves.addEventListener("click",(e)=>{
            const targetOption = e.target
            if(targetOption.closest("span")){
                const movesChildren = Array.from(moves.children)
                movesChildren.forEach((option)=>{
                    option.classList.remove("selected")
                })
              targetOption.classList.add("selected")  
              playerMove = targetOption.innerHTML
              
            }
        })
}

function render(){
    let loadChar = characterData.map((char,index)=>{
        if(char.selected){
            let playerOne = new Character(characterData[index])
            return playerOne.cardHtml()

        } else if(char.type==="enemy"){
           return enemy.cardHtml()
        }
        
    })
    loadChar = loadChar.join("")
    gameContainer.innerHTML = `
                        <div class="gc--pagestyles">
                        <h1 class="gc__title gc--white">${playerTurn ? "Your Turn" : "Enemy turn"}</h1>
                          <div class="gc__cardcontainer">
                             ${loadChar}
                            </div>
                            <button class="attack">Attack</button>
                         </div>`

}


function startGame(){
    isGame = true;
    playerTurn = true
    playerMove = true
    enemyAlive = true
}
// `<div class="gc__firstpage" id="first-page">
//         <h1 class="gc__title gc--white">Choose your Character!</h1>

//         <div class="gc__cardcontainer" id="card-container">
            
//             <div class="gc__card" id="hero-abid">
//                 <strong class="card__name gc--white">Bald Abid</strong>
//                 <img src="./imgs/bald abid(1).png" alt="Bald abid" class="bald-abid">
//                 <!-- <div class="card_moves">
//                     <span class="option">Shiny Headbutt</span>
//                     <span class="option">Shiny Headbutt</span>
//                     <span class="option">Shiny Headbutt</span>
//                     <span class="option">Shiny Headbutt</span>
//                 </div> -->
//             </div>

//             <div class="gc__card" id="hero-hamzah">
//                 <strong class="card__name gc--white">Bald Hamzah</strong>
//                 <img src="./imgs/hamzah bald(1).png" alt="Bald abid" class="bald-abid">
//                 <!-- <div class="card_moves">
//                     <span class="option">Shiny Headbutt</span>
//                     <span class="option">Shiny Headbutt</span>
//                     <span class="option">Shiny Headbutt</span>
//                     <span class="option">Shiny Headbutt</span>
//                 </div> -->
//             </div>

//         </div>

//         <button id="start-game">
//             Start Game!
//         </button>`