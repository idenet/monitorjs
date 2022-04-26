import type { ErrorTypes } from '@monitorjs/shared'
import type { HttpTransformedType } from './http'

export interface AuthInfo {
  apikey?: string
  sdkVersion?: string
  sdkname?: string
  trackerId?: string
}

export interface BaseTransformType {
  type?: ErrorTypes
  message?: string
  time?: number
  name?: string
  level?: string
  url: string
}

export interface ReportDataType extends Partial<HttpTransformedType> {
  stack?: any
  errorId?: number
  // vue
  componentName?: string
  propsData?: any
  // logError 手动报错 MITO.log
  customTag?: string

}
