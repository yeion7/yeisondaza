import React from 'react'
import get from 'lodash/get'
import head from 'lodash/head'
import last from 'lodash/last'
import split from 'lodash/split'
import getObj from 'ast-get-object'
import VisibilitySensor from 'react-visibility-sensor'
import 'prismjs/themes/prism-solarizedlight.css'
import '../css/index.scss'

import { graphql } from 'gatsby'
import SEO from '../components/SEO'
import typography from '../utils/typography'
import Content, { HTMLContent } from '../components/Content'
import { MiniCard } from '../components/Card'
import Background from '../assets/background.png'


const { rhythm, scale } = typography

export const Post = ({
  content,
  frontmatter,
  previous,
  next,
  siteTitle,
  image,
  siteUrl,
  contentComponent,
}) => {

  const PostContent = contentComponent || Content
  return (
    <div
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: rhythm(30),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
        image={image ? `${siteUrl}${image}` : Background}
        url={`${siteUrl}/${frontmatter.path}`}
        date={frontmatter.date}
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
      <PostContent content={content} className="post" />
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />

      <VisibilitySensor>
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}
        >
          {previous && (
            <li>
              <MiniCard {...previous.frontmatter} />
            </li>
          )}

          {next && (
            <li>
              <MiniCard {...next.frontmatter} />
            </li>
          )}
        </ul>
      </VisibilitySensor>
    </div>
  )
}

export default class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteMetadata = get(this.props, 'data.site.siteMetadata')
    const { previous, next } = this.props.pageContext

    const ast = post.htmlAst
    const images = getObj(ast, { type: 'element', tagName: 'img' })

    const image = head(split(last(get(head(images), 'properties.srcSet')), ' '))

    return (
      <Post
        {...post}
        {...siteMetadata}
        previous={previous}
        next={next}
        content={post.html}
        contentComponent={HTMLContent}
        image={image}
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
    markdownRemark(frontmatter: { path: { eq: $slug } }) {
      id
      html
      htmlAst
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
