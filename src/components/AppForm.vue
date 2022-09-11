<template>
  <div class="space-y-8 divide-y divide-gray-200">
    <div>
      <div>
        <h3 class="text-lg font-medium leading-6 text-gray-900">Tiles</h3>
        <p class="mt-1 text-sm text-gray-500">Tile any photo</p>
      </div>

      <div class="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div class="sm:col-span-6">
          <label
            for="cover-photo"
            class="block text-sm font-medium text-gray-700"
            >Upload something</label
          >
          <div
            class="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md"
          >
            <div class="space-y-1 text-center">
              <svg
                class="w-12 h-12 mx-auto text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div class="flex text-sm text-gray-600">
                <label
                  for="file-upload"
                  class="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    class="sr-only"
                    @input="handleFile"
                  />
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="sm:grid sm:grid-cols-5 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
      >
        <label
          for="username"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >URL</label
        >
        <div class="mt-1 sm:col-span-3 sm:mt-0">
          <div class="flex max-w-lg rounded-md shadow-sm">
            <input
              id="url"
              v-model="url"
              type="text"
              name="url"
              class="flex-1 block w-full min-w-0 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <button
          type="button"
          class="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          @click="handleUrl"
        >
          Load
        </button>
      </div>
    </div>
    <div class="sm:grid sm:grid-cols-2">
      <!-- Grid parameters -->
      <!-- Width: 1-32 -->
      <div class="sm:grid sm:grid-cols-5 sm:items-start sm:gap-4 sm:pt-5">
        <label
          for="username"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 sm:col-span-2"
          >Width</label
        >
        <div class="mt-1 sm:col-span-2 sm:mt-0">
          <div class="flex max-w-lg rounded-md shadow-sm">
            <input
              id="width"
              :value="width"
              type="number"
              min="1"
              max="32"
              step="1"
              name="width"
              class="flex-1 block w-full min-w-0 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              @input="handleWidth"
            />
          </div>
        </div>
      </div>
      <!-- Height: 1-32 -->
      <div class="sm:grid sm:grid-cols-5 sm:items-start sm:gap-4 sm:pt-5">
        <label
          for="username"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 sm:col-span-2"
          >Height</label
        >
        <div class="mt-1 sm:col-span-2 sm:mt-0">
          <div class="flex max-w-lg rounded-md shadow-sm">
            <input
              id="height"
              :value="height"
              type="number"
              min="1"
              max="32"
              step="1"
              name="height"
              class="flex-1 block w-full min-w-0 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              @input="handleHeight"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref } from 'vue'

const emit = defineEmits(['image', 'config'])
const url = ref('')
const width = ref(3)
const height = ref(3)
const loadedFile = ref<File | null>(null)
const image = ref<HTMLImageElement | null>(null)

const handleWidth = (e: Event) => {
  const target = e.target as HTMLInputElement
  width.value = parseInt(target.value)
  width.value = isNaN(width.value) ? 1 : width.value
  emit('config', { width: width.value, height: height.value })
}

const handleHeight = (e: Event) => {
  const target = e.target as HTMLInputElement
  height.value = parseInt(target.value)
  height.value = isNaN(height.value) ? 1 : height.value
  emit('config', { width: width.value, height: height.value })
}

const handleFile = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]

  if (file) {
    loadedFile.value = file
    const reader = new FileReader()

    reader.onload = (e) => {
      const img = new Image()
      img.src = e.target?.result as string

      img.onload = () => {
        image.value = img
        emit('image', img)
      }
    }
    reader.readAsDataURL(file)
  }
}

const handleUrl = () => {
  const img = new Image()
  img.src = url.value

  img.onload = () => {
    image.value = img
    emit('image', img)
  }
}
</script>

<style></style>
