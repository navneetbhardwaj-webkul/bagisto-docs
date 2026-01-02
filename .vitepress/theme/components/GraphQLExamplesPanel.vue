<template>
  <aside class="examples-sidebar">
    <div class="examples-container">
      <div class="examples-header">
        <h3>Examples</h3>
      </div>

      <!-- Example Selector Dropdown -->
      <div class="example-selector">
        <label for="example-select">Select Example:</label>
        <select id="example-select" v-model="selectedExampleId" class="example-dropdown">
          <option v-for="example in examples" :key="example.id" :value="example.id">
            {{ example.title }}
          </option>
        </select>
      </div>

      <!-- Example Content -->
      <div v-if="selectedExample" class="example-content">
        <h4>{{ selectedExample.title }}</h4>
        <p v-if="selectedExample.description" class="example-description">
          {{ selectedExample.description }}
        </p>

        <!-- Language Tabs -->
        <div class="language-tabs">
          <div class="language-tabs-header">
            <button
              v-for="tab in languageTabs"
              :key="tab.id"
              :class="['language-tab-btn', { active: activeLanguageTab === tab.id }]"
              @click="activeLanguageTab = tab.id"
            >
              {{ tab.label }}
            </button>
          </div>

          <!-- Code Content (varies by language tab) -->
          <div class="language-tab-content">
            <div class="code-block">
              <div class="btn-group">
                <button class="btn-copy-section" :class="{ copied: copiedButton === 'query' }" :title="copiedButton === 'query' ? 'Copied!' : 'Copy code'" @click="copyCode('query')">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M4 1.5H10C10.8284 1.5 11.5 2.1716 11.5 3V9C11.5 9.8284 10.8284 10.5 10 10.5H4C3.1716 10.5 2.5 9.8284 2.5 9V3C2.5 2.1716 3.1716 1.5 4 1.5Z" fill="none" stroke="currentColor" stroke-width="1"/><path d="M6 5.5H12C12.8284 5.5 13.5 6.1716 13.5 7V13C13.5 13.8284 12.8284 14.5 12 14.5H6C5.1716 14.5 4.5 13.8284 4.5 13V7C4.5 6.1716 5.1716 5.5 6 5.5Z" fill="currentColor" stroke="none"/></svg>
                </button>
                <button class="btn-play-section" title="Run in GraphiQL" @click="runGraphiQL()">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M3.5 2C3.22386 2 3 2.22386 3 2.5V13.5C3 13.7761 3.22386 14 3.5 14C3.77614 14 4 13.7761 4 13.5V2.5C4 2.22386 3.77614 2 3.5 2Z" fill="currentColor"/><path d="M13.5 8L5 12.5L5 3.5L13.5 8Z" fill="currentColor"/></svg>
                </button>
                <button class="btn-info-section" title="Documentation" @click="showInfo = !showInfo">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM8 2.5C10.9375 2.5 13.5 5.0625 13.5 8C13.5 10.9375 10.9375 13.5 8 13.5C5.0625 13.5 2.5 10.9375 2.5 8C2.5 5.0625 5.0625 2.5 8 2.5ZM8 4C7.58579 4 7.25 4.33579 7.25 4.75V8C7.25 8.41421 7.58579 8.75 8 8.75C8.41421 8.75 8.75 8.41421 8.75 8V4.75C8.75 4.33579 8.41421 4 8 4ZM8 10C7.72386 10 7.5 10.2239 7.5 10.5C7.5 10.7761 7.72386 11 8 11C8.27614 11 8.5 10.7761 8.5 10.5C8.5 10.2239 8.27614 10 8 11Z" fill="currentColor"/></svg>
                </button>
              </div>
              <pre><code v-html="getLanguageCode()"></code></pre>
            </div>
          </div>
        </div>

        <!-- Variables Section -->
        <div v-if="selectedExample?.variables" class="section-variables">
          <h5>Variables</h5>
          <div class="code-block">
            <div class="btn-group">
              <button class="btn-copy-section" :class="{ copied: copiedButton === 'variables' }" :title="copiedButton === 'variables' ? 'Copied!' : 'Copy variables'" @click="copyCode('variables')">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M4 1.5H10C10.8284 1.5 11.5 2.1716 11.5 3V9C11.5 9.8284 10.8284 10.5 10 10.5H4C3.1716 10.5 2.5 9.8284 2.5 9V3C2.5 2.1716 3.1716 1.5 4 1.5Z" fill="none" stroke="currentColor" stroke-width="1"/><path d="M6 5.5H12C12.8284 5.5 13.5 6.1716 13.5 7V13C13.5 13.8284 12.8284 14.5 12 14.5H6C5.1716 14.5 4.5 13.8284 4.5 13V7C4.5 6.1716 5.1716 5.5 6 5.5Z" fill="currentColor" stroke="none"/></svg>
              </button>
            </div>
            <pre><code v-html="highlightCode(selectedExample.variables, 'json')"></code></pre>
          </div>
        </div>

        <!-- Response Section -->
        <div class="section-response">
          <h5>Response</h5>
          <div class="code-block">
            <div class="btn-group">
              <button class="btn-copy-section" :class="{ copied: copiedButton === 'response' }" :title="copiedButton === 'response' ? 'Copied!' : 'Copy response'" @click="copyCode('response')">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M4 1.5H10C10.8284 1.5 11.5 2.1716 11.5 3V9C11.5 9.8284 10.8284 10.5 10 10.5H4C3.1716 10.5 2.5 9.8284 2.5 9V3C2.5 2.1716 3.1716 1.5 4 1.5Z" fill="none" stroke="currentColor" stroke-width="1"/><path d="M6 5.5H12C12.8284 5.5 13.5 6.1716 13.5 7V13C13.5 13.8284 12.8284 14.5 12 14.5H6C5.1716 14.5 4.5 13.8284 4.5 13V7C4.5 6.1716 5.1716 5.5 6 5.5Z" fill="currentColor" stroke="none"/></svg>
              </button>
            </div>
            <pre><code v-html="highlightCode(selectedExample.response, 'json')"></code></pre>
          </div>
        </div>

        <!-- Common Errors Section -->
        <div v-if="selectedExample.commonErrors && selectedExample.commonErrors.length > 0" class="section-errors">
          <h5>Common Errors</h5>
          <div class="errors-list">
            <div v-for="error in selectedExample.commonErrors" :key="error.error" class="error-item">
              <div class="error-code">
                <strong>{{ error.error }}</strong>
              </div>
              <div class="error-details">
                <p><strong>Cause:</strong> {{ error.cause }}</p>
                <p><strong>Solution:</strong> {{ error.solution }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { GRAPHQL_ENDPOINT } from '../config/api.config'
import { normalizeGraphQLUrl, normalizeStorageUrl } from '../utils/url-normalizer'

interface Example {
  id: string
  title: string
  description?: string
  query: string
  variables?: string
  response: string
  commonErrors?: Array<{
    error: string
    cause: string
    solution: string
  }>
}

interface Props {
  examples?: Example[]
}

const props = withDefaults(defineProps<Props>(), {
  examples: () => []
})

const selectedExampleId = ref('')
const activeLanguageTab = ref('gql')
const showInfo = ref(false)
const copiedButton = ref<string | null>(null)

const languageTabs = [
  { id: 'gql', label: 'GraphQL' },
  { id: 'curl', label: 'cURL' },
  { id: 'node', label: 'Node.js' },
  { id: 'react', label: 'React' },
  { id: 'php', label: 'PHP' }
]

// Auto-select first example when examples change
watch(() => props.examples, (newExamples) => {
  if (newExamples.length > 0) {
    selectedExampleId.value = newExamples[0].id
  } else {
    selectedExampleId.value = ''
  }
}, { immediate: true, deep: true })

const selectedExample = computed(() => {
  return props.examples.find(ex => ex.id === selectedExampleId.value)
})

// Get language-specific code
const getLanguageCode = (): string => {
  if (!selectedExample.value) return ''
  
  let lang = 'graphql'
  let code = selectedExample.value.query
  
  switch (activeLanguageTab.value) {
    case 'curl':
      lang = 'bash'
      code = generateCurlCode()
      break
    case 'node':
      lang = 'javascript'
      code = generateNodeCode()
      break
    case 'react':
      lang = 'jsx'
      code = generateReactCode()
      break
    case 'php':
      lang = 'php'
      code = generatePhpCode()
      break
    default: // gql
      lang = 'graphql'
      code = selectedExample.value.query
  }
  
  // Normalize URLs in all code
  code = normalizeGraphQLUrl(code)
  code = normalizeStorageUrl(code)
  
  return highlightCode(code, lang)
}

// Generate curl command
const generateCurlCode = (): string => {
  if (!selectedExample.value) return ''
  const query = selectedExample.value.query.replace(/"/g, '\\"')
  const variables = selectedExample.value.variables
  return `curl -X POST https://your-bagisto.com/graphql \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "${query}",
    "variables": ${variables}
  }'`
}

// Generate Node.js code
const generateNodeCode = (): string => {
  if (!selectedExample.value) return ''
  return `const query = \`${selectedExample.value.query}\`;
const variables = ${selectedExample.value.variables};

const response = await fetch('https://your-bagisto.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${accessToken}\`
  },
  body: JSON.stringify({ query, variables })
});

const data = await response.json();
console.log(data);`
}

// Generate React code
const generateReactCode = (): string => {
  if (!selectedExample.value) return ''
  return `import { useQuery, gql } from '@apollo/client';

const QUERY = gql\`${selectedExample.value.query}\`;

function MyComponent() {
  const { loading, error, data } = useQuery(QUERY, {
    variables: ${selectedExample.value.variables}
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <div>{/* Your component */}</div>;
}`;
}

// Generate PHP code
const generatePhpCode = (): string => {
  if (!selectedExample.value) return ''
  return `<?php

$query = <<<'GRAPHQL'
${selectedExample.value.query}
GRAPHQL;

$variables = ${selectedExample.value.variables};

$ch = curl_init('https://your-bagisto.com/graphql');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $accessToken
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'query' => $query,
    'variables' => $variables
]));

$response = curl_exec($ch);
$data = json_decode($response, true);

print_r($data);
?>`;
}

const highlightCode = (code: string, lang: string): string => {
  const escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

  if (lang === 'graphql') {
    return escaped
      .replace(/\b(query|mutation|subscription|fragment|on|schema)\b/g, '<span class="keyword">$1</span>')
      .replace(/\b(String|Int|Float|Boolean|ID)\b/g, '<span class="type">$1</span>')
  }

  if (lang === 'json') {
    return escaped
      .replace(/"([^"]*)":/g, '<span class="key">"$1"</span>:')
      .replace(/:\s*(true|false|null)/g, ': <span class="value">$1</span>')
      .replace(/:\s*(\d+(?:\.\d+)?)/g, ': <span class="number">$1</span>')
      .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
  }

  return escaped
}

const copyCode = (tabType: 'query' | 'variables' | 'response') => {
  if (!selectedExample.value) return

  let codeText = ''
  
  if (tabType === 'query') {
    switch (activeLanguageTab.value) {
      case 'curl':
        codeText = generateCurlCode()
        break
      case 'node':
        codeText = generateNodeCode()
        break
      case 'react':
        codeText = generateReactCode()
        break
      case 'php':
        codeText = generatePhpCode()
        break
      default: // gql
        codeText = selectedExample.value.query
    }
  } else if (tabType === 'variables') {
    codeText = selectedExample.value.variables
  } else if (tabType === 'response') {
    codeText = selectedExample.value.response
  }

  if (navigator.clipboard) {
    navigator.clipboard.writeText(codeText).then(() => {
      copiedButton.value = tabType
      setTimeout(() => {
        copiedButton.value = null
      }, 2000)
    }).catch(() => {
      fallbackCopy(codeText)
    })
  } else {
    fallbackCopy(codeText)
  }
}

const fallbackCopy = (text: string) => {
  const textarea = document.createElement('textarea')
  textarea.value = text
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

const runGraphiQL = () => {
  if (!selectedExample.value || !selectedExample.value.query) return
  
  const query = selectedExample.value.query
  const variables = selectedExample.value.variables
  
  const encodedQuery = encodeURIComponent(query)
  const encodedVariables = encodeURIComponent(variables || '{}')
  
  const graphiQLUrl = `${GRAPHQL_ENDPOINT}?query=${encodedQuery}&variables=${encodedVariables}`
  
  window.open(graphiQLUrl, '_blank')
}
</script>

<style scoped>
.examples-sidebar {
  position: static;
  width: 100%;
  height: auto;
  padding: 0;
  background: transparent;
  border: none;
  overflow: visible;
  margin-top: 0;
}

.examples-container {
  max-width: 100%;
  width: 100%;
}

.examples-header {
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--vp-c-brand);
}

.examples-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.example-selector {
  margin-bottom: 16px;
  position: relative;
}

.example-selector label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.example-dropdown {
  width: 100%;
  padding: 10px 12px 10px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  padding-right: 32px;
}

.example-dropdown:hover {
  border-color: var(--vp-c-brand);
}

.example-dropdown:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 2px rgba(var(--vp-c-brand-rgb), 0.1);
}

.example-content {
  margin-top: 16px;
}

.example-content h4 {
  margin: 0 0 6px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.example-description {
  margin: 0 0 12px 0;
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.language-tabs {
  margin-bottom: 16px;
}

.language-tabs-header {
  display: flex;
  gap: 4px;
  margin-bottom: 0;
  border-bottom: 1px solid var(--vp-c-divider);
  padding: 0;
  overflow-x: auto;
  overflow-y: hidden;
  flex-wrap: nowrap;
  align-items: center;
  scrollbar-width: thin;
  scrollbar-color: var(--vp-c-divider) transparent;
}

.language-tabs-header::-webkit-scrollbar {
  height: 4px;
}

.language-tabs-header::-webkit-scrollbar-track {
  background: transparent;
}

.language-tabs-header::-webkit-scrollbar-thumb {
  background: var(--vp-c-divider);
  border-radius: 2px;
}

.language-tabs-header::-webkit-scrollbar-thumb:hover {
  background: var(--vp-c-text-2);
}

.language-tab-btn {
  padding: 6px 10px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  border-bottom: 2px solid transparent;
  margin: 0;
  flex-shrink: 0;
}

.language-tab-btn:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.language-tab-btn.active {
  color: var(--vp-c-brand);
  border-bottom-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  border-radius: 4px 4px 0 0;
  font-weight: 700;
}

.language-tab-content {
  animation: fadeIn 0.2s ease;
  padding: 0 !important
}

.section-variables,
.section-headers,
.section-response {
  margin-top: 16px;
}

.section-variables h5,
.section-headers h5,
.section-response h5 {
  margin: 0 0 8px 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes checkmark {
  0% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.2) rotate(10deg); }
  100% { transform: scale(1) rotate(0deg); }
}

.code-block {
  position: relative;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  overflow: hidden;
}

.code-block pre {
  margin: 0;
  padding: 40px 40px 12px 12px;
  overflow-x: auto;
  font-size: 12px;
  line-height: 1.5;
  max-height: 300px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--vp-c-divider) transparent;
}

.code-block pre::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.code-block pre::-webkit-scrollbar-track {
  background: transparent;
}

.code-block pre::-webkit-scrollbar-thumb {
  background: var(--vp-c-divider);
  border-radius: 2px;
}

.code-block pre::-webkit-scrollbar-thumb:hover {
  background: var(--vp-c-text-2);
}

.code-block code {
  font-family: 'Courier New', monospace;
  color: var(--vp-c-text-1);
}

.btn-copy-section,
.btn-play-section,
.btn-info-section {
  padding: 6px;
  border: none;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand);
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
}

.btn-group {
  display: flex;
  gap: 4px;
  align-items: center;
  position: absolute;
  top: 8px;
  right: 20px;
  z-index: 10;
}

.btn-copy-section:hover,
.btn-play-section:hover,
.btn-info-section:hover {
  color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.15);
}

.btn-copy-section.copied,
.btn-copy-section.copied:hover {
  color: #fff;
  background: #22c55e;
}

.btn-copy-section.copied svg {
  animation: checkmark 0.5s ease;
}

:deep(.keyword) {
  color: #d73a49;
}

:deep(.type) {
  color: #6f42c1;
}

:deep(.key) {
  color: #0184bc;
}

:deep(.string) {
  color: #032f62;
}

:deep(.value) {
  color: #d73a49;
}

:deep(.number) {
  color: #005cc5;
}

:root.dark {
  --keyword-color: #f97583;
  --type-color: #b392f0;
  --key-color: #79b8ff;
  --string-color: #9ecbff;
  --value-color: #f97583;
  --number-color: #85e89d;
}

:root.dark :deep(.keyword) {
  color: #f97583;
}

:root.dark :deep(.type) {
  color: #b392f0;
}

:root.dark :deep(.key) {
  color: #79b8ff;
}

:root.dark :deep(.string) {
  color: #9ecbff;
}

:root.dark :deep(.value) {
  color: #f97583;
}

:root.dark :deep(.number) {
  color: #85e89d;
}

:root.dark .language-tab-btn:hover {
  background: var(--vp-c-bg-mute);
}

:root.dark .language-tab-btn.active {
  background: rgba(var(--vp-c-brand-rgb), 0.15);
}

.section-errors {
  margin-top: 16px;
}

.section-errors h5 {
  margin: 0 0 12px 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.errors-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.error-item {
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 10px 12px;
  background: var(--vp-c-bg-soft);
}

.error-code {
  margin-bottom: 6px;
  font-size: 12px;
  color: #d73a49;
  font-family: 'Courier New', monospace;
}

.error-code strong {
  font-weight: 600;
}

.error-details {
  font-size: 12px;
  line-height: 1.4;
}

.error-details p {
  margin: 4px 0;
  color: var(--vp-c-text-2);
}

.error-details strong {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

:root.dark .error-code {
  color: #f97583;
}

:root.dark .error-item {
  background: rgba(0, 0, 0, 0.2);
}

:root.dark .example-dropdown {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23aaa' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E");
}

@media (max-width: 1200px) {
  .examples-sidebar {
    position: static;
    height: auto;
    border: none;
    margin-top: 40px;
    padding: 40px 0;
  }
}
</style>
