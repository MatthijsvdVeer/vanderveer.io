/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`query BioQuery {
  avatar: file(absolutePath: {regex: "/profile-pic.png/"}) {
    childImageSharp {
      gatsbyImageData(width: 50, height: 50, layout: FIXED)
    }
  }
  site {
    siteMetadata {
      author {
        name
        summary
      }
      social {
        twitter
        github
        stackOverflow
        linkedIn
        mastodon
      }
    }
  }
}
`)

  const { author, social } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <GatsbyImage
        image={data.avatar.childImageSharp.gatsbyImageData}
        alt={author.name}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }} />
      <p>
        Written by <strong>{author.name}</strong>{author.summary}
        {` `}
        He infrequently tweets on <a target="_blank" href={social.twitter}>Twitter</a>, 
        occasionaly pushes code to <a target="_blank" href={social.github}>GitHub</a> and often answers IoT related
        questions on <a target="_blank" href={social.stackOverflow}>StackOverflow</a>. 
        Feel free to connect on <a target="_blank" href={social.linkedIn}>LinkedIn</a>. Also <a target="_blank" rel="me" href={social.mastodon}>Mastodon</a> is a thing now.
      </p>
    </div>
  );
}

export default Bio
