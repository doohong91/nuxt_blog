const pkg = require('./package')

const src = 'client'

module.exports = {
  mode: 'universal',

  srcDir: src,

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'pageNotFound',
        path: '*',
        component: resolve(__dirname, src + '/pages/404.vue')
      })
    }
  },

  /*
  ** Headers of the page
  */
  head: {
    // title: 'NUXT BLOG',
    titleTemplate: '%s - NUXT BLOG',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js 프레임워크를 사용해 제작된 블로그 서비스 입니다.'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: '//fonts.googleapis.com/css?family=Noto+Sans+KR'
      }
    ]
  },

  /*
  ** baseUrl for FIrebase Backend API
  */
  env: {
    baseUrl: process.env.BASE_URL || 'https://nuxtblog-4af85.firebaseio.com',
    APIKey: ''
  },

  transition: {
    name: 'fade',
    mode: 'out-in',
    beforeEnter(el) {
      // el => 페이지 컴포넌트 DOM 객체
      console.log('페이지 트랜지션 진입', el)
    }
  },

  // 레이아웃 트랜지션 설정
  layoutTransition: {
    name: 'layout',
    mode: 'out-in'
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['~/assets/styles/main.scss'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/GlobalComponents.js',
    '~plugins/Commons.js',
    '~plugins/Notifications.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: ['@nuxtjs/axios'],

  axios: {
    // 모듈 설정
    baseURL: process.env.BASE_URL || 'https://nuxtblog-4af85.firebaseio.com'
  },

  /*
  ** Build configuration
  */
  build: {
    postcss: {
      plugins: {
        'postcss-preset-env': {
          autoprefixer: { grid: true }
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
