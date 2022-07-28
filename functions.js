// FUNCTIONS .

let chosenCharacter;
let enemiesArray
let enemy;
let isGame = false;
let characterSelected = false;
let playerTurn = false;
let switchTurn = false
let isDialogue = false

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
            endBattle()
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
                chosenCharacter.takeDamage(enemy.damageDealt())
                battleDialogueHtml()
                toggleBattleDialogue()
                render()
                if(chosenCharacter.dead){
                    endBattle()
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
                        endBattle()
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

function displayMap(){
    let mapHtml = `
<div id="map-page">
    <h1 class="gc__title gc--white m-auto">Select Battle</h1>
    <div class="map">
        <div class="circle_container">
          ${displayStages()}
          </div>
    </div>
    <button id="start-game">
    Start Game!
</button>
</div>

 `

    gameContainer.innerHTML = mapHtml
    let circles = document.querySelectorAll(".circle")
        stagesArray.forEach((stage,index)=>{
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
            console.log("clicked")
        })
}

function prepareEnemies(){
    enemiesArray = enemyData.map(enemy => new Character(enemy))
    for(let i=0; i<enemiesArray.length;i++){
        enemiesArray[i].hp += Math.ceil(mapObject.level * 4.5)
        enemiesArray[i].moves[0].dmg +=Math.ceil(mapObject.level * 0.7)
        enemiesArray[i].moves[1].dmg +=Math.ceil(mapObject.level * 1.1)
    }
    enemy = new Character(enemiesArray.shift())
}



function toggleFlags(){
    isGame = true;
    playerTurn = true
}

function displayPage(){
    

    let cardMenu = characterData.map((item)=>{
        if(item.type === "hero"){
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

function endBattle(){
     const endMessage = chosenCharacter.hp === 0  && enemy.hp === 0 ? 
     "No victors - everyone died" : chosenCharacter.hp > 0 ? "Level Complete" : "You lose!"
     if(enemy.hp < 1){
        console.log(stagesArray[mapObject.level-1])
        stagesArray[mapObject.level - 1].complete = true
        stagesArray[mapObject.level - 1].open = true
        stagesArray[mapObject.level].open = true
     }
     toggleBattleDialogue()
     setTimeout(()=>{
         gameContainer.innerHTML = `
                         <div class="gc--pagestyles" id="end-pg">
                             <div class="gc__msgcontainer">
                                 <h1 class="endmessage">${endMessage}</h1>
                                 
                                 <button id="map-menu">Level Map</button>
                                 <button id="main-menu">Main Menu</button>
                                 </div>
                          </div>`
       
             const mapMenu = document.getElementById("map-menu")
             mapMenu.addEventListener("click",()=>{
                displayMap()
             })

     },1200)
        
     
}