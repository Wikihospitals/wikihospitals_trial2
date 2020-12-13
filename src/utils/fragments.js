import { graphql } from 'gatsby'

export const imageUrl = graphql`
    fragment ImageUrl on Image {
        image {
            thumbnails {
              small {
                url
                width
              }
            }
          }
    }
`