# Vanilla JavaScript RPG game

## Objective: To make an RPG, turn-based game using selected characters. Player takes it in turns to select an attack. Aim of the game is to defeat the enemy before dying.

### Different functions of the game:

 - On load present hero character options
 - select charater
 - start button
 - Selecting hero attack move
 - Attack button to execute turn
 - calculate remaining health after each turn
 - call new enemy after defeating it
 - end game after being defeated
 
 UPDATED ---
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
