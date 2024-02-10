<script setup lang="ts">
import { RouterView } from 'vue-router';
import { ref } from 'vue';
import Loading from '@/components/Loading.vue';

import { isLoading } from './store';
</script>

<template>
  <Transition name="fade">
    <RouterView v-if="!isLoading"/>
    <Loading v-else/>
  </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
