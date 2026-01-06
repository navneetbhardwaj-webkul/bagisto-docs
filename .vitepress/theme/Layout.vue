<template>
  <Layout>
    <template #nav-bar-content-after>
      <GoogleTranslate v-if="isClient" />
    </template>
    <template #aside-bottom>
      <ExamplesPanel v-if="isClient && pageExamples.length" :examples="pageExamples" />
    </template>
  </Layout>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import GoogleTranslate from './components/GoogleTranslate.vue'
import ExamplesPanel from './components/ExamplesPanel.vue'
const { Layout } = DefaultTheme
const route = useRoute()
const pageExamples = ref([])
const isClient = ref(false)

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
   
  updateAsideStyles()
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
  setTimeout(() => {
    updateAsideStyles()
  }, 100)
})
</script>
