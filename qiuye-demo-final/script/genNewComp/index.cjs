const infoCollector = require('./infoCollector.cjs')
const tplReplacer = require('./tplReplacer.cjs')

async function run () {
    const meta = await infoCollector()

    tplReplacer(meta)
}

run()