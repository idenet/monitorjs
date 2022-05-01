import { BaseOptions } from '@monitorjs/core'
import { ToStringTypes } from '@monitorjs/shared'
import { validateOptionsAndSet } from '@monitorjs/utils'
import type { BrowserOptionsFieldsTypes } from './types'

export class BrowserOptions extends BaseOptions<BrowserOptionsFieldsTypes> {
  // 静默监控 xhr 事件
  silentXhr: boolean
  // 静默监控 fetch 事件
  silentFetch: boolean
  // 静默监控 console 事件
  silentConsole: boolean
  // 静默监控 Dom 事件
  silentDom: boolean
  // 静默监控 history 事件
  silentHistory: boolean
  // 静默监控 error 事件
  silentError: boolean
  // 静默监控 promis 的错误
  silentUnhandledRejection: boolean
  silentHashchange: boolean
  useImgUpload: boolean
  configReportXhr: unknown = null

  constructor(options: BrowserOptionsFieldsTypes) {
    super()
    super.bindOptions(options)
  }

  bindOptions(options: BrowserOptionsFieldsTypes) {
    const { silentXhr, silentFetch, silentConsole, silentDom, silentHistory, silentError, silentHashchange, silentUnhandledRejection, useImgUpload, configReportXhr } = options
    const booleanType = ToStringTypes.Boolean

    const optionArr = [
      [silentXhr, 'silentXhr', booleanType],
      [silentFetch, 'silentFetch', booleanType],
      [silentConsole, 'silentConsole', booleanType],
      [silentDom, 'silentDom', booleanType],
      [silentHistory, 'silentHistory', booleanType],
      [silentError, 'silentError', booleanType],
      [silentHashchange, 'silentHashchange', booleanType],
      [silentUnhandledRejection, 'silentUnhandledRejection', booleanType],
      [useImgUpload, 'useImgUpload', booleanType],
      [configReportXhr, 'configReportXhr', ToStringTypes.Function],
    ]
    validateOptionsAndSet.call(this, optionArr)
  }
}

