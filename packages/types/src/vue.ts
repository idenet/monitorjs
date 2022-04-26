import type { IAnyObject } from './common'

export interface VueInstance {
  [key: string]: any
  config?: VueConfiguration
  version: string
}

export interface VueConfiguration {
  // for vue 2.6
  silent?: boolean

  errorHandler?(err: Error, vm: ViewModel | any, info: string): void
  warnHandler?(msg: string, vm: ViewModel | any, trace: string): void
  [key: string]: any
}

export interface ViewModel {
  [key: string]: any
  $root?: Record<string, unknown>
  $options: {
    [key: string]: any
    name?: string
    // vue 2.6
    propsData?: IAnyObject
    _conponentTag?: string
    __file?: string
    props?: IAnyObject
  }
  $props?: Record<string, unknown>
}
