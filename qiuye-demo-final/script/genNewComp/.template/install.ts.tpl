/*
 * @module: 组件库包入口
 */
import components, { {{ importcomponents }} } from './components'
import type { App } from 'vue'

import packg from '../package.json'

interface OptionsType {}

/**
 * 全局注册使用
 * @param Vue Vue
 * @param opts 配置项参数
 */
const install = (Vue: App, opts?: OptionsType) => {
    // @ts-ignore
    if (install.installed) return

    Object.keys(components).forEach((key: string) => {
        Vue.component(key, components[key])
    })
}

/**
 * script标签引入
 */
// @ts-ignore
if (typeof window !== 'undefined' && window.Vue) {
    // @ts-ignore
    install(window.Vue)
}

export { {{ exportcomponents }} }

export default {
    version: packg.version,
    install
}