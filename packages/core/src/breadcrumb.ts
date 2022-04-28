import { ToStringTypes } from '@monitorjs/shared'
import type { BaseOptionsFieldsIntegrationType, BreadcrumbPushData } from '@monitorjs/types'
import { getTimestamp, logger, silentConsoleScope, toStringValidateOption } from '@monitorjs/utils'

export class Breadcrumb<O extends BaseOptionsFieldsIntegrationType = BaseOptionsFieldsIntegrationType> {
  private maxBreadcrumbs = 10
  private beforePushBreadcrumb: unknown = null
  private stack: BreadcrumbPushData[] = []

  constructor(options: Partial<O> = {}) {
    this.bindOptions(options)
  }

  push(data: BreadcrumbPushData): BreadcrumbPushData[] {
    if (typeof this.beforePushBreadcrumb === 'function') {
      let result: BreadcrumbPushData = null
      const beforePushBreadcrumb = this.beforePushBreadcrumb
      silentConsoleScope(() => {
        result = beforePushBreadcrumb.call(this, this, data)
      })
      if (!result)
        return this.stack
      return this.immediatePush(result)
    }
    return this.immediatePush(data)
  }

  private immediatePush(data: BreadcrumbPushData): BreadcrumbPushData[] {
    data.time || (data.time = getTimestamp())
    if (this.stack.length >= this.maxBreadcrumbs)
      this.shift()
    this.stack.push(data)
    // 确保 xhr 请求在按钮点击之后才触发
    this.stack.sort((a, b) => a.time - b.time)
    logger.log(this.stack)
    return this.stack
  }

  clear(): void {
    this.stack = []
  }

  getStack(): BreadcrumbPushData[] {
    return this.stack
  }

  private shift(): boolean {
    return this.stack.shift() !== undefined
  }

  bindOptions(options: Partial<O> = {}): void {
    const { maxBreadcrumbs, beforePushBreadcrumb } = options
    toStringValidateOption(maxBreadcrumbs, 'maxBreadcrumbs', ToStringTypes.Number) && (this.maxBreadcrumbs = maxBreadcrumbs)
    toStringValidateOption(beforePushBreadcrumb, 'beforePushBreadcrumb', ToStringTypes.Function) && (this.beforePushBreadcrumb = beforePushBreadcrumb)
  }
}
