const heroAbid = document.getElementById("hero-abid")
const heroHamzah = document.getElementById("hero-hamzah")
const gameContainer = document.getElementById("game-container")
const cardContainer = document.getElementById("card-container")
// const startBtn = document.getElementById("start-game")
const continueBtn = document.getElementById("continue")
const newGame = document.getElementById("new-game")
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
let enemiesArray
let enemy;
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
   
    const statsBtn = document.querySelectorAll(".stats-btn")
    const statsContainer = document.querySelectorAll(".stats-container")
    const statsAppear = document.querySelectorAll(".stats-appear")
    statsBtn.forEach((btn,index)=>{
        btn.addEventListener("click",()=>{
            statsContainer[index].classList.toggle("transform")
            statsAppear[index].classList.toggle("opacity-zero")
        })
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
        for(let i=0; i<statsContainer.length;i++){
            statsContainer[i].classList.remove("transform")
            statsAppear[i].classList.add("opacity-zero")
        }
    })

    leftBtn.addEventListener("click", e =>{
        const currentSlide = track.querySelector(".current-slide");
        const previousSlide = currentSlide.previousElementSibling;
        const targetIndex = slides.findIndex(slide => slide === previousSlide)
        moveSlide(currentSlide, previousSlide, track);
        hideArrows(slides,targetIndex);
        for(let i=0; i<statsContainer.length;i++){
            statsContainer[i].classList.remove("transform")
            statsAppear[i].classList.add("opacity-zero")
        }
    });

    
    
    const articles = Array.from(cardContainer.children)
    articles.forEach((card)=>{
        card.addEventListener("click",(e)=>{
            const targetCard = e.target.closest("article")
            let initiateCard
            if(!targetCard) return
            unselectCards()
            if(targetCard.classList.contains("gc__card")){
                targetCard.classList.add("selected")
                initiateCard = targetCard
            } 
            selectCard(initiateCard.id)
        })
    })
})

continueBtn.addEventListener("click",()=>{
    if(characterSelected){
        let retrieveChar = JSON.parse(localStorage.getItem(chosenCharacter.id))
        let stageNo = retrieveChar.stage;
        toggleFlags()
        displayMap(stageNo,retrieveChar)
    }
    
})

newGame.addEventListener("click",()=>{
    if(characterSelected){
        localStorage.setItem(chosenCharacter.id,JSON.stringify(chosenCharacter))
        let retrieveChar = JSON.parse(localStorage.getItem(chosenCharacter.id))
        toggleFlags()
        displayMap(1,retrieveChar)
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


function resetFlags(){
    playerTurn = true 
    isDialogue = false
    chosenCharacter.buffer = false
}


function attack(){
    if(playerTurn && !isDialogue && chosenCharacter.moveSelected){
        enemy.takeDamage(chosenCharacter.dealDamage())
        displayBattleDialogueHtml(0)
        toggleBattleDialogue()
        render()
        if(enemy.dead){
             if(enemiesArray.length > 0 ){
                 setTimeout(()=>{
                    enemy = new Character(enemiesArray.shift())
                     toggleBattleDialogue()
                     render()
                 },2000)
             } else { 
                endBattle()
             }
        } else if(!playerTurn){
            setTimeout(()=>{
                chosenCharacter.takeDamage(enemy.dealDamage())
                if(chosenCharacter.reduce){
                    displayBattleDialogueHtml(3)
                }
                else {displayBattleDialogueHtml(0)}
                toggleBattleDialogue()
                render()

                if(chosenCharacter.dead){
                    endBattle()
                }
            },2500)
    }
    
}}

function useItem(){
    if(chosenCharacter.setRes.quantity && !chosenCharacter.buffer){
        if(playerTurn && !isDialogue && chosenCharacter.itemSelected ){
            chosenCharacter.useItem()
            displayBattleDialogueHtml()
            toggleBattleDialogue()
            render()
           if(!playerTurn){
                setTimeout(()=>{
                    chosenCharacter.takeDamage(enemy.dealDamage(chosenCharacter.reduce))
                    displayBattleDialogueHtml()
                    toggleBattleDialogue()
                    render()
                    if(chosenCharacter.dead){
                        endBattle()
                    }
                },1500)
        }
    }
    
}}
 
function displayBattleDialogueHtml(num){
    if(playerTurn){
        battleDialogue.innerHTML = chosenCharacter.battleDialogueHtml(0)
    } else { 
        battleDialogue.innerHTML = enemy.battleDialogueHtml(num)}

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

function displayMap(stageNo,retrieveChar){
    let mapHtml = `
<div id="map-page">
    <h1 class="gc__title gc--white m-auto">Select Battle</h1>
    <div class="map">
        <div class="circle_container">
          ${displayStages(stageNo)}
          </div>
    </div>
    <div class="nav-buttons_container">
        <button id="start-game">Start Game!</button>
        <button id="main-menu">Main Menu</button>
    </div>
</div>
`   
    characterSelected = true
    chosenCharacter = new Character(retrieveChar)
    gameContainer.innerHTML = mapHtml
    
    const mainMenu = document.getElementById("main-menu")
    mainMenu.addEventListener("click",()=>{
    window.location.reload();
    
    })

    let circles = document.querySelectorAll(".circle")
        updatedStagesArray.forEach((stage,index)=>{
            if(stage.open){
                circles[index].addEventListener("click",()=>{
                    mapObject = stage
                    mapObject.selected = true
                    circles.forEach(circle => circle.classList.remove("selected-lock"))
                    circles[index].classList.add("selected-lock")
                })
            }
        })
        const startBtn = document.getElementById("start-game")
        startBtn.addEventListener("click",()=>{
            if(characterSelected && mapObject.selected){
                prepareEnemies()
                render()
            }    
        })
}

function prepareEnemies(){
    enemiesArray = enemyData.map(enemy => new Character(enemy))
    for(let i=0; i<enemiesArray.length;i++){
        enemiesArray[i].hp += Math.ceil(mapObject.stageNo * 5.5)
        enemiesArray[i].moves[0].dmg +=Math.ceil(mapObject.stageNo * 0.65)
        enemiesArray[i].moves[1].dmg +=Math.ceil(mapObject.stageNo * 0.85)
    }
    enemy = new Character(enemiesArray.shift())
}



function toggleFlags(){
    isGame = true;
    playerTurn = true
}

function getLocalStorage(id){
    return localStorage.getItem(id) ? //check if localStorage,getItem("list") exists 
    JSON.parse(localStorage.getItem(id)) : // items = list which is an array 
    false;
}



function displayPage(){
    let cardMenu = characterData.map((item)=>{
            let savedChar = getLocalStorage(item.id)
            if(savedChar){
                let thresh = thresholds[savedChar.level].thresh
                let percentage = getPercentage(savedChar.exp,thresh)
                return (`<article class="gc__card gc__card--styles gc-hover ${item.current && "current-slide"}" id=${item.id}>
                <div class="image-holder"><img src=${item.img} alt=${item.name} class="img"></div>
                <div class="info-container">
                    <span class="level"><span>Level ${savedChar.level}</span></span>
                    <h2 class="card__name">${item.name}</h2>
                    <p class="descriptor">${item.descriptor}</p>
                </div>
                <section class="stats-container" id="stats">
                <button class='stats-btn lined thick'>STATS</button>
                    <div class="stats-appear opacity-zero">
                    <div class="stats">
                        <span class="heart"><span class="straighten">${savedChar.hp}</span></span>
                        <div class="exp-bar-container"> <div class="exp-bar" style="width:${percentage}%"></div> <div class="threshold">${thresh}</div></div>
                    </div>
                    <div class="moves-container">
                        <h3 class="moves-title">MOVES</h3>
                        <div class="moves-select-page">

                        <span class="option flex-row">${savedChar.moves[0].name}
                            <aside class="move-stats-select">
                                <img src="./imgs/moveicons/accuracy.png" alt="damage-icon" class="dmg-icon-select">${savedChar.moves[0].acc * 100}%
                                <img src="./imgs/moveicons/damage.png" alt="damage-icon" class="dmg-icon-select margin-l">${savedChar.moves[0].dmg}
                            </aside>
                        </span>

                        <span class="option flex-row">${savedChar.moves[1].name}
                            <aside class="move-stats-select">
                                <img src="./imgs/moveicons/accuracy.png" alt="damage-icon" class="dmg-icon-select">${savedChar.moves[1].acc * 100}%
                                <img src="./imgs/moveicons/damage.png" alt="damage-icon" class="dmg-icon-select margin-l">${savedChar.moves[1].dmg}
                            </aside>
                        </span>
                        </div>
                    </div>
                    </div>
                </section>
            </article>`)

            }
           
            else{
                let thresh = thresholds[item.level].thresh
                let percentage = getPercentage(item.exp,thresh)
                return (`<article class="gc__card gc__card--styles gc-hover ${item.current && "current-slide"}" id=${item.id}>
                    <div class="image-holder"><img src=${item.img} alt=${item.name} class="img"></div>
                    <div class="info-container">
                        <span class="level"><span>Level ${item.level}</span></span>
                        <h2 class="card__name">${item.name}</h2>
                        <p class="descriptor">${item.descriptor}</p>
                    </div>
                    <section class="stats-container" id="stats">
                    <button class='stats-btn lined thick'>STATS</button>
                        <div class="stats-appear opacity-zero">
                        <div class="stats">
                            <span class="heart"><span class="straighten">${item.hp}</span></span>
                            <div class="exp-bar-container"><div class="exp-bar" style="width:${percentage}%"></div><div class="threshold">${thresh}</div></div>
                        </div>
                        <div class="moves-container">
                            <h3 class="moves-title">MOVES</h3>
                            <div class="moves-select-page">

                            <span class="option flex-row">${item.moves[0].name}
                                <aside class="move-stats-select">
                                    <img src="./imgs/moveicons/accuracy.png" alt="damage-icon" class="dmg-icon-select">${item.moves[0].acc * 100}%
                                    <img src="./imgs/moveicons/damage.png" alt="damage-icon" class="dmg-icon-select margin-l">${item.moves[0].dmg}
                                </aside>
                            </span>

                            <span class="option flex-row">${item.moves[1].name}
                                <aside class="move-stats-select">
                                    <img src="./imgs/moveicons/accuracy.png" alt="damage-icon" class="dmg-icon-select">${item.moves[1].acc * 100}%
                                    <img src="./imgs/moveicons/damage.png" alt="damage-icon" class="dmg-icon-select margin-l">${item.moves[1].dmg}
                                </aside>
                            </span>
                            </div>
                        </div>
                        </div>
                    </section>
                </article>`)
            }
            
            
    
    })
    cardMenu = cardMenu.join("")
    return cardMenu
}


function updateStatsAndResources(){
    let exp = Math.ceil(6 + mapObject.stageNo * 0.6)
    chosenCharacter.updateExp(exp)
    chosenCharacter.hp = chosenCharacter.maxHealth
    return exp
}
function endBattle(){
    
     const endMessage = chosenCharacter.hp === 0  && enemy.hp === 0 ? 
     "No victors - everyone died" : chosenCharacter.hp > 0 ? "Level Complete" : "You lose!"
     const mapBtn = enemy.hp < 1 ? `<button id="map-menu">Back to map</button>` : `<span id="map-menu"></span>`
     if(enemy.hp < 1){
        if(mapObject.stageNo === chosenCharacter.stage){
            chosenCharacter.stage++
        }
        updateStatsAndResources()
        localStorage.setItem(chosenCharacter.id,JSON.stringify(chosenCharacter))
     } else if (chosenCharacter.hp<1){ 
        chosenCharacter.hp = chosenCharacter.maxHealth
        chosenCharacter.dead = false
        localStorage.setItem(chosenCharacter.id,JSON.stringify(chosenCharacter))
     }
     
     toggleBattleDialogue()
     setTimeout(()=>{
         gameContainer.innerHTML = `
                         <div class="gc--pagestyles" id="end-pg">
                             <div class="gc__msgcontainer">
                                 <h1 class="endmessage">${endMessage}</h1>
                                 <div class="progress">
                                    <span>Level:${chosenCharacter.level}</span>
                                    <span>Exp:${chosenCharacter.exp}</span>
                                    <span>Exp to next level: ${chosenCharacter.maxExp}</span>
                                 </div>
                                 ${mapBtn}
                                 <button id="main-menu">Main Menu</button>
                                 </div>
                          </div>`
       
             const mapMenu = document.getElementById("map-menu")
             mapMenu.addEventListener("click",()=>{
                displayMap(chosenCharacter.stage,chosenCharacter)
             })
             const mainMenu = document.getElementById("main-menu")
             mainMenu.addEventListener("click",()=>{
                window.location.reload();
                
             })

     },1200)
        
     
}




