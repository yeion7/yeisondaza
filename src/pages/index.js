import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import get from 'lodash/get'

import SEO from '../components/SEO'
import { rhythm } from '../utils/typography'

import yeison from '../assets/yeison.jpg'

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
          image={yeison}
          url={siteURL}
          isPost={false}
        />

        <header
          style={{
            backgroundImage: `url(${
              data.background.childImageSharp.sizes.srcWebp
            }), url(${
              data.background.childImageSharp.sizes.src
            })`,
          }}
          className="header"
        >
          <div className="header-inner">
            <div className="header-content">
              <Img
                resolutions={data.yeison.childImageSharp.resolutions}
                alt="Yeison foto"
                className="header-img"
              />
              <h1 className="header-title">Yeison Daza</h1>
              <h2 className="header-subtitle">Frontend Developer</h2>

              <div>
                <a
                  className="no-link"
                  href="https://www.facebook.com/yeion7/"
                  target="_blank"
                  aria-label="url fanpage"
                  rel="noopener"
                >
                  <i className="icon-facebook" />
                </a>
                <a
                  target="_blank"
                  className="no-link"
                  href="https://twitter.com/yeion7"
                  aria-label="url whatsapp"
                  rel="noopener"
                >
                  <i className="icon-twitter" />
                </a>
                <a
                  target="_blank"
                  className="no-link"
                  href="https://www.instagram.com/yeion7/"
                  aria-label="url whatsapp"
                  rel="noopener"
                >
                  <i className="icon-instagram" />
                </a>
                <a
                  target="_blank"
                  className="no-link"
                  href="https://www.linkedin.com/in/yeion7/"
                  aria-label="url whatsapp"
                  rel="noopener"
                >
                  <i className="icon-linkedin" />
                </a>
                <a
                  target="_blank"
                  className="no-link"
                  href="https://github.com/yeion7"
                  aria-label="url whatsapp"
                  rel="noopener"
                >
                  <i className="icon-github" />
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
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <span className="card-date">{node.frontmatter.date}</span>
                      <span className="card-date">{node.timeToRead}MIN</span>
                      </div>
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
    yeison: file(relativePath: { regex: "/yeison.jpg/" }) {
      childImageSharp {
        resolutions(width: 250, height: 250, quality: 90) {
          ...GatsbyImageSharpResolutions_withWebp
        }
      }
    }
    background: file(relativePath: { regex: "/background.png/" }) {
      childImageSharp {
        sizes(quality: 100) {
          ...GatsbyImageSharpSizes_withWebp
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
          timeToRead
          fields {
            thumbnail {
              childImageSharp {
                resolutions(width: 360, height: 230) {
                  ...GatsbyImageSharpResolutions_withWebp
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
