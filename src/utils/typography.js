import Typography from 'typography'
import doelgerTheme from 'typography-theme-doelger'

doelgerTheme.overrideThemeStyles = () => ({
  '.post > p': {
    fontSize: '21px',
  },
  '.post .gatsby-resp-image-link': {
      color: "inherit",
      textShadow: "none",
      backgroundImage: "none"
  },
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
  },
})

const typography = new Typography(doelgerTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
