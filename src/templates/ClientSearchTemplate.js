import React from "react"
import ClientSearch from "../components/ClientSearch"
import { SiteMetadata } from "../components"
import { Layout } from "../layouts/Layout"
import "lazysizes"

const SearchTemplate = (props) => {
  const { pageContext } = props
  const { bookData } = pageContext
  const {
    allBooks,
    options,
    allMS,
    allMD,
    allTE,
    allPD,
    allCM,
    allCN,
  } = bookData

  return (
    <Layout>
      <SiteMetadata
        title="Wiki Hospitals"
        description="A site that displays the latest in international health technology along with blog posts about patients stories."
      />

      <h1 style={{ marginLeft: `10px`, marginTop: `3em`, textAlign: `center` }}>
        General search
      </h1>

      <ClientSearch
        nodes={allBooks}
        ms={allMS}
        md={allMD}
        te={allTE}
        pd={allPD}
        cm={allCM}
        cn={allCN}
        engine={options}
      />
    </Layout>
  )
}

export default SearchTemplate
