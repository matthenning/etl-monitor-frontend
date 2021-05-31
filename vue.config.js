module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  indexPath: 'sla_frontend_index.html',
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/ssas/variables.scss"'
      }
    }
  },
  pwa: {
    name: 'MyAppTitle',
    iconPaths: {
      favicon32: 'assets/img/icons/favicon-32.png',
      favicon16: 'assets/img/icons/favicon-16.png'
    }
  }
}
