const heroAbid = document.getElementById("hero-abid")
const heroHamzah = document.getElementById("hero-hamzah")
const gameContainer = document.getElementById("game-container")
const cardContainer = document.getElementById("card-container")
const startBtn = document.getElementById("start-game")
const firstPage = document.getElementById("first-page")


let secondPage = `
                <div class="gc__secondpage>

                <div class="gc__cardcontainer>

                <div class="gc__card" id="hero-abid">
                <strong class="card__name gc--white">Bald Abid</strong>
                <img src="./imgs/bald abid(1).png" alt="Bald abid" class="bald-abid">
                </div>

        `
// FLAGS
let characters = [
    {   
        id:"hero-abid",
        name:"Bald Abid",
        type:"hero",
        hp:58,
        selected:false,
        img:"/imgs/baldabid(1).png",
        moves:["Shiny Headbutt", "Stare"],
        
    },
    {
        id:"hero-hamzah",
        name:"Bald Hamzah",
        type:"hero",
        hp:54,
        selected:false,
        img:"/imgs/hamzahbald(1).png",
        moves:["Shiny Forehead", "ABBA!"],
        
    },
    {
        id:"enemy-jawad",
        name:"Bald Jawad",
        type:"enemy",
        hp:54,
        selected:false,
        img:"/imgs/jawad.png",
        moves:["Lazor Beam", "Fwem Fwem Fresh"],
        
    }
]

let isGame = false;
let characterSelected = false;
let playerTurn = false;
let playerMove = false;
let enemyAlive = false;
let playerAlive = false;
// EVENT LISTENERS

window.addEventListener("load",()=>{
    let cardMenu = characters.map((item)=>{
        if(item.type === "hero"){
        
            return `<div class="gc__card" id=${item.id}>
                <strong class="card__name gc--white">${item.name}</strong>
                <img src=${item.img} alt=${item.name} class="img">
                </div>`}
    
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
        startGame()
        let loadChar = characters.map((char)=>{
            if(char.selected){
                return (
                    `
                    <div class="gc__card-active" id=${char.id}>
                            <strong class="card__name gc--white">${char.name}</strong>
                            <img src=${char.img} alt="Bald abid" class="img">
                            <div class="hp-container"><span class="hp-bar" width=></span></div>
                            <section class="moves">
                                    <span class="option">${char.moves[0]}</span>
                                    <span class="option">${char.moves[1]}</span>
                            </section>
                    </div>
                    `
                )
            } else if(char.type==="enemy"){
               return (`
                    <div class="gc__card-active" id=${char.id}>
                            <strong class="card__name gc--white">${char.name}</strong>
                            <img src=${char.img} alt="Bald abid" class="img">
                    </div>
                    `)
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
    
    let attack = document.querySelector(".attack")
    let options = document.querySelectorAll(".option")

})



// FUNCTIONS 

function selectOption(){

}

function unselectCards(){
    const cardChildren = Array.from(cardContainer.children)
    cardChildren.forEach((card)=>{
        card.classList.remove("selected")
    })
    
}

function selectCard(card){
    characters.forEach((char)=>{
        if(char.id === card){
            char.selected = true
        }
    })
    characterSelected = true;
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