/* eslint-disable prettier/prettier */

/** 
 * !--------- FBI WARNING ----------!
 * 
 * 根据 /packages 目录下的组件所生成的组件类侧边导航栏配置，请勿手动修改
 */

 import { createRouter, createWebHashHistory, RouterOptions } from 'vue-router'

 const routes = [{
    title: '按钮',
    name: 'QiuYeButton',
    path: '/components/QiuYeButton',
    // @ts-ignore
    component: () => import('packages/components/QiuYeButton/docs/README.md'),
  },{
    title: '按钮two',
    name: 'RidusButton',
    path: '/components/RidusButton',
    // @ts-ignore
    component: () => import('packages/components/RidusButton/docs/README.md'),
  },{
    title: '新组件一',
    name: 'Qyone',
    path: '/components/Qyone',
    // @ts-ignore
    component: () => import('packages/components/Qyone/docs/README.md'),
  },{
    title: '新组件二',
    name: 'Qytwo',
    path: '/components/Qytwo',
    // @ts-ignore
    component: () => import('packages/components/Qytwo/docs/README.md'),
  },{
    title: '第三个新组件',
    name: 'Qythres',
    path: '/components/Qythres',
    // @ts-ignore
    component: () => import('packages/components/Qythres/docs/README.md'),
  },{
    title: '最后一次测试力一定过',
    name: 'Qyxxlast',
    path: '/components/Qyxxlast',
    // @ts-ignore
    component: () => import('packages/components/Qyxxlast/docs/README.md'),
  },{
    title: '故障',
    name: 'Gzlxxxx',
    path: '/components/Gzlxxxx',
    // @ts-ignore
    component: () => import('packages/components/Gzlxxxx/docs/README.md'),
  },{
    title: '最后一次测试',
    name: 'Qylastlast',
    path: '/components/Qylastlast',
    // @ts-ignore
    component: () => import('packages/components/Qylastlast/docs/README.md'),
  },{
    title: '信息',
    name: 'Qyzjs',
    path: '/components/Qyzjs',
    // @ts-ignore
    component: () => import('packages/components/Qyzjs/docs/README.md'),
  }];
 
 const routerConfig = {
   history: createWebHashHistory(),
   routes,
   scrollBehavior(to: any, from: any) {
     if (to.path !== from.path) {
       return { top: 0 };
     }
   },
 };
 
 const router = createRouter(routerConfig as RouterOptions);
 
 export default router;
