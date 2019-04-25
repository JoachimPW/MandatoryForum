import React, { Component } from 'react'

export default class QuestionList extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          questions: [],
          comments: []
        };
    
      }

  render() {

    // Check if the list is empty or not
    if(this.props.questions.length > 0) {
        let list = []
        this.state.questions.forEach((elm) => {
          list.push(<li>
             <h3> {elm.title}</h3> <h4> tags: {elm.tags} </h4> <h4>votes: {elm.votes}</h4>
          </li>);
        });
    return (
      <div>
        <h3>{this.props.header}</h3>
        <ul>
            {list}
        </ul>
      </div>
    )
  }
  return <div><h1>No data found</h1></div>
}
  }
