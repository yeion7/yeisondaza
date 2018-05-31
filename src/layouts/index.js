import React from 'react'
import Link from 'gatsby-link'
import "prismjs/themes/prism-okaidia.css"

import { rhythm, scale } from '../utils/typography'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    return <div>{children()}</div>
  }
}

export default Template
