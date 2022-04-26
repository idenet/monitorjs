import type { TrackActionType } from '@monitorjs/shared'

export interface DeviceInfo {
  // 网络类型
  netType: string
  clientWidth: number
  clientHeight: number
  ratio: number // 屏幕比例
}

export interface TrackReportDataType {
  // uuid
  id?: string
  // 埋点 code ，一般是由人为传进来的，可以自定义规范
  trackId?: string
  // 埋点类型，可扩展
  trackType?: TrackActionType | any
  // 埋点开始时间
  startTime?: number
  // 埋点停留时间
  durationTime?: number
  // 不需要重写，默认为 true ，表示埋点类型的上报，不用进行 errorId 生成
  isTrack?: boolean
  // 对开发者的扩展字段
  [key: string]: any
}
