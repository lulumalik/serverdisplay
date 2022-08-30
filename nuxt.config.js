export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'serverdisplay',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
    server: {
        port: process.env.PORT || 3002,
        host: process.env.HOST || 'localhost'
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['~/assets/global.css', ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [{
        src: '~/plugins/component.js',
        ssr: false
    }, {
        src: '~/plugins/axios.js',
    }, {
        src: '~/plugins/componentssr.js',
    }, {
        src: '~/plugins/paginate.js',
        ssr: false
    }],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/tailwindcss
        '@nuxtjs/tailwindcss',
        'cookie-universal-nuxt',
        'nuxt-font-loader',

    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        '@nuxtjs/dotenv',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: process.env.BASE_URL || 'https://bmkg-display.circlegeo.com/api/'
    },


    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
    fontLoader: {
        /* module options */
        url: "https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&display=swap",
        prefetch: true,
        preconnect: true

    },
    tailwindcss: {
        theme: {
            extend: {
                width: {
                    '1250': '1250px',
                    '68': '276px'
                },
                colors: {
                    main: '#F5F5F5',
                    'main-10': 'rgba(245, 245, 245, 1)',
                    secondary: '#A32F28',
                    secondary2: '#F13B3B',
                    'white-10': 'rgba(243, 245, 244, 0.8)',
                    'white-20': 'rgba(244,244,244, 0.8)'
                },
            },
        },
        variants: {},
        // plugins: [require('@tailwindcss/custom-forms')],
        purge: {
            // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
            enabled: process.env.NODE_ENV === "production",
            whitelist: ["lvml"],
            whitelistPatterns: [/leaflet-.+$/],
            whitelistPatternsChildren: [/leaflet-.+$/],
        },
        content: {
            files: [
                "components/**/*.vue",
                "layouts/**/*.vue",
                "pages/**/*.vue",
                "plugins/**/*.js",
                "nuxt.config.js",
            ],
        }
    }
}