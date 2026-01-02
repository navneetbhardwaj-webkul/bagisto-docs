<template>
  <div class="api-config-display">
    <div class="config-card">
      <div class="config-item">
        <span class="label">REST API:</span>
        <code class="url">{{ restUrl }}</code>
        <button @click="copyToClipboard(restUrl)" class="copy-btn" :title="`Copy ${restUrl}`">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 1.5H10C10.8284 1.5 11.5 2.1716 11.5 3V9C11.5 9.8284 10.8284 10.5 10 10.5H4C3.1716 10.5 2.5 9.8284 2.5 9V3C2.5 2.1716 3.1716 1.5 4 1.5Z" fill="none" stroke="currentColor" stroke-width="1"/>
            <path d="M6 5.5H12C12.8284 5.5 13.5 6.1716 13.5 7V13C13.5 13.8284 12.8284 14.5 12 14.5H6C5.1716 14.5 4.5 13.8284 4.5 13V7C4.5 6.1716 5.1716 5.5 6 5.5Z" fill="currentColor" stroke="none"/>
          </svg>
        </button>
      </div>
      <div class="config-item">
        <span class="label">GraphQL API:</span>
        <code class="url">{{ graphqlUrl }}</code>
        <button @click="copyToClipboard(graphqlUrl)" class="copy-btn" :title="`Copy ${graphqlUrl}`">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 1.5H10C10.8284 1.5 11.5 2.1716 11.5 3V9C11.5 9.8284 10.8284 10.5 10 10.5H4C3.1716 10.5 2.5 9.8284 2.5 9V3C2.5 2.1716 3.1716 1.5 4 1.5Z" fill="none" stroke="currentColor" stroke-width="1"/>
            <path d="M6 5.5H12C12.8284 5.5 13.5 6.1716 13.5 7V13C13.5 13.8284 12.8284 14.5 12 14.5H6C5.1716 14.5 4.5 13.8284 4.5 13V7C4.5 6.1716 5.1716 5.5 6 5.5Z" fill="currentColor" stroke="none"/>
          </svg>
        </button>
      </div>
    </div>
    <div v-if="copied" class="copied-message">
      Copied to clipboard!
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { REST_API_URL, GRAPHQL_API_URL } from '../config/api.config'

const restUrl = REST_API_URL
const graphqlUrl = GRAPHQL_API_URL
const copied = ref(false)

const copyToClipboard = (text: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    })
  }
}
</script>

<style scoped>
.api-config-display {
  margin: 16px 0;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.config-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.config-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.label {
  font-weight: 600;
  color: var(--vp-c-text-1);
  min-width: 100px;
}

.url {
  padding: 4px 8px;
  background: var(--vp-c-bg);
  border-radius: 4px;
  color: var(--vp-c-text-2);
  font-family: 'Courier New', monospace;
  font-size: 12px;
  flex: 1;
  overflow-x: auto;
}

.copy-btn {
  padding: 4px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.copy-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.copied-message {
  margin-top: 8px;
  padding: 8px;
  background: var(--vp-c-green-soft);
  color: var(--vp-c-green);
  border-radius: 4px;
  font-size: 12px;
  text-align: center;
}

@media (prefers-color-scheme: dark) {
  .api-config-display {
    background: var(--vp-c-bg-alt);
  }

  .url {
    background: var(--vp-c-bg-mute);
  }
}
</style>
