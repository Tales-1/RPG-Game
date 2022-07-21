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
        return ( `<section class="moves">
        <span class="option">${this.moves[0].name}</span>
        <span class="option">${this.moves[1].name}</span>
        </section> `)
    }

    selectOpt(){
        const moves = document.querySelector(".moves")
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
        return `
                    <div class="gc__card-active" id=${id}>
                            <strong class="card__name gc--white">${name}</strong>
                            <img src=${img} alt="Bald abid" class="img-battle">
                            <p class="hp-number">Health : ${this.hp}</p>
                            ${healthBar}
                            <section class="moves">
                                    <span class="option">${moves[0].name}</span>
                                    <span class="option">${moves[1].name}</span>
                            </section>
                    </div>
                    `
    }

}


