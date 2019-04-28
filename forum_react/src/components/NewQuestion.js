import React, { Component } from 'react'

export default class NewQuestion extends Component {

  constructor(props) {
    super(props);

    this.state = {
      question: "",
      text: "",
      errMessage: ""
    }

    this.handleQuestionInput = this.handleQuestionInput.bind(this);
    this.onChangeQuestion = this.onChangeQuestion.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeQuestion(event) {
    this.setState({
      question: event.target.value
    })
  }

  onChangeText(event) {
    this.setState({
      text: event.target.value
    })
  }

  handleQuestionInput(event) {
    if (this.state.question.length === 0) {
      event.preventDefault()
      this.setState({
        errMessage: "Please fill out the field before posting"
      })
    }
    else {
      this.props.addQuestion(this.state.question, this.state.text);
    }
  }

  render() {
    return (
      <React.Fragment>
        <br></br>
        <br></br>
        <div className="row justify-content-md-center">
          <div className="col-lg-8 col-centered" style={{ textAlign: "center" }}>
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Ask a question</label>
                    <input type="text" onChange={this.onChangeQuestion} className="form-control" id="title" placeholder="Question..."></input>
                    <textarea type="text" onChange={this.onChangeText} className="form-control" placeholder="Explain your question"></textarea>
                  </div>
                  <button onClick={this.handleQuestionInput}
                    type="submit" id="submitButton" className="btn btn-primary"> Post question
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
