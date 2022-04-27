import type { EventTypes } from '@monitorjs/shared'
import type { BaseClientType } from './baseClientType'

export interface BasePluginType<T extends EventTypes = EventTypes, C extends BaseClientType = BaseClientType> {
  // 事件枚举
  name: T
  // 监控事件，并在该事件中用 notify 通知订阅中心
  monitor: (this: C, notify: (eventName: T, data: any) => void) => void
  // 在 monitor 中触发数据并将数据传入到当前函数，拿到数据做数据格式转换（会将 transform 放入 Subscrib 的 handers）
  transform?: (this: C, collectedData: any) => any
  // 拿到转换后的数据进行 breadcrumb、report 等操作
  consumer?: (this: C, data: any) => void
}

export interface RouteChangeCollectType {
  from: string
  to: string
}

export interface ConsoleCollectType {
  args: any[]
  level: string
}
