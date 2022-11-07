const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        mainProcessFile: 'src/main/background.js'
      }
    }
  },
  pages: {
    index: {
      entry: 'src/renderer/main.js'
    }
  }
})
