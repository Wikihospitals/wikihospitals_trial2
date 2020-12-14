import React, { Component } from "react"
import * as JsSearch from "js-search"
import { Scard } from "."
import SingleSelect from "../components/SingleSelect"
import Select from "react-select"

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
    msFiltervalue: "",
    mdFiltervalue: "",
    teFiltervalue: "",
    pdFiltervalue: "",
    cmFiltervalue: "",
    cnFiltervalue: "",
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
      msFiltervalue,
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
    const { search, msFiltervalue } = this.state
    const keyword = msFiltervalue === "" ? "" : msFiltervalue + ","
    const queryResult = search.search(keyword + e.target.value)
    this.setState({ searchQuery: e.target.value, searchResults: queryResult })
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  handleMSChange(e) {
    const {
      search,
      searchQuery,
      mdFiltervalue,
      teFiltervalue,
      pdFiltervalue,
      cmFiltervalue,
      cnFiltervalue,
    } = this.state

    const keyword = e ? (e.value === "" ? "" : e.value + ",") : ""
    const mdkeyword = mdFiltervalue === "" ? "" : mdFiltervalue + ","
    const tekeyword = teFiltervalue === "" ? "" : teFiltervalue + ","
    const pdkeyword = pdFiltervalue === "" ? "" : pdFiltervalue + ","
    const cmkeyword = cmFiltervalue === "" ? "" : cmFiltervalue + ","
    const cnkeyword = cnFiltervalue === "" ? "" : cnFiltervalue + ","

    const queryResult = search.search(
      keyword +
        mdkeyword +
        tekeyword +
        pdkeyword +
        cmkeyword +
        cnkeyword +
        searchQuery
    )

    this.setState({
      msFiltervalue: e ? e.value : "",
      searchQuery: searchQuery,
      searchResults: queryResult,
    })
  }

  handleMDChange(e) {
    const {
      search,
      searchQuery,
      msFiltervalue,
      teFiltervalue,
      pdFiltervalue,
      cmFiltervalue,
      cnFiltervalue,
    } = this.state

    const keyword = e ? (e.value === "" ? "" : e.value + ",") : ""
    const mskeyword = msFiltervalue === "" ? "" : msFiltervalue + ","
    const tekeyword = teFiltervalue === "" ? "" : teFiltervalue + ","
    const pdkeyword = pdFiltervalue === "" ? "" : pdFiltervalue + ","
    const cmkeyword = cmFiltervalue === "" ? "" : cmFiltervalue + ","
    const cnkeyword = cnFiltervalue === "" ? "" : cnFiltervalue + ","

    const queryResult = search.search(
      keyword +
        mskeyword +
        tekeyword +
        pdkeyword +
        cmkeyword +
        cnkeyword +
        searchQuery
    )
    this.setState({
      mdFiltervalue: e ? e.value : "",
      searchQuery: searchQuery,
      searchResults: queryResult,
    })
  }

  handleTEChange(e) {
    const {
      search,
      searchQuery,
      msFiltervalue,
      mdFiltervalue,
      pdFiltervalue,
      cmFiltervalue,
      cnFiltervalue,
    } = this.state

    const keyword = e ? (e.value === "" ? "" : e.value + ",") : ""
    const mskeyword = msFiltervalue === "" ? "" : msFiltervalue + ","
    const mdkeyword = mdFiltervalue === "" ? "" : mdFiltervalue + ","
    const pdkeyword = pdFiltervalue === "" ? "" : pdFiltervalue + ","
    const cmkeyword = cmFiltervalue === "" ? "" : cmFiltervalue + ","
    const cnkeyword = cnFiltervalue === "" ? "" : cnFiltervalue + ","

    const queryResult = search.search(
      keyword +
        mskeyword +
        mdkeyword +
        pdkeyword +
        cmkeyword +
        cnkeyword +
        searchQuery
    )
    this.setState({
      teFiltervalue: e ? e.value : "",
      searchQuery: searchQuery,
      searchResults: queryResult,
    })
  }

  handlePDChange(e) {
    const {
      search,
      searchQuery,
      msFiltervalue,
      mdFiltervalue,
      teFiltervalue,
      cmFiltervalue,
      cnFiltervalue,
    } = this.state

    const keyword = e ? (e.value === "" ? "" : e.value + ",") : ""
    const mskeyword = msFiltervalue === "" ? "" : msFiltervalue + ","
    const mdkeyword = mdFiltervalue === "" ? "" : mdFiltervalue + ","
    const tekeyword = teFiltervalue === "" ? "" : teFiltervalue + ","
    const cmkeyword = cmFiltervalue === "" ? "" : cmFiltervalue + ","
    const cnkeyword = cnFiltervalue === "" ? "" : cnFiltervalue + ","

    const queryResult = search.search(
      keyword +
        mskeyword +
        mdkeyword +
        tekeyword +
        cmkeyword +
        cnkeyword +
        searchQuery
    )
    this.setState({
      pdFiltervalue: e ? e.value : "",
      searchQuery: searchQuery,
      searchResults: queryResult,
    })
  }

  handleCMChange(e) {
    const {
      search,
      searchQuery,
      msFiltervalue,
      mdFiltervalue,
      teFiltervalue,
      pdFiltervalue,
      cnFiltervalue,
    } = this.state

    const keyword = e ? (e.value === "" ? "" : e.value + ",") : ""
    const mskeyword = msFiltervalue === "" ? "" : msFiltervalue + ","
    const mdkeyword = mdFiltervalue === "" ? "" : mdFiltervalue + ","
    const tekeyword = teFiltervalue === "" ? "" : teFiltervalue + ","
    const pdkeyword = pdFiltervalue === "" ? "" : pdFiltervalue + ","
    const cnkeyword = cnFiltervalue === "" ? "" : cnFiltervalue + ","

    const queryResult = search.search(
      keyword +
        mskeyword +
        mdkeyword +
        tekeyword +
        pdkeyword +
        cnkeyword +
        searchQuery
    )
    this.setState({
      cmFiltervalue: e ? e.value : "",
      searchQuery: searchQuery,
      searchResults: queryResult,
    })
  }

  handleCNChange(e) {
    const {
      search,
      searchQuery,
      msFiltervalue,
      mdFiltervalue,
      teFiltervalue,
      pdFiltervalue,
      cmFiltervalue,
    } = this.state

    const keyword = e ? (e.value === "" ? "" : e.value + ",") : ""
    const mskeyword = msFiltervalue === "" ? "" : msFiltervalue + ","
    const mdkeyword = mdFiltervalue === "" ? "" : mdFiltervalue + ","
    const tekeyword = teFiltervalue === "" ? "" : teFiltervalue + ","
    const pdkeyword = pdFiltervalue === "" ? "" : pdFiltervalue + ","
    const cmkeyword = cmFiltervalue === "" ? "" : cmFiltervalue + ","

    const queryResult = search.search(
      keyword +
        mskeyword +
        mdkeyword +
        tekeyword +
        pdkeyword +
        cmkeyword +
        searchQuery
    )
    this.setState({
      cnFiltervalue: e ? e.value : "",
      searchQuery: searchQuery,
      searchResults: queryResult,
    })
  }

  render() {
    const {
      searchResults,
      searchQuery,
      msFiltervalue,
      mdFiltervalue,
      teFiltervalue,
      pdFiltervalue,
      cmFiltervalue,
      cnFiltervalue,
    } = this.state
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
                <div className="filterc0">
                  <h4 className="text-blue-800 dark:text-blue-400 uppercase text-base tracking-wide font-medium pb-px">
                    Medical specialty
                  </h4>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable
                    isSearchable
                    name="ms"
                    options={ms}
                    onChange={this.handleMSChange.bind(this)}
                  />
                </div>
              </div>

              <div className="w-full lg:w-1/2 lg:pl-4 pb-4">
                <div className="filterc1">
                  <h4 className="text-blue-800 dark:text-blue-400 uppercase text-base tracking-wide font-medium pb-px">
                    Major disease
                  </h4>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable
                    isSearchable
                    name="md"
                    options={md}
                    onChange={this.handleMDChange.bind(this)}
                  />
                </div>
              </div>

              <div className="w-full lg:w-1/2 lg:pl-4 pb-4">
                <div className="filterc2">
                  <h4 className="text-blue-800 dark:text-blue-400 uppercase text-base tracking-wide font-medium pb-px">
                    Technology used
                  </h4>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable
                    isSearchable
                    name="te"
                    options={te}
                    onChange={this.handleTEChange.bind(this)}
                  />
                </div>
              </div>

              <div className="w-full lg:w-1/2 lg:pl-4 pb-4">
                <div className="filterc3">
                  <h4 className="text-blue-800 dark:text-blue-400 uppercase text-base tracking-wide font-medium pb-px">
                    Product type
                  </h4>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable
                    isSearchable
                    name="pd"
                    options={pd}
                    onChange={this.handlePDChange.bind(this)}
                  />
                </div>
              </div>

              <div className="w-full lg:w-1/2 lg:pl-4 pb-4">
                <div className="filterc4">
                  <h4 className="text-blue-800 dark:text-blue-400 uppercase text-base tracking-wide font-medium pb-px">
                    Intended customer
                  </h4>

                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable
                    isSearchable
                    name="cm"
                    options={cm}
                    onChange={this.handleCMChange.bind(this)}
                  />
                </div>
              </div>

              <div className="w-full lg:w-1/2 lg:pl-4 pb-4">
                <div className="filterc5">
                  <h4 className="text-blue-800 dark:text-blue-400 uppercase text-base tracking-wide font-medium pb-px">
                    Country of origin
                  </h4>

                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable
                    isSearchable
                    name="cn"
                    options={cn}
                    onChange={this.handleCNChange.bind(this)}
                  />
                </div>
              </div>

              {/* <div className="w-full lg:pl-4 pb-4">
                <button
                  type="button"
                  onClick={this.goSearch}
                >Search</button>
              </div> */}
            </div>
          </form>
          {queryResults.length > 0 && (
            <div>
              <div className="w-full lg:py-4 sokMsg">
                <h1 style={{ textAlign: `center` }}>
                  Number of items:
                  {queryResults.length}
                </h1>

                {msFiltervalue && (
                  <h1 style={{ textAlign: `center` }}>
                    Medical specialty : {msFiltervalue}
                  </h1>
                )}

                {mdFiltervalue && (
                  <h1 style={{ textAlign: `center` }}>
                    Major disease : {mdFiltervalue}
                  </h1>
                )}

                {teFiltervalue && (
                  <h1 style={{ textAlign: `center` }}>
                    Technology used : {teFiltervalue}
                  </h1>
                )}

                {pdFiltervalue && (
                  <h1 style={{ textAlign: `center` }}>
                    Product type : {pdFiltervalue}
                  </h1>
                )}

                {cmFiltervalue && (
                  <h1 style={{ textAlign: `center` }}>
                    Intended customer : {cmFiltervalue}
                  </h1>
                )}

                {cnFiltervalue && (
                  <h1 style={{ textAlign: `center` }}>
                    Country of origin : {cnFiltervalue}
                  </h1>
                )}
              </div>

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
