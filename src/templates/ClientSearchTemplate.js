import React from "react"
import ClientSearch from "../components/ClientSearch"
import { SiteMetadata } from "../components"
import { Layout } from "../layouts/Layout"

const SearchTemplate = props => {

  const { pageContext } = props
  const { bookData } = pageContext
  const { allBooks, options } = bookData

  return (
    <Layout>

      <SiteMetadata
        title="Wiki Hospitals"
        description="A site that displays the latest in international health technology along with blog posts about patients stories."
      />

      <h1 style={{ marginLeft: `10px`, marginTop: `3em`, textAlign: `center` }}>
        General search
      </h1>
      
      <ClientSearch nodes={allBooks} engine={options} />

    </Layout>
  )
}

export default SearchTemplate