<template>
  <header class="header-con">x</header>
  <div class="my-kit-doc">
    <aside>
      <router-link v-for="(link, index) in data.links" :key="index" :to="link.path">{{ link.name }}</router-link>
    </aside>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import ComponentList from 'packages/list.json';
import { reactive } from 'vue'

const data = reactive({
  links: ComponentList.map(item => ({
    path: `/components/${item.compName}`,
    name: item.compZhName
  }))
})
</script>

<style lang="less">
@header-com-height: 50px;
html,
body {
  margin: 0;
  padding: 0;
  display: flex;
}
.header-con {
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: @header-com-height;
  position: fixed;
  z-index: 3;
}
.my-kit-doc {
  display: flex;
  height: 100vh;
  aside {
    margin-top: @header-com-height;
    width: 200px;
    padding: 15px;
    border-right: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
  }
  main {
    margin-top: @header-com-height;
    width: 100%;
    flex: 1;
    padding: 15px;
    overflow-y: scroll;
  }
}
</style>