import type { BaseTransport } from '@monitorjs/core'
import { BaseClient, Breadcrumb } from '@monitorjs/core'
import type { BrowserEventTypes, EventTypes } from '@monitorjs/shared'
import { BrowserBreadcrumbTypes, ErrorTypes, MitoLog, MitoLogEmptyMsg, MitoLogEmptyTag, Silent } from '@monitorjs/shared'
import type { BaseOptionsFieldsIntegrationType, Logtypes } from '@monitorjs/types'
import { Severity, extractErrorStack, firstStrtoLowerCase, getBreadcrumbCategoryInBrowser, getLocationHref, isError, unknownToString } from '@monitorjs/utils'
import type { BrowserOptionsFieldsTypes } from './types'
import { BrowserOptions } from './BrowserOptions'
import { BrowserTransport } from './browserTransport'

export class BrowserClient extends BaseClient<BrowserOptionsFieldsTypes, EventTypes> {
  transport: BaseTransport
  options: BrowserOptions
  breadcrumb: Breadcrumb<BaseOptionsFieldsIntegrationType>
  constructor(options: BrowserOptionsFieldsTypes = {}) {
    super(options)
    this.options = new BrowserOptions(options)
    this.transport = new BrowserTransport(options)
    this.breadcrumb = new Breadcrumb(options)
  }

  isPluginEnable(name: BrowserEventTypes): boolean {
    const silentField = `${Silent}${firstStrtoLowerCase(name)}`
    return !this.options[silentField]
  }

  log(data: Logtypes) {
    const { message = MitoLogEmptyMsg, tag = MitoLogEmptyTag, level = Severity.Critical, ex = '' } = data
    let errorInfo = {}
    if (isError(ex))
      errorInfo = extractErrorStack(ex, level)
    const error = {
      type: ErrorTypes.LOG,
      level,
      message: unknownToString(message),
      name: MitoLog,
      customTag: unknownToString(tag),
      url: getLocationHref(),
      ...errorInfo,
    }

    const breadcrumbStack = this.breadcrumb.push({
      type: BrowserBreadcrumbTypes.CUSTOMER,
      category: getBreadcrumbCategoryInBrowser(BrowserBreadcrumbTypes.CUSTOMER),
      data: message,
      level: Severity.fromString(level.toString()),
    })
    this.transport.send(error, breadcrumbStack)
  }
}
