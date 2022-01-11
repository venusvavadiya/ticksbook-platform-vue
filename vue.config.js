module.exports = {
  transpileDependencies: [
    'vuetify',
  ],

  pages: {
    index: {
      entry: 'src/main.js',
    },
  },

  pwa: {
    name: 'TicksBook',
    display: 'standalone',
    themeColor: '#272727',
    msTileColor: '#272727',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    backgroundColor: '#000000',
    startUrl: 'https://ticksbook-platform-vue.vercel.app',

    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: null,
      maskIcon: null,
      msTileImage: null,
    },
  },
};
