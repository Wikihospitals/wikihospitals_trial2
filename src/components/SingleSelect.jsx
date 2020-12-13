import React, { Component } from "react"
import Select from "react-select"

class SingleSelect extends Component {
  state = {
    inputValue: "",
  }

  onInputChange = (inputValue, { action }) => {
    //console.log(inputValue, action);
    switch (action) {
      case "input-change":
        this.setState({ inputValue })
        return
      case "select-option":
        this.setState({ inputValue })
        return
      case "set-value":
        this.setState({ inputValue })
        return
      default:
        return
    }
  }

  render() {
    const { options } = this.props
    const { inputValue } = this.state
    console.log(inputValue)
    return (
      <Select
        className="basic-single"
        classNamePrefix="select"
        isClearable
        isSearchable
        name="ms"
        inputValue={inputValue}
        options={options}
        onInputChange={this.onInputChange}
      />
    )
  }
}
export default SingleSelect
