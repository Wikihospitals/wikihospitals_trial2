import PropTypes from "prop-types"
import React from "react"

export const Scard = (props) => {
  const {
    name,
    slug,
    description,
    image
  } = props

  return (
    <div className="bg-white dark:bg-blue-900 h-full shadow-sm rounded-md overflow-hidden hover:bg-blue-100 dark:hover:bg-blue-800">
      <a href={`/${slug}`} >
        { image && 
        <div className="bg-blue-300">
          <img className="lazyload" data-src={image[0].url} alt={name} />
        </div>
        }
        <div className="p-5 pb-1">
          <h1 className="text-2xl text-blue-500 dark:text-blue-300 font-bold leading-snug">
            {name}
          </h1>
          <p className="text-base text-blue-900 dark:text-blue-400 mb-5 font-medium text c-box-text">
            {description}
          </p>
        </div>
      </a>
    </div>
  )
}

Scard.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
}
