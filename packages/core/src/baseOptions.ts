import { ToStringTypes } from '@monitorjs/shared'
import type { BaseOptionsFieldsIntegrationType, BaseOptionsType, VueInstance } from '@monitorjs/types'
import { generateUUID, validateOptionsAndSet } from '@monitorjs/utils'

export class BaseOptions<O extends BaseOptionsFieldsIntegrationType = BaseOptionsFieldsIntegrationType> implements BaseOptionsType<O> {
  enableTraceId = false
  filterXhrUrlRegExp: RegExp
  includeHttpUrlTraceIdRegExp = /.*/
  tranceIdFieldName = 'Trace-Id'
  throttleDelayTime = 0
  beforeAppAjaxSend = null
  vue: VueInstance = null

  constructor() {}
  bindOptions(options: O) {
    const { enableTraceId, vue, filterXhrUrlRegExp, tranceIdFieldName, throttleDelayTime, includeHttpUrlTraceIdRegExp, beforeAppAjaxSend } = options

    const optionArr = [
      [enableTraceId, 'enableTraceId', ToStringTypes.Boolean],
      [tranceIdFieldName, 'tranceIdFieldName', ToStringTypes.String],
      [throttleDelayTime, 'throttleDelayTime', ToStringTypes.Number],
      [filterXhrUrlRegExp, 'filterXhrUrlRegExp', ToStringTypes.RegExp],
      [includeHttpUrlTraceIdRegExp, 'includeHttpUrlTraceIdRegExp', ToStringTypes.RegExp],
      [beforeAppAjaxSend, 'beforeAppAjaxSend', ToStringTypes.Function],
    ]
    validateOptionsAndSet.call(this, optionArr)
    // for vue
    this.vue = vue
  }

  isFilterHttpuRL(url: string): boolean {
    return this.filterXhrUrlRegExp && this.filterXhrUrlRegExp.test(url)
  }

  setTraceId(httpUrl: string, callback: (headerFieldName: string, traceId: string) => void) {
    const { includeHttpUrlTraceIdRegExp, enableTraceId } = this
    if (enableTraceId && includeHttpUrlTraceIdRegExp.test(httpUrl)) {
      const traceId = generateUUID()
      callback(this.tranceIdFieldName, traceId)
    }
  }
}

