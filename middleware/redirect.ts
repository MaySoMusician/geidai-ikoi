import { Middleware } from '@nuxt/types'

const authMiddleware: Middleware = ({ redirect, route, app }) => {
  if (!route.path.endsWith('/')) {
    const to = `${route.path}/`
    const name = app.router?.resolve(to).resolved.name
    if (name) {
      redirect(301, to)
    }
  }
}

export default authMiddleware
