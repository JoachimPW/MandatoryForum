import React, { Component } from 'react'

export default class NewComment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            comment: "",
            questionId: "",
            errMessage: "",
            qqqid: "",
        }

        this.handleCommentInput = this.handleCommentInput.bind(this);
        this.onChangeComment = this.onChangeComment.bind(this);
    }

    /*componentDidMount() {
        if (this.props.location.state) {
            const { qid } = this.props.location.state
            const { id } = this.props.match.params
            this.setState({
                questionId: qid

            })
        }
    }
    /*componentWillReceiveProps(){       
        this.setState({           
            qqqid: this.props.questionId._id
        })
            
        } */

    handleCommentInput(id) {
        if (this.state.comment.length === 0) {
            this.setState({
                errMessage: "Please fill out the field before posting"
            })
        }
        else {
            this.props.addComment(this.state.comment, id);
        }
    }

    onChangeComment(event) {
        this.setState({
            comment: event.target.value
        })
    }
    // Test
    getIdFromUrl(location) {
        const searchParams = new URLSearchParams(location.search);
        return {
            query: searchParams.get('query') || '',
        };
    }

    render() {
        let qquestion = this.props.questionId
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
                                        <label> Post an Answer</label>                                        
                                        <textarea type="text" onChange={this.onChangeComment} className="form-control" id="title" placeholder="Answer..."></textarea>
                                    </div>
                                    <h1>{this.state.errMessage}</h1>
                                    <button onClick={() => this.handleCommentInput(qquestion._id)} value={qquestion._id}
                                        type="submit" id="submitButton" className="btn btn-primary"> Post Answer
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
