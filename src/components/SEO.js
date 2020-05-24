import React from 'react'
import { Helmet } from "react-helmet";

const SEO = ({ title, description, image, url, isPost, date }) => {

  const schemaOrgJSONLD = []

  if (!isPost) {
    schemaOrgJSONLD.push(
      {
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        url: url,
        name: title,
        alternateName: description,
      },
      {
        "@context": "http://schema.org",
        "@type": "Person",
        "name": "Yeison Daza",
        "url": "https://yeisondaza.com/",
        "sameAs": [
          "https://www.facebook.com/yeison7",
          "https://instagram.com/yeion7",
          "https://www.linkedin.com/in/yeion7",
          "https://twitter.com/yeion7"
        ]
      }
    )
  }

  if (isPost) {
    schemaOrgJSONLD.push(
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
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://yeisondaza.com/"
        },
        "headline": title,
        "image": [
          image
        ],
        "datePublished": date,
        "dateModified": date,
        "author": {
          "@type": "Person",
          "name": "Yeisonn Daza"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Yeison Daza",
          "logo": {
            "@type": "ImageObject",
            "url": "https://yeisondaza.com/favicon-196x196.png"
          }
        },
        "description": description
      }
    )
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
      <link rel="canonical" href={`${url}/`} />
    </Helmet>
  )
}

export default SEO
