import { getFunctionName, logger, nativeTryCatch } from '@monitorjs/utils'

type MonitorCallback = (data: any) => void

export class Subscribe<T> {
  dep: Map<T, MonitorCallback[]> = new Map()
  constructor() {}
  watch(eventName: T, callback: (data: any) => any) {
    const fns = this.dep.get(eventName)
    if (fns) {
      this.dep.set(eventName, [...fns, callback])
      return
    }
    this.dep.set(eventName, [callback])
  }

  notify<D=any>(eventName: T, data: D) {
    const fns = this.dep.get(eventName)
    if (!fns || !eventName)
      return
    fns.forEach((fn) => {
      nativeTryCatch(
        () => { fn(data) },
        (e: Error) => {
          logger.error(`Subscribe.notify: 监听事件回调函数发生错误\n eventName:${eventName}\n name:${getFunctionName(fn)}\n error:${e}`)
        },
      )
    })
  }
}
