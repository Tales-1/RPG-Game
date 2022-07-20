const heroAbid = document.getElementById("hero-abid")
const heroHamzah = document.getElementById("hero-hamzah")
const gameContainer = document.getElementById("game-container")
const cardContainer = document.getElementById("card-container")
const startGame = document.getElementById("start-game")


// FLAGS
let characters = [
    {   
        id:"hero-abid",
        hero:"Bald Abid",
        hp:58,
        selected:false,
        img:"/imgs/baldabid(1).png",
        moves:["Shiny Headbutt", "Stare"],
        class:"bald-abid"
    },
    {
        id:"hero-hamzah",
        hero:"Bald Hamzah",
        hp:54,
        selected:false,
        img:"/imgs/hamzahbald(1).png",
        moves:["Shiny Forehead", "ABBA!"],
        class:"bald-hamzah"
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
        return `<div class="gc__card" id=${item.id}>
                <strong class="card__name gc--white">${item.hero}</strong>
                <img src=${item.img} alt=${item.hero} class=${item.class}>
                </div>`
    
    })

    cardMenu = cardMenu.join("")
    cardContainer.innerHTML = cardMenu
})

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