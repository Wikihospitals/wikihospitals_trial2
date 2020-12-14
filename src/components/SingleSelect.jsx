import React, { Component } from "react"
import Select from "react-select"

class SingleSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
    }
  }

  handleChange(e) {
    this.setState({ value: e.value })
  }

  render() {
    const { options } = this.props

    return (
      <>
        {/* {console.log(this.state.value)} */}
        <Select
          className="basic-single"
          classNamePrefix="select"
          isClearable
          isSearchable
          name="ms"
          options={options}
          onChange={this.handleChange.bind(this)}
        />
      </>
    )
  }
}
export default SingleSelect
