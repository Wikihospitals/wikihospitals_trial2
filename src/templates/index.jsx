import React from "react"
import { graphql } from "gatsby"
import { Cards, SiteMetadata } from "../components"
import { Layout } from "../layouts/Layout"
import { Link } from "gatsby"
import "lazysizes"

export default (props) => {
  const { data, pageContext } = props
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

  return (
    <Layout>
      <SiteMetadata
        title="Wiki Hospitals"
        description="A site that displays the latest in international health technology along with blog posts about patients stories."
        image={data.hero.url}
      />

      <div className="container pt-6 overflow-hidden">
        <h1 style={{ marginTop: `3em`, textAlign: `left` }}>
          A site that displays the latest in international health technology
          along with blog posts about patients stories.
        </h1>
      </div>

      <Cards nodes={data.items.nodes} />

      <div className="container pt-6 overflow-hidden">
        <div className="flex flex-wrap -mx-3 xl:-mx-6">
          <div className="w-1/2 sm:w-1/2 xl:w-1/2 px-3 xl:px-6 py-6 text-left">
            {!isFirst && (
              <Link
                to={`${prevPage === "/" ? prevPage : "/page/" + prevPage}`}
                rel="prev"
              >
                ← Previous Page
              </Link>
            )}
          </div>
          <div className="w-1/2 sm:w-1/2 xl:w-1/2 px-3 xl:px-6 py-6 text-right">
            {!isLast && (
              <Link to={`/page/${nextPage}`} rel="next">
                Next Page →
              </Link>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query IndexQuery($skip: Int!, $limit: Int!) {
    hero: file(relativePath: { eq: "hero-travel.jpg" }) {
      ...HeroImageFragment
    }
    items: allAirtable(
      limit: $limit
      skip: $skip
      filter: { table: { eq: "Health companies" } }
    ) {
      nodes {
        data {
          country: Country_of_origin
          name: Company_title
          slug
          description: Description
          image {
            url
          }
        }
      }
    }
  }
`
