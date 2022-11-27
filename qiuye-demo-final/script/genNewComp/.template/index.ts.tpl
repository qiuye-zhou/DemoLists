import { install } from '@qiu/utils/install';
import ComponentsIndex from './src/index.vue';

export const {{ compName }} = install(ComponentsIndex, '{{ compClassName }}');
export default {{ compName }};
export * from './src/index.vue';