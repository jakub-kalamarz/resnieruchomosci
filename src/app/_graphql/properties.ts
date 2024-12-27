import { MEDIA_FIELDS } from './media'
import { META } from './meta'

export const PROPERTIES = `
  query Properties {
    Properties(limit: 300) {
      docs {
        slug
      }
    }
  }
`

export const PROPERTY = `
  query Property($slug: String, $draft: Boolean) {
    Properties(where: { slug: { equals: $slug }}, limit: 1, draft: $draft) {
      docs {
        id
        title
        createdAt
        content
        additionalContent
        contact {
          name
          email
          phone
          image {
            ${MEDIA_FIELDS}
          }
          bio
        }
        hero {
          propertyType
          advertiseType
          price
          heroImage {
            ${MEDIA_FIELDS}
          }
          secondaryImage {
            ${MEDIA_FIELDS}
          }
          priceImage {
            ${MEDIA_FIELDS}
          }
        }
        ${META}
      }
    }
  }
`
