import { defineConfig } from 'vitepress'
import { redirects, makeRedirectHtml } from './_redirects'
// @ts-ignore
import fs from 'fs'
// @ts-ignore
import path from 'path'

// Helper: Escape HTML special characters
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

// Helper: Get language class for syntax highlighting
function getLanguageClass(label: string): string {
  const langMap: { [key: string]: string } = {
    'gql': 'graphql',
    'graphql': 'graphql',
    'curl': 'bash',
    'node': 'javascript',
    'node.js': 'javascript',
    'nodejs': 'javascript',
    'react': 'jsx',
    'ruby': 'ruby',
    'php': 'php'
  }
  return langMap[label.toLowerCase()] || label.toLowerCase()
}

// Helper: Parse tabs content
function parseTabsContent(content: string): Array<{ label: string; code: string }> {
  const tabs: Array<{ label: string; code: string }> = []
  
  // Split by == to find each tab section
  const sections = content.split(/^== /m)
  
  for (let i = 1; i < sections.length; i++) {
    const section = sections[i]
    // First line is the label
    const lines = section.split('\n')
    const label = lines[0].trim()
    
    // Find code block
    const codeMatch = section.match(/```[\w]*\n([\s\S]*?)```/)
    if (codeMatch && codeMatch[1]) {
      tabs.push({
        label: label,
        code: codeMatch[1].trim()
      })
    }
  }

  return tabs
}

export default defineConfig({
  lang: 'en-US',
  title: "Bagisto",
  description: "Bagisto Developer Documentation",
  cleanUrls: true,

  markdown: {
    config: (md: any) => {
      // Get the original fence renderer
      const originalFence = md.renderer.rules.fence

      // Add block rule for tabs - must be before 'paragraph'
      md.block.ruler.before(
        'paragraph',
        'tabs',
        function (state: any) {
          const pos = state.bMarks[state.line] + state.tShift[state.line]
          const maximum = state.eMarks[state.line]

          // Check if line starts with :::tabs
          const lineText = state.src.slice(pos, maximum).trim()
          if (!lineText.startsWith(':::tabs')) return false

          const startLine = state.line
          let endLine = state.line + 1
          const lineMax = state.lineMax

          // Find closing :::
          while (endLine < lineMax) {
            const nextPos = state.bMarks[endLine] + state.tShift[endLine]
            const nextMax = state.eMarks[endLine]
            const nextLine = state.src.slice(nextPos, nextMax).trim()

            if (nextLine === ':::') {
              break
            }
            endLine++
          }

          if (endLine >= lineMax) {
            return false
          }

          // Extract content between :::tabs and :::
          let tabsContent = ''
          for (let i = startLine + 1; i < endLine; i++) {
            const itemPos = state.bMarks[i] + state.tShift[i]
            const itemMax = state.eMarks[i]
            tabsContent += state.src.slice(itemPos, itemMax) + '\n'
          }

          // Parse tabs
          const tabs = parseTabsContent(tabsContent)

          if (tabs.length === 0) {
            return false
          }

          // Create token
          const token = state.push('tabs_block', 'div', 0)
          token.meta = { tabs: tabs, originalFence: originalFence }
          token.map = [startLine, endLine + 1]

          state.line = endLine + 1
          return true
        }
      )

      // Add renderer for tabs
      md.renderer.rules.tabs_block = function (tokens: any[], idx: any) {
        const tabs = tokens[idx].meta.tabs
        const originalFence = tokens[idx].meta.originalFence

        let html = '<div class="code-tabs-container">'
        
        // Tab header with filters and buttons
        html += '<div class="tabs-header">'
        html += '<div class="tabs-buttons-row">'
        
        tabs.forEach((tab: any, i: number) => {
          html += `<button class="code-tab ${i === 0 ? 'active' : ''}" data-tab-index="${i}" data-language="${tab.label}" onclick="window.__switchTab(this, ${i})">`
          html += `${tab.label}`
          html += '</button>'
        })
        
        html += '</div>'
        
        // Action buttons (top right)
        html += '<div class="tabs-actions">'
        html += '<button class="btn-copy" title="Copy code" aria-label="Copy code"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 1.5H10C10.8284 1.5 11.5 2.1716 11.5 3V9C11.5 9.8284 10.8284 10.5 10 10.5H4C3.1716 10.5 2.5 9.8284 2.5 9V3C2.5 2.1716 3.1716 1.5 4 1.5Z" fill="none" stroke="currentColor" stroke-width="1"/><path d="M6 5.5H12C12.8284 5.5 13.5 6.1716 13.5 7V13C13.5 13.8284 12.8284 14.5 12 14.5H6C5.1716 14.5 4.5 13.8284 4.5 13V7C4.5 6.1716 5.1716 5.5 6 5.5Z" fill="currentColor" stroke="none"/></svg></button>'
        html += '<button class="btn-graphiql" title="Try in GraphiQL" aria-label="Try in GraphiQL"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><polygon points="3 2 13 8 3 14"/></svg></button>'
        html += '<button class="btn-description" title="Show description" aria-label="Show description"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="14" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="4" r="0.8" fill="currentColor"/><line x1="8" y1="6" x2="8" y2="11" stroke="currentColor" stroke-width="1"/></svg></button>'
        html += '</div>'
        
        html += '</div>'
        
        // Content area
        html += '<div class="tabs-content-wrapper">'
        
        // Description toggle
        html += '<div class="description-panel" style="display:none;">'
        html += '<p>Click any language tab to see code examples in that language.</p>'
        html += '</div>'
        
        // Tab content - render each code block using the original fence renderer
        tabs.forEach((tab: any, i: number) => {
          const langClass = getLanguageClass(tab.label)
          
          let highlighted: string
          try {
            // Use the original fence renderer function - pass markdown instance as context
            highlighted = originalFence.call(md.renderer, [{ type: 'fence', tag: 'code', content: tab.code, info: langClass, markup: '```', block: true, nesting: 0, level: 0 }], 0, {}, {}, md)
          } catch (e) {
            // Fallback
            highlighted = `<pre><code class="language-${langClass}">${escapeHtml(tab.code)}</code></pre>`
          }
          
          html += `<div class="tab-content ${i === 0 ? 'active' : ''}" data-tab-index="${i}" data-language="${tab.label}">`
          html += highlighted
          html += '</div>'
        })
        
        html += '</div>'
        html += '</div>'
        
        return html
      }

      // Add block rule for examples-selector
      md.block.ruler.before(
        'paragraph',
        'examples_selector',
        function (state: any) {
          const pos = state.bMarks[state.line] + state.tShift[state.line]
          const maximum = state.eMarks[state.line]

          // Check if line starts with :::examples-selector
          const lineText = state.src.slice(pos, maximum).trim()
          if (!lineText.startsWith(':::examples-selector')) return false

          const startLine = state.line
          let endLine = state.line + 1
          const lineMax = state.lineMax

          // Find closing :::
          while (endLine < lineMax) {
            const nextPos = state.bMarks[endLine] + state.tShift[endLine]
            const nextMax = state.eMarks[endLine]
            const nextLine = state.src.slice(nextPos, nextMax).trim()

            if (nextLine === ':::') {
              break
            }
            endLine++
          }

          if (endLine >= lineMax) {
            return false
          }

          // Create token
          const token = state.push('examples_selector_block', 'div', 0)
          token.meta = {}
          token.map = [startLine, endLine + 1]

          state.line = endLine + 1
          return true
        }
      )

      // Add renderer for examples-selector
      md.renderer.rules.examples_selector_block = function (tokens: any[], idx: any) {
        // This will be rendered as a Vue component placeholder
        return '<ExamplesSelector />'
      }
    }
  },

  vite: {
    server: {
      host: '0.0.0.0'
    }
  },

  srcDir: './src',

  themeConfig: {
    siteTitle: false,

    logo: {
      light: '/logo.png',
      dark: '/logo.png',
    },

    nav: [
      { text: 'User Guide', link: 'https://docs.bagisto.com/' },
      { text: 'Extensions', link: 'https://bagisto.com/en/extensions/' },
      { text: 'Community Forum', link: 'https://forums.bagisto.com/' },
      { text: 'Contact Us', link: 'https://bagisto.com/en/contacts/' }
    ],

    editLink: {
      pattern: 'https://github.com/bagisto/bagisto-docs/edit/master/src/:path',
      text: 'Help us improve this page on Github.'
    },

    lastUpdated: {
      text: 'Last Updated',
      formatOptions: {
        dateStyle: 'full'
      }
    },

    sidebar: [
      {
        text: 'Getting Started with Bagisto',
        collapsed: false,
        items: [
          { text: 'Why Choose Bagisto?', link: '/getting-started/why-choose-bagisto' },
          { text: 'Before You Start', link: '/getting-started/before-you-start' },
          { text: 'Installation', link: '/getting-started/installation' },
          { text: 'Upgrade Guide', link: '/getting-started/upgrade-guide' },
          { text: 'Contribution Guide', link: '/getting-started/contribution-guide' },
          { text: 'Best Security Practices', link: '/getting-started/best-security-practice' },
          { text: 'Deployment', link: '/getting-started/deployment' },
          { text: 'LLMs.txt', link: '/getting-started/llms' }
        ]
      },
      {
        text: 'Architecture Concepts',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/architecture/overview' },
          { text: 'Backend', link: '/architecture/backend' },
          { text: 'Frontend', link: '/architecture/frontend' },
        ]
      },
      {
        text: 'Package Development',
        collapsed: false,
        items: [
          { text: 'Getting Started', link: '/package-development/getting-started' },
          { text: 'Migrations', link: '/package-development/migrations' },
          { text: 'Models', link: '/package-development/models' },
          { text: 'Repositories', link: '/package-development/repositories' },
          { text: 'Routes', link: '/package-development/routes' },
          { text: 'Controllers', link: '/package-development/controllers' },
          { text: 'Views', link: '/package-development/views' },
          { text: 'Localization', link: '/package-development/localization' },
          { text: 'DataGrid', link: '/package-development/datagrid' },
          { text: 'Menu', link: '/package-development/menu' },
          { text: 'Access Control List', link: '/package-development/access-control-list' },
          { text: 'System Configuration', link: '/package-development/system-configuration' }
        ]
      },
      {
        text: 'Shipping Method Development',
        collapsed: false,
        items: [
          { text: 'Getting Started', link: '/shipping-method-development/getting-started' },
          { text: 'Creating Your First Shipping Method', link: '/shipping-method-development/create-your-first-shipping-method' },
          { text: 'Understanding Carrier Configuration', link: '/shipping-method-development/understanding-carrier-configuration' },
          { text: 'Understanding Carrier Class', link: '/shipping-method-development/understanding-carrier-class' },
          { text: 'Understanding System Configuration', link: '/shipping-method-development/understanding-system-configuration' },
        ]
      },
      {
        text: 'Payment Method Development',
        collapsed: false,
        items: [
          { text: 'Getting Started', link: '/payment-method-development/getting-started' },
          { text: 'Creating Your First Payment Method', link: '/payment-method-development/create-your-first-payment-method' },
          { text: 'Understanding Payment Configuration', link: '/payment-method-development/understanding-payment-configuration' },
          { text: 'Understanding Payment Class', link: '/payment-method-development/understanding-payment-class' }
        ]
      },
      {
        text: 'Product Type Development',
        collapsed: false,
        items: [
          { text: 'Getting Started', link: '/product-type-development/getting-started' },
          { text: 'Creating Your First Product Type', link: '/product-type-development/create-your-first-product-type' },
          { text: 'Understanding Product Type Configuration', link: '/product-type-development/understanding-product-type-configuration' },
          { text: 'Understanding Abstract Type Class', link: '/product-type-development/understanding-abstract-type-class' },
          { text: 'Building Your Subscription Product Type', link: '/product-type-development/building-your-subscription-product-type' },
        ]
      },
      {
        text: 'Theme Development',
        collapsed: false,
        items: [
          { text: 'Getting Started', link: '/theme-development/getting-started' },
          { text: 'Creating Store Theme', link: '/theme-development/creating-store-theme' },
          { text: 'Creating Admin Theme', link: '/theme-development/creating-admin-theme' },
          { text: 'Creating Custom Theme Package', link: '/theme-development/creating-custom-theme-package' },
          { text: 'Vite-Powered Theme Assets', link: '/theme-development/vite-powered-theme-assets' },
          { text: 'Understanding Layouts', link: '/theme-development/understanding-layouts' },
          { text: 'Blade Components', link: '/theme-development/blade-components' },
          { text: 'Email Template', link: '/theme-development/email-template' },
          { text: 'Validation', link: '/theme-development/validation' }
        ]
      },
      {
        text: 'Performance',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/performance/introduction' },
          { text: 'Configure Elasticsearch', link: '/performance/configure-elasticsearch' },
          { text: 'Configure Full Page Cache', link: '/performance/configure-fpc' },
          { text: 'Configure Varnish', link: '/performance/configure-varnish' },
          { text: 'Configure Laravel Octane', link: '/performance/configure-laravel-octane' },
          { text: 'Configure Load Balancing', link: '/performance/configure-load-balancing' }
        ]
      },
      {
        text: 'Digging Deeper',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/advanced/introduction' },
          { text: 'Understanding Core Class', link: '/advanced/understanding-core-class' },
          { text: 'Understanding Indexers', link: '/advanced/understanding-indexers' },
          { text: 'Understanding Data Transfer', link: '/advanced/understanding-data-transfer' },
          { text: 'Event Listeners', link: '/advanced/event-listeners' },
          { text: 'View Render Events', link: '/advanced/view-render-events' }
        ]
      },
      {
        text: 'Bagisto APIs',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/api/introduction' },
          { text: 'Rest API', link: '/api/rest-api' },
          {
            text: 'GraphQL API',
            items: [
              { text: 'Introduction', link: '/api/graphql/introduction' },
              { text: 'Authentication', link: '/api/graphql/authentication' },
              {
                text: 'Shop API',
                collapsed: false,
                items: [
                  {
                    text: 'Queries',
                    collapsed: true,
                    items: [
                      { text: 'Single Attribute', link: '/api/graphql/shop/queries/get-attribute' },
                      { text: 'Attributes', link: '/api/graphql/shop/queries/get-attributes' },
                      { text: 'Attribute Options', link: '/api/graphql/shop/queries/get-attribute-options' },
                      { text: 'Single Category', link: '/api/graphql/shop/queries/get-category' },
                      { text: 'Categories', link: '/api/graphql/shop/queries/categories' },
                      { text: 'Tree Categories', link: '/api/graphql/shop/queries/tree-categories' },
                      { text: 'Single Product', link: '/api/graphql/shop/queries/get-product' },
                      { text: 'Products', link: '/api/graphql/shop/queries/get-products' },
                      { text: 'Search Products', link: '/api/graphql/shop/queries/search-products' },
                      { text: 'Get Cart', link: '/api/graphql/shop/queries/get-cart' },
                      { text: 'Single Channel', link: '/api/graphql/shop/queries/get-channel' },
                      { text: 'Channels', link: '/api/graphql/shop/queries/get-channels' },
                      { text: 'Single Country', link: '/api/graphql/shop/queries/get-country' },
                      { text: 'Countries', link: '/api/graphql/shop/queries/get-countries' },
                      { text: 'Country States', link: '/api/graphql/shop/queries/get-country-states' },
                      { text: 'Country State', link: '/api/graphql/shop/queries/get-country-state' }
                    ]
                  },
                  {
                    text: 'Mutations',
                    collapsed: true,
                    items: [
                      { text: 'CreateCart', link: '/api/graphql/shop/mutations/create-cart' },
                      { text: 'AddToCart', link: '/api/graphql/shop/mutations/add-to-cart' },
                      { text: 'UpdateCartItem', link: '/api/graphql/shop/mutations/update-cart-item' },
                      { text: 'RemoveCartItem', link: '/api/graphql/shop/mutations/remove-cart-item' },
                      { text: 'ApplyCoupon', link: '/api/graphql/shop/mutations/apply-coupon' },
                      { text: 'RegisterCustomer', link: '/api/graphql/shop/mutations/register-customer' },
                      { text: 'Login', link: '/api/graphql/shop/mutations/login-customer' },
                      { text: 'CreateOrder', link: '/api/graphql/shop/mutations/create-order' },
                      { text: 'CreateReview', link: '/api/graphql/shop/mutations/create-review' }
                    ]
                  }
                ]
              },
              {
                text: 'Admin API',
                collapsed: false,
                items: [
                  { text: 'Coming Soon', link: '/api/graphql/admin-coming-soon' }
                ]
              },
              { text: 'Playground Guide', link: '/api/graphql/playground' },
              { text: 'Integration Guides', link: '/api/graphql/integrations' },
              { text: 'Best Practices', link: '/api/graphql/best-practices' }
            ]
          }
        ]
      }
    ],

    outline: {
      level: 'deep'
    },

    footer: {
      message: 'Released under the <a href="https://opensource.org/licenses/mit" target="_blank" class="mit-license">MIT License</a>.',
      copyright: `Copyright © ${new Date().getFullYear()} Webkul`
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/bagisto/bagisto' }
    ],

    search: {
      provider: 'local'
    }
  },

  buildEnd(siteConfig: any) {
    const outDir = siteConfig.outDir

    Object.entries(redirects).forEach(([from, to]) => {
      if (from.includes('*')) {
        console.warn(`⚠️ Skipping wildcard redirect: ${from} -> ${to}`)
        return
      }

      let filePath

      if (from.endsWith('.html')) {
        filePath = path.join(outDir, from)
      } else {
        filePath = path.join(outDir, from, 'index.html')
      }

      fs.mkdirSync(path.dirname(filePath), { recursive: true })
      fs.writeFileSync(filePath, makeRedirectHtml(to), 'utf-8')
      console.log(`✅ Redirect created: ${from} -> ${to}`)
    })
  },

  build: {
    rollupOptions: {
      // Add any build options here
    }
  }
} as any)
