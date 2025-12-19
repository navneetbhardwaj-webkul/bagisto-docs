import Layout from './Layout.vue'
import './custom.css'
import { initializeCodeTabs } from './code-tabs'

// Initialize code tabs
initializeCodeTabs()

export default {
    Layout,
    enhance({ app, router }: any) {
      // Re-initialize tabs after each route change
      if (router) {
        router.onAfterRouteChange = () => {
          setTimeout(() => {
            initializeCodeTabs()
          }, 100)
        }
      }
    }
}
