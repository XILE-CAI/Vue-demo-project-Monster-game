function getRandomValue(max, min){
   return  Math.floor(Math.random()*(max-min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound:0,
            winner: null
        };
    },
    computed:{
        monsterBarStyle(){
            if(this.monsterHealth < 0){
                return {
                    width:'0%',
                }
            }
            return {width: this.monsterHealth + '%'};
        },
        playerBarStyle(){
            if(this.playerHealth < 0){
                return {
                    width:'0%',
                }
            }
            return {width: this.playerHealth + '%'};
        },
        mayUseSpecialAttack(){
            return this.currentRound % 3 !== 0;
        }

    },
    watch:{
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <= 0){
                this.winner = 'draw';
            }else if(value <= 0){
                this.winner = 'monster'
            }
        },
        monsterHealth(value) {
            if(value <= 0 && this.playerHealth <= 0){
                this.winner = 'draw';
            }else if(value <= 0){
                this.winner = 'player'
            }
        }
    },
    methods: {
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.currentRound = 0;
        },
        attackMonster() {
            const attackValue = getRandomValue(12,5);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.currentRound++;
        },
        attackPlayer() {
            const attackValue = getRandomValue(15,8);
            this.playerHealth -= attackValue;
        },
        specialAttackMonster() {
            const attackValue = getRandomValue(10,25);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.currentRound++;
        },
        healPlayer() {
            this.currentRound++;
            const healVaule = getRandomValue(8,20);
            if(this.playerHealth + healVaule > 100){
                this.playerHealth = 100;
            }else {
                this.playerHealth += healVaule;
            }
            this.attackPlayer();
        },
        surrender(){
            this.winner = 'monster';
        }
    },
});

app.mount("#game");