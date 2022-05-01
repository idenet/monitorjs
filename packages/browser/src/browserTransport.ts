import { BaseTransport } from '@monitorjs/core'
import { MethodTypes, ToStringTypes } from '@monitorjs/shared'
import type { ReportDataType } from '@monitorjs/types'
import { safeStringify, toStringValidateOption } from '@monitorjs/utils'
import type { BrowserOptionsFieldsTypes } from './types'

export class BrowserTransport extends BaseTransport<BrowserOptionsFieldsTypes> {
  configReportXhr: unknown
  useImgUpload = false
  constructor(options: BrowserOptionsFieldsTypes = {}) {
    super()
    super.bindOptions(options)
    this.bindOptions(options)
  }

  post(data: any, url: string) {
    const requestFun = (): void => {
      const xhr = new XMLHttpRequest()
      xhr.open(MethodTypes.Post, url)
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      xhr.withCredentials = true
      if (typeof this.configReportXhr === 'function')
        this.configReportXhr(xhr, data)
      xhr.send(safeStringify(data))
    }
    this.queue.addTask(requestFun)
  }

  imgRequest(data: any, url: string): void {
    const requestFun = () => {
      let img = new Image()
      const spliceStr = !url.includes('?') ? '?' : '&'
      img.src = `${url}${spliceStr}data=${encodeURIComponent(safeStringify(data))}`
      img = null
    }
    this.queue.addTask(requestFun)
  }

  sendToServer(data: any, url: string) {
    return this.useImgUpload ? this.imgRequest(data, url) : this.post(data, url)
  }

  getTransportData(data: ReportDataType) {
    return {
      authInfo: this.getAuthInfo(),
      data,
    }
  }

  bindOptions(options: BrowserOptionsFieldsTypes = {}) {
    const { configReportXhr, useImgUpload } = options
    toStringValidateOption(configReportXhr, 'configReportXhr', ToStringTypes.Function) && (this.configReportXhr = configReportXhr)
    toStringValidateOption(useImgUpload, 'useImgUpload', ToStringTypes.Boolean) && (this.useImgUpload = useImgUpload)
  }
}
