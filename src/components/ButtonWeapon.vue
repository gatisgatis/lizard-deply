<template>
  <div :class="$style.wrapper">
    <img :src="getImgPath()" alt="sss" :class="$style.image" />
  </div>
</template>

<script lang="ts">
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { defineComponent, PropType } from 'vue';
import { Weapon } from '../types/types';

export default defineComponent({
  props: {
    weaponName: String as PropType<Weapon>,
  },
  methods: {
    getImgPath() {
      return require(`../assets/images/${this.weaponName}.png`);
    },
  },
});
</script>

<style module lang="scss">
.wrapper {
  position: relative;
  padding-top: 100%;
  width: 100%;
  overflow: hidden;
  border: 3px solid black;
  border-radius: 10px;
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out 0s;
  background-color: black;
  &:hover {
      box-shadow: 0px 0px 15px black;
  }
}

.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
