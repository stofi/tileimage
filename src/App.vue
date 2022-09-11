<template>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite + Tailwind + Vue-Router" />
  <router-view />
</template>

<script lang="ts" setup>

import HelloWorld from './components/HelloWorld.vue'
import useDarkmode from './use/Darkmode'

useDarkmode()
</script>
