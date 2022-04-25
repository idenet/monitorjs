/**
 *浏览器需要监听的事件类型
 *
 * @export
 * @enum {number}
 */
export const enum BrowserEventTypes {
  XHR = 'xhr', // XMLHttpRequest
  FETCH= 'fetch', // fetch
  CONSOLE= 'console', // console
  DOM= 'dom', // DOM
  HISTORY = 'history',
  ERROR = 'error',
  HASHCHANGE = 'hashchange',
  UNHANDLEDREJECTION = 'unhandledrejection',
  CUSTOMER = 'customer',
}

/**
 *用户行为收集
 *
 * @export
 * @enum {number}
 */
export const enum BrowserBreadcrumbTypes {
  ROUTE = 'Route',
  CLICK = 'UI.Click',
  CONSOLE = 'Console',
  XHR = 'Xhr',
  FETCH = 'Fetch',
  UNHANDLEDREJECTION = 'UnhandledRejection',
  RESOURCE = 'Resource',
  CODE_ERROR = 'Code Error',
  CUSTOMER = 'Customer',
}

