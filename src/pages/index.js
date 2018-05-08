import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <div>
        <Helmet title={siteTitle}>
          <link
            rel="apple-touch-icon-precomposed"
            sizes="57x57"
            href="/apple-touch-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="114x114"
            href="/apple-touch-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="72x72"
            href="/apple-touch-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="144x144"
            href="/apple-touch-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="60x60"
            href="/apple-touch-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="120x120"
            href="/apple-touch-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="76x76"
            href="/apple-touch-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="152x152"
            href="/apple-touch-icon-152x152.png"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicon-196x196.png"
            sizes="196x196"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicon-96x96.png"
            sizes="96x96"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicon-32x32.png"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicon-16x16.png"
            sizes="16x16"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicon-128.png"
            sizes="128x128"
          />
          <meta name="application-name" content="Natalia Acevedo" />
          <meta name="msapplication-TileColor" content="#FF483B" />
          <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
          <meta
            name="msapplication-square70x70logo"
            content="/mstile-70x70.png"
          />
          <meta
            name="msapplication-square150x150logo"
            content="/mstile-150x150.png"
          />
          <meta
            name="msapplication-wide310x150logo"
            content="/mstile-310x150.png"
          />
          <meta
            name="msapplication-square310x310logo"
            content="/mstile-310x310.png"
          />
        </Helmet>
        {posts.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          )
        })}
      </div>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`
