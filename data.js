const characterData = [
    {   
        id:"hero-abid",
        name:"Senor Abid",
        descriptor:"Looking for a rishta",
        type:"hero",
        level:1,
        exp:0,
        hp:22,
        mana:10,
        selected:false,
        stage:1,
        current:true,
        img:"./imgs/senorabid.png",
        moves:[
            {
                name:"Flex",
                dmg:5, info:"Senor Abid takes off his shirt and flexes his muscles to the enemy.",
                acc:0.9
            },
            {
                name:"Batchelor's Kiss", 
                dmg:8,info:"Senor Abid sends a flying kiss to his target",
                acc:0.8
            }
            ],
        magic:[{name:"Ice punch", dmg:6, info:"Senor Abid charges his ice fist and freezes his target. Target misses next turn.",acc:1,mana:4,effect:"freeze"}],
        resources:[
                {name:"Health Potion",type:"heal",info:"Recovers 15 hp",stat:15,quantity:3},
                {name:"Mana Potion",type:"utility", info:`Restores 7 MP`,stat:7, quantity:2,},
                {name:"Fortifying syrup",type:"def", info:`Reduces incoming damage by 3 for three turns. Can't use items while this is in effect.`,stat:3, quantity:2,}]
        
    },
    {
        id:"hero-hamzah",
        name:"Bald Hamzah",
        descriptor:"Sweaty Overwatch Player",
        type:"hero",
        level:1,
        exp:0,
        hp:22,
        mana:10,
        selected:false,
        stage:1,
        current:false,
        img:"./imgs/hamzahbald(1).png",
        moves:[
            {
                name:"Shiny Forehead", 
                dmg:6, 
                info:"Bald Hamzah harnesses the power of the sun onto his forehead and headbutts his opponent", 
                acc:0.8
            },
            {
                name:"Me ne bola", 
                dmg:10,
                info:"Bald Hamzah shatters his targets ears with his urdu accent",
                acc:0.6
            }],
        magic:[{name:"Fire punch", dmg:5, info:"Bald Hamzah charges his fire first and swings at his target. Inflicts target with burn for 3 turns. (Burn dmg: 2) ",acc:1,mana:5,effect:"burn"}],
        resources:[
                {name:"Potion",type:"heal",info:"Recovers 15 hp",stat:15,quantity:3},
                {name:"Mana Potion",type:"utility", info:`Restores 7 MP`,stat:7, quantity:2,},
                {name:"Fortifying syrup",type:"def", info:"Reduces incoming damage by 3 for three turns. Can't use items while this is in effect.",stat:3, quantity:2,}
            ],
        
    },
    {
        id:"hero-munty",
        name:"Funky Munty",
        descriptor:"Just Married, Watch me slowly lose hair",
        type:"hero",
        level:1,
        exp:0,
        hp:26,
        mana:10,
        selected:false,
        stage:1,
        current:false,
        img:"./imgs/munty-final.png",
        moves:[
            {
                name:"Get 'Em Milo!",
                dmg:5, info:"Funky Munty hurls Milo at the enemy who unleashes his claws", 
                acc:0.9},
            {
                name:"Run 'Em Over", 
                dmg:8,info:"Funky Munty jumps into his Jaguar and runs over his target.",
                acc:0.7}],
        magic:[{name:"Crit", dmg:8, info:"Senor Abid charges his ice fist and smashes his target",acc:1,mana:5}],
        resources:[
            {name:"Potion",type:"heal",info:"Recovers 15 hp",stat:15,quantity:3},
            {name:"Mana Potion",type:"utility", info:`Restores 7 MP`,stat:7, quantity:2,},
            {name:"Fortifying syrup",type:"def", info:"Reduces incoming damage by 3 for three turns.Can't use items while this is in effect",stat:3, quantity:2, }]
        
    },
    {
        id:"hero-jawad",
        name:"Hairy Jawad",
        descriptor:"Got one wife, looking for three more.",
        type:"hero",
        level:1,
        exp:0,
        hp:20,
        mana:10,
        selected:false,
        stage:1,
        current:false,
        img:"./imgs/jay-fin.png",
        moves:[
            {
                name:"Big Fish Attack", 
                dmg:6,
                info:"Hairy Jawad throws an extra large Masala Fish at his target", 
                acc:0.9},
            {
                name:"Fwem Fwem Fresh",
                info:"Do you really need info for this move?", 
                dmg:9,
                acc:0.7,
            }
            ],
        magic:[{name:"Ice punch", dmg:8, info:"Senor Abid charges his ice fist and smashes his target",acc:1,mana:5}],
        resources:[
            {name:"Potion",type:"heal",info:"Recovers 15 hp",stat:15,quantity:3},
            {name:"Mana Potion",type:"utility", info:`Restores 7 MP`,stat:7, quantity:2,},
            {name:"Fortifying syrup",type:"def", info:"Reduces incoming damage by 3 for three turns.Can't use items while this is in effect.", stat:3, quantity:2}]
    },
]

let enemyData = [
    {
        id:"enemy-soldier",
        name:"Soldier A",
        type:"enemy",
        level:1,
        hp:4,
        img:"./imgs/Enemypics/soldier-A.jpg",
        moves:[{name:"Slash",dmg:4,info:"", acc:0.9},{name:"Lunge",info:"", dmg:5,acc:0.7}],
    },
    {
        id:"enemy-soldier",
        name:"Soldier B",
        type:"enemy",
        level:1,
        hp:5,
        img:"./imgs/Enemypics/soldier-B.jpg",
        moves:[{name:"Thrust", dmg:4,info:"", acc:0.9},{name:"Charge",info:"", dmg:5,acc:0.7}],
    },
//     {
//         id:"enemy-boomer",
//         name:"Boomer",
//         type:"enemy",
//         hp:30,
//         img:"./imgs/boomer.png",
//         moves:[{name:"Boomer Humour", dmg:7,info:"", acc:0.9},{name:"Body Slam",info:"", dmg:7,acc:0.7}],
//     },
]


let thresholds = [
    {},{level:2,thresh:10},{level:3,thresh:14},{level:4,thresh:19},{level:5,thresh:23},{level:6,thresh:28},{level:7,thresh:32},{level:8,thresh:37},{level:9,thresh:42},{level:10,thresh:49},{level:11,thresh:55},{level:12,thresh:63},{level:14,thresh:69},{level:15,thresh:78},{level:16,thresh:89}
]