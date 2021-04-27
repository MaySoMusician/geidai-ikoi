import { Middleware } from '@nuxt/types'

const authMiddleware: Middleware = ({
  redirect,
  error,
  app: { $accessor },
}) => {
  if ($accessor.user === null) {
    return redirect('/')
  } else if (!$accessor.user.email.endsWith('.geidai.ac.jp')) {
    return error({
      statusCode: 403,
      message: 'Forbidden except for those in the university',
    })
  }
}

export default authMiddleware
