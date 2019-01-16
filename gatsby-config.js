module.exports = {
  siteMetadata: {
    title: 'Yeison Daza',
    author: 'Yeison Daza',
    description: 'website yeison daza',
    siteUrl: 'https://yeisondaza.com',
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `img`,
        path: `${__dirname}/src/assets/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              sizeByPixelDensity: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-121350932-1',
      },
    },
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: '343823819355431',
      },
    },
    {
      resolve: `gatsby-plugin-facebook-analytics`,
      options: {
        appId: '343823819355431',
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-robots-txt',
    `gatsby-plugin-sass`,

    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'YeisonDaza',
        short_name: 'Yeison',
        start_url: '/',
        background_color: '#DE6262',
        theme_color: '#DE6262',
        display: 'minimal-ui',
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-feed`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
        omitGoogleFont: true,
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
      headers: {
        "/(.*\\.(js|json|css|ico|png)$)": [
          "cache-control: public,max-age=31536000,immutable"
        ],
        "/static/(.*)": [
          "cache-control: public,max-age=31536000,immutable"
        ]
      },
      options: {
        mergeSecurityHeaders: true,
        mergeLinkHeaders: true,
        mergeCachingHeaders: true,
        generateMatchPathRewrites: true,
      },
    },
  ],
}
