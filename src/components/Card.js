import React from 'react'
import { Link } from "gatsby"
import Img from 'gatsby-image'

const Card = ({ path, tumbnail, date, timeToRead, excerpt, title }) => {
  return (
    <article className="card" key={path}>
      <Link to={path} className="card-image-link no-link" aria-label={title}>
        <Img resolutions={tumbnail} className="card-image " />
      </Link>
      <div className="card-content">
        <Link to={path} className="card-content-link no-link" aria-label={title}>
          <header>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="card-date">{date}</span>
              <span className="card-date">{timeToRead}MIN</span>
            </div>
            <h3 className="card-title">{title}</h3>
          </header>
          <section>
            <p style={{color: "#666"}} dangerouslySetInnerHTML={{ __html: excerpt }} />
          </section>
        </Link>
      </div>
    </article>
  )
}

export const MiniCard = ({ path, imagen, date, title }) => {
  const num = Math.floor(Math.random() * (1000 - 1) + 1)
  return (
    <Link
      className="card card-small"
      to={path}
      rel="prev"
      style={{ maxWidth: '290px', height: '100%' }}
    >
      <img
        src={`https://picsum.photos/300/200?image=${num}`}
        alt="miniatura imagen"
        className="card-image card-image-link"
      />
      <div className="card-content" style={{ padding: '15px' }}>
        <header>
          <span className="card-date">{date}</span>
          <h2 className="card-title">{title}</h2>
        </header>
      </div>
    </Link>
  )
}

export default Card
