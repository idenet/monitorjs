import type { Severity } from '@monitorjs/utils'
import type { HttpCollectedType } from './http'
export type voidFun = () => void

export type IAnyObject = Record<string, any>

/**
 *资源错误
 *
 * @export
 * @interface ResourceErrorTarget
 */
export interface ResourceErrorTarget {
  src?: string
  href?: string
  localName?: string
}

export interface MITOXMLHttpRequest extends XMLHttpRequest {
  [key: string]: any
  httpCollect?: HttpCollectedType
}

/**
 * 错误堆栈
 */
export interface ErrorStack {
  args: []
  func: string
  column: number
  line: number
  url: string
}

/**
 * 微信编译错误
 */
export interface WxParsedErrorType {
  message: string
  name: string
  stack: ErrorStack[]
}

export type TNumStrObj = number | string | object

export interface LocalStorageValue<T = any> {
  expireTime?: number
  value: T | string
}

export interface Logtypes {
  message?: string
  tag?: TNumStrObj
  level?: Severity
  ex?: Error | any
}

