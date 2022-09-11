<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<script lang="ts" setup>
import AppLayout from './components/AppLayout.vue'
import useDarkmode from './use/Darkmode'

useDarkmode()
</script>
