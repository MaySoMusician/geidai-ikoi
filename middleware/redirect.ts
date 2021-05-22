import { Middleware } from '@nuxt/types'

const authMiddleware: Middleware = ({ redirect, route }) => {
  if (!route.path.endsWith('/')) {
    redirect(301, `${route.path}/`)
  }
}

export default authMiddleware
