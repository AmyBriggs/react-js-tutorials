import React from "react";

export default class Todo extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { complete, edit, text } = this.props;
    const liStyle= {
      fontSize: "18px",
      color: "rgb(12, 136, 205)"
    }

    const icon = complete ? "\u2714" : "\u2716"


    if (edit) {
      return (
        <li>
          <input value={text} focus="focused"/>
        </li>
      );
    }

    return (

      <li style={liStyle}>
        <span>{text} </span>
        <span>  {icon}</span>
      </li>
    );
  }
}
