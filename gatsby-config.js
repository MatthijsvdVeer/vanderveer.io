module.exports = {
  siteMetadata: {
    title: `Matthijs van der Veer's Blog`,
    author: {
      name: `Matthijs van der Veer`,
      summary: `who works as an IoT Specialist in Avanade's Digital Innovation Studio.`,
    },
    description: `A starter blog demonstrating what Gatsby can do.`,
    siteUrl: `https://www.vanderveer.io/`,
    social: {
      twitter: `https://twitter.com/MatthijsvdVeer`,
      github: `https://github.com/MatthijsvdVeer`,
      stackOverflow: `https://stackoverflow.com/users/8800237/matthijs-van-der-veer`,
      linkedIn: `https://www.linkedin.com/in/matthijsvanderveer/`
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
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
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-121896968-3`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Matthijs van der Veer's Blog`,
        short_name: `Matthijs van der Veer's Blog`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
