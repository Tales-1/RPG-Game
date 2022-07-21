const getPercentage = (currentHp, maxHp) =>{
    return (100 * currentHp/maxHp)
}
class Character{
    constructor(data){
        Object.assign(this,data)
        this.maxHealth = this.hp
        this.storeDmg = [this.moves[0].dmg,this.moves[1].dmg]
        this.dmg = 0;
    }

    setMovesHtml(){
        return ( `
        <span class="option option--flex">${this.moves[0].name} <p class="move-info hidden">${this.moves[0].info}</p></span>
        <span class="option option--flex">${this.moves[1].name} <p class="move-info hidden">${this.moves[1].info}</p></span>
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
                option.children[0].classList.add("hidden")
            })
            targetOption.classList.add("selected")
            targetOption.children[0].classList.remove("hidden")
            const targetIndex = movesChildren.findIndex(move=>move === targetOption)
            this.dmgDealt = this.storeDmg[targetIndex]
            })
    }
    
    damageDealt(){
        return this.dmgDealt
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
                    <div class="gc__card-active gc__card--styles" id=${id}>
                            <strong class="card__name gc--white">${name}</strong>
                            <img src=${img} alt="Bald abid" class="img-battle">
                            <p class="hp-number">health : ${this.hp}</p>
                            ${healthBar}
                            <section class="moves-container moves-battle-page">
                                    ${displayMoves}
                            </section>
                    </div>
                    `
                    
    }

}


