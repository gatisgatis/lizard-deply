<template>
  <div :class="$style.wrapper">
    <img :src="getImgPath()" alt="sss" :class="$style.image" />
  </div>
</template>

<script lang="ts">
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    weaponName: {
      type: String,
    },
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
  padding-top: 140%;
  width: 100%;
  overflow: hidden;
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
