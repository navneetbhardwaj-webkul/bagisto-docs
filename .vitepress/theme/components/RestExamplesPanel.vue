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
                <button class="btn-copy-section" :class="{ copied: copiedButton === 'request' }" :title="copiedButton === 'request' ? 'Copied!' : 'Copy code'" @click="copyCode('request')">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M4 1.5H10C10.8284 1.5 11.5 2.1716 11.5 3V9C11.5 9.8284 10.8284 10.5 10 10.5H4C3.1716 10.5 2.5 9.8284 2.5 9V3C2.5 2.1716 3.1716 1.5 4 1.5Z" fill="none" stroke="currentColor" stroke-width="1"/><path d="M6 5.5H12C12.8284 5.5 13.5 6.1716 13.5 7V13C13.5 13.8284 12.8284 14.5 12 14.5H6C5.1716 14.5 4.5 13.8284 4.5 13V7C4.5 6.1716 5.1716 5.5 6 5.5Z" fill="currentColor" stroke="none"/></svg>
                </button>
              </div>
              <pre><code v-html="getLanguageCode()"></code></pre>
            </div>
          </div>
        </div>

        <!-- Headers Section -->
        <div v-if="selectedExample?.headers" class="section-headers">
          <h5>Headers</h5>
          <div class="code-block">
            <div class="btn-group">
              <button class="btn-copy-section" :class="{ copied: copiedButton === 'headers' }" :title="copiedButton === 'headers' ? 'Copied!' : 'Copy headers'" @click="copyCode('headers')">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M4 1.5H10C10.8284 1.5 11.5 2.1716 11.5 3V9C11.5 9.8284 10.8284 10.5 10 10.5H4C3.1716 10.5 2.5 9.8284 2.5 9V3C2.5 2.1716 3.1716 1.5 4 1.5Z" fill="none" stroke="currentColor" stroke-width="1"/><path d="M6 5.5H12C12.8284 5.5 13.5 6.1716 13.5 7V13C13.5 13.8284 12.8284 14.5 12 14.5H6C5.1716 14.5 4.5 13.8284 4.5 13V7C4.5 6.1716 5.1716 5.5 6 5.5Z" fill="currentColor" stroke="none"/></svg>
              </button>
            </div>
            <pre><code v-html="highlightCode(selectedExample.headers, 'json')"></code></pre>
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
import { REST_API_DOCS } from '../config/api.config'
import { normalizeRestUrl, normalizeStorageUrl } from '../utils/url-normalizer'

interface Example {
  id: string
  title: string
  description?: string
  request?: string
  curl?: string
  node?: string
  react?: string
  php?: string
  headers?: string
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
const activeLanguageTab = ref('curl')
const copiedButton = ref<string | null>(null)

const languageTabs = [
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

// Helper: Parse cURL command to extract URL, method, headers, and body
const parseCurl = (curlCmd: string) => {
  // Normalize URLs first
  let normalizedCmd = normalizeRestUrl(curlCmd)
  
  let url = ''
  let method = 'GET'
  let headers: { [key: string]: string } = {}
  let body = ''

  const urlMatch = normalizedCmd.match(/(?:curl\s+[^'"]*)['"]([^'"]+)['"]|(?:curl\s+)([^\s]+)/)
  if (urlMatch) {
    url = urlMatch[1] || urlMatch[2]
  }

  const methodMatch = normalizedCmd.match(/-X\s+['"]?([A-Z]+)['"]?/i)
  if (methodMatch) {
    method = methodMatch[1]
  }

  const headerMatches = normalizedCmd.matchAll(/-H\s+['"]([^'"]+)['"]/g)
  for (const match of headerMatches) {
    const [key, value] = match[1].split(':').map(s => s.trim())
    headers[key] = value
  }

  const dataMatch = normalizedCmd.match(/-d\s+['"]([^'"]+)['"]/)
  if (dataMatch) {
    body = dataMatch[1]
  }

  return { url, method, headers, body }
}

// Auto-generate Node.js code from cURL
const generateNodeCode = (): string => {
  const curl = selectedExample.value?.curl || selectedExample.value?.request || ''
  if (!curl) return ''

  const { url, method, headers, body } = parseCurl(curl)
  
  let code = `const response = await fetch('${url}', {\n`
  code += `  method: '${method}',\n`
  code += `  headers: {\n`
  
  Object.entries(headers).forEach(([key, value]) => {
    code += `    '${key}': '${value}',\n`
  })
  
  code += `  },\n`
  
  if (body) {
    code += `  body: JSON.stringify(${body}),\n`
  }
  
  code += `});\nconst data = await response.json();\nconsole.log(data);`
  
  return code
}

// Auto-generate React code from cURL
const generateReactCode = (): string => {
  const curl = selectedExample.value?.curl || selectedExample.value?.request || ''
  if (!curl) return ''

  const { url, method, headers, body } = parseCurl(curl)
  
  let code = `import { useEffect, useState } from 'react';\n\n`
  code += `function Component() {\n`
  code += `  const [data, setData] = useState(null);\n\n`
  code += `  useEffect(() => {\n`
  code += `    fetch('${url}', {\n`
  code += `      method: '${method}',\n`
  code += `      headers: {\n`
  
  Object.entries(headers).forEach(([key, value]) => {
    code += `        '${key}': '${value}',\n`
  })
  
  code += `      },\n`
  
  if (body) {
    code += `      body: JSON.stringify(${body}),\n`
  }
  
  code += `    })\n`
  code += `      .then(res => res.json())\n`
  code += `      .then(data => setData(data));\n`
  code += `  }, []);\n\n`
  code += `  return <div>{JSON.stringify(data)}</div>;\n`
  code += `}`
  
  return code
}

// Auto-generate PHP code from cURL
const generatePhpCode = (): string => {
  const curl = selectedExample.value?.curl || selectedExample.value?.request || ''
  if (!curl) return ''

  const { url, method, headers, body } = parseCurl(curl)
  
  let code = `<?php\n`
  code += `$ch = curl_init('${url}');\n`
  code += `curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\n`
  code += `curl_setopt($ch, CURLOPT_CUSTOMREQUEST, '${method}');\n\n`
  
  if (Object.keys(headers).length > 0) {
    code += `$headers = [\n`
    Object.entries(headers).forEach(([key, value]) => {
      code += `  '${key}: ${value}',\n`
    })
    code += `];\n`
    code += `curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);\n\n`
  }
  
  if (body) {
    code += `curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(${body}));\n\n`
  }
  
  code += `$response = curl_exec($ch);\n`
  code += `$data = json_decode($response, true);\n`
  code += `print_r($data);\n`
  code += `?>`
  
  return code
}

// Get language-specific code
const getLanguageCode = (): string => {
  if (!selectedExample.value) return ''
  
  let lang = 'bash'
  let code = selectedExample.value.curl || selectedExample.value.request || ''
  
  switch (activeLanguageTab.value) {
    case 'curl':
      lang = 'bash'
      code = selectedExample.value.curl || selectedExample.value.request || ''
      break
    case 'node':
      lang = 'javascript'
      code = selectedExample.value.node || generateNodeCode()
      break
    case 'react':
      lang = 'jsx'
      code = selectedExample.value.react || generateReactCode()
      break
    case 'php':
      lang = 'php'
      code = selectedExample.value.php || generatePhpCode()
      break
  }
  
  // Normalize URLs in all code
  code = normalizeRestUrl(code)
  code = normalizeStorageUrl(code)
  
  return highlightCode(code, lang)
}

const highlightCode = (code: string, lang: string): string => {
  const escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

  if (lang === 'json') {
    return escaped
      .replace(/"([^"]*)":/g, '<span class="key">"$1"</span>:')
      .replace(/:\s*(true|false|null)/g, ': <span class="value">$1</span>')
      .replace(/:\s*(\d+(?:\.\d+)?)/g, ': <span class="number">$1</span>')
      .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
  }

  return escaped
}

const copyCode = (tabType: 'request' | 'headers' | 'response') => {
  if (!selectedExample.value) return

  let codeText = ''
  
  if (tabType === 'request') {
    switch (activeLanguageTab.value) {
      case 'curl':
        codeText = selectedExample.value.curl || selectedExample.value.request || ''
        break
      case 'node':
        codeText = selectedExample.value.node || ''
        break
      case 'react':
        codeText = selectedExample.value.react || ''
        break
      case 'php':
        codeText = selectedExample.value.php || ''
        break
      default:
        codeText = selectedExample.value.request || selectedExample.value.curl || ''
    }
  } else if (tabType === 'headers') {
    codeText = selectedExample.value.headers
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

const openSwagger = () => {
  if (!selectedExample.value) return
  
  const curl = selectedExample.value.curl || selectedExample.value.request || ''
  
  // Extract URL from curl command - match http:// or https:// URLs
  const urlMatch = curl.match(/https?:\/\/[^\s'"]+/)
  if (urlMatch) {
    let endpoint = urlMatch[0]
    
    // Remove any trailing flags or quotes
    endpoint = endpoint.replace(/['"].*$/, '')
    
    // Normalize the URL using the normalizer
    endpoint = normalizeRestUrl(endpoint)
    
    // Open the endpoint directly to test it
    window.open(endpoint, '_blank')
  } else {
    // Fallback: open Swagger UI if we can't extract endpoint
    window.open(REST_API_DOCS, '_blank')
  }
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

.section-headers,
.section-response {
  margin-top: 16px;
}

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

.btn-copy-section {
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

.btn-copy-section:hover {
  color: var(--vp-c-brand);
  background: rgba(var(--vp-c-brand-rgb), 0.15);
}

.btn-copy-section.copied,
.btn-copy-section.copied:hover {
  color: #fff;
  background: #22c55e;
}

.btn-test-swagger {
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

.btn-test-swagger:hover {
  color: #fff;
  background: var(--vp-c-brand);
}

.btn-copy-section.copied svg {
  animation: checkmark 0.5s ease;
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
