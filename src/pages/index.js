import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'

import SEO from '../components/SEO'
import { rhythm } from '../utils/typography'

import BackgroundImage from '../assets/background.jpg'
import Natalia from '../assets/natalia.jpg'

import '../css/index.scss'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <section>
        <SEO siteTitle={siteTitle} />

        <header
          style={{ backgroundImage: `url(${BackgroundImage})` }}
          className="header"
        >
          <div className="header-inner">
            <div className="header-content">
              <img src={Natalia} alt="Natalia foto" className="header-img" />
              <h1 className="header-title">Natalia Acevedo</h1>
              <h2 className="header-subtitle">Consultora de marketing</h2>
            </div>
          </div>
        </header>

        <main className="feed">
          {posts.map(({ node }) => {
            const title = get(node, 'frontmatter.title') || node.fields.slug
            return (
              <article className="card" key={node.fields.slug}>
                <Link to={node.fields.slug} className="card-image-link">
                  <div
                    style={{ backgroundImage: `url(${BackgroundImage})` }}
                    className="card-image"
                  />
                </Link>
                <div className="card-content">
                  <Link to={node.fields.slug} className="card-content-link">
                    <header>
                      <span className="card-date">{node.frontmatter.date}</span>
                      <h2 className="card-title">{title}</h2>
                    </header>
                    <section>
                      <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                    </section>
                  </Link>
                </div>
              </article>
            )
          })}
        </main>
      </section>
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
