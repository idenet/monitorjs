import type { TransportDataType } from './transport'
import type { VueInstance } from './vue'
import type { BreadcrumbPushData } from './breadcrumb'

type CANCEL = null | undefined | boolean

type TSetRequestHeader = (key: string, value: string) => {}

export interface IBeforeAppAjaxSendConfig {
  setRequestHeader: TSetRequestHeader
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS'

interface IRequestHeaderConfig {
  url: HttpMethod
  method: string
}

export type BaseOptionsFieldsIntegrationType = BaseOptionsFieldsType & BaseOptionsHooksType

export interface BaseOptionsType<O extends BaseOptionsFieldsIntegrationType> extends BaseOptionsFieldsIntegrationType {
  bindOptions(options: O): void
}

export interface BaseOptionsFieldsType {
  // 上报到服务端的url
  dns?: string
  // 默认是false，为true时，sdk将不会初始化
  disable?: boolean
  // 默认是''，表示每个项目都应该有一个唯一值
  apikey?: string
  // 默认是关闭的，当为true时将会在控制台打印收集到的数据（建议在开发环境设为true）
  debug?: boolean
  // 默认情况下，所有页面的 http 请求都会在请求头添加一个唯一 id
  enableTraceId?: boolean
  // 当你设置enableTraceId:true，traceId将会在请求头中被添加，默认key是Trace-Id。你可以通过配置当前属性来指定名称
  tranceIdFieldName?: string
  // 当你设置enableTraceId为true时，应该配置当前属性。考虑到随便在请求头中添加属性会导致跨域错误，所以这边的正则配置是包含关系。当includeHttpUrlTraceIdRegExp.test(xhr.url)为true时这个xhr.url的请求头才会被添加Trace-Id
  includeHttpUrlTraceIdRegExp?: RegExp
  // 默认值是null，表示所有ajax请求都将被监听。你可以设置当前值来过滤哪些你不想监听的url。过滤规则是filterXhrUrlRegExp.test(xhr.url) === true时，会被过滤掉
  filterXhrUrlRegExp?: RegExp
  // 默认值是20，如果设置的值大于100，将用100取代。表示最大用户行为栈的长度
  maxBreadcrumbs?: number
  // 默认值为0，表示收集按钮点击事件和微信小程序touch事件的节流时间
  throttleDelayTime?: number
  // 默认值是2，表示同一个错误上报的最大次数
  maxDuplicateCount?: number
  // vue的根实例
  vue?: VueInstance
}

export interface BaseOptionsHooksType {

  /**
   * 钩子函数： 在每次发送事件之前会调用
   *
   * @param {TransportDataType} event
   * @return {*}  {(Promise<TransportDataType | null | CANCEL> | TransportDataType | any | CANCEL | null)}
   * @memberof BaseOptionsHooksType
   */
  beforeDataReport?(event: TransportDataType): Promise<TransportDataType | null | CANCEL> | TransportDataType | any | CANCEL | null

  /**
   * 钩子函数，每次发送前都会调用
   * @param event
   * @param url
   */
  configReportUrl?(event: TransportDataType, url: string): string

  /**
   * 在每次添加用户行为事件前 调用
   *
   * @param {BreadCrumb} breadcrumb 实例
   * @param {BreadcrumbPushData[]} hint 单词推入用户行为占的数据
   * @return {*}  {(BreadcrumbPushData|CANCEL)}
   * @memberof BaseOptionsHooksType
   */
  beforePushBreadcrumb?(breadcrumb: BreadCrumb, hint: BreadcrumbPushData[]): BreadcrumbPushData|CANCEL
  /**
   *拦截用户页面的 ajax 请求，并在ajax 请求发送前执行该 hook，可以对用户发送的 ajax 请求做 xhr.setRequestHeader
   *
   * @param {IRequestHeaderConfig} config
   * @param {IBeforeAppAjaxSendConfig} setRequestHeader
   * @memberof BaseOptionsHooksType
   */
  beforeAjaxSend?(config: IRequestHeaderConfig, setRequestHeader: IBeforeAppAjaxSendConfig): void
  /**
   *钩子函数:在beforeDataReport后面调用，在整合上报数据和本身SDK信息数据前调用，当前函数执行完后立即将数据错误信息上报至服务端
   *trackerId表示用户唯一键（可以理解成userId），需要trackerId的意义可以区分每个错误影响的用户数量
   *
   * @return {*}  {(string | number)}
   * @memberof BaseOptionsHooksType
   */
  backTrackerId?(): string | number
}
