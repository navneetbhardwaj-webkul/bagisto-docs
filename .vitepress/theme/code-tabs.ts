/**
 * Professional Code Tabs with Advanced Features
 * Shopify-style implementation with copy, GraphiQL, and description toggle
 */

export function initializeCodeTabs() {
  if (typeof window === 'undefined') {
    return
  }

  // Use requestAnimationFrame to ensure DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      requestAnimationFrame(setupAllTabs)
    })
  } else {
    requestAnimationFrame(setupAllTabs)
  }

  // Re-initialize on navigation
  window.addEventListener('hashchange', () => {
    retryCount = 0 // Reset retry count on navigation
    requestAnimationFrame(setupAllTabs)
  })
}

let retryCount = 0
const MAX_RETRIES = 3

function setupAllTabs() {
  const tabContainers = document.querySelectorAll('.code-tabs-container')

  if (tabContainers.length === 0) {
    // Only retry a limited number of times to prevent console spam
    if (retryCount < MAX_RETRIES) {
      retryCount++
      setTimeout(setupAllTabs, 100)
    }
    return
  }

  // Reset retry count on success
  retryCount = 0

  let setupCount = 0
  tabContainers.forEach((container) => {
    const alreadyInit = (container as any)._tabsInitialized
    
    if (!alreadyInit) {
      setupTabContainer(container as HTMLElement)
      ;(container as any)._tabsInitialized = true
      setupCount++
    }
  })
}

function setupTabContainer(container: HTMLElement) {
  const tabButtons = Array.from(container.querySelectorAll<HTMLButtonElement>('.code-tab'))
  const tabContents = Array.from(container.querySelectorAll<HTMLElement>('.tab-content'))

  if (tabButtons.length === 0 || tabContents.length === 0) {
    return
  }

  const copyBtn = container.querySelector<HTMLButtonElement>('.btn-copy')
  const graphiqlBtn = container.querySelector<HTMLButtonElement>('.btn-graphiql')
  const descriptionBtn = container.querySelector<HTMLButtonElement>('.btn-description')
  const descriptionPanel = container.querySelector<HTMLElement>('.description-panel')

  // Add click handlers to each tab button
  tabButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
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
  const tabButtons = Array.from(container.querySelectorAll<HTMLButtonElement>('.code-tab'))
  const tabContents = Array.from(container.querySelectorAll<HTMLElement>('.tab-content'))

  // Deactivate all
  tabButtons.forEach((btn) => {
    btn.classList.remove('active')
    btn.setAttribute('aria-selected', 'false')
  })
  
  tabContents.forEach((content) => {
    content.classList.remove('active')
  })

  // Activate selected
  if (tabButtons[index]) {
    tabButtons[index].classList.add('active')
    tabButtons[index].setAttribute('aria-selected', 'true')
  }
  
  if (tabContents[index]) {
    tabContents[index].classList.add('active')
  }
}

function copyActiveCode(container: Element) {
  const activeContent = container.querySelector('.tab-content.active')
  if (!activeContent) {
    return
  }

  const codeElement = activeContent.querySelector('code')
  if (!codeElement) {
    return
  }

  const code = codeElement.textContent || ''
  const copyBtn = container.querySelector('.btn-copy') as HTMLElement

  if (!copyBtn) {
    return
  }

  // Try modern Clipboard API first
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).then(() => {
      showCopyFeedback(copyBtn)
    }).catch(() => {
      copyUsingFallback(code, copyBtn)
    })
  } else {
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
      showCopyFeedback(button)
    }
  } catch (err) {
    // Copy failed silently
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
    const container = button.closest('.code-tabs-container') as HTMLElement
    if (container) {
      switchTab(container, index)
    }
  }
  
  initializeCodeTabs()
}
