const getPercentage = (currentHp, maxHp) =>{
    return (100 * currentHp/maxHp)
}
class Character{
    constructor(data){
        Object.assign(this,data)
        this.maxHealth = this.hp
        this.storeDmg = [this.moves[0].dmg,this.moves[1].dmg]
        this.storeMoves = [this.moves[0].name,this.moves[1].name]
        this.storeAcc = [this.moves[0].acc,this.moves[1].acc]
        this.storeRes = [this.resources[0].stat,this.resources[1].stat]
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
        this.reduce = false;
        this.buffer = false;
    }

    setMovesHtml(){
        let movesHtml = this.moves.map((move)=>{
            return ( `
            <span class="option option--flex">${move.name} <p class="move-info">${move.info}</p>
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
            return (` <span class="tab option option--flex">${res.name}<p class="move-info">${res.info}</p>
                    <aside class="move-stats">
                    Qty: ${res.quantity}
                    
                    </aside>
                    </span>
            
            `)
        
         })
        resourceHtml = resourceHtml.join("")
        return resourceHtml}
    }


    selectOpt(){
        const moves = document.querySelector(".moves-battle-page")
        const resources = document.querySelector(".resources-battle-page")
        const resChildren = Array.from(resources.children)
        const movesChildren = Array.from(moves.children)

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
            console.log(this.setRes)
            this.attack = false
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
            this.res = false
            this.attack = true
            this.moveSelected = true;
            })

            this.switchTabs(moves,resources)
    }

    switchTabs(moves,res){
        const tabContainer = document.querySelector(".tab-container")
        const tabs = Array.from(tabContainer.children)
        let mvs = Array.from(moves.children)
        let rs = Array.from(res.children)

        tabContainer.addEventListener("click",e => { 
            const targetOption = e.target.closest("span")
            if(!targetOption) return
            tabs.forEach((tab,index)=>{
                tab.classList.remove("selected")
                if(targetOption.id === "tab-res"){
                    moves.classList.add("hidden")
                    res.classList.remove("hidden")
                    mvs.forEach(option => option.classList.remove("selected"))
                    this.moveSelected = false
                } else {
                    moves.classList.remove("hidden")
                    res.classList.add("hidden")
                    rs.forEach(option => option.classList.remove("selected"))
                    this.itemSelected = false
                 }
            })
            targetOption.classList.add("selected")
        })
    }

    battleDialogueHtml(){
        if(this.res){
            if(this.type==="hero"){return `${this.name} used ${this.setRes.name}`}
            // else if(this.setRes.type === "def" && this.reduce){return `${this.name} used ${this.selectedMoveName}, it did  damage!`}
        }
        else if((this.type ==="enemy" && !this.hit) || (this.type === "hero" && !this.hit)){
           return `${this.name} used ${this.selectedMoveName}, it missed!`
        } 
        else  {
            return `${this.name} used ${this.selectedMoveName}, it did ${this.dmgDealt} damage!`}
    }
    
    damageDealt(){
        // store damage of the move selected for Player
        if(this.type === "enemy"){
            this.randomiseMove()
            if(!this.hit){
                return 0
            } else if(this.hit){
                if(this.dmgDealt===0){
                    console.log("using switch statement")
                    switch(this.selectedMoveName){
                        case this.storeMoves[0]:
                            this.dmgDealt = this.storeDmg[0]
                            break;
                        case this.storeMoves[1]:
                            this.dmgDealt = this.storeDmg[1];
                            break;
                    }
                    return this.dmgDealt
                } else {return this.dmgDealt }
                
            }
        } else if(this.type==="hero" && this.moveSelected){
            this.accuracy =  Math.random()
            console.log(this.accuracy)
            if(this.accuracy <= this.setAcc){
                this.hit = true
                this.moveSelected = false
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

    useItem(){
        if(this.res){
            if(this.setRes.type === "heal" && !this.buffer){
                this.hp += this.setRes.stat
                if(this.hp>this.maxHealth){
                    this.hp = this.maxHealth
                }
                this.setRes.quantity--
            } 
            else if(this.setRes.type ==="def"){
                this.buffer = true
                this.reduce = true
                this.setRes.quantity--
            }
        } 
    }

    takeDamage(attackMove){
        if(this.reduce && this.countDown > 0){
            if(attackMove === 0) return
            this.hp = (this.hp + this.setRes.stat) - attackMove 
            this.countDown--
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
            <div class="hp-container"><span class="hp-bar ${percent > 40 ? "green" : percent > 15 ? "orange" : "red"}" style = "width:${percent}%"></span></div>   
        `)
    }

    cardHtml(){
        const {name,type,img,moves,id} = this
        const healthBar = this.healthBarHtml()
        const displayMoves = this.setMovesHtml()
        const displayResources = this.setResourcesHtml()
        const displayTabs = `<div class="tab-container">
                <span class="tab" id="tab-moves"><img src="./imgs/moveicons/sword.png" alt="image of sword" class="battle-icon"></span>
                <span class="tab" id="tab-res"><img src="./imgs/moveicons/pouch.png" alt="image of pouch" class="battle-icon"></span>
            </div>`
        return `
                    <div class="gc__card--active gc__card--styles" id=${id}>
                            <strong class="card__name gc--white">${name}</strong>
                            <img src=${img} alt="Bald abid" class="img-battle">
                            <p class="hp-number">health : ${this.hp}</p>
                            ${healthBar}
                            <section class="battle-menu">
                                <div class="moves-battle-page">
                                        ${type === "hero" ? displayMoves : ""}
                                </div>
                                <div class="resources-battle-page hidden">
                                    ${displayResources}
                                </div>
                                ${type === "hero" ? displayTabs : ""}
                            </section>
                    </div>
                    `
                    
    }

}


