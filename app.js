const heroAbid = document.getElementById("hero-abid")
const heroHamzah = document.getElementById("hero-hamzah")
const gameContainer = document.getElementById("game-container")
const cardContainer = document.getElementById("card-container")
const startBtn = document.getElementById("start-game")
const firstPage = document.getElementById("first-page")
const battleDialogue = document.getElementById("battle-dialogue")

const leftBtn = document.getElementById("leftBtn")
const rightBtn = document.getElementById("rightBtn")
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
let enemies = characterData.filter(char=>char.type === "enemy")
let enemy = new Character(enemies.shift())
console.log(enemy)

let isGame = false;
let characterSelected = false;
let playerTurn = false;
let switchTurn = false
let isDialogue = false
// EVENT LISTENERS

window.addEventListener("load",()=>{
   cardContainer.innerHTML = displayPage()
   const track = document.querySelector(".track")
   const slides = Array.from(track.children)
   let slideWidth = slides[0].getBoundingClientRect().width

   const slidePosition = (slide, index)=>{
   slide.style.left = slideWidth * index + "px";
    };
     slides.forEach(slidePosition); 

   window.addEventListener("resize",()=>{
    slideWidth = slides[0].getBoundingClientRect().width
    slides.forEach(slidePosition); 
   })
   
   
    
    
    const moveSlide =(currentSlide, targetSlide, track)=>{
        currentSlide.classList.remove("current-slide");
        targetSlide.classList.add("current-slide");
        track.style.transform = "translate(-" + targetSlide.style.left + ")";
    }

    const hideArrows = (slides, targetIndex) => {
        if (targetIndex === 0 ){
            leftBtn.classList.add("hidden");
            rightBtn.classList.remove("hidden");
        }
        else if(targetIndex === slides.length-1){
            rightBtn.classList.add("hidden");
            leftBtn.classList.remove("hidden");
        }
        else{
            rightBtn.classList.remove("hidden")
            leftBtn.classList.remove("hidden")
        }
    }

    rightBtn.addEventListener("click",()=>{
        const currentSlide = track.querySelector(".current-slide");
        const nextSlide = currentSlide.nextElementSibling;
        const targetIndex = slides.findIndex(slide => slide === nextSlide);
        moveSlide(currentSlide, nextSlide, track);
        hideArrows(slides,targetIndex);
    })

    leftBtn.addEventListener("click", e =>{
        const currentSlide = track.querySelector(".current-slide");
        const previousSlide = currentSlide.previousElementSibling;
        const targetIndex = slides.findIndex(slide => slide === previousSlide)
        moveSlide(currentSlide, previousSlide, track);
        hideArrows(slides,targetIndex);
        
    });


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
        toggleFlags()
        console.log(enemies)
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
    if(playerTurn && !isDialogue && chosenCharacter.moveSelected){
        enemy.takeDamage(chosenCharacter.damageDealt())
        battleDialogueHtml()
        toggleBattleDialogue()
        render()
        if(enemy.dead){
            if(enemies.length > 0 ){
                setTimeout(()=>{
                    enemy = new Character(enemies.shift())
                    chosenCharacter.hp+=10
                    toggleBattleDialogue()
                    render()
                },2000)
            } else { endGame()}
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

function useItem(){
    if(chosenCharacter.setRes.quantity && !chosenCharacter.buffer){
        if(playerTurn && !isDialogue && chosenCharacter.itemSelected ){
            console.log(chosenCharacter.buffer)
            chosenCharacter.useItem()
            battleDialogueHtml()
            toggleBattleDialogue()
            render()
           if(!playerTurn){
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
        isDialogue = true
    } else { 
        setTimeout(()=>{
            battleDialogue.classList.remove("translate")
            isDialogue = false
        },3000)
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
                             <div class="flex">
                             <button class="attack">Attack</button>
                             <button class="use-item">Use Item</button>
                             </div>
                             ${enemy.cardHtml()}
                            </div>
                           
                         </div>`
    selectMove()
    const attackBtn = document.querySelector(".attack")
    const useItemBtn = document.querySelector(".use-item")
    attackBtn.addEventListener("click",attack)
    useItemBtn.addEventListener("click",useItem)

}


function toggleFlags(){
    isGame = true;
    playerTurn = true
}

function displayPage(){
    let cardMenu = characterData.map((item)=>{
        if(item.type === "hero"){
        
            return (`<div class="gc__card gc__card--styles gc-hover ${item.current && "current-slide"}" id=${item.id}>
                <div class="image-holder"><img src=${item.img} alt=${item.name} class="img"></div>
                <div class="info-container">
                    <span class="level"><span>Level 10</span></span>
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
    "No victors - everyone died" : chosenCharacter.hp > 0 ? "You win!" : "You lose!"
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
