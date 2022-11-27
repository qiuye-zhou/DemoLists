# qiuye-demo-final
### 简介
写组件库练习的demo


### **以下是写demo时发包到npm时顺便练习分包流程，能安装使用，但是现在demo已经写完了，对应练习的npm包当然也删除了**

### 安装使用
使用 npm 或 yarn 安装
```
# npm
npm i qiuye-demo-final

# yarn
yarn add qiuye-demo-final
```
#### 引入 qiuye-demo-final
#### 完整引入
```js
import { createApp } from 'vue'
import App from './App.vue'
import 'qiuye-demo-final/dist/style.css';
import QIU from 'qiuye-demo-final';

const app = createApp(App);
app.use(QIU);
app.mount('#app');
```
#### 按需引入
qiuye-demo-final 提供了基于 ES Module 开箱即用的 Tree Shaking 功能。

```js
// main.js 导入样式
import 'qiuye-demo-final/dist/style.css';

// 引入组件
import { QiuYeButton } from 'qiuye-demo-final';
已开发组件
```

QiuYeButton