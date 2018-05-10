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
    const posts = get(this, 'props.data.allMarkdownRemark.edges') || []

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
          style={{
            backgroundImage: `url(${
              data.background.childImageSharp.resolutions.src
            })`,
          }}
          className="header"
        >
          <div className="header-inner">
            <div className="header-content">
              <Img
                resolutions={data.natalia.childImageSharp.resolutions}
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
                  aria-label="url fanpage"
                  rel="noopener"
                >
                  <i className="icon-facebook" />
                </a>
                <a
                  target="_blank"
                  className="no-link"
                  href="https://api.whatsapp.com/send?phone=573156845565"
                  aria-label="url whatsapp"
                  rel="noopener"
                >
                  <i className="icon-whatsapp" />
                </a>
                <a
                  target="_blank"
                  className="no-link"
                  href="https://meetings.hubspot.com/natalia-benitez-acevedo-1306"
                  aria-label="url agendar cita"
                  rel="noopener"
                >
                  <i className="icon-mail" />
                </a>
              </div>
            </div>
          </div>
        </header>

        <main className="feed">
          {posts.map(({ node }) => {
            const title = get(node, 'frontmatter.title')
            return (
              <article className="card" key={node.frontmatter.path}>
                <Link
                  to={node.frontmatter.path}
                  className="card-image-link no-link"
                  aria-label={title}
                >
                  <Img
                    resolutions={
                      node.fields.thumbnail.childImageSharp.resolutions
                    }
                    style={{
                      backgroundImage: `url(${node.frontmatter.imagen})`,
                    }}
                    className="card-image "
                  />
                </Link>
                <div className="card-content">
                  <Link
                    to={node.frontmatter.path}
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
    natalia: file(relativePath: { regex: "/natalia.jpg/" }) {
      childImageSharp {
        resolutions(width: 250, height: 250) {
          ...GatsbyImageSharpResolutions_withWebp
        }
      }
    }
    background: file(relativePath: { regex: "/background.jpg/" }) {
      childImageSharp {
        resolutions(width: 1200, quality: 100) {
          ...GatsbyImageSharpResolutions_withWebp
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
            thumbnail {
              childImageSharp {
                resolutions(width: 360) {
                  ...GatsbyImageSharpResolutions
                }
              }
            }
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            path
            imagen
          }
        }
      }
    }
  }
`
