const fs = require('fs-extra')

async function copyFiles (src, dist) {
  try {
    await fs.copy(src, dist)
    console.log('success!')
  } catch (err) {
    console.error(err)
  }
}

copyFiles('./packages', './docs/packages');
