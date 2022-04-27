import type { BREADCRUMBCATEGORYS, BreadcrumbTypes } from '@monitorjs/shared'
import type { Severity } from '@monitorjs/utils'
import type { ReportDataType } from './transport'

export interface BreadcrumbPushData {
  /**
   * 事件类型
   */
  type: BreadcrumbTypes
  data: ReportDataType
  /**
   * 分为 user action debug http
   */
  category?: BREADCRUMBCATEGORYS
  time?: number
  level: Severity
}
