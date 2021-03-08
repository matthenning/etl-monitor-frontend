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
  }

}
