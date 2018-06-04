import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

const Card = ({
  path, 
  tumbnail, 
  date, 
  timeToRead, 
  excerpt,
  title
}) => {
  return (
    <article className="card" key={path}>
      <Link
        to={path}
        className="card-image-link no-link"
        aria-label={title}
      >
        <Img
          resolutions={tumbnail}
          className="card-image "
        />
      </Link>
      <div className="card-content">
        <Link
          to={path}
          className="card-content-link"
          aria-label={title}
        >
          <header>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <span className="card-date">{date}</span>
            <span className="card-date">{timeToRead}MIN</span>
            </div>
            <h2 className="card-title">{title}</h2>
          </header>
          <section>
            <p dangerouslySetInnerHTML={{ __html: excerpt }} />
          </section>
        </Link>
      </div>
    </article>
  )
}

export const MiniCard = ({path, imagen, date, title}) => {
  return (
    <Link 
      className="card"
      to={path} 
      rel="prev"
      style={{maxWidth: "290px", height: "100%"}}
    >
      <img 
        src={imagen} 
        alt="miniatura imagen" 
        className="card-image card-image-link"
      />
      <div className="card-content" style={{padding: "15px"}}>
        <header>
          <span className="card-date">{date}</span>
          <h2 className="card-title">{title}</h2>
        </header>
      </div>
    </Link>
  )
}

export default Card