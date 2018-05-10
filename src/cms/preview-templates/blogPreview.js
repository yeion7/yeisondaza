import React from 'react'
import { Post } from '../../templates/blog-post'

const PostPreview = props => {
  const { entry, widgetFor } = props
  const title = entry.getIn(['data', 'title'])
  const date = entry.getIn(['data', 'date'])
  return (
    <Post
      frontmatter={{ title, date }}
      description={entry.getIn(['data', 'description'])}
      content={widgetFor('body')}
    />
  )
}

export default PostPreview
