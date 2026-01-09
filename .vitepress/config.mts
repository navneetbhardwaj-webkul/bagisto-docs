import { defineConfig } from 'vitepress'
import { redirects, makeRedirectHtml } from './_redirects'
// @ts-ignore
import fs from 'fs'
// @ts-ignore
import path from 'path'
import { loadEnv } from 'vite'

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

export default defineConfig(({ command, mode }) => {
  // Load env variables
  const env = loadEnv(mode, process.cwd(), '')

  return {
  ignoreDeadLinks: true,
  lang: 'en-US',
  title: "Bagisto",
  description: "Bagisto Developer Documentation",
  
  vite: {
    server: {
      host: '0.0.0.0'
    },
    define: {
      'import.meta.env.VITE_REST_API_URL': JSON.stringify(env.VITE_REST_API_URL),
      'import.meta.env.VITE_GRAPHQL_API_URL': JSON.stringify(env.VITE_GRAPHQL_API_URL)
    }
  },

  srcDir: './src',

  themeConfig: {
    siteTitle: false,

    logo: {
      light: '/logo.png',
      dark: '/logo-dark.png',
    },

    nav: [
      { text: 'Dev Docs', link: 'https://devdocs.bagisto.com/' },
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
          { text: 'Setup', link: '/api/setup' },
          { text: 'Authentication', link: '/api/authentication' },
          { text: 'Storefront Keys', link: '/api/storefront-api-key-management-guide' },
          {
            text: 'GraphQL API',
            collapsed: true,
            items: [
              { text: 'Introduction', link: '/api/graphql-api/introduction' },
              { text: 'Authentication', link: '/api/graphql-api/authentication' },
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
                              { text: 'Locales', link: '/api/graphql-api/shop/locales/queries/locales' },
                              { text: 'Single Locale', link: '/api/graphql-api/shop/locales/queries/single-locale' }
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
                              { text: 'Tree Categories', link: '/api/graphql-api/shop/queries/tree-categories' },  
                              { text: 'Categories', link: '/api/graphql-api/shop/queries/categories' },
                              { text: 'Single Category', link: '/api/graphql-api/shop/queries/get-category' },
                            ]
                          } 
                        ]
                      },
                      {
                        text: 'Theme Customisations',
                        collapsed: false,
                        items: [                    
                          { text: 'Theme Customisations', link: '/api/graphql-api/shop/queries/theme-customisations' },
                          { text: 'Single Theme Customisation', link: '/api/graphql-api/shop/queries/single-theme-customisation' }
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
                              { text: 'Products', link: '/api/graphql-api/shop/queries/get-products' },
                              { text: 'Search Products', link: '/api/graphql-api/shop/queries/search-products' },
                              { text: 'Single Product', link: '/api/graphql-api/shop/queries/get-product' },
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
                              { text: 'Product Reviews', link: '/api/graphql-api/shop/queries/get-product-reviews' },
                            ]
                          },
                          {
                            text: 'Mutations',
                            collapsed: false,
                            items: [
                              { text: 'Create Product Review', link: '/api/graphql-api/shop/mutations/create-product-review' },
                              { text: 'Update Product Review', link: '/api/graphql-api/shop/mutations/update-product-review' },
                              { text: 'Delete Product Review', link: '/api/graphql-api/shop/mutations/delete-product-review' },

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
                              { text: 'Attributes', link: '/api/graphql-api/shop/queries/get-attributes' },
                              { text: 'Single Attribute', link: '/api/graphql-api/shop/queries/get-attribute' },
                              { text: 'Attribute Options', link: '/api/graphql-api/shop/queries/get-attribute-options' },
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
                              { text: 'Channels', link: '/api/graphql-api/shop/queries/get-channels' },
                              { text: 'Single Channel', link: '/api/graphql-api/shop/queries/get-channel' },
                            ]
                          }
                        ]
                      },
                      { 
                        text: 'Country',
                        collapsed: false,
                        items: [                    
                          { text: 'Single Country', link: '/api/graphql-api/shop/queries/get-country' },
                          { text: 'Countries', link: '/api/graphql-api/shop/queries/get-countries' },
                          { text: 'Country States', link: '/api/graphql-api/shop/queries/get-country-states' },
                          { text: 'Country State', link: '/api/graphql-api/shop/queries/get-country-state' }
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
                              { text: 'Get Customer Profile', link: '/api/graphql-api/shop/queries/get-customer-profile' },
                              { text: 'Get Customer Orders', link: '/api/graphql-api/shop/queries/get-customer-orders' },
                              { text: 'Get Customer Addresses', link: '/api/graphql-api/shop/queries/get-customer-addresses'},

                            ]   

                          },
                          {
                            text: 'Mutations',
                            collapsed: false,
                            items: [
                              { text: 'Customer Registration', link: '/api/graphql-api/shop/mutations/customer-registration' },
                              { text: 'Customer Login', link: '/api/graphql-api/shop/mutations/customer-login' },
                              { text: 'Customer Verify Token', link: '/api/graphql-api/shop/mutations/customer-verify-token' },
                              { text: 'Customer Logout', link: '/api/graphql-api/shop/mutations/customer-logout' },
                              { text: 'Update Customer Profile', link: '/api/graphql-api/shop/mutations/update-customer-profile' },
                              { text: 'Delete Customer Profile', link: '/api/graphql-api/shop/mutations/delete-customer-profile' },
                              { text: 'Forgot Password', link: '/api/graphql-api/shop/mutations/forgot-password' },
                              { text: 'Reset Password', link: '/api/graphql-api/shop/mutations/reset-password' },
                              { text: 'Create Customer Address', link: '/api/graphql-api/shop/mutations/create-customer-address' },
                              { text: 'Update Customer Address', link: '/api/graphql-api/shop/mutations/update-customer-address' },
                              { text: 'Delete Customer Address', link: '/api/graphql-api/shop/mutations/delete-customer-address' },

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
                              { text: 'Get Cart', link: '/api/graphql-api/shop/queries/get-cart' },
                            ]   

                          },
                          {
                            text: 'Mutations',
                            collapsed: false,
                            items: [
                              { text: 'CreateCart', link: '/api/graphql-api/shop/mutations/create-cart' },
                              { text: 'AddToCart', link: '/api/graphql-api/shop/mutations/add-to-cart' },
                              { text: 'UpdateCartItem', link: '/api/graphql-api/shop/mutations/update-cart-item' },
                              { text: 'RemoveCartItem', link: '/api/graphql-api/shop/mutations/remove-cart-item' },
                              { text: 'ApplyCoupon', link: '/api/graphql-api/shop/mutations/apply-coupon' },
                              { text: 'RemoveCoupon', link: '/api/graphql-api/shop/mutations/remove-coupon' },
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
                              { text: 'Get Addresses', link: '/api/graphql-api/shop/queries/get-addresses' },
                              { text: 'Get Shipping Methods', link: '/api/graphql-api/shop/queries/get-shipping-methods' },
                              { text: 'Get Payment Methods', link: '/api/graphql-api/shop/queries/get-payment-methods' },
                            ]
                          },
                          {
                            text: 'Mutations',
                            collapsed: false,
                            items: [
                              { text: 'Set Shipping Address', link: '/api/graphql-api/shop/mutations/set-shipping-address' },
                              { text: 'Set Billing Address', link: '/api/graphql-api/shop/mutations/set-billing-address' },
                              { text: 'Set Shipping Method', link: '/api/graphql-api/shop/mutations/set-shipping-method' },
                              { text: 'Set Payment Method', link: '/api/graphql-api/shop/mutations/set-payment-method' },
                              { text: 'Place Order', link: '/api/graphql-api/shop/mutations/place-order' },
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
                  { text: 'Coming Soon', link: '/api/graphql-api/admin-coming-soon' }
                ]
              },
              { text: 'Playground Guide', link: '/api/graphql-api/playground' },
              { text: 'Best Practices', link: '/api/graphql-api/best-practices' },
              { text: 'Integration Guides', link: '/api/graphql-api/integrations' },
            ]
          },
          { 
            text: 'Rest API',
            collapsed: true,
            items: [
              { text: 'Introduction', link: '/api/rest-api/introduction' },
              
              {
                text: 'Shop API',
                collapsed: false,
                items: [
                  {
                    text: 'Locales',
                    collapsed: false,
                    items: [ 
                      { text: 'Get All Locales', link: '/api/rest-api/shop/locales/get-locales' },
                      { text: 'Get Single Locale', link: '/api/rest-api/shop/locales/get-single-locale' }
                    ]
                  },
                  {
                    text: 'Categories',
                    collapsed: false,
                    items: [
                          { text: 'Get Categories', link: '/api/rest-api/shop/categories/get-categories' },
                          { text: 'Get Category', link: '/api/rest-api/shop/categories/get-category' },
                    ]
                  },
                  {
                    text: 'Theme Customizations',
                    collapsed: false,
                    items: [
                          { text: 'Get Theme Customizations', link: '/api/rest-api/shop/theme-customizations/get-theme-customizations' },
                          { text: 'Get Theme Customization', link: '/api/rest-api/shop/theme-customizations/get-theme-customization' },
                    ]
                  },
                  {
                    text: 'Products',
                    collapsed: false,
                    items: [
                          { text: 'Get Products', link: '/api/rest-api/shop/products/get-products' },
                          { text: 'Get Product', link: '/api/rest-api/shop/products/get-product' },
                          { text: 'Search Product', link: '/api/rest-api/shop/products/search-product' },
                    ]
                  },
                  {
                    text: 'Product Review',
                    collapsed: false,
                    items: [
                          { text: 'Get Product Reviews', link: '/api/rest-api/shop/product-reviews/get-product-reviews' },
                          { text: 'Get Product Review', link: '/api/rest-api/shop/product-reviews/get-product-review' },
                          { text: 'Create Product Review', link: '/api/rest-api/shop/product-reviews/create-product-review' },
                          { text: 'Update Product Review', link: '/api/rest-api/shop/product-reviews/update-product-review' },
                          { text: 'Delete Product Review', link: '/api/rest-api/shop/product-reviews/delete-product-review' },
                    ]
                  },
                  {
                    text: 'Attribute',
                    collapsed: false,
                    items: [
                          { text: 'Get Attributes', link: '/api/rest-api/shop/attributes/get-attributes' },
                          { text: 'Single Attribute', link: '/api/rest-api/shop/attributes/get-attribute' },
                          { text: 'Get Attribute Options', link: '/api/rest-api/shop/attributes/get-attribute-options' },
                    ]
                  },
                  {
                    text: 'Channel',
                    collapsed: false,
                    items: [
                          { text: 'Get Channels', link: '/api/rest-api/shop/channels/get-channels' },
                          { text: 'Single Channel', link: '/api/rest-api/shop/channels/get-channel' },
                    ]
                  },
                  {
                    text: 'Country and State',
                    collapsed: false,
                    items: [
                          { text: 'Get Countries', link: '/api/rest-api/shop/countries/get-countries' },
                          { text: 'Single Country', link: '/api/rest-api/shop/countries/get-country' },
                          { text: 'Get Country States', link: '/api/rest-api/shop/countries/get-country-states' },
                          { text: 'Single Country State', link: '/api/rest-api/shop/countries/get-country-state' },
                    ]
                  },
                  {
                    text: 'Customer',
                    collapsed: false,
                    items: [
                          { text: 'Registration', link: '/api/rest-api/shop/customers/customer-registration' },
                          { text: 'Login', link: '/api/rest-api/shop/customers/customer-login' },
                          { text: 'Verify Token', link: '/api/rest-api/shop/customers/customer-verify-token' },
                          { text: 'Customer Logout', link: '/api/rest-api/shop/customers/customer-logout' },
                          { text: 'Forgot Password', link: '/api/rest-api/shop/customers/forgot-password' },
                          { text: 'Reset Password', link: '/api/rest-api/shop/customers/reset-password' },
                          { text: 'Get Addresses', link: '/api/rest-api/shop/customers/get-customer-addresses'},                               
                          { text: 'Create Address', link: '/api/rest-api/shop/customers/create-customer-address' },
                          { text: 'Update Address', link: '/api/rest-api/shop/customers/update-customer-address' },
                          { text: 'Delete Address', link: '/api/rest-api/shop/customers/delete-customer-address' },
                          { text: 'Get Profile', link: '/api/rest-api/shop/customers/get-customer-profile' },
                          { text: 'Update Profile', link: '/api/rest-api/shop/customers/update-customer-profile' },
                          { text: 'Delete Profile', link: '/api/rest-api/shop/customers/delete-customer-profile' },
                          { text: 'Get Orders', link: '/api/rest-api/shop/customers/get-customer-orders' },
                    ]
                  },
                  {
                    text: 'Cart',
                    collapsed: false,
                    items: [
                          { text: 'Get Cart', link: '/api/rest-api/shop/cart/get-cart' },
                          { text: 'Create Cart', link: '/api/rest-api/shop/cart/create-cart' },
                          { text: 'Add to Cart', link: '/api/rest-api/shop/cart/add-to-cart' },
                          { text: 'Update Cart Item', link: '/api/rest-api/shop/cart/update-cart-item' },
                          { text: 'Remove Cart Item', link: '/api/rest-api/shop/cart/remove-cart-item' },
                          { text: 'Apply Coupon', link: '/api/rest-api/shop/cart/apply-coupon' },
                          { text: 'Remove Coupon', link: '/api/rest-api/shop/cart/remove-coupon' },
                    ]
                  },
                  {
                    text: 'Checkout',
                    collapsed: false,
                    items: [
                          { text: 'Get Addresses', link: '/api/rest-api/shop/checkout/get-addresses' },
                          { text: 'Get Shipping Methods', link: '/api/rest-api/shop/checkout/get-shipping-methods' },
                          { text: 'Get Payment Methods', link: '/api/rest-api/shop/checkout/get-payment-methods' },
                          { text: 'Set Shipping Address', link: '/api/rest-api/shop/checkout/set-shipping-address' },
                          { text: 'Set Billing Address', link: '/api/rest-api/shop/checkout/set-billing-address' },
                          { text: 'Set Shipping Method', link: '/api/rest-api/shop/checkout/set-shipping-method' },
                          { text: 'Set Payment Method', link: '/api/rest-api/shop/checkout/set-payment-method'},                               
                          { text: 'Place Order', link: '/api/rest-api/shop/checkout/place-order' },
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
              { text: 'Testing & Debugging', link: '/api/rest-api/testing-debugging' },
              { text: 'Best Practices', link: '/api/rest-api/best-practices' },
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
      { icon: 'github', link: 'https://github.com/bagisto/bagisto-api' }
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
  }
})
