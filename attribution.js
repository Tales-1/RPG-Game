const attributionData = [

    {
        name:"Sword Icon",
        tag:`<a href="https://www.flaticon.com/free-icons/sword" title="sword icons">Sword icons created by Freepik - Flaticon</a> `
    },
    {
        name:"Pouch Icon",
        tag:`<a href="https://www.flaticon.com/free-icons/pouch" title="pouch icons">Pouch icons created by Freepik - Flaticon</a>`
    },
    {
        name:"Mana Icon",
        tag:`<a href="https://www.flaticon.com/free-icons/mana" title="mana icons">Mana icons created by Becris - Flaticon</a>`

    },
    {
        name:"Magic Wand Icon",
        tag:`<a href="https://www.flaticon.com/free-icons/magic-wand" title="magic wand icons">Magic wand icons created by Freepik - Flaticon</a>`
    },
    {
        name:"Damage Icon",
        tag:`<a href="https://www.flaticon.com/free-icons/damage" title="damage icons">Damage icons created by Febrian Hidayat - Flaticon</a>`

    },
    {
        name:"Accuracy Icon",
        tag:`<a href="https://www.flaticon.com/free-icons/accuracy" title="accuracy icons">Accuracy icons created by Freepik - Flaticon</a>`
    },

]


const attributionHTML = attributionData.map((item) => {
    return ( `<div>
                <h4>${item.name}</h4>
                 ${item.tag}
              </div>
    `
    )
})