import React, { Component, Fragment } from "react";
import Navigation from "./Navigation";
import NotFound from "./NotFound";
import { connect } from "react-redux";
import { handleAnswerQuestion } from "../actions/questions";
import {
  Grid,
  Image,
  Segment,
  Button,
  Header,
  Divider,
  Label,
  Form
} from "semantic-ui-react";

class Question extends Component {
  componentDidMount() {
    if (this.props.authedUser === null)
      this.props.history.push(`/login/redirect/${this.props.match.params.id}`);
  }

  state = {
    option: "",
    submitError: false
  };

  handleRadioOptionChange = value => {
    console.log("VALUE", value);

    this.setState({
      option: value,
      submitError: false
    });
  };

  handleSubmit = () => {
    const { option } = this.state;
    if (option === "") {
      this.setState({
        submitError: true
      });
      return;
    }

    this.props.dispatch(
      handleAnswerQuestion(
        this.props.authedUser,
        this.props.match.params.id,
        option
      )
    );

    this.props.history.push(`/results/${this.props.match.params.id}`);
  };

  render() {
    const { question, author } = this.props;
    const { submitError } = this.state;

    if (question === undefined) {
      return <NotFound />;
    }

    return (
      <Fragment>
        <Navigation />
        <Grid centered>
          <Grid.Column width={4}>
            <Segment textAlign="center" stacked>
              {submitError && (
                <Label color="green">You have to select an answer</Label>
              )}
              {author && (
                <div>
                  <Image src={author.avatarURL} alt="profile" size="medium" />
                  <Segment textAlign="center">
                    <Header as="h3">{author.name} asks:</Header>
                    <Divider />
                    <Header as="h4">Would you rather?</Header>
                    {question && (
                      <Form>
                        <input
                          type="radio"
                          name="answer"
                          value="optionOne"
                          onChange={e =>
                            this.handleRadioOptionChange(e.target.value)
                          }
                        />
                        &nbsp;{question.optionOne.text}
                        <br />
                        <div>Or</div>
                        <br />
                        <input
                          type="radio"
                          name="answer"
                          value="optionTwo"
                          onChange={e =>
                            this.handleRadioOptionChange(e.target.value)
                          }
                        />{" "}
                        {question.optionTwo.text}
                        &nbsp;{question.optionTwo.text}
                      </Form>
                    )}
                    <Divider />
                    <Button
                      color="green"
                      className="addquestion"
                      onClick={this.handleSubmit}
                    >
                      Submit
                    </Button>
                  </Segment>
                </div>
              )}
            </Segment>
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;
  return {
    question: questions ? questions[id] : null,
    author: users && questions[id] ? users[questions[id].author] : null,
    authedUser: authedUser ? authedUser : null
  };
}

export default connect(mapStateToProps)(Question);
