import type { EventTypes } from '@monitorjs/shared'
import type { BaseClientType, BaseOptionsFieldsIntegrationType, BasePluginType, Logtypes } from '@monitorjs/types'
import { logger } from '@monitorjs/utils'
import type { BaseTransport } from './baseTransport'
import type { Breadcrumb } from './breadcrumb'
import { Subscribe } from './subscribe'

export abstract class BaseClient<O extends BaseOptionsFieldsIntegrationType = BaseOptionsFieldsIntegrationType, E extends EventTypes = EventTypes> implements BaseClientType {
  SDK_NAME: string
  SDK_VERSION: string
  options: BaseOptionsFieldsIntegrationType
  abstract breadcrumb: Breadcrumb
  abstract transport: BaseTransport
  constructor(options: O) {
    this.options = options
    logger.bindOptions(options.debug)
  }

  use(plugins: BasePluginType<E>[]) {
    if (this.options.disable)
      return
    // 新建发布订阅实例
    const subscribe = new Subscribe<E>()
    plugins.forEach((item) => {
      if (!this.isPluginEnable(item.name))
        return
      // 调用插件中的 monitor 方法并将发布函数传入
      item.monitor.call(this, subscribe.notify.bind(subscribe))
      const wrapperTransform = (...args: any[]) => {
        // 先执行 transform
        const res = item.transform.apply(this, args)
        // 拿到 transform 返回的数据并传入
        item.consumer.call(this, res)
      }
      // 订阅插件中的名字，并传入函数
      subscribe.watch(item.name, wrapperTransform)
    })
  }

  getOptions() {
    return this.options
  }

  /**
   *判断当前插件是否启用，每个端可选字段不同，需要子类实现
   *
   * @abstract
   * @param {EventTypes} name
   * @return {*}  {boolean}
   * @memberof BaseClient
   */
  abstract isPluginEnable(name: EventTypes): boolean

  /**
   *手动上报方法，每个端需要自己实现
   *
   * @abstract
   * @param {Logtypes} data
   * @memberof BaseClient
   */
  abstract log(data: Logtypes): void
}
