<template>
  <AppForm @image="handleImage" @config="handleConfig" />

  <div v-if="src" class="pt-12">
    <div :style="style" class="ImageContainer"></div>

    <div class="py-6">
      <a
        ref="downloadLink"
        type="button"
        :href="imageReady"
        target="_blank"
        class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        download="tiles.jpeg"
      >
        Download
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'

import AppForm from '../components/AppForm.vue'

interface IConfig {
  width: number
  height: number
}
const src = ref('')
const imageWidth = ref(1)
const imageHeight = ref(1)
const localConfig = ref<IConfig>({ width: 3, height: 3 })
const imageReady = ref('')
const downloadLink = ref<HTMLAnchorElement | null>(null)

// if src or config changes, update downloadImage
watchEffect(() => {
  if (src.value && localConfig.value) {
    downloadImage()
  }
})

const downloadImage = () => {
  imageReady.value = ''
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = localConfig.value.width * imageWidth.value
  canvas.height = localConfig.value.height * imageHeight.value
  const aspectRatio = imageWidth.value / imageHeight.value
  let scale = 1

  // if canvas width is more than  3840 × 1644 scale it down to fit
  if (canvas.width > 3840 || canvas.height > 1644) {
    scale = Math.min(3840 / canvas.width, 1644 / canvas.height)
    canvas.width *= scale
    canvas.height *= scale
  }
  const image = new Image()
  image.src = src.value

  image.onload = () => {
    for (let i = 0; i < localConfig.value.width; i++) {
      for (let j = 0; j < localConfig.value.height; j++) {
        ctx.drawImage(
          image,
          0,
          0,
          imageWidth.value,
          imageHeight.value,
          i * imageWidth.value * scale,
          j * imageHeight.value * scale,
          imageWidth.value * scale,
          imageHeight.value * scale
        )
      }
    }
    imageReady.value = canvas.toDataURL('image/jpeg')
  }
}

const style = computed(() => {
  return {
    '--imageWidth': `${imageWidth.value}`,
    '--imageHeight': `${imageHeight.value}`,
    '--width': localConfig.value.width,
    '--height': localConfig.value.height,
    '--src': `url(${src.value})`,
  }
})

const handleImage = (image: HTMLImageElement) => {
  src.value = image.src
  imageWidth.value = image.width
  imageHeight.value = image.height
}

const handleConfig = (config: IConfig) => {
  localConfig.value = config
}
</script>

<style>
.ImageContainer {
  --tileWidth: calc(100% / var(--width));
  --tileHeight: calc(100% / var(--height));
  --gridWidth: calc(var(--imageWidth) * var(--width));
  --gridHeight: calc(var(--imageHeight) * var(--height));
  --aspect-ratio: calc(var(--gridWidth) / var(--gridHeight));
  position: relative;
  aspect-ratio: var(--aspect-ratio);
  width: 100%;
  background-image: var(--src);
  background-size: var(--tileWidth) var(--tileHeight);
}
</style>
