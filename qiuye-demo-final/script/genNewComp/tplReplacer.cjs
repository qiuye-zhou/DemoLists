const fs = require('fs-extra')
const handlebars = require('handlebars')
const { resolve } = require('path')

const getTplFilePath = (meta) => ({
  // docs 目录
  readme: {
    from: './.template/docs/README.md.tpl',
    to: `../../packages/components/${meta.compName}/docs/README.md`
  },
  demo: {
    from: './.template/docs/demo.vue.tpl',
    to: `../../packages/components/${meta.compName}/docs/demo.vue`
  },
  // src 目录
  vue: {
    from: './.template/src/index.vue.tpl',
    to: `../../packages/components/${meta.compName}/src/index.vue`
  },
  // 根目录
  install: {
    from: './.template/index.ts.tpl',
    to: `../../packages/components/${meta.compName}/index.ts`
  },
})

const compFilesTplReplacer = (meta) => {
  const filePaths = getTplFilePath(meta)
  Object.keys(filePaths).forEach(key => {
    const fileTpl = fs.readFileSync(resolve(__dirname, filePaths[key].from), 'utf-8')
    const fileContent = handlebars.compile(fileTpl)(meta)
    fs.outputFile(resolve(__dirname, filePaths[key].to), fileContent, err => {
      if (err) console.log(err)
    })
  })
}

// 读取 packages/list.json 并更新
const listJsonTplReplacer = (meta) => {
  const listFilePath = '../../packages/list.json'
  const listFileTpl = fs.readFileSync(resolve(__dirname, listFilePath), 'utf-8')
  const listFileContent = JSON.parse(listFileTpl)
  listFileContent.push(meta)
  const newListFileContentFile = JSON.stringify(listFileContent, null, 2)
  fs.writeFile(resolve(__dirname, listFilePath), newListFileContentFile, err => {
    if (err) console.log(err)
  })
  return listFileContent
}

// 更新 router.ts
const routerTplReplacer = (listFileContent) => {
  const routerFileFrom = './.template/router.ts.tpl'
  const routerFileTo = '../../src/router.ts'
  const routerFileTpl = fs.readFileSync(resolve(__dirname, routerFileFrom), 'utf-8')
  const routerMeta = {
    routes: listFileContent.map(comp => {
      return `{
    title: '${comp.compZhName}',
    name: '${comp.compName}',
    path: '/components/${comp.compName}',
    // @ts-ignore
    component: () => import('packages/components/${comp.compName}/docs/README.md'),
  }`
    })
  }
  const routerFileContent = handlebars.compile(routerFileTpl, { noEscape: true })(routerMeta)
  fs.outputFile(resolve(__dirname, routerFileTo), routerFileContent, err => {
    if (err) console.log(err)
  })
}

// 更新 install.ts
const installTsTplReplacer = (listFileContent) => {
  const installFileFrom = './.template/install.ts.tpl'
  const installFileTo = '../../packages/index.ts' // 这里没有写错，别慌
  const installFileTpl = fs.readFileSync(resolve(__dirname, installFileFrom), 'utf-8')
  const installMeta = {
    importcomponents: listFileContent.map(({ compName }) => `${compName},`).join('\n'),
    exportcomponents: listFileContent.map(({ compName }) => `${compName},`).join('\n'),
  }
  const installFileContent = handlebars.compile(installFileTpl, { noEscape: true })(installMeta)
  fs.outputFile(resolve(__dirname, installFileTo), installFileContent, err => {
    if (err) console.log(err)
  })
}

//更新components导出的index.ts
const componentsexport = (listFileContent) => {
  const installFileFrom = './.template/exportcomponents.ts.tpl'
  const installFileTo = '../../packages/components/index.ts' // 这里没有写错，别慌
  const installFileTpl = fs.readFileSync(resolve(__dirname, installFileFrom), 'utf-8')
  const installMeta = {
    importcomponents: listFileContent.map(({ compName }) => `import ${compName} from './${compName}/src/index.vue'`).join('\n'),
    exportlist: listFileContent.map(({ compName }) => `${compName},`).join('\n'),
  }
  const installFileContent = handlebars.compile(installFileTpl, { noEscape: true })(installMeta)
  fs.outputFile(resolve(__dirname, installFileTo), installFileContent, err => {
    if (err) console.log(err)
  })
}

module.exports = (meta) => {
  compFilesTplReplacer(meta)
  const listFileContent = listJsonTplReplacer(meta)
  routerTplReplacer(listFileContent)
  installTsTplReplacer(listFileContent)
  componentsexport(listFileContent)

  console.log(`组件新建完毕，请前往 packages/${meta.compName} 目录进行开发`);
}