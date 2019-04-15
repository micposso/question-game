import React, { Component, Fragment } from "react";
import Navigation from "./Navigation";
import NotFound from "./NotFound";
import { connect } from "react-redux";
import {
  Grid,
  Image,
  Segment,
  Header,
  Divider
} from "semantic-ui-react";

class Result extends Component {
  render() {
    const { question, users, author, authedUser } = this.props;
    const { id } = this.props.match.params;

    let optionOneVotes = 0;
    let optionTwoVotes = 0;
    let optionOnePercentage = 0;
    let optionTwoPercentage = 0;
    let total = 0;
    let authedUserAnswer = "";

    if (question !== undefined) {
      optionOneVotes = Number(question.optionOne.votes.length);
      optionTwoVotes = Number(question.optionTwo.votes.length);
      total = optionOneVotes + optionTwoVotes;
      optionOnePercentage = (optionOneVotes / total) * 100;
      optionTwoPercentage = (optionTwoVotes / total) * 100;
      authedUserAnswer = users[authedUser].answers[id];
    }

    if (question === null || users === null) {
      return <NotFound />;
    }
    return (
      <Fragment>
        <Navigation />
        {question && (
          <Grid centered>
            <Grid.Column width={4}>
            <Segment textAlign="center" stacked>
              <Image
                src={author.avatarURL}
                alt="profile"
                size="medium"
              />
                <Header as='h3'>{author.name} asks:</Header>
                <Header as='h2'>Results</Header>
                <Segment className={`${authedUserAnswer === "optionOne"}`}>
                  <p>Would you rather {question.optionOne.text}</p>
                  <p>
                    {optionOneVotes} out of {total} votes -{" "}
                    {optionOnePercentage.toFixed(1)}%
                  </p>
                  {authedUserAnswer === "optionOne" && (
                    <span>Your answer</span>
                  )}
                </Segment>
                <Divider/>
                <Segment className={`${authedUserAnswer === "optionTwo"} `}>
                  <p>Would you rather {question.optionTwo.text}</p>
                  <p>
                    {optionTwoVotes} out of {total} votes -{" "}
                    {optionTwoPercentage.toFixed(1)}%
                  </p>
                  {authedUserAnswer === "optionTwo" && (
                    <span>Your answer</span>
                  )}
                </Segment>
              </Segment>
            </Grid.Column>
          </Grid>
        )}
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;
  return {
    question: questions ? questions[id] : null,
    users: users ? users : null,
    author: users && questions[id] ? users[questions[id].author] : null,
    authedUser: authedUser ? authedUser : null
  };
}

export default connect(mapStateToProps)(Result);
