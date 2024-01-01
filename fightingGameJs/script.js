// Grabs elements  from the DOM 

let playButton = document.getElementById('play')
let resultDiv = document.getElementById('result')
let p1HealthDiv = document.getElementById('p1Health')
let p2HealthDiv = document.getElementById('p2Health')

// Either players health is 0, then update isOver true
const updateGame = (p1, p2, p1HealthDiv, p2HealthDiv, gameState) => {
    p1HealthDiv.innerText = p1.health
    p2HealthDiv.innerText = p2.health
    if(p1.health <= 0 || p2.health <= 0) {
        game.isOver = true
        gameState = game.isOver
        result.innerText = game.declareWinner(game.isOver, p1, p2)
        return gameState
    }
}

// Make class player with strike and heal
class Player {
    constructor(name, health, attackDamage){
        this.name = name
        this.health = health;
        this.attackDmg = attackDamage;
    }

    strike (player, enemy, attackDmg) {
        let damageAmount = Math.ceil(Math.random() * attackDmg) 
        enemy.health -= damageAmount
        updateGame(p1,p2,p1HealthDiv,p2HealthDiv,gameState)
        return `${player.name} attacks ${enemy.name} for ${damageAmount}` 
    }

    heal(player) {
        let hpAmount = Math.ceil(Math.random() * 5)
        player.health += hpAmount
        updateGame(p1, p2, p1HealthDiv, p2HealthDiv, gameState)
        return `${player.name} heals themselves by ${hpAmount}`
    }
}

// Make game class with all attributes & methods
class Game{
    constructor(p1HealthDiv, p2HealthDiv){
        this.isOver = false;
        this.p1HealthDiv = p1HealthDiv
        this.p2HealthDiv = p2HealthDiv
    }

    declareWinner(isOver, p1, p2){
        let message;
        if(isOver == true && p1.health <= 0) {
            message = `${p2.name} WINS`;
        } else if (isOver == true && p2.health <= 0 ) {
            message = `${p1.name} WINS`;
        }
        console.log(isOver, message, "🧑‍🚀🧑‍🚀🧑‍🚀🧑‍🚀", p2.health, p1.health)
        return message
    }

    reset(p1, p2){
        p1.health = 100
        p2.health = 100
        this.isOver = false
        resultDiv.innerText = ''
        updateGame(p1, p2, p1HealthDiv, p2HealthDiv)
    }

    play(p1, p2) {
        this.reset(p1, p2);

        while(!this.isOver){
            p1.strike(p1, p2, p1.attackDmg)
            p2.heal(p2)
            p2.strike(p2, p1, p2.attackDmg)
            p1.heal(p1)
            updateGame(p1, p2, p1HealthDiv, p2HealthDiv);
        }
        return this.declareWinner(this.isOver, player1, player2)
    }

}

let player1 = new Player('Zangief', 100, 20)
let player2 = new Player('Jin Kazama', 100, 20)

let p1 = player1
let p2 = player2

let game = new Game(p1HealthDiv, p2HealthDiv)

let gameState = game.isOver

play.onclick = () => result.innerText = game.play(player1, player2)

