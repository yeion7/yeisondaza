import React from 'react'
import Img from 'gatsby-image'
import get from 'lodash/get'
import VisibilitySensor from 'react-visibility-sensor'
import { graphql } from 'gatsby'

import SEO from '../components/SEO'
import Card from '../components/Card'

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
          description="FrontEnd Developer"
          image={yeison}
          url={siteURL}
          isPost={false}
        />

        <header
          style={{
            backgroundImage: `url(${
              data.background.childImageSharp.fluid.srcWebp
            })`,
          }}
          className="header"
        >
          <div className="header-inner">
            <div className="header-content">
              <VisibilitySensor>
                <Img
                  fixed={data.yeison.childImageSharp.fixed}
                  alt="Yeison foto"
                  className="header-img"
                />
              </VisibilitySensor>
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
              <Card
                key={node.frontmatter.path}
                title={title}
                path={node.frontmatter.path}
                tumbnail={node.fields.thumbnail.childImageSharp.fixed}
                date={node.frontmatter.date}
                timeToRead={node.timeToRead}
                excerpt={node.excerpt}
              />
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
        fixed(width: 250, height: 250, quality: 90) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    background: file(relativePath: { regex: "/background.png/" }) {
      childImageSharp {
        fluid(quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
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
                fixed(width: 360, height: 230) {
                  ...GatsbyImageSharpFixed_withWebp
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
