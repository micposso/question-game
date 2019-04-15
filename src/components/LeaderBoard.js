import React, { Component, Fragment } from "react";
import Navigation from "./Navigation";
import { connect } from "react-redux";
import {
  Tab,
  Grid,
  Image,
  Segment,
  Button,
  Header,
  Divider,
  Label
} from "semantic-ui-react";

class LeaderBoard extends Component {
  render() {
    const { users } = this.props;
    return (
      <Fragment>
        <Navigation />
        <Grid centered>
          <Grid.Column width={8}>
            {users !== undefined &&
              users.map(user => (
                <Segment>
                  <Grid>
                    <Grid.Column width={4}>
                      <Image src={user.avatarURL} size="small" />
                    </Grid.Column>

                    <Grid.Column width={12}>
                      <Segment.Group horizontal textAlign="center">
                        <Segment textAlign="left">
                          <Header as='h3'>{user.name}</Header>
                          <p><Label color='yellow'>{user.answers}</Label> answered questions</p>
                          <p><Label color='yellow'>{user.questions}</Label> created questions</p>
                        </Segment>
                        <Segment textAlign="center">
                          <Header as="h3">Score</Header>
                          <Label circular color="red" size="massive">
                            {user.score}
                          </Label>
                        </Segment>
                      </Segment.Group>
                    </Grid.Column>
                  </Grid>
                </Segment>
              ))}
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}
function mapStateToProps({ users }) {
  var userArray = [];
  Object.entries(users).forEach(([key, value]) => {
    const questions = value.questions.length;
    const answers = Object.keys(value.answers).length;
    userArray.push({
      id: value.id,
      name: value.name,
      avatarURL: value.avatarURL,
      questions: questions,
      answers: answers,
      score: questions + answers
    });
  });
  return {
    users: userArray.sort((a, b) => b.score - a.score)
  };
}

export default connect(mapStateToProps)(LeaderBoard);
