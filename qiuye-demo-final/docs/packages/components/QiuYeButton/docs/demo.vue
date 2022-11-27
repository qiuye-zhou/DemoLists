<template>
    <div>
      <QiuYeButton @click="onClick(1)">第一个</QiuYeButton>
      <QiuYeButton @click="onClick(2)">第二个</QiuYeButton>
      <QiuYeButton @click="onClick(3)">第三个</QiuYeButton>
    </div>
  </template>
  
  <script lang="ts" setup>
  const onClick = (num: any) => { console.log(`我是第 ${num} 个自定义按钮`) }
  </script>