import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'

import SEO from '../components/SEO'
import { rhythm, scale } from '../utils/typography'
import Content, { HTMLContent } from '../components/Content'

export const Post = ({
  content,
  frontmatter,
  previous,
  next,
  siteTitle,
  description,
  image,
  siteUrl,
  path,
  contentComponent,
}) => {
  const PostContent = contentComponent || Content
  return (
    <div
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: rhythm(35),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <Helmet title={`${frontmatter.title} | ${siteTitle}`} />
      <SEO
        title={frontmatter.title}
        description={description}
        image={image}
        url={`${siteUrl}/${path}`}
        isPost
      />
      <h1>{frontmatter.title}</h1>
      <p
        style={{
          ...scale(-1 / 5),
          display: 'block',
          marginBottom: rhythm(1),
          marginTop: rhythm(0.5),
        }}
      >
        {frontmatter.date}
      </p>
      <PostContent content={content} />
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />

      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          listStyle: 'none',
          padding: 0,
        }}
      >
        {previous && (
          <li>
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          </li>
        )}

        {next && (
          <li>
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteMetadata = get(this.props, 'data.site.siteMetadata')
    const { previous, next } = this.props.pathContext

    return (
      <Post
        {...post}
        {...siteMetadata}
        previous={previous}
        next={next}
        content={post.html}
        contentComponent={HTMLContent}
      />
    )
  }
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        imagen
        path
      }
    }
  }
`
