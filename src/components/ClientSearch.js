import React, { Component } from "react"
import * as JsSearch from "js-search"
import { Scard } from "."
import SingleSelect from "../components/SingleSelect"

class ClientSearch extends Component {
  state = {
    isLoading: true,
    searchResults: [],
    search: null,
    isError: false,
    indexByMS: false,
    indexByMD: false,
    indexByTE: false,
    indexByPD: false,
    indexByCM: false,
    indexByCN: false,
    indexByTitle: false,
    indexByAuthor: false,
    termFrequency: true,
    removeStopWords: false,
    searchQuery: "",
    selectedStrategy: "",
    selectedSanitizer: "",
    filterValue: "",
  }
  /**
   * React lifecycle method that will inject the data into the state.
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.search === null) {
      const { engine } = nextProps
      return {
        indexByMS: engine.MSIndex,
        indexByMD: engine.MDIndex,
        indexByTE: engine.TEIndex,
        indexByPD: engine.PDIndex,
        indexByCM: engine.CMIndex,
        indexByCN: engine.CNIndex,
        indexByTitle: engine.TitleIndex,
        indexByAuthor: engine.AuthorIndex,
        termFrequency: engine.SearchByTerm,
        selectedSanitizer: engine.searchSanitizer,
        selectedStrategy: engine.indexStrategy,
      }
    }
    return null
  }
  async componentDidMount() {
    console.log(1)
    this.rebuildIndex()
  }

  /**
   * rebuilds the overall index based on the options
   */
  rebuildIndex = () => {
    const {
      selectedStrategy,
      selectedSanitizer,
      removeStopWords,
      termFrequency,
      indexByTitle,
      indexByAuthor,
      indexByMS,
      indexByMD,
      indexByTE,
      indexByPD,
      indexByCM,
      indexByCN,
    } = this.state
    const { nodes } = this.props

    const dataToSearch = new JsSearch.Search("slug")

    if (removeStopWords) {
      dataToSearch.tokenizer = new JsSearch.StopWordsTokenizer(
        dataToSearch.tokenizer
      )
    }
    /**
     * defines an indexing strategy for the data
     * read more about it here https://github.com/bvaughn/js-search#configuring-the-index-strategy
     */
    if (selectedStrategy === "All") {
      dataToSearch.indexStrategy = new JsSearch.AllSubstringsIndexStrategy()
    }
    if (selectedStrategy === "Exact match") {
      dataToSearch.indexStrategy = new JsSearch.ExactWordIndexStrategy()
    }
    if (selectedStrategy === "Prefix match") {
      dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy()
    }

    /**
     * defines the sanitizer for the search
     * to prevent some of the words from being excluded
     */
    selectedSanitizer === "Case Sensitive"
      ? (dataToSearch.sanitizer = new JsSearch.CaseSensitiveSanitizer())
      : (dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer())
    termFrequency === true
      ? (dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex("slug"))
      : (dataToSearch.searchIndex = new JsSearch.UnorderedSearchIndex())

    // sets the index attribute for the data
    if (indexByTitle) {
      dataToSearch.addIndex("name")
    }
    // sets the index attribute for the data
    if (indexByAuthor) {
      dataToSearch.addIndex("description")
    }
    // sets the index attribute for the data
    if (indexByMS) {
      dataToSearch.addIndex("ms")
    }
    // sets the index attribute for the data
    if (indexByMD) {
      dataToSearch.addIndex("md")
    }
    // sets the index attribute for the data
    if (indexByPD) {
      dataToSearch.addIndex("pd")
    }
    // sets the index attribute for the data
    if (indexByTE) {
      dataToSearch.addIndex("te")
    }
    // sets the index attribute for the data
    if (indexByCM) {
      dataToSearch.addIndex("cm")
    }
    // sets the index attribute for the data
    if (indexByCN) {
      dataToSearch.addIndex("cn")
    }

    dataToSearch.addDocuments(nodes.map((i) => i.data)) // adds the data to be searched

    this.setState({ search: dataToSearch, isLoading: false })
  }
  /**
   * handles the input change and perform a search with js-search
   * in which the results will be added to the state
   */
  searchData = (e) => {
    const { search } = this.state
    const queryResult = search.search(e.target.value)
    this.setState({ searchQuery: e.target.value, searchResults: queryResult })
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  render() {
    const { searchResults, searchQuery } = this.state
    const { nodes, ms, md, te, pd, cm, cn } = this.props
    const queryResults = searchQuery === "" ? [] : searchResults

    return (
      <>
        <div className="container pb-6 overflow-hidden csok">
          <form onSubmit={this.handleSubmit}>
            <div className="sok">
              <input
                id="Search"
                value={searchQuery}
                onChange={this.searchData}
                placeholder="Just start typing..."
                className="form-input smooth-corner spread-shadow"
              />
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-1/2 lg:pl-4 pb-4">
                <div className="filterc1">
                  <h4 className="text-blue-800 dark:text-blue-400 uppercase text-base tracking-wide font-medium pb-px">
                    Medical specialty
                  </h4>
                  <SingleSelect options={ms} />
                </div>
              </div>

              <div className="w-full lg:w-1/2 lg:pl-4 pb-4">
                <div className="filterc1">
                  <h4 className="text-blue-800 dark:text-blue-400 uppercase text-base tracking-wide font-medium pb-px">
                    Major disease
                  </h4>
                  <SingleSelect options={md} />
                </div>
              </div>

              <div className="w-full lg:w-1/2 lg:pl-4 pb-4">
                <div className="filterc2">
                  <h4 className="text-blue-800 dark:text-blue-400 uppercase text-base tracking-wide font-medium pb-px">
                    Technology used
                  </h4>
                  <SingleSelect options={te} />
                </div>
              </div>

              <div className="w-full lg:w-1/2 lg:pl-4 pb-4">
                <div className="filterc2">
                  <h4 className="text-blue-800 dark:text-blue-400 uppercase text-base tracking-wide font-medium pb-px">
                    Product type
                  </h4>
                  <SingleSelect options={pd} />
                </div>
              </div>

              <div className="w-full lg:w-1/2 lg:pl-4 pb-4">
                <div className="filterc3">
                  <h4 className="text-blue-800 dark:text-blue-400 uppercase text-base tracking-wide font-medium pb-px">
                    Intended customer
                  </h4>
                  <SingleSelect options={cm} />
                </div>
              </div>

              <div className="w-full lg:w-1/2 lg:pl-4 pb-4">
                <div className="filterc3">
                  <h4 className="text-blue-800 dark:text-blue-400 uppercase text-base tracking-wide font-medium pb-px">
                    Country of origin
                  </h4>
                  <SingleSelect options={cn} />
                </div>
              </div>
            </div>
          </form>
          {queryResults.length > 0 && (
            <div>
              <h1 style={{ textAlign: `center` }}>
                Number of items:
                {queryResults.length}
              </h1>

              <div className="container pt-6 overflow-hidden">
                <div className="flex flex-wrap -mx-3 xl:-mx-6">
                  {queryResults.map((item, i) => (
                    <div
                      className="w-full sm:w-1/2 xl:w-1/3 px-3 xl:px-6 py-6"
                      key={`card_${item.slug}`}
                    >
                      <Scard {...item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    )
  }
}
export default ClientSearch
