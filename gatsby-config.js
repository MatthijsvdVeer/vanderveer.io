module.exports = {
  siteMetadata: {
    title: `Matthijs van der Veer's Blog`,
    author: {
      name: `Matthijs van der Veer`,
      summary: `, Coding Architect @ Xebia & Microsoft MVP Award Winner.`,
    },
    description: `A blog by Matthijs van der Veer on Internet of Things, Microsoft Technology and gadgets.`,
    siteUrl: `https://www.vanderveer.io/`,
    social: {
      twitter: `https://twitter.com/MatthijsvdVeer`,
      github: `https://github.com/MatthijsvdVeer`,
      stackOverflow: `https://stackoverflow.com/users/8800237/matthijs-van-der-veer`,
      linkedIn: `https://www.linkedin.com/in/matthijsvanderveer/`,
      mastodon: `https://mastodon.online/@MatthijsvdVeer`
    },
  },
  plugins: [
    `gatsby-plugin-image`,
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
              maxWidth: 630,
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
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
          `,
          feeds:[
            {
              serialize: ({ query: { site, allMarkdownRemark } }) => {
                return allMarkdownRemark.nodes.map(node => {
                  return Object.assign({}, node.frontmatter, {
                    description: node.excerpt,
                    date: node.frontmatter.date,
                    url: site.siteMetadata.siteUrl + node.fields.slug,
                    guid: site.siteMetadata.siteUrl + node.fields.slug,
                    custom_elements: [{ "content:encoded": node.html }],
                  })
                })
              },
              query: `
                {
                  allMarkdownRemark(
                    sort: { order: DESC, fields: [frontmatter___date] },
                  ) {
                    nodes {
                      excerpt
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              `,
              output: "/rss.xml",
              title: "Gatsby Starter Blog RSS Feed",
            },
          ]
        }
    },
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
