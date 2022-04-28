import type { BaseOptionsFieldsIntegrationType } from '@monitorjs/types'

export interface BrowserOptionsFieldsTypes extends BrowsersilentOptionsType, BaseOptionsFieldsIntegrationType, BrowserOptionsHooksType {
  /**
   * 默认为 false， 默认是 xhr 上报
   * 为 true 时，则使用 img 上报的方式，会在 dns 会面追加 data= encodeURIComponent(reportData),
   * 在服务端接收时需要 decodeURIComponent
   */
  useImgUpload?: boolean
}

export interface BrowsersilentOptionsType {

  /**
   * 默认会监控 xhr ，为 true 时，将不在监控
   */
  silentXhr?: boolean
  /**
   * 默认监控 fetch， 为 true 时，将不在监控
   */
  silentFetch?: boolean
  /**
   * 默认监控 console， 为 true 时， 将不再监控
   */
  silentConsole?: boolean
  /**
   * 默认监控 click 事件，当用户点击的标签不是 body 时就会被放入 breadcrumb，为 true 时，将不在监控
   */
  silentDom?: boolean
  /**
   * 默认监控 popstate pushstate replaceState， 为 true 时将不再监控
   */
  silentHistory?: boolean
  /**
   * 默认监控 hashchange 为 true 时，将不在监控
   */
  silentHashchange?: boolean
  /**
   * 默认监控 error 为 true 时，将不在监控
   */
  silentError?: boolean
  /**
   * 默认会监控 unhandledrejection 为 true 时，将不在监控
   */
  silentUnhandledRejection?: boolean
}

export interface BrowserOptionsHooksType {

  /**
   *钩子函数，配置发送到服务端的 xhr
   可以对当前 xhr 实例做一些配置 xhr.setRequestHeader()、 xhr.withCredentials
   *
   * @param {XMLHttpRequest} xhr
   * @param {*} reportData
   * @memberof BrowserOptionsHooksType
   */
  configReportXhr?(xhr: XMLHttpRequest, reportData: any): void
}
