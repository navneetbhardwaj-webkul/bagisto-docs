/**
 * Tab Management Script for API Documentation
 * Handles interactive tab switching for code examples
 */

export function initTabs() {
  // Initialize on document ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAllTabs)
  } else {
    initializeAllTabs()
  }

  // Also watch for dynamic content (navigation)
  window.addEventListener('hashchange', () => {
    setTimeout(initializeAllTabs, 100)
  })
}

function initializeAllTabs() {
  const tabContainers = document.querySelectorAll('.api-tabs')

  tabContainers.forEach((container) => {
    // Skip if already initialized
    if (container.getAttribute('data-initialized') === 'true') {
      return
    }

    setupTabContainer(container)
    container.setAttribute('data-initialized', 'true')
  })
}

function setupTabContainer(container: Element) {
  const buttons = container.querySelectorAll('.tab-btn')
  const panes = container.querySelectorAll('.tab-content-pane')

  if (buttons.length === 0 || panes.length === 0) {
    return
  }

  // Add click handlers to all buttons
  buttons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
      e.preventDefault()
      switchToTab(container, index)
    })

    // Optional: keyboard support
    button.addEventListener('keydown', (e: any) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        switchToTab(container, index)
      } else if (e.key === 'ArrowRight') {
        const nextIndex = (index + 1) % buttons.length
        const nextButton = buttons[nextIndex] as HTMLElement
        nextButton.focus()
        switchToTab(container, nextIndex)
      } else if (e.key === 'ArrowLeft') {
        const prevIndex = (index - 1 + buttons.length) % buttons.length
        const prevButton = buttons[prevIndex] as HTMLElement
        prevButton.focus()
        switchToTab(container, prevIndex)
      }
    })
  })

  // Make buttons focusable
  buttons.forEach((button) => {
    if (!button.hasAttribute('tabindex')) {
      button.setAttribute('tabindex', '0')
    }
  })
}

function switchToTab(container: Element, index: number) {
  const buttons = container.querySelectorAll('.tab-btn')
  const panes = container.querySelectorAll('.tab-content-pane')

  // Deactivate all buttons and panes
  buttons.forEach((btn) => {
    btn.classList.remove('active')
    btn.setAttribute('aria-selected', 'false')
  })

  panes.forEach((pane) => {
    pane.classList.remove('visible')
  })

  // Activate selected button and pane
  if (buttons[index]) {
    buttons[index].classList.add('active')
    buttons[index].setAttribute('aria-selected', 'true')
  }

  if (panes[index]) {
    panes[index].classList.add('visible')
  }
}

// Initialize when script loads
if (typeof window !== 'undefined') {
  initTabs()
}
