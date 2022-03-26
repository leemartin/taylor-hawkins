export default {
  buildModules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/app.css'],
  head: {
    title: 'Taylor Hawkins',
    meta: [
      {
        charset: 'utf-8'
      }, {
        // name: 'viewport',
        // content: 'width=device-width, initial-scale=1'
      }, {
        property: 'og:site_name',
        content: ""
      }, {
        property: 'og:image',
        content: ""
      }, {
        property: 'og:title',
        content: ""
      }, {
        property: 'og:description',
        content: ""
      }, {
        property: 'og:url',
        content: ""
      }, {
        property: 'og:type',
        content: "website"
      }, {
        name: 'twitter:card',
        content: "summary_large_image"
      }, {
        name: 'twitter:site',
        content: "taylorhawkins"
      }, {
        name: 'twitter:title',
        content: ""
      }, {
        name: 'twitter:description',
        content: ""
      }, {
        name: 'twitter:image',
        content: ""
      }, {
        name: 'twitter:url',
        content: ""
      }
    ],
    script: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js'
      }
    ]
  },
  modules: [
    '@nuxt/content'
  ]
}