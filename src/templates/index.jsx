import React from "react"
import { graphql } from "gatsby"
import { Cards, SiteMetadata } from "../components"
import { Layout } from "../layouts/Layout"
import { Link } from 'gatsby'

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

      {/* <Hero
        image={data.hero}
        tag="#wikihospitals"
        title="Wiki Hospitals"
        description="A site that displays the latest in international health technology along with blog posts about patients stories."
      /> */}

      <Cards nodes={data.items.nodes} />

          <div className="container pt-6 overflow-hidden">
              <div className="flex flex-wrap -mx-3 xl:-mx-6">
                <div className="w-full sm:w-1/2 xl:w-1/3 px-3 xl:px-6 py-6 text-right">
                    {!isFirst && (
                      <Link to={`/${prevPage}`} rel="prev">
                          ← Previous Page
                      </Link>
                  )}
                </div>
                <div className="w-full sm:w-1/2 xl:w-1/3 px-3 xl:px-6 py-6">
                    {/* {Array.from({ length: numPages }, (_, i) => (
                        <Link key={`pagination-number${i + 1}`} to={`/${i === 0 ? "" : i + 1}`}>
                        {i + 1}
                        </Link>
                    ))} */}
                </div>
                <div className="w-full sm:w-1/2 xl:w-1/3 px-3 xl:px-6 py-6">
                {!isLast && (
                      <Link to={`/${nextPage}`} rel="next">
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
      limit: $limit,
      skip: $skip,
      filter: { table: { eq: "Health companies" } }
      ) {
      nodes {
        data {
          country : Country_of_origin
          name : Company_title
          slug : Company_title
          description : Description
          image {
            url
          }
        }
      }
    }
  }
`
