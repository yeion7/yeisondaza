import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import get from 'lodash/get'

import SEO from '../components/SEO'
import { rhythm } from '../utils/typography'

import BackgroundImage from '../assets/background.jpg'
import Natalia from '../assets/natalia.jpg'

import '../css/index.scss'

class BlogIndex extends React.Component {
  render() {
    const data = get(this, 'props.data')
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteURL = get(this, 'props.data.site.siteMetadata.siteUrl')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <section>
        <SEO
          title={siteTitle}
          description="Consultora de marketing"
          image={Natalia}
          url={siteURL}
          isPost={false}
        />

        <header
          style={{ backgroundImage: `url(${BackgroundImage})` }}
          className="header"
        >
          <div className="header-inner">
            <div className="header-content">
              <Img
                resolutions={data.file.childImageSharp.resolutions}
                alt="Natalia foto"
                className="header-img"
              />
              <h1 className="header-title">Natalia Acevedo</h1>
              <h2 className="header-subtitle">Consultora de marketing</h2>

              <div>
                <a
                  className="no-link"
                  href="https://www.facebook.com/NataliaAcevedoMKT/ "
                  target="_blank"
                >
                  <i className="icon-facebook" />
                </a>
                <a
                  target="_blank"
                  className="no-link"
                  href="https://api.whatsapp.com/send?phone=573156845565"
                >
                  <i className="icon-whatsapp" />
                </a>
                <a
                  target="_blank"
                  className="no-link"
                  href="https://meetings.hubspot.com/natalia-benitez-acevedo-1306"
                >
                  <i className="icon-mail" />
                </a>
              </div>
            </div>
          </div>
        </header>

        <main className="feed">
          {posts.map(({ node }) => {
            const title = get(node, 'frontmatter.title') || node.fields.slug
            return (
              <article className="card" key={node.fields.slug}>
                <Link
                  to={node.fields.slug}
                  className="card-image-link"
                  aria-label={title}
                >
                  <div
                    style={{ backgroundImage: `url(${BackgroundImage})` }}
                    className="card-image"
                  />
                </Link>
                <div className="card-content">
                  <Link
                    to={node.fields.slug}
                    className="card-content-link"
                    aria-label={title}
                  >
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
    file(relativePath: { regex: "/natalia.jpg/" }) {
      childImageSharp {
        resolutions(width: 125, height: 125) {
          ...GatsbyImageSharpResolutions
        }
      }
    }
    site {
      siteMetadata {
        title
        siteUrl
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
