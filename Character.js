const getPercentage = (currentHp, maxHp) =>{
    return (100 * currentHp/maxHp)
}
class Character{
    constructor(data){
        Object.assign(this,data)
        this.maxHealth = this.hp
        if(this.exp){this.maxExp = thresholds[this.level].thresh}
        if(this.magic){this.storeMagic = [this.magic[0].name],this.storeMagicDmg = [this.magic[0].dmg]}
        if(this.resources) {this.storeRes = [this.resources[0].stat,this.resources[1].stat]}
        if(this.mana){this.maxMana = this.mana}
        this.storeDmg = [this.moves[0].dmg,this.moves[1].dmg]
        this.storeMoves = [this.moves[0].name,this.moves[1].name]
        this.storeAcc = [this.moves[0].acc,this.moves[1].acc]
        this.expendMana = 0
        this.hit = false
        this.dmgDealt = 0
        this.setAcc = 0
        this.selectedMoveName =""
        this.setRes = {}
        this.moveSelected = false
        this.itemSelected = false;
        this.res = false
        this.attack = false
        this.countDown = 3
        this.reduce = false
        this.buffer = false
        this.prevLvl
        this.ability = false
        this.statusOn = false
        this.effect;
        this.effectCountdown = 4
        this.burn = false
    }

    setMovesHtml(){
        let movesHtml = this.moves.map((move)=>{
            return ( `
            <span class="option-battle option--flex">${move.name} <p class="move-info">${move.info}</p>
            <aside class="move-stats">
            <img src="./imgs/moveicons/accuracy.png" alt="damage-icon" class="dmg-icon">${move.acc*100}%
            <img src="./imgs/moveicons/damage.png" alt="damage-icon" class="dmg-icon margin-l">${move.dmg}</aside>
            </span>`)
        })
        movesHtml = movesHtml.join("")
        return movesHtml
    }

    setResourcesHtml(){
        if(this.type==="hero"){
        let resourceHtml = this.resources.map((res)=>{
            return (` <span class="option option--flex">${res.name}<p class="move-info">${res.info}</p>
                    <aside class="move-stats">
                    Qty: ${res.quantity}
                    
                    </aside>
                    </span>
            
            `)
        
         })
        resourceHtml = resourceHtml.join("")
        return resourceHtml}
    }

    setMagicHtml(){
        if(this.type ==="hero"){
            let magicHtml = this.magic.map((move)=>{
                return (`
                <span class="option-battle option--flex">${move.name} <p class="move-info">${move.info}</p>
                <aside class="move-stats">
                <img src="./imgs/moveicons/mana.png" alt="damage-icon" class="dmg-icon">${move.mana}
                <img src="./imgs/moveicons/accuracy.png" alt="damage-icon" class="dmg-icon margin-l">${move.acc*100}%
                <img src="./imgs/moveicons/damage.png" alt="damage-icon" class="dmg-icon margin-l">${move.dmg}</aside>
                </span>
    
                `)
            })
    
            magicHtml = magicHtml.join("")
            return magicHtml
        }
        
    }

    updateExp(exp){
        this.prevLvl = this.level
        this.exp+=exp
        this.resources[0].quantity++
        this.resources[1].quantity++
        if(this.resources[0].quantity > 3) { this.resources[0].quantity = 3}
        if(this.resources[1].quantity > 2) { this.resources[1].quantity = 2}
        if(this.exp>this.maxExp){
            this.level++
            this.exp = this.exp % this.maxExp
            this.moves.map(move=>move.dmg+=1)
            this.maxHealth+=6
        }
    }

    updateStats(){
        if (this.level > this.prevLvl){
            return `
            <span>Leveled up!</span>
            <span>${this.moves[0].name} + 1 dmg</span>
            <span>${this.moves[1].name} + 1 dmg</span>
            <span> + 6 max health</span>
            
            `
        } else return ``
    }

    selectOpt(){
        const moves = document.querySelector(".moves-battle-page")
        const resources = document.querySelector(".resources-battle-page")
        const magicMoves = document.querySelector(".magic-battle-page")
        const resChildren = Array.from(resources.children)
        const movesChildren = Array.from(moves.children)
        const magicChildren = Array.from(magicMoves.children)

        resources.addEventListener("click",(e)=>{
            const targetOption = e.target.closest("span")
            if(!targetOption) return
            resChildren.forEach((option)=>{
                option.classList.remove("selected")
            })
            targetOption.classList.add("selected")
            const targetIndex = resChildren.findIndex(res=>res === targetOption)
            if(!this.buffer){
                this.setRes = this.resources[targetIndex]
            }
            this.attack = false
            this.ability = false
            this.res = true
            this.itemSelected = true
        })

        moves.addEventListener("click",(e)=>{
            const targetOption = e.target.closest("span")
            if(!targetOption) return
            movesChildren.forEach((option)=>{
                option.classList.remove("selected")
            })
            targetOption.classList.add("selected")
           
            const targetIndex = movesChildren.findIndex(move=>move === targetOption)
            this.dmgDealt = this.storeDmg[targetIndex]
            this.selectedMoveName = this.moves[targetIndex].name
            this.setAcc = this.moves[targetIndex].acc
            this.ability = false
            this.res = false
            this.attack = true
            this.moveSelected = true;
            })
        
        magicMoves.addEventListener("click",(e)=>{
            const targetOption = e.target.closest("span")
            if(!targetOption) return
            magicChildren.forEach(option => option.classList.remove("selected"))
            targetOption.classList.add("selected")

            const targetIndex = magicChildren.findIndex(move=>move === targetOption)
            this.dmgDealt = this.storeMagicDmg[targetIndex]
            this.selectedMoveName = this.magic[targetIndex].name
            this.expendMana = this.magic[targetIndex].mana
            this.effect = this.magic[targetIndex].effect
            this.setAcc = this.magic[targetIndex].acc
            if(this.mana - this.expendMana < 0) return
            this.res = false
            this.attack = true
            this.ability = true
            this.moveSelected = true
        })
            this.switchTabs(moves,resources,magicMoves)
    }

    switchTabs(moves,res,magic){
        const tabContainer = document.querySelector(".tab-container")
        const tabs = Array.from(tabContainer.children)
        let moveOptions = Array.from(moves.children)
        let resOptions = Array.from(res.children)
        let magicOptions = Array.from(magic.children)
        
        tabContainer.addEventListener("click",e => { 
            const targetOption = e.target.closest("span")
            if(!targetOption) return
            tabs.forEach((tab,index)=>{
                tab.classList.remove("selected")
                if(targetOption.id === "tab-res"){
                    res.classList.remove("hidden")
                    moves.classList.add("hidden")
                    magic.classList.add("hidden")
                    moveOptions.forEach(option => option.classList.remove("selected"))
                    magicOptions.forEach(option => option.classList.remove("selected"))
                    this.moveSelected = false
                    this.magicSelected = false

                } else if(targetOption.id==="tab-moves"){
                    moves.classList.remove("hidden")
                    res.classList.add("hidden")
                    magic.classList.add("hidden")
                    resOptions.forEach(option => option.classList.remove("selected"))
                    magicOptions.forEach(option => option.classList.remove("selected"))
                    this.itemSelected = false
                    this.magicSelected = false

                 } else {
                    magic.classList.remove("hidden")
                    res.classList.add("hidden")
                    moves.classList.add("hidden")
                    moveOptions.forEach(option => option.classList.remove("selected"))
                    resOptions.forEach(option => option.classList.remove("selected"))
                    this.itemSelected = false
                    this.moveSelected = false
                 }
            })
            targetOption.classList.add("selected")
        })
    }

    battleDialogueHtml(reduce = 0,effect){
        if(this.res){
            if(this.type==="hero"){return `${this.name} used ${this.setRes.name}`}
            // else if(this.setRes.type === "def" && this.reduce){return `${this.name} used ${this.selectedMoveName}, it did  damage!`}
        }
        else if(this.type==="enemy" && this.buffer){
            return `${this.name} is frozen`
        }
        else if((this.type ==="enemy" && !this.hit) || (this.type === "hero" && !this.hit)){
           return `${this.name} used ${this.selectedMoveName}, it missed!`
        } 
        else  {
            return `${this.name} used ${this.selectedMoveName}, it did ${this.dmgDealt - reduce} damage!`}
    }

    statusEffectDialogue(num){
        if(this.burn){
            return `${this.name} took ${num} burn damage!`
        }
    }
    
    dealDamage(){
        // store damage of the move selected for Player
        if(this.type === "enemy" && !this.buffer){
            this.randomiseMove()
            if(!this.hit){
                return 0
            } else if(this.hit){
                if(this.dmgDealt===0){
                    switch(this.selectedMoveName){
                        case this.storeMoves[0]:
                            this.dmgDealt = this.storeDmg[0]
                            break;
                        case this.storeMoves[1]:
                            this.dmgDealt = this.storeDmg[1]
                            break;
                    }
                    return this.dmgDealt
                } else {
                    return this.dmgDealt  
                }
            
            }
        } else if(this.type==="hero" && this.moveSelected){
            this.accuracy =  Math.random()
            if(this.accuracy <= this.setAcc){
                this.hit = true
                this.moveSelected = false
                this.effect 
                if(this.ability){
                    this.mana-= this.expendMana
                }
                return this.dmgDealt
            } else {
                this.moveSelected = false
                this.hit = false
                return 0
            }
        }
    }

  

    randomiseMove(){
        // Select random move for computer
        if(!this.buffer){
            this.accuracy =  Math.random().toFixed(1)
        this.index = Math.floor(Math.random())
        if(Math.random()<0.7){
            this.index = 0
        } else {this.index = 1}

        // Store selected move
        this.selectedMoveName = this.storeMoves[this.index]
        // determine accuracy of selected move
        switch(this.selectedMoveName){
            case this.storeMoves[0]:
                this.setAcc = this.moves[0].acc
                break;
            case this.storeMoves[1]:
                this.setAcc = this.moves[1].acc
                break;
        }
        // check if the move hits the target
        if(this.accuracy < this.setAcc) { // this.dmgDealt = this.storeDmg[this.index]
            this.hit = true
            this.dmgDealt = this.moves[this.index].dmg
        } else { 
            this.dmgDealt = 0
            this.selectedMoveName = this.storeMoves[0]
        }
        }
        
    }

    useItem(){
        if(this.res){
            if(this.setRes.type === "heal" && !this.buffer){
                this.hp += this.setRes.stat
                if(this.hp>this.maxHealth){
                    this.hp = this.maxHealth
                }
                this.setRes.quantity--
            } 
            else if(this.setRes.type ==="utility"){
                this.mana+=this.setRes.stat
                if(this.mana > this.maxMana){
                    this.mana = this.maxMana
                }
            }
            else if(this.setRes.type ==="def"){
                this.buffer = true
                this.reduce = true
                this.setRes.quantity--
            }
        } 
    }

    takeDamage(attackMove,effect = null){
        if(effect ==="freeze"){
            this.statusOn = true
            this.buffer = true
            effect = null
            setTimeout(()=>{
                this.buffer = false
                this.statusOn = false
            },6000)
        } else if(effect ==="burn" && this.effectCountdown > 0){
            this.statusOn = true
            this.burn = true
            effect = null
            this.effectCountdown--
            if(this.effectCountdown === 0){
                this.burn = false
                this.statusOn = false
                this.effectCountdown = 3
            }
        }

        if(this.reduce && this.countDown > 0){
            if(attackMove === 0) { this.countDown--}
            else{
                this.diff = (this.hp + this.setRes.stat) - attackMove 
                this.hp = this.diff
                this.dmgDealt = this.diff
                this.countDown--
            }
            
        } else {
            this.hp-=attackMove
            this.reduce = false;
            this.buffer = false
            this.countDown = 3
        
        }
        
        if(this.hp<=0){
            this.dead = true
            this.hp = 0
        } 
    }

    healthBarHtml(){
        const percent = getPercentage(this.hp, this.maxHealth)
        return (`
            <div class="bar-container"><span class="bar ${percent > 40 ? "green" : percent > 15 ? "orange" : "red"}" style = "width:${percent}%"></span></div>   
        `)
    }

    manaBarHtml(){
        if(this.mana){
            const percent = getPercentage(this.mana,this.maxMana)
            if(percent === 0){percent = 0.01}
            console.log(percent)
            return (`
            <div class="bar-container"><span class="bar blue" style = "width:${percent}%"></span></div>   
            `)
        }
    }

    expBarHtml(){
        const percent = getPercentage(this.exp, this.maxExp)
        return (`style = "width: ${percent}%"`)
    }
    cardHtml(){
        const {name,type,img,moves,id,level} = this
        const healthBar = this.healthBarHtml()
        const manaBar = this.manaBarHtml()
        const displayMoves = this.setMovesHtml()
        const displayResources = this.setResourcesHtml()
        const displayAbilities = this.setMagicHtml()
        const displayTabs = `<div class="tab-container">
                        <span class="tab selected" id="tab-moves"><img src="./imgs/moveicons/sword.png" alt="image of sword" class="battle-icon"></span>
                        <span class="tab" id="tab-res"><img src="./imgs/moveicons/pouch.png" alt="image of pouch" class="battle-icon"></span>
                        <span class="tab" id="tab-magic"><img src="./imgs/moveicons/magic-wand.png" alt="image of wand" class="battle-icon"></span>
                         </div>`
        return `
                    <article class="gc__card--active gc__card--styles" id=${id}>
                            <strong class="card__name gc--white">${name} - Level ${level}</strong>
                            <img src=${img} alt="Bald abid" class="img-battle">
                            <p class="number">health : ${this.hp}</p>
                            ${healthBar}
                            ${this.type==="hero" ? `<p class="number">mana : ${this.mana}</p>` : ""}
                            ${this.type==="hero" ? manaBar : ""}
                            ${type === "hero" ? displayTabs : ""}
                            <section class="battle-menu">
                                <div class="moves-battle-page">
                                        ${type === "hero" ? displayMoves : ""}
                                </div>
                                <div class="resources-battle-page hidden">
                                    ${displayResources}
                                </div>
                                <div class="magic-battle-page hidden">
                                    ${displayAbilities}
                                </div>
                               
                            </section>
                    </article>
                    `
                    
    }

}


