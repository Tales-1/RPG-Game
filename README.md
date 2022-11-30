# Vanilla JavaScript RPG game

![rpg-game](https://user-images.githubusercontent.com/84051594/204838320-54993ca2-5d1b-42df-8aa0-7577993d9e19.png)

## Objective: To make an RPG, turn-based game using selected characters. Player takes it in turns to select an attack. Aim of the game is to defeat the enemy before dying.

### Different functions of the game:

 - On load present hero character options
 - Select charater
 - Start button
 - Selecting hero attack move
 - Attack button to execute turn
 - Use Item button to consume an item
 - Calculate remaining health after each turn
 - Call new enemy after defeating it
 - End game after being defeated
 
 ###UPDATED ---
 - Added roadmap with 9 levels
 - Made enemies progressively stronger
 - Added stats and allowed players to level up after gaining enough experience points

### Methods required: 

1) Class constructors
2) Functions
3) Event listeners

### Things to fix:

- Refactor class constructor and use inheritance to split the code:
 -- Create a separate hero and enemy class which inherits shared methods from a character class
- Create a boss level
- fix bugs when using status related attacks (e.g. ice punch will freeze the enemy if clicked even if the "attack" button isn't clicked)
- fix enemy scaling (enemies can get too strong and difficult to beat)
