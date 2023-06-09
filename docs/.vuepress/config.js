const urls = require("./urls-mapping.js");
const sidebarUrls = require("./sidebar-urls");
const _slugify = require('@vuepress/shared-utils/lib/slugify');

const slugifyLinks = (s) => {
  if (sidebarUrls[s]) {
    return sidebarUrls[s];
  }
  return _slugify(s);
};

// set your global autometa options
const autoMetaOptions = {
  site: {
    name : 'Imunify 360 Documentation',
    // twitter: 'im_360_docs',
  },
  canonical_base: 'https://docs.imunify360.com/',
};

const { path } = require('@vuepress/utils')

module.exports = {
  globalUIComponents: [
    'Chat'
  ],
  plugins: [
    ['container', {
      type: 'warning',
      before: info => `<div class="warning custom-block"><p class="custom-block-title">${info}</p>`,
      after: '</div>',
    }],
    ['container', {
      type: 'tip',
      before: info => `<div class="tip custom-block"><p class="custom-block-title">${info}</p>`,
      after: '</div>',
    }],
    ['container', {
      type: 'danger',
      before: info => `<div class="danger custom-block"><p class="custom-block-title">${info}</p>`,
      after: '</div>',
    }],
//    ['disqus-spa', { shortname: 'docsimunify360com' }],
    ['@vuepress/google-analytics',
      {
        'ga': 'UA-12711721-12'
      }
    ],
    [ 'autometa', autoMetaOptions ],
    [ 'separate-pages', { alwaysVisibleBlocks: ['#disqus_thread'] } ],
    [
      '@vuepress/register-components',
      {
        componentsDir: path.resolve(__dirname, './components'),
      },
    ]
  ],
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    }
  },
  base: "/",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    [
      "meta",
      {
        name: "referrer",
        content: "unsafe-url"
      }
    ],
    [
      "meta",
      {
        "http-equiv": "Content-Security-Policy",
        content: "script-src 'self' 'unsafe-inline' 'unsafe-inline' 'unsafe-eval' *.survicate.com *.googletagmanager.com *.google-analytics.com *.licdn.com *.hotjar.com *.twitter.com *.facebook.net *.kernelcare.info *.twitter.com *.ads-twitter.com;"
      }
    ],
    [
      "script",
      {},
      `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5MC2SNS');`
    ],
  ],

  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    "/": {
      lang: "en-US", // this will be set as the lang attribute on <html>
      title: "Documentation",
      description: "Imunify360 documentation"
    },
//    "/ru/": {
//    lang: "ru",
//      title: "Документация",
//      description: "Документация Imunify360"
//    }
  },
 theme: "cloudlinux",
  // theme: '/Users/prefer/src/cloudlinux-doc-theme', // local path
  markdown: {
    slugify: slugifyLinks,
    toc: {
      slugify: slugifyLinks,
    }
  },

  themeConfig: {
    repo: "cloudlinux/imunify360-doc",
    editLinks: true,
    docsBranch: "dev",
    docsDir: "docs",

    translationSource: 'docs.imunify360.com',
    defaultURL: "/introduction/",
    submitRequestURL: "https://www.imunify360.com/support-portal/",
    hideHeading: true,
    redirectionMapping: urls,
    sidebarDepth: 2,
    logo: "/logo.svg",
    try_free: "https://www.imunify360.com/trial",
    social: [
      { url: "https://www.facebook.com/imunify360/", logo: "/fb.png" },
      { url: "https://twitter.com/imunify360/", logo: "/tw.png" },
      { url: "https://linkedin.com/company/cloudlinux", logo: "/in.png" },
      {
        url: "https://www.youtube.com/channel/UCcW6dDJjcy41c7Hl_5LdLZQ",
        logo: "/ytube.png"
      }
    ],
    cloudlinuxSite: "https://cloudlinux.com",
    locales: {
      "/": {
        // text for the language dropdown title
        title: "Language",
        // text for the language dropdown
        selectText: "En",
        // label for this locale in the language dropdown
        label: "English",
        // text for the edit-on-github link
        editLinkText: "Edit this page",
        tryFree: "Try Free",
        submitRequest: "Contact Support",
        search: "Search",
        // config for Service Worker
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        algolia: {
          apiKey: "e6b9d79daf71aa98e2e2a51d4556f9d4",
          indexName: "imunify360-unified",
          appId: "0TCNL6CGX8"
        },
        stayInTouch: "Stay in touch",
        bottomLinks: [
            {
                text: "How to",
                url: "https://cloudlinux.zendesk.com/hc/en-us/categories/360002375980-Imunify-Security-Products"
            },
            {
                text: "Getting started",
                url: "https://www.imunify360.com/getting-started"
            },
            {
                text: "Submit request",
                url: "https://cloudlinux.zendesk.com/hc/en-us/requests/new"
            },
            { text: "Blog", url: "https://blog.imunify360.com" }
        ],
        sidebar: [
          {
            title: "Contents",
            collapsable: false,
            children: [
              "/introduction/",
              "/billing/",
              "/installation/",
              "/update/",
              "/command_line_interface/",
              "/control_panel_integration/",
              "/dashboard/",
              "/user_interface/",
              "/ids_integration/",
              "/features/",
              "/whmcs_plugin/",
              "/terminology/",
              "/localization/",
              "/config_file_description/",
              "/faq_and_known_issues/",
              "/uninstall/"
            ]
          }
        ]
      },
//      "/ru/": {
//        title: "Язык",
//        selectText: "Рус",
//      label: "Русский",
//        editLinkText: "Редактировать",
//        tryFree: "Попробовать бесплатно",
//        submitRequest: "Служба поддержки",
//        search: "Поиск",
//        serviceWorker: {
//          updatePopup: {
//            message: "Доступен новый контент",
//            buttonText: "Обновить"
//          }
//        },
//        algolia: {
//          apiKey: '29339fdc91169afd5a7dd2a0a9bba6d2',
//          indexName: 'imunify360-ru',
//          appId: 'C6CXTFLPAJ'
//        },
//        stayInTouch: "Будем на связи",
//        bottomLinks: [
//            {
//                text: "Инструкции",
//                url: "https://cloudlinux.zendesk.com/hc/en-us/categories/360002375980-Imunify-Security-Products"
//            },
//            {
//                text: "С чего начать",
//                url: "https://cloudlinux.zendesk.com/hc/en-us/sections/360004020779-Getting-Started"
//            },
//            {
//                text: "Техподдержка",
//                url: "https://www.imunify360.com/contact/"
//            },
//            { text: "Блог", url: "https://www.imunify360.com/blog" }
//        ],
//        sidebar: [
//          {
//            title: "Содержание",
//            collapsable: false,
//            children: [
//              "/ru/introduction/",
//              "/ru/billing/",
//              "/ru/installation/",
//            "/ru/update/",
//              "/ru/command_line_interface/",
//              "/ru/dashboard/",
//              "/ru/user_interface/",
//              "/ru/ids_integration/",
//              "/ru/features/",
//              "/ru/whmcs_plugin/",
//              "/ru/terminology/",
//              "/ru/localization/",
//              "/ru/config_file_description/",
//              "/ru/faq_and_known_issues/",
//              "/ru/uninstall/"
//            ]
//          }
//        ]
//      }
    }
  }
};
