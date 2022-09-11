<template>
  {{ props.msg }}
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  msg: {
    type: String,
    default: 'Hello Vue 3 + TypeScript + Vite + Tailwind + Vue-Router',
  },
})

</script>
