/* eslint-disable no-console */

export function debugLog(message?: any, ...optionalParams: any[]) {
  process.env.APP_DEBUG && console.log(message, ...optionalParams)
}

export function debugError(message?: any, ...optionalParams: any[]) {
  process.env.APP_DEBUG && console.error(message, ...optionalParams)
}
