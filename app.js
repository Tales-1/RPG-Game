const heroAbid = document.getElementById("hero-abid")
const heroHamzah = document.getElementById("hero-hamzah")
const gameContainer = document.getElementById("game-container")
const cardContainer = document.getElementById("card-container")
const startGame = document.getElementById("start-game")
const characterPage = document.getElementById("first-page")
let battlePage;

// FLAGS


let isGame = false;
let characterInfo = {
        selected:false,
        hero:"",
};

let playerTurn = false;
let playerMove = false;


// EVENT LISTENERS


cardContainer.addEventListener("click",(e)=>{
    const targetCard = e.target.closest("div")
    const heroName = targetCard.children[0].innerHTML
    if(!targetCard || targetCard.id==="card-container") return
    selectCard(heroName)
    targetCard.classList.add("selected")

    console.log(characterInfo.hero)
})


startGame.addEventListener("click",()=>{
    if(characterInfo.selected){
        isGame = true;
        characterPage.classList.add("hidden")
    }
})



// FUNCTIONS 

function selectCard(name){
    const cardChildren = Array.from(cardContainer.children)
    cardChildren.forEach((card)=>{
        card.classList.remove("selected")
    })
    characterInfo.selected = true;
    characterInfo.hero = name
}

{/* <div class="gc__cardcontainer" id="card-container">
            
            <div class="gc__card" id="hero-abid">
                <strong class="card__name gc--white">Bald Abid</strong>
                <img src="./imgs/bald abid(1).png" alt="Bald abid" class="bald-abid">
                <!-- <div class="card_moves">
                    <span class="option">Shiny Headbutt</span>
                    <span class="option">Shiny Headbutt</span>
                    <span class="option">Shiny Headbutt</span>
                    <span class="option">Shiny Headbutt</span>
                </div> -->
            </div>

            <div class="gc__card" id="hero-hamzah">
                <strong class="card__name gc--white">Bald Hamzah</strong>
                <img src="./imgs/hamzah bald(1).png" alt="Bald abid" class="bald-abid">
                <!-- <div class="card_moves">
                    <span class="option">Shiny Headbutt</span>
                    <span class="option">Shiny Headbutt</span>
                    <span class="option">Shiny Headbutt</span>
                    <span class="option">Shiny Headbutt</span>
                </div> -->
            </div> */}
