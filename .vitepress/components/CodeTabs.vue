<template>
  <div class="api-tabs-wrapper">
    <div class="tabs-button-group">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tab-btn', { active: activeTabIndex === index }]"
        @click="activeTabIndex = index"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="tabs-content-area">
      <div
        v-for="(tab, index) in tabs"
        :key="`content-${index}`"
        :class="['tab-content-pane', { visible: activeTabIndex === index }]"
        v-html="tab.content"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface TabDefinition {
  label: string
  content: string
}

interface Props {
  code?: string
  gql?: string
  curl?: string
  nodejs?: string
  react?: string
  ruby?: string
  php?: string
}

const props = withDefaults(defineProps<Props>(), {
  code: '',
  gql: '',
  curl: '',
  nodejs: '',
  react: '',
  ruby: '',
  php: ''
})

const tabs = ref<TabDefinition[]>([])
const activeTabIndex = ref(0)

onMounted(() => {
  // Build tabs from props
  const tabsArray: TabDefinition[] = []
  
  if (props.gql) {
    tabsArray.push({
      label: 'GQL',
      content: `<pre><code class="language-graphql">${escapeHtml(props.gql)}</code></pre>`
    })
  }
  if (props.curl) {
    tabsArray.push({
      label: 'cURL',
      content: `<pre><code class="language-bash">${escapeHtml(props.curl)}</code></pre>`
    })
  }
  if (props.nodejs) {
    tabsArray.push({
      label: 'Node.js',
      content: `<pre><code class="language-javascript">${escapeHtml(props.nodejs)}</code></pre>`
    })
  }
  if (props.react) {
    tabsArray.push({
      label: 'React',
      content: `<pre><code class="language-jsx">${escapeHtml(props.react)}</code></pre>`
    })
  }
  if (props.ruby) {
    tabsArray.push({
      label: 'Ruby',
      content: `<pre><code class="language-ruby">${escapeHtml(props.ruby)}</code></pre>`
    })
  }
  if (props.php) {
    tabsArray.push({
      label: 'PHP',
      content: `<pre><code class="language-php">${escapeHtml(props.php)}</code></pre>`
    })
  }
  
  tabs.value = tabsArray
})

function escapeHtml(text: string): string {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}
</script>

<style scoped>
.api-tabs-wrapper {
  margin: 20px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.tabs-button-group {
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  gap: 0;
}

.tab-btn {
  flex: 1;
  min-width: 100px;
  padding: 12px 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
  position: relative;
  margin-bottom: -1px;
}

.tab-btn:hover {
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.tab-btn.active {
  color: var(--vp-c-brand);
  border-bottom: 2px solid var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.tabs-content-area {
  position: relative;
}

.tab-content-pane {
  display: none;
  padding: 16px;
  animation: fadeIn 0.2s ease-in-out;
}

.tab-content-pane.visible {
  display: block;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.tab-content-pane :deep(pre) {
  margin: 0;
  border-radius: 6px;
  background: var(--vp-code-block-bg) !important;
}

.tab-content-pane :deep(code) {
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
}

/* Responsive design for tabs */
@media (max-width: 768px) {
  .tab-btn {
    min-width: 80px;
    padding: 10px 12px;
    font-size: 12px;
  }

  .tab-content-pane {
    padding: 12px;
  }
}
</style>

