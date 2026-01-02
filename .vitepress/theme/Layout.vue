<template>
  <Layout>
    <template #nav-bar-content-after>
      <GoogleTranslate v-if="isClient" />
    </template>
    <template #aside-bottom>
      <GraphQLExamplesPanel v-if="isClient && pageExamples.length && isGraphQL" :examples="pageExamples" />
      <RestExamplesPanel v-if="isClient && pageExamples.length && !isGraphQL" :examples="pageExamples" />
    </template>
  </Layout>
</template>

<script setup>
import { ref, watch, onMounted, nextTick, computed } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import GoogleTranslate from './components/GoogleTranslate.vue'
import GraphQLExamplesPanel from './components/GraphQLExamplesPanel.vue'
import RestExamplesPanel from './components/RestExamplesPanel.vue'

const { Layout } = DefaultTheme
const route = useRoute()
const pageExamples = ref([])
const isClient = ref(false)

// Auto-detect if examples are GraphQL or REST
const isGraphQL = computed(() => {
  if (pageExamples.value.length === 0) return false
  // Check if first example has 'query' field (GraphQL) or 'request'/'curl' field (REST)
  const firstExample = pageExamples.value[0]
  return 'query' in firstExample
})

onMounted(() => {
  isClient.value = true
  // Load examples after client is ready
  loadExamples()
})

function loadExamples() {
  nextTick(() => {
    if (route.data?.frontmatter?.examples) {
      pageExamples.value = route.data.frontmatter.examples
    } else {
      pageExamples.value = []
    }
  })
}

// Watch for page changes and load examples from frontmatter
watch(() => route.path, () => {
  loadExamples()
})
</script>
