require("dotenv").config()
const path = require(`path`)
const { AIRTABLE_TABLE_NAME: tableName } = process.env

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allAirtable(filter: { table: { eq: "${tableName}" } }, sort: {order: ASC, fields: [data___Company_title]}) {
          nodes {
            data {
              slug
              name : Company_title
              description : Description
              image {
                url
              }
              ms : Medical_specialties
              md : Diseases
              te : Technology
              pd : Products
              cm : Customer_link
              cn : Country_of_origin
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

      const mapMS = new Map()
      const arrayMS = []

      const mapMD = new Map()
      const arrayMD = []

      const mapTE = new Map()
      const arrayTE = []

      const mapPD = new Map()
      const arrayPD = []

      const mapCM = new Map()
      const arrayCM = []

      const mapCN = new Map()
      const arrayCN = []

      data.allAirtable.nodes.map(
        ({ data: { slug, ms, md, te, pd, cm, cn } }) => {
          if (ms) {
            ms.forEach((item) => {
              if (!mapMS.has(item)) {
                mapMS.set(item, true)
                arrayMS.push({ value: item, label: item })
              }
            })
          }

          if (md) {
            md?.forEach((item) => {
              if (!mapMD.has(item)) {
                mapMD.set(item, true)
                arrayMD.push({ value: item, label: item })
              }
            })
          }

          if (te) {
            te?.forEach((item) => {
              if (!mapTE.has(item)) {
                mapTE.set(item, true)
                arrayTE.push({ value: item, label: item })
              }
            })
          }

          if (pd) {
            pd?.forEach((item) => {
              if (!mapPD.has(item)) {
                mapPD.set(item, true)
                arrayPD.push({ value: item, label: item })
              }
            })
          }

          if (cm) {
            cm?.forEach((item) => {
              if (!mapCM.has(item)) {
                mapCM.set(item, true)
                arrayCM.push({ value: item, label: item })
              }
            })
          }

          if (cn) {
            cn?.forEach((item) => {
              if (!mapCN.has(item)) {
                mapCN.set(item, true)
                arrayCN.push({ value: item, label: item })
              }
            })
          }

          createPage({
            component,
            context: { slug },
            path: `/${slug}`,
          })
        }
      )

      createPage({
        path: "/search",
        component: path.resolve(`./src/templates/ClientSearchTemplate.js`),
        context: {
          bookData: {
            allBooks: data.allAirtable.nodes,
            allMS: arrayMS.sort(),
            allMD: arrayMD.sort(),
            allTE: arrayTE.sort(),
            allPD: arrayPD.sort(),
            allCM: arrayCM.sort(),
            allCN: arrayCN.sort(),
            options: {
              indexStrategy: "Prefix match",
              searchSanitizer: "Lower Case",
              TitleIndex: true,
              AuthorIndex: true,
              SearchByTerm: true,
              MSIndex: true,
              MDIndex: true,
              TEIndex: true,
              PDIndex: true,
              CMIndex: true,
              CNIndex: true,
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
