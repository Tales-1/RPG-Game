const characterData = [
    {   
        id:"hero-abid",
        name:"Senor Abid",
        descriptor:"Looking for a rishta",
        type:"hero",
        hp:58,
        selected:false,
        current:true,
        img:"./imgs/senorabid.png",
        moves:[
            {
                name:"Flex",
                dmg:8, info:"Senor Abid takes off his shirt and flexes his muscles to the enemy.",
                acc:0.9
            },
            {
                name:"Batchelor's Kiss", 
                dmg:14,info:"Senor Abid sends a flying kiss to his target",
                acc:0.6
            }
            ],
        resources:[
                {name:"Potion",type:"heal",info:"Recovers 15 hp",stat:15,quantity:3},
                {name:"Fortifying syrup",type:"def", info:`Reduces incoming damage by 3 for three turns. Can't use items while this is in effect.`,stat:3, quantity:2,}]
        
    },
    {
        id:"hero-hamzah",
        name:"Bald Hamzah",
        descriptor:"Sweaty Overwatch Player",
        type:"hero",
        hp:54,
        selected:false,
        current:false,
        img:"./imgs/hamzahbald(1).png",
        moves:[
            {
                name:"Shiny Forehead", 
                dmg:8, 
                info:"Bald Hamzah harnesses the power of the sun onto his forehead and headbutts his opponent", 
                acc:0.9
            },
            {
                name:"Me ne bola", 
                dmg:14,
                info:"Bald Hamzah shatters his targets ears with his urdu accent",
                acc:0.6
            }],
        resources:[
                {name:"Potion",type:"heal",info:"Recovers 15 hp",stat:15,quantity:3},
                {name:"Fortifying syrup",type:"def", info:"Reduces incoming damage by 3 for three turns. Can't use items while this is in effect.",stat:3, quantity:2,}
            ]
        
        
    },
    {
        id:"hero-munty",
        name:"Funky Munty",
        descriptor:"Just Married, Watch me slowly lose hair",
        type:"hero",
        hp:54,
        selected:false,
        current:false,
        img:"./imgs/munty-final.png",
        moves:[
            {
                name:"Get 'Em Milo!",
                dmg:8, info:"Funky Munty hurls Milo at the enemy who unleashes his claws", 
                acc:0.9},
            {
                name:"Run 'Em Over", 
                dmg:14,info:"Funky Munty jumps into his Jaguar and runs over his target.",
                acc:0.5}],
        resources:[
            {name:"Potion",type:"heal",info:"Recovers 15 hp",stat:15,quantity:3},
            {name:"Fortifying syrup",type:"def", info:"Reduces incoming damage by 3 for three turns.Can't use items while this is in effect",stat:3, quantity:2, }]
        
    },
    {
        id:"hero-jawad",
        name:"Hairy Jawad",
        descriptor:"Got one wife, looking for three more.",
        type:"hero",
        hp:54,
        selected:false,
        current:false,
        img:"./imgs/jay-fin.png",
        moves:[
            {
                name:"Big Fish Attack", 
                dmg:8,
                info:"Hairy Jawad throws an extra large Masala Fish at his target", 
                acc:0.8},{name:"Fwem Fwem Fresh",info:"Do you really need info for this move?", dmg:14,acc:0.5
            }
            ],
        resources:[
            {name:"Potion",type:"heal",info:"Recovers 15 hp",stat:15,quantity:3},
            {name:"Fortifying syrup",type:"def", info:"Reduces incoming damage by 3 for three turns.Can't use items while this is in effect.", stat:3, quantity:2}]
    },
    {
        id:"enemy-maryam",
        name:"Evil Maryam",
        descriptor:"",
        type:"enemy",
        hp:60,
        selected:false,
        current:false,
        img:"./imgs/evilmary.png",
        moves:[{name:"Nag", dmg:6,info:"", acc:0.8},{name:"Rey Mysterio 619",info:"", dmg:14,acc:0.6}],
        resources:[{},{}]
    },
    {
        id:"enemy-chav",
        name:"The Local Chav",
        descriptor:"",
        type:"enemy",
        hp:59,
        selected:false,
        current:false,
        img:"./imgs/chav.png",
        moves:[{name:"I'll knock yer 'ead in", dmg:7,info:"", acc:0.8},{name:"Get out of my country",info:"", dmg:15,acc:0.6}],
        resources:[{},{}]
    },
    {
        id:"enemy-boomer",
        name:"Ultimate Boomer",
        descriptor:"",
        type:"enemy",
        hp:68,
        selected:false,
        current:false,
        img:"./imgs/boomer.png",
        moves:[{name:"Boomer Humour", dmg:8,info:"", acc:0.8},{name:"Body Slam",info:"", dmg:17,acc:0.6}],
        resources:[{},{}]
    },
]

