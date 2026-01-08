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

const isGraphQL = computed(() => {
  if (pageExamples.value.length === 0) return false
  // Check if first example has 'query' field (GraphQL) or 'request'/'curl' field (REST)
  const firstExample = pageExamples.value[0]
  return 'query' in firstExample
})

// Function to check and update the aside container styles
const updateAsideStyles = () => {
  const asideContainer = document.querySelector('.aside-container')
  const examplesSidebar = document.querySelector('.examples-sidebar')
  
  if (asideContainer && examplesSidebar) {
    // Has examples sidebar - apply styles
    asideContainer.style.setProperty('width', '350px', 'important')
    asideContainer.style.setProperty('max-width', '350px', 'important')
    
    const content = document.querySelector('.content')
  
    if (content) {
      content.style.setProperty('min-width', '540px', 'important')
    }


    const aside = document.querySelector('.aside')

    if (aside) {
      aside.style.setProperty('max-width', '400px', 'important')
    }
  } else if (asideContainer) {
    asideContainer.style.width = ''
    asideContainer.style.maxWidth = ''
    
    const content = document.querySelector('.content')

    if (content) {
      content.style.minWidth = ''
    }

    
    const aside = document.querySelector('.aside')

    if (aside) {
      aside.style.maxWidth = ''
    }
  }
}

onMounted(() => {  
  isClient.value = true
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

watch(() => route.path, () => {
  loadExamples()
})

watch(pageExamples, async () => {
  await nextTick()   // wait for DOM update
  updateAsideStyles()
}, { immediate: true })

</script>
