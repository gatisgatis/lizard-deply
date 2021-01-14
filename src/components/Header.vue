<template>
  <div :class="$style.background">
    <div class="container container-fluid">
      <div :class="$style.wrapper">
        <img :class="$style.title" src="../assets/images/title.jpg" alt="title" />
        <div :class="$style.options">
          <select
            :class="$style.modeSelect"
            name="mode"
            :value="currentMode"
            @input="$emit('update:currentMode', $event.target.value)"
          >
            <option :class="$style.option" v-for="mode in modes" :key="mode" :value="mode">{{
              mode.toUpperCase()
            }}</option>
          </select>
          <button :class="$style.buttonRules" @click="showRules = true">RULES</button>
          <i :class="['material-icons', $style.soundIcon]" @click="$emit('soundSettingChanged')">{{
            soundIconName
          }}</i>
        </div>
      </div>
      <div :className="$style.overlay" v-if="showRules">
        <div :class="$style.rulesModal">
          <h1 :class="$style.rulesTitle">Rules</h1>
          <img src="../assets/images/rules.png" alt="rules" :class="$style.rulesImage" />
          <div :class="$style.closeModal" @click="showRules = false">X</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { GameMode } from '../types/types';

export default defineComponent({
  props: {
    modes: {
      type: Array as PropType<GameMode[]>,
      required: true,
    },
    currentMode: {
      type: String as PropType<GameMode>,
      required: true,
    },
    isSound: {
      type: Boolean,
    },
  },
  data() {
    return {
      showRules: false,
    };
  },
  computed: {
    soundIconName(): string {
      if (this.isSound) {
        return 'volume_up';
      }
      return 'volume_off';
    },
  },
});
</script>

<style module lang="scss">
.background {
  background-color: white;
}

.wrapper {
  position: relative;
  background-image: url('../assets/images/logo.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  padding-top: 15%;
  width: 100%;
  overflow: hidden;
}

.title {
  position: absolute;
  top: 10%;
  left: 10%;
  width: 22%;
  transform: rotate(-12deg);
  font-weight: bold;
}

.options {
  position: absolute;
  top: 40%;
  left: 70%;
  width: 20%;
  display: flex;
  justify-content: flex-end;
}

.modeSelect {
  padding: 5px;
  background-color: #eeeeee;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  margin: 5px;
  cursor: pointer;
  outline: none;
  &:hover {
    box-shadow: 0 0 5px black;
  }
}

.buttonRules {
  padding: 5px;
  margin: 5px;
  background-color: #eeeeee;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  outline: none;
  &:hover {
    box-shadow: 0 0 5px black;
  }
}

.soundIcon {
  font-size: 2rem;
  margin: 5px;
  cursor: pointer;
  background-color: #eeeeee;
  border-radius: 5px;
  &:hover {
    box-shadow: 0 0 5px black;
  }
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 2;
}

.rulesModal {
  position: absolute;
  z-index: 2;
  width: 80%;
  max-width: 800px;
  margin: 100px 50px;
  padding: 10px;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  border: 3px solid black;
  border-radius: 5px;
  background-color: white;
}

.rulesTitle {
  text-align: center;
  margin: 10px;
}

.rulesImage {
  width: 100%;
}

.closeModal {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 2rem;
  border: 1px solid black;
  cursor: pointer;
  border-radius: 5px;
  padding: 5px 10px;
  transition: box-shadow 0.2s ease-in-out 0s;
  &:hover {
    box-shadow: 0px 0px 5px black;
  }
}
</style>
