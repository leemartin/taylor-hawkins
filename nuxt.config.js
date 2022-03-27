export default {
  buildModules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/app.css'],
  head: {
    title: 'Taylor Hawkins: 1972 - 2022',
    link: [
      {
        href: '/favicon.png',
        rel: 'icon',
        type: 'image/png'
      }
    ],
    meta: [
      {
        charset: 'utf-8'
      }, {
        property: 'og:site_name',
        content: "Taylor Hawkins"
      }, {
        property: 'og:image',
        content: "https://www.taylorhawkins.rip/images/social.jpg"
      }, {
        property: 'og:title',
        content: "Taylor Hawkins"
      }, {
        property: 'og:description',
        content: "1972 - 2022"
      }, {
        property: 'og:url',
        content: "https://www.taylorhawkins.rip"
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
        content: "Taylor Hawkins"
      }, {
        name: 'twitter:description',
        content: "1972 - 2022"
      }, {
        name: 'twitter:image',
        content: "https://www.taylorhawkins.rip/images/social.jpg"
      }, {
        name: 'twitter:url',
        content: "https://www.taylorhawkins.rip"
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