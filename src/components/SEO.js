import React from 'react'
import Helmet from 'react-helmet'

const SEO = ({ title, description, image, url, isPost }) => {
  
  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: url,
      name: title,
      alternateName: description,
    },
  ]
  if (isPost) {
    schemaOrgJSONLD.push([
      {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': url,
              name: title,
              image: image,
            },
          },
        ],
      },
      {
        '@context': 'http://schema.org',
        '@type': 'BlogPosting',
        url: url,
        name: title,
        alternateName: `Yeison Daza | ${url}`,
        headline: title,
        image: {
          '@type': 'ImageObject',
          url: image,
        },
        description,
      },
    ])
  }

  return (
    <Helmet>
      <html lang="es" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />

      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {
        isPost && <link rel="amphtml" href={url.replace('.com/', ".com/amp/")} />
      }
      {/* Facebook Card tags */}

      <meta property="og:url" content={url} />
      <meta property="og:type" content={isPost ? "article" : "website"} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="fb:app_id" content="" />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}

export default SEO
