/**
 * Professional Code Tabs with Advanced Features
 * Shopify-style implementation with copy, GraphiQL, and description toggle
 */

export function initializeCodeTabs() {
  if (typeof window === 'undefined') {
    console.log('[CodeTabs] Window not available')
    return
  }

  console.log('[CodeTabs] Starting initialization...')

  // Use requestAnimationFrame to ensure DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('[CodeTabs] DOMContentLoaded fired')
      requestAnimationFrame(setupAllTabs)
    })
  } else {
    console.log('[CodeTabs] DOM already loaded')
    requestAnimationFrame(setupAllTabs)
  }

  // Re-initialize on navigation
  window.addEventListener('hashchange', () => {
    console.log('[CodeTabs] Hash changed')
    requestAnimationFrame(setupAllTabs)
  })
}

function setupAllTabs() {
  console.log('[CodeTabs] setupAllTabs called')
  const tabContainers = document.querySelectorAll('.code-tabs-container')
  console.log('[CodeTabs] Found', tabContainers.length, 'containers')

  if (tabContainers.length === 0) {
    console.warn('[CodeTabs] No containers found on page')
    // Try again after a delay - content might not be ready yet
    console.log('[CodeTabs] Retrying in 100ms...')
    setTimeout(setupAllTabs, 100)
    return
  }

  let setupCount = 0
  tabContainers.forEach((container, idx) => {
    const alreadyInit = (container as any)._tabsInitialized
    console.log('[CodeTabs] Container', idx, 'initialized:', alreadyInit)
    
    if (!alreadyInit) {
      console.log('[CodeTabs] Setting up container', idx)
      setupTabContainer(container as HTMLElement)
      ;(container as any)._tabsInitialized = true
      setupCount++
    }
  })
  
  console.log('[CodeTabs] Initialized', setupCount, 'new containers')
}

function setupTabContainer(container: HTMLElement) {
  console.log('[CodeTabs] Setting up container')
  
  const tabButtons = Array.from(container.querySelectorAll<HTMLButtonElement>('.code-tab'))
  const tabContents = Array.from(container.querySelectorAll<HTMLElement>('.tab-content'))
  
  console.log('[CodeTabs] Found', tabButtons.length, 'buttons and', tabContents.length, 'content panes')

  if (tabButtons.length === 0 || tabContents.length === 0) {
    console.warn('[CodeTabs] Missing buttons or content!')
    return
  }

  const copyBtn = container.querySelector<HTMLButtonElement>('.btn-copy')
  const graphiqlBtn = container.querySelector<HTMLButtonElement>('.btn-graphiql')
  const descriptionBtn = container.querySelector<HTMLButtonElement>('.btn-description')
  const descriptionPanel = container.querySelector<HTMLElement>('.description-panel')

  // Add click handlers to each tab button
  tabButtons.forEach((button, index) => {
    console.log('[CodeTabs] Adding handler to button', index)
    
    button.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      console.log('[CodeTabs] Button', index, 'clicked!')
      switchTab(container, index)
    })

    // Keyboard navigation
    button.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        switchTab(container, index)
      } else if (e.key === 'ArrowRight') {
        const nextIndex = (index + 1) % tabButtons.length
        tabButtons[nextIndex].focus()
        switchTab(container, nextIndex)
      } else if (e.key === 'ArrowLeft') {
        const prevIndex = (index - 1 + tabButtons.length) % tabButtons.length
        tabButtons[prevIndex].focus()
        switchTab(container, prevIndex)
      }
    })
  })

  // Copy button functionality
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      copyActiveCode(container)
    })
  }

  // GraphiQL button functionality
  if (graphiqlBtn) {
    graphiqlBtn.addEventListener('click', () => {
      openGraphiQL(container)
    })
  }

  // Description toggle
  if (descriptionBtn) {
    descriptionBtn.addEventListener('click', () => {
      if (descriptionPanel) {
        const panel = descriptionPanel as HTMLElement
        const isVisible = panel.style.display !== 'none'
        panel.style.display = isVisible ? 'none' : 'block'
        descriptionBtn.classList.toggle('active', !isVisible)
      }
    })
  }
}

function switchTab(container: HTMLElement, index: number) {
  console.log('[CodeTabs] switchTab called with index:', index)
  
  const tabButtons = Array.from(container.querySelectorAll<HTMLButtonElement>('.code-tab'))
  const tabContents = Array.from(container.querySelectorAll<HTMLElement>('.tab-content'))

  console.log('[CodeTabs] Switching to tab', index, 'out of', tabButtons.length)

  // Deactivate all
  tabButtons.forEach((btn, idx) => {
    btn.classList.remove('active')
    btn.setAttribute('aria-selected', 'false')
    console.log('[CodeTabs] Deactivated button', idx)
  })
  
  tabContents.forEach((content, idx) => {
    content.classList.remove('active')
    console.log('[CodeTabs] Deactivated content', idx)
  })

  // Activate selected
  if (tabButtons[index]) {
    console.log('[CodeTabs] Activating button', index)
    tabButtons[index].classList.add('active')
    tabButtons[index].setAttribute('aria-selected', 'true')
  }
  
  if (tabContents[index]) {
    console.log('[CodeTabs] Activating content', index)
    tabContents[index].classList.add('active')
  }
  
  console.log('[CodeTabs] Tab switch complete')
}

function copyActiveCode(container: Element) {
  const activeContent = container.querySelector('.tab-content.active')
  if (!activeContent) {
    console.warn('[CodeTabs] No active content found')
    return
  }

  const codeElement = activeContent.querySelector('code')
  if (!codeElement) {
    console.warn('[CodeTabs] No code element found')
    return
  }

  const code = codeElement.textContent || ''
  const copyBtn = container.querySelector('.btn-copy') as HTMLElement

  if (!copyBtn) {
    console.warn('[CodeTabs] No copy button found')
    return
  }

  console.log('[CodeTabs] Copying code:', code.substring(0, 50) + '...')

  // Try modern Clipboard API first
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).then(() => {
      showCopyFeedback(copyBtn)
    }).catch((err) => {
      console.warn('[CodeTabs] Clipboard API failed, trying fallback', err)
      copyUsingFallback(code, copyBtn)
    })
  } else {
    console.log('[CodeTabs] Clipboard API not available, using fallback')
    copyUsingFallback(code, copyBtn)
  }
}

function copyUsingFallback(code: string, button: HTMLElement) {
  try {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea')
    textarea.value = code
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    textarea.style.pointerEvents = 'none'
    document.body.appendChild(textarea)

    // Select and copy
    textarea.select()
    textarea.setSelectionRange(0, 99999) // For mobile

    const successful = document.execCommand('copy')
    
    // Remove the temporary element
    document.body.removeChild(textarea)

    if (successful) {
      console.log('[CodeTabs] Fallback copy successful')
      showCopyFeedback(button)
    } else {
      console.error('[CodeTabs] Fallback copy failed')
    }
  } catch (err) {
    console.error('[CodeTabs] Fallback copy error:', err)
  }
}

function showCopyFeedback(button: HTMLElement) {
  // Just add a visual feedback class temporarily
  button.classList.add('copied')

  setTimeout(() => {
    button.classList.remove('copied')
  }, 1500)
}

function openGraphiQL(container: Element) {
  const activeContent = container.querySelector('.tab-content.active')
  if (!activeContent) return

  const codeElement = activeContent.querySelector('code')
  if (!codeElement) return

  const code = codeElement.textContent || ''

  // Encode for GraphiQL URL
  const encoded = encodeURIComponent(code)

  // Open GraphiQL in a new window with the query
  // Replace with your actual GraphiQL endpoint
  const graphiqlUrl = `/graphql?query=${encoded}`

  window.open(graphiqlUrl, 'graphiql', 'width=1200,height=800')
}

// Initialize when script loads
if (typeof window !== 'undefined') {
  // Make switchTab available globally as fallback
  ;(window as any).__switchTab = function(button: HTMLElement, index: number) {
    console.log('[CodeTabs] Global __switchTab called with index:', index)
    const container = button.closest('.code-tabs-container') as HTMLElement
    if (container) {
      switchTab(container, index)
    }
  }
  
  initializeCodeTabs()
}
