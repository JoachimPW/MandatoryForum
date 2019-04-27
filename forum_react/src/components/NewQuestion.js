import React, { Component } from 'react'

export default class NewQuestion extends Component {

  constructor(props) {
    super(props);

    this.state = {
      question: "",
      errMessage: ""
    }

    this.handleQuestionInput = this.handleQuestionInput.bind(this);
    this.onChangeQuesiton = this.onChangeQuesiton.bind(this);
  }

  onChangeQuesiton(event) {
    this.setState({
      question: event.target.value
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
      this.props.addQuestion(this.state.question, this.state.questionId);
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
                    <textarea type="text" onChange={this.onChangeQuesiton} className="form-control" id="title" placeholder="Question..."></textarea>
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
