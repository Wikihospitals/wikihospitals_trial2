import { Link } from "gatsby-plugin-modal-routing"
import PropTypes from "prop-types"
import React from "react"

export const Card = (props) => {
  const {
    name,
    navigation,
    slug,
    description,
    image
  } = props

  return (
    <div className="bg-white dark:bg-blue-900 h-full shadow-sm rounded-md overflow-hidden hover:bg-blue-100 dark:hover:bg-blue-800">
      <Link to={`/${slug}`} state={{ navigation }} asModal={false}>
        {/* { image && 
        <div className="bg-blue-300">
          <img src={image[0].url} alt={name} />
        </div>
        } */}
        <div className="p-5 pb-1">
          <h1 className="text-2xl text-blue-500 dark:text-blue-300 font-bold leading-snug">
            {name}
          </h1>
          <p className="text-base text-blue-900 dark:text-blue-400 mb-5 font-medium text c-box-text">
            {description}
          </p>
        </div>
      </Link>
    </div>
  )
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    current: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.string),
  }),
  slug: PropTypes.string.isRequired,
}

Card.defaultProps = {
  navigation: {},
}

