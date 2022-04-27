import type { BaseOptionsFieldsIntegrationType } from './baseOptionsType'

export interface BaseClientType<O extends BaseOptionsFieldsIntegrationType = BaseOptionsFieldsIntegrationType> {
  /**
   *  sdk 名称
   */
  SDK_NAME?: string
  sdk_version: string
  /**
   * 配置项和钩子函数
   */
  option: O
  /**
   * 返回配置项和钩子函数
   */
  getOptions(): O
}
