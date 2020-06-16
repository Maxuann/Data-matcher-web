const path = require('path');
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 全局变量路径，不能使用路径别名
        path.resolve(__dirname, 'src/assets/css/themes.less')
      ]
    }
  },
  devServer: {
    port: 8081
  }
}
