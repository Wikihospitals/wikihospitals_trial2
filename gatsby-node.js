require("dotenv").config()
const path = require(`path`)
const { AIRTABLE_TABLE_NAME: tableName } = process.env

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allAirtable(filter: { table: { eq: "${tableName}" } }) {
          nodes {
            data {
              slug
              name : Company_title
              description : Description
              image {
                url
              }
            }
          }
        }
      }
    `).then(({ errors, data }) => {

      if (errors) {
        reject(errors)
      }

      const posts = data.allAirtable.nodes
      const component = path.resolve(`./src/templates/single-item.jsx`)
      const postsPerPage = 10
      const numPages = Math.ceil(posts.length / postsPerPage)

      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? `/` : `/page/${i + 1}`,
          component: path.resolve(`./src/templates/index.jsx`),
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1,
          },
        })
      })
      
      data.allAirtable.nodes.map(({ data: { slug } }) => {
        createPage({
          component,
          context: { slug },
          path: `/${slug}`,
        })
      })

      createPage({
        path: "/search",
        component: path.resolve(`./src/templates/ClientSearchTemplate.js`),
        context: {
          bookData: {
            allBooks: data.allAirtable.nodes.slice(1, 9),
            options: {
              indexStrategy: "Prefix match",
              searchSanitizer: "Lower Case",
              TitleIndex: true,
              AuthorIndex: true,
              SearchByTerm: true,
            },
          },
        },
      })

      resolve()
    })
  })
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions

  createPage({
    ...page,
    context: {
      ...page.context,
      tableName,
    },
  })
}
