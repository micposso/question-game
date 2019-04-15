import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Navigation from "./Navigation";
import { handleAddQuestion } from "../actions/questions";
import { Grid, Input, Segment, Button, Header, Label } from "semantic-ui-react";

class AddQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    optionsIncomplete: false,
    questionAdded: false
  };
  handleOptionOneChange = optionOne => {
    this.setState({
      optionOne,
      optionsIncomplete: false,
      questionAdded: false
    });
  };
  handleOptionTwoChange = optionTwo => {
    this.setState({
      optionTwo,
      optionsIncomplete: false,
      questionAdded: false
    });
  };
  handleAddQuestionClick = () => {
    if (
      this.state.optionOne.trim() === "" ||
      this.state.optionTwo.trim() === ""
    ) {
      this.setState({
        optionsIncomplete: true,
        optionOne: "",
        optionTwo: ""
      });
      return;
    }
    this.props.dispatch(
      handleAddQuestion(
        this.state.optionOne,
        this.state.optionTwo,
        this.props.authedUser
      )
    );
    this.setState({ questionAdded: true, optionOne: "", optionTwo: "" });
  };
  render() {
    const { questionAdded, optionsIncomplete } = this.state;
    return (
      <Fragment>
        <Navigation />

        <Grid centered>
          <Grid.Column width={5}>
            <Segment textAlign="center" stacked>
              {questionAdded && (
                <Label color="green">
                  Question added. You can add more if you like{" "}
                </Label>
              )}
              <div>
                <Header as="h2">Add New Question</Header>
                <Header as="h3">Complete the Question:</Header>
                <p>Would you rather...</p>
                <br />
                {optionsIncomplete && (
                  <p>
                    <Label color='green'>
                      Please fill options one & two
                    </Label>
                  </p>
                )}
                <Input
                  type="text"
                  placeholder="Enter option one text here"
                  onChange={e => this.handleOptionOneChange(e.target.value)}
                />
                <div>Or</div>
                <Input
                  type="text"
                  placeholder="Enter option two text here"
                  onChange={e => this.handleOptionTwoChange(e.target.value)}
                />
                <div>
                  <br/>
                <Button
                  className="addquestion"
                  color='green'
                  onClick={this.handleAddQuestionClick}
                >
                  Add Question
                </Button>

                </div>
              </div>
            </Segment>
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser, questions }) {
  return {
    authedUser,
    questions
  };
}

export default connect(mapStateToProps)(AddQuestion);
