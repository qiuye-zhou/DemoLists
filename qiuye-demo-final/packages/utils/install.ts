import type { App, Plugin } from 'vue'

export const install = <T>(main: T, comName: string) => {
    (main as T & Plugin).install = (Vue: App) => {
        // @ts-ignore
        Vue.component(comName, main)
    }
    return main
}