import type { BreadcrumbTypes } from '@monitorjs/shared'
import type { ReportDataType } from './transport'

export interface BreadcrumbPushData {
  /**
   * 事件类型
   */
  type: BreadcrumbTypes
  data: ReportDataType

}
