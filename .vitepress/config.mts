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
  ignoreDeadLinks: true,
  lang: 'en-US',
  title: "Bagisto",
  description: "Bagisto Developer Documentation",
  
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
      pattern: 'https://github.com/bagisto/bagisto-api-docs/edit/master/src/:path',
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
        text: 'Bagisto APIs',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/api/introduction' },
          { 
            text: 'Rest API',
            collapsed: false,
            items: [
              { text: 'Introduction', link: '/api/rest-api/introduction' },
              { text: 'Authentication', link: '/api/rest-api/authentication' },
              {
                text: 'Shop API',
                collapsed: false,
                items: [
                  {
                    text: 'Locales',
                    collapsed: false,
                    items: [ 
                      { text: 'Get All Locales', link: '/api/rest-api/shop/locales/list' },
                      { text: 'Get Single Locale', link: '/api/rest-api/shop/locales/single' }
                    ]
                  },
                ]
              },
              {
                text: 'Admin API',
                collapsed: false,
                items: [
                  { text: 'Coming Soon', link: '/api/rest-api/admin-coming-soon' }
                ]
              },
              { text: 'Playground Guide', link: '/api/rest-api/playground' },
              { text: 'Testing & Debugging', link: '/api/rest-api/testing-debugging' },
              { text: 'Best Practices', link: '/api/rest-api/best-practices' },
              { text: 'Integration Guides', link: '/api/rest-api/integrations' },
            ]
          },
          {
            text: 'GraphQL API',
            collapsed: false,
            items: [
              { text: 'Introduction', link: '/api/graphql/introduction' },
              { text: 'Authentication', link: '/api/graphql/authentication' },
              {
                text: 'Shop API',
                collapsed: false,
                items: [
                      {
                        text: 'Locales',
                        collapsed: false,
                        items: [     
                           {
                            text: 'Queries',
                            collapsed: false,
                            items: [               
                              { text: 'Locales', link: '/api/graphql/shop/locales/queries/locales' },
                              { text: 'Single Locale', link: '/api/graphql/shop/locales/queries/single-locale' }
                            ]
                          }
                        ]
                      },                      
                      {
                        text: 'Category',
                        collapsed: true,
                        items: [
                          {
                            text: 'Queries',
                            collapsed: false,
                            items: [
                              { text: 'Tree Categories', link: '/api/graphql/shop/queries/tree-categories' },  
                              { text: 'Categories', link: '/api/graphql/shop/queries/categories' },
                              { text: 'Single Category', link: '/api/graphql/shop/queries/get-category' },
                            ]
                          } 
                        ]
                      },
                      {
                        text: 'Theme Customisations',
                        collapsed: false,
                        items: [                    
                          { text: 'Theme Customisations', link: '/api/graphql/shop/queries/theme-customisations' },
                          { text: 'Single Theme Customisation', link: '/api/graphql/shop/queries/single-theme-customisation' }
                        ]
                      },
                      {
                        text: 'Product',
                        collapsed: true,
                        items: [
                          {
                            text: 'Queries',
                            collapsed: false,
                            items: [
                              { text: 'Products', link: '/api/graphql/shop/queries/get-products' },
                              { text: 'Search Products', link: '/api/graphql/shop/queries/search-products' },
                              { text: 'Single Product', link: '/api/graphql/shop/queries/get-product' },
                            ]
                          }
                        ]
                      },
                      {
                        text: 'Product Review',
                        collapsed: true,
                        items: [
                          {
                            text: 'Queries',
                            collapsed: false,
                            items: [
                              { text: 'Product Reviews', link: '/api/graphql/shop/queries/get-product-reviews' },
                            ]
                          },
                          {
                            text: 'Mutations',
                            collapsed: false,
                            items: [
                              { text: 'Create Product Review', link: '/api/graphql/shop/mutations/create-product-review' },
                              { text: 'Update Product Review', link: '/api/graphql/shop/mutations/update-product-review' },
                              { text: 'Delete Product Review', link: '/api/graphql/shop/mutations/delete-product-review' },

                            ]
                          }
                        ]
                      },
                      {
                        text: 'Attribute',
                        collapsed: true,
                        items: [
                          {
                            text: 'Queries',
                            collapsed: false,
                            items: [
                              { text: 'Attributes', link: '/api/graphql/shop/queries/get-attributes' },
                              { text: 'Single Attribute', link: '/api/graphql/shop/queries/get-attribute' },
                              { text: 'Attribute Options', link: '/api/graphql/shop/queries/get-attribute-options' },
                            ]
                          }
                        ]
                      },
                      {
                        text: 'Channel',
                        collapsed: true,
                        items: [
                          {
                            text: 'Queries',
                            collapsed: false,
                            items: [
                              { text: 'Channels', link: '/api/graphql/shop/queries/get-channels' },
                              { text: 'Single Channel', link: '/api/graphql/shop/queries/get-channel' },
                            ]
                          }
                        ]
                      },
                      { 
                        text: 'Country',
                        collapsed: false,
                        items: [                    
                          { text: 'Single Country', link: '/api/graphql/shop/queries/get-country' },
                          { text: 'Countries', link: '/api/graphql/shop/queries/get-countries' },
                          { text: 'Country States', link: '/api/graphql/shop/queries/get-country-states' },
                          { text: 'Country State', link: '/api/graphql/shop/queries/get-country-state' }
                        ]
                      },  
                      {
                        text: 'Customer',
                        collapsed: true,
                        items: [
                          {
                            text: 'Queries',
                            collapsed: false,
                            items: [
                              { text: 'Get Customer Profile', link: '/api/graphql/shop/queries/get-customer-profile' },
                              { text: 'Get Customer Orders', link: '/api/graphql/shop/queries/get-customer-orders' },
                              { text: 'Get Customer Addresses', link: '/api/graphql/shop/queries/get-customer-addresses'},

                            ]   

                          },
                          {
                            text: 'Mutations',
                            collapsed: false,
                            items: [
                              { text: 'Customer Registration', link: '/api/graphql/shop/mutations/customer-registration' },
                              { text: 'Customer Login', link: '/api/graphql/shop/mutations/customer-login' },
                              { text: 'Customer Verify Token', link: '/api/graphql/shop/mutations/customer-verify-token' },
                              { text: 'Customer Logout', link: '/api/graphql/shop/mutations/customer-logout' },
                              { text: 'Update Customer Profile', link: '/api/graphql/shop/mutations/update-customer-profile' },
                              { text: 'Delete Customer Profile', link: '/api/graphql/shop/mutations/delete-customer-profile' },
                              { text: 'Forgot Password', link: '/api/graphql/shop/mutations/forgot-password' },
                              { text: 'Reset Password', link: '/api/graphql/shop/mutations/reset-password' },
                              { text: 'Create Customer Address', link: '/api/graphql/shop/mutations/create-customer-address' },
                              { text: 'Update Customer Address', link: '/api/graphql/shop/mutations/update-customer-address' },
                              { text: 'Delete Customer Address', link: '/api/graphql/shop/mutations/delete-customer-address' },

                            ]
                          }
                        ]
                      },    
                      {
                        text: 'Cart',
                        collapsed: true,
                        items: [
                          {
                            text: 'Queries',
                            collapsed: false,
                            items: [
                              { text: 'Get Cart', link: '/api/graphql/shop/queries/get-cart' },
                            ]   

                          },
                          {
                            text: 'Mutations',
                            collapsed: false,
                            items: [
                              { text: 'CreateCart', link: '/api/graphql/shop/mutations/create-cart' },
                              { text: 'AddToCart', link: '/api/graphql/shop/mutations/add-to-cart' },
                              { text: 'UpdateCartItem', link: '/api/graphql/shop/mutations/update-cart-item' },
                              { text: 'RemoveCartItem', link: '/api/graphql/shop/mutations/remove-cart-item' },
                              { text: 'ApplyCoupon', link: '/api/graphql/shop/mutations/apply-coupon' },
                              { text: 'RemoveCoupon', link: '/api/graphql/shop/mutations/remove-coupon' },
                            ]
                          }
                        ]
                      },
                      {
                        text: 'Checkout',
                        collapsed: true,
                        items: [
                          {
                            text: 'Queries',
                            collapsed: false,
                            items: [
                              { text: 'Get Addresses', link: '/api/graphql/shop/queries/get-addresses' },
                              { text: 'Get Shipping Methods', link: '/api/graphql/shop/queries/get-shipping-methods' },
                              { text: 'Get Payment Methods', link: '/api/graphql/shop/queries/get-payment-methods' },
                            ]
                          },
                          {
                            text: 'Mutations',
                            collapsed: false,
                            items: [
                              { text: 'Set Shipping Address', link: '/api/graphql/shop/mutations/set-shipping-address' },
                              { text: 'Set Billing Address', link: '/api/graphql/shop/mutations/set-billing-address' },
                              { text: 'Set Shipping Method', link: '/api/graphql/shop/mutations/set-shipping-method' },
                              { text: 'Set Payment Method', link: '/api/graphql/shop/mutations/set-payment-method' },
                              { text: 'Place Order', link: '/api/graphql/shop/mutations/place-order' },
                            ]
                          }
                        ]
                      },                              
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
              { text: 'Best Practices', link: '/api/graphql/best-practices' },
              { text: 'Integration Guides', link: '/api/graphql/integrations' },
            ]
          },
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
  }
})
