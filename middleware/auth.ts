import { Middleware } from '@nuxt/types'
import {
  QUERY_ERROR_SIGNIN_REQUIRED,
  FORBIDDEN_OUTSIDE_OF_UNIV,
  EMAIL_DOMAIN_ALLOWED,
} from '@/utils/constants'

const authMiddleware: Middleware = ({
  redirect,
  error,
  app: { $accessor },
  route,
}) => {
  if ($accessor.user === null) {
    return redirect('/', {
      error: QUERY_ERROR_SIGNIN_REQUIRED,
      forward: encodeURIComponent(route.path.substr(1)),
    })
  } else if (!$accessor.user.email.endsWith(EMAIL_DOMAIN_ALLOWED)) {
    return error({
      statusCode: 403,
      message: FORBIDDEN_OUTSIDE_OF_UNIV,
    })
  }
}

export default authMiddleware
