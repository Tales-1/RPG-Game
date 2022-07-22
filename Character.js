const getPercentage = (currentHp, maxHp) =>{
    return (100 * currentHp/maxHp)
}
class Character{
    constructor(data){
        Object.assign(this,data)
        this.maxHealth = this.hp
        this.storeDmg = [this.moves[0].dmg,this.moves[1].dmg]
        this.storeMoves = [this.moves[0].name,this.moves[1].name]
        this.hit = false
        this.setAcc = 0
        this.selectedMoveName =""
        this.dmgDealt = 0
    }

    setMovesHtml(){
        return ( `
        <span class="option option--flex">${this.moves[0].name} <p class="move-info">${this.moves[0].info} </p><aside class="dmg"><img src="./imgs/moveicons/damage.png" alt="damage-icon" class="dmg-img">${this.moves[0].dmg}</aside></span>
        <span class="option option--flex">${this.moves[1].name} <p class="move-info">${this.moves[1].info} <aside class="dmg"><img src="./imgs/moveicons/damage.png" alt="damage-icon" class="dmg-img">${this.moves[1].dmg}</aside></p></span>
        `)
    }

    selectOpt(){
        const moves = document.querySelector(".moves-container")
        moves.addEventListener("click",(e)=>{
            const targetOption = e.target.closest("span")
            if(!targetOption) return
            const movesChildren = Array.from(moves.children)
            movesChildren.forEach((option)=>{
                option.classList.remove("selected")
            })
            targetOption.classList.add("selected")
           
            const targetIndex = movesChildren.findIndex(move=>move === targetOption)
            this.dmgDealt = this.storeDmg[targetIndex]
            this.selectedMoveName = this.moves[targetIndex].name
            this.setAcc = this.moves[targetIndex].acc
            })
    }

    battleDialogueHtml(){
        if((this.type ==="enemy" && !this.hit) || (this.type === "hero" && !this.hit)){
           return `${this.name} used ${this.selectedMoveName}, it missed!`
        } else{return `${this.name} used ${this.selectedMoveName}, it did ${this.dmgDealt} damage!`}
        
    }
    
    damageDealt(){
        // store damage of the move selected for Player
        if(this.type ==="enemy"){
            this.randomiseMove()
            if(!this.hit){
                return 0
            } else {
                return this.dmgDealt
            }
        } else if(this.type==="hero"){
            this.accuracy =  Math.random().toFixed(1)
            if(this.accuracy < this.setAcc){
                this.hit = true
                return this.dmgDealt
            } else {
                this.hit = false
                return 0
            }
        }
    }

    randomiseMove(){
        // Select random move for computer
        this.accuracy =  Math.random().toFixed(1)
        this.index = Math.floor(Math.random().toFixed(1) * 2)
        
        if(this.accuracy < 0.8) { // this.dmgDealt = this.storeDmg[this.index]
            this.hit = true
            this.dmgDealt = this.storeDmg[this.index]
            this.selectedMoveName = this.storeMoves[this.index]
        } else { 
            this.selectedMoveName = this.storeMoves[this.index]
        }
    }

    takeDamage(attackMove){
        this.hp-=attackMove
        if(this.hp<=0){
            this.dead = true
            this.hp = 0
        }
    }

    healthBarHtml(){
        const percent = getPercentage(this.hp, this.maxHealth)
        return (`
            <div class="hp-container"><span class="hp-bar" style = "width:${percent}%"></span></div>   
        `)
    }

    cardHtml(){
        const {name,type,img,moves,id} = this
        const healthBar = this.healthBarHtml()
        const displayMoves = this.setMovesHtml()
        return `
                    <div class="gc__card--active gc__card--styles" id=${id}>
                            <strong class="card__name gc--white">${name}</strong>
                            <img src=${img} alt="Bald abid" class="img-battle">
                            <p class="hp-number">health : ${this.hp}</p>
                            ${healthBar}
                            <section class="moves-container moves-battle-page">
                                    ${type === "hero" ? displayMoves : ""}
                            </section>
                    </div>
                    `
                    
    }

}


