<template>
  <Header
    :modes="gameModes"
    v-model:currentMode="currentGameMode"
    @soundSettingChanged="isSound = !isSound"
    :isSound="isSound"
    class="margin-bottom--30"
  />
  <div class="container container-fluid center-xs">
    <div class="scores-wrapper">
      <h2>RESULTS</h2>
      <h1>PLAYER {{ playersWinCount }} : {{ computersWinCount }} COMPUTER</h1>
    </div>
    <div class="battle-field">
      <template v-if="gameProgress === 'waiting'">
        <div class="butoon-weapon-wrapper">
          <div class="row center-xs">
            <h1 class="col-xs-12 margin-bottom--30">CHOOSE WEAPON</h1>
            <div class="col-xs-2" v-for="weapon in buttons" :key="weapon">
              <ButtonWeapon :weaponName="weapon" @click="startBattle(weapon)" />
            </div>
          </div>
        </div>
      </template>
      <template v-if="gameProgress === 'walking' || gameProgress === 'battle'">
        <div class="image-weapon-wrapper left left-walk">
          <ImageWeapon :weaponName="playersWeapon" />
        </div>
        <div class="image-weapon-wrapper right right-walk">
          <ImageWeapon weaponName="question" />
        </div>
      </template>
      <template v-if="gameProgress === 'battle'">
        <div class="explosion-wrapper">
          <img src="./assets/images/fire.jpg" alt="fire" />
        </div>
      </template>
      <template v-if="gameProgress === 'victory'">
        <div
          :class="[
            'image-weapon-wrapper',
            'left-victory',
            winner === 'playerOne' ? 'winner' : winner === 'playerTwo' ? 'looser' : 'tie-left',
          ]"
        >
          <ImageWeapon :weaponName="playersWeapon" />
        </div>
        <div
          :class="[
            'image-weapon-wrapper',
            'right-victory',
            winner === 'playerTwo' ? 'winner' : winner === 'playerOne' ? 'looser' : 'tie-right',
          ]"
        >
          <ImageWeapon :weaponName="computersWeapon" />
        </div>
      </template>
      <h1 v-if="gameProgress === 'victory'" class="fight-result-title">
        {{ winner === 'playerOne' ? 'YOU WON' : winner === 'tie' ? 'TIE' : 'YOU LOST' }}
      </h1>
    </div>
  </div>
  <div class="row"></div>
</template>

<script lang="ts">
/* eslint-disable global-require */
import { defineComponent } from 'vue';
import ImageWeapon from './components/ImageWeapon.vue';
import ButtonWeapon from './components/ButtonWeapon.vue';
import Header from './components/Header.vue';
import {
  Weapon, WEAPONS, GameMode, GAME_MODES, PlayersChoices,
} from './types/types';
import { determineWinner, getComputersWeapon } from './helpers/engine';

interface Data {
  playersWeapon: Weapon;
  computersWeapon: Weapon;
  winner: string;
  buttons: Weapon[];
  gameModes: GameMode[];
  currentGameMode: GameMode;
  isSound: boolean;
  playersChoices: PlayersChoices;
  totalMovesDone: number;
  isBattle: boolean;
  computersWinCount: number;
  playersWinCount: number;
  gameProgress: 'waiting' | 'walking' | 'battle' | 'victory';
}

export default defineComponent({
  components: {
    ImageWeapon,
    ButtonWeapon,
    Header,
  },
  data(): Data {
    return {
      playersWeapon: 'rock',
      computersWeapon: 'rock',
      winner: '',
      buttons: WEAPONS,
      gameModes: GAME_MODES,
      currentGameMode: 'easy',
      isBattle: false,
      isSound: true,
      computersWinCount: 0,
      playersWinCount: 0,
      gameProgress: 'waiting',
      totalMovesDone: 0,
      playersChoices: {
        rock: 0,
        paper: 0,
        scissors: 0,
        spock: 0,
        lizard: 0,
      },
    };
  },
  methods: {
    startBattle(playersWeapon: Weapon) {
      this.playersWeapon = playersWeapon;
      this.gameProgress = 'walking';
      this.playWalking();
      setTimeout(() => {
        this.gameProgress = 'battle';
        this.computersWeapon = getComputersWeapon(
          this.currentGameMode,
          this.computersWeapon,
          this.playersWeapon,
          this.playersChoices,
          this.totalMovesDone,
        );
        this.battling();
      }, 3000);
    },
    battling() {
      this.playFire();
      setTimeout(() => {
        this.gameProgress = 'victory';
        this.winner = determineWinner(this.playersWeapon, this.computersWeapon);
        this.celebrating();
      }, 1500);
    },
    celebrating() {
      if (this.winner === 'playerOne') {
        this.playVictory();
      } else if (this.winner === 'playerTwo') {
        this.playLaughs();
      } else {
        this.playTie();
      }
      setTimeout(() => {
        this.gameProgress = 'waiting';
        this.playersChoices[this.playersWeapon] += 1;
        this.totalMovesDone += 1;
        if (this.winner === 'playerOne') {
          this.playersWinCount += 1;
        } else if (this.winner === 'playerTwo') {
          this.computersWinCount += 1;
        }
      }, 3000);
    },
    playLaughs() {
      if (this.isSound) {
        const audio = new Audio(require('./assets/sounds/laughs.mp3'));
        audio.play();
        setTimeout(() => {
          audio.pause();
        }, 4000);
      }
    },
    playFire() {
      if (this.isSound) {
        const audio = new Audio(require('./assets/sounds/fire.mp3'));
        audio.play();
        setTimeout(() => {
          audio.pause();
        }, 1500);
      }
    },
    playWalking() {
      if (this.isSound) {
        const audio = new Audio(require('./assets/sounds/walking.mp3'));
        audio.play();
        setTimeout(() => {
          audio.pause();
        }, 2900);
      }
    },
    playVictory() {
      if (this.isSound) {
        const audio = new Audio(require('./assets/sounds/victory.mp3'));
        audio.play();
        setTimeout(() => {
          audio.pause();
        }, 4500);
      }
    },
    playTie() {
      if (this.isSound) {
        const audio = new Audio(require('./assets/sounds/tie.mp3'));
        audio.play();
        setTimeout(() => {
          audio.pause();
        }, 3800);
      }
    },
  },
});
</script>

<style lang="scss">
@import './styles/index.scss';

.battle-field {
  position: relative;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  margin-top: 20px;
  padding-top: 40%;
  overflow: hidden;
}

.butoon-weapon-wrapper {
  position: absolute;
  top: 0;
  margin: 20px auto;
  width: 100%;
}

.scores-wrapper {
  background-color: rgba(255, 255, 255, 0.5);
  display: inline-block;
  padding: 15px;
  border-radius: 5px;
}

.fight-result-title {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 2rem;
  opacity: 1;
  bottom: 5%;
  animation: scaling 2s linear 0s 1 forwards;
}

@keyframes scaling {
  0% {
    font-size: 0.5rem;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    font-size: 4rem;
  }
}

.image-weapon-wrapper {
  position: absolute;
  width: 18%;
  top: 20%;
}

.left {
  left: 30%;
}

.right {
  right: 30%;
}

.left-victory {
  left: 20%;
}

.right-victory {
  right: 20%;
}

.left-walk {
  animation: left-move 3s linear 0s 1 forwards, walking 0.2s linear 0s 16 forwards;
}

.right-walk {
  animation: right-move 3s linear 0s 1 forwards, walking 0.2s linear 0s 16 forwards;
}

@keyframes walking {
  0% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(0);
  }
  75% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(0);
  }
}

@keyframes left-move {
  0% {
    left: 5%;
  }
  100% {
    left: 32%;
  }
}

@keyframes right-move {
  0% {
    right: 5%;
  }
  100% {
    right: 32%;
  }
}

.explosion-wrapper {
  position: absolute;
  top: -10%;
  left: 20%;
  animation: fire 1.5s linear 0s 1 forwards;
}

@keyframes fire {
  0% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(2);
  }
  100% {
    transform: scale(6);
  }
}

.winner {
  animation: winner 0.6s linear 0s 5 forwards, tremble 0.3s linear 0s 10 forwards;
}

@keyframes winner {
  0% {
    top: 20%;
  }
  50% {
    top: 10%;
  }
  100% {
    top: 20%;
  }
}

.looser {
  animation: tremble-loser 0.3s linear 0s 10 forwards;
  transform: rotate(90deg);
  top: 30%;
}

.tie-left {
  animation: left-move-back 3s linear 0s 1 forwards, walking 0.2s linear 0s 16 forwards;
}

.tie-right {
  animation: right-move-back 3s linear 0s 1 forwards, walking 0.2s linear 0s 16 forwards;
}

@keyframes left-move-back {
  0% {
    left: 30%;
  }
  100% {
    left: -10%;
  }
}

@keyframes right-move-back {
  0% {
    right: 30%;
  }
  100% {
    right: -10%;
  }
}

@keyframes tremble-loser {
  0% {
    transform: rotate(90deg);
  }
  25% {
    transform: rotate(85deg);
  }
  50% {
    transform: rotate(90deg);
  }
  75% {
    transform: rotate(95deg);
  }
  100% {
    transform: rotate(90deg);
  }
}

@keyframes tremble {
  0% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(-5deg);
  }
  50% {
    transform: rotate(0);
  }
  75% {
    transform: rotate(5deg);
  }
  100% {
    transform: rotate(0);
  }
}
</style>
