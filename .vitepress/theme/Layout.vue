<template>
  <Layout>
    <template #nav-bar-content-after>
      <GoogleTranslate />
    </template>
    <template #aside-bottom>
      <ExamplesPanel v-if="pageExamples.length" :examples="pageExamples" />
    </template>
  </Layout>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import GoogleTranslate from './components/GoogleTranslate.vue'
import ExamplesPanel from './components/ExamplesPanel.vue'

const { Layout } = DefaultTheme
const route = useRoute()
const pageExamples = ref([])

// Watch for page changes and load examples from frontmatter
watch(() => route.path, () => {
  // Get examples from page frontmatter/data
  if (route.data?.frontmatter?.examples) {
    pageExamples.value = route.data.frontmatter.examples
  } else {
    pageExamples.value = []
  }
}, { immediate: true })
</script>
