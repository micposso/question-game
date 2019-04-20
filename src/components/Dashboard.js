import React, { Component, Fragment } from "react";
import Navigation from "./Navigation";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  Tab,
  Grid,
  Image,
  Segment,
  Button,
  Header,
  Divider
} from "semantic-ui-react";

class Dashboard extends Component {
  componentDidMount() {
    if (this.props.authedUser === null) this.props.history.push("/");
  }

  state = {
    answeredQuestions: false
  };

  handleQuestionsClick = () => {
    this.setState(prevState => ({
      answeredQuestions: !prevState.answeredQuestions
    }));
  };

  render() {
    const { myAnswers, questions, users } = this.props;

    const { answeredQuestions } = this.state;

    const answered = Object.values(questions)
      .filter(question => myAnswers.includes(question.id))
      .sort((a, b) => b.timestamp - a.timestamp);

    const unanswered = Object.values(questions)
      .filter(question => !myAnswers.includes(question.id))
      .sort((a, b) => b.timestamp - a.timestamp);

    const panes = [
      {
        menuItem: "Unanswered Questions",
        render: () => (
          <Tab.Pane>
            {answeredQuestions === false &&
              questions !== undefined &&
              unanswered.map(question => (
                <Segment key={question.id}>
                  <Grid>
                    <Grid.Column width={4}>
                      <Image src={users[question.author].avatarURL} />
                    </Grid.Column>

                    <Grid.Column width={12}>
                      <Segment>
                        <Header as="h2">
                          {users[question.author].name} asks ...
                          <Divider />
                          Would you rather?
                        </Header>
                        <p>
                          <strong>{question.optionOne.text}...</strong>
                        </p>
                        <p>
                          <Button
                            color="green"
                            as={NavLink}
                            to={`/questions/${question.id}`}
                          >
                            View Poll
                          </Button>
                        </p>
                      </Segment>
                    </Grid.Column>
                  </Grid>
                </Segment>
              ))}
          </Tab.Pane>
        )
      },
      {
        menuItem: "Answered Questions",
        render: () => (
          <Tab.Pane>
            {answeredQuestions === true &&
              questions !== undefined &&
              answered.map(question => (
                <Segment key={question.id}>
                  <Grid>
                    <Grid.Column width={4} divided>
                      <Image
                        src={users[question.author].avatarURL}
                        size="small"
                      />
                    </Grid.Column>

                    <Grid.Column width={12}>
                      <Segment>
                        <Header as="h2">
                          {users[question.author].name} asks ...
                          <Divider />
                          Would you rather?
                        </Header>
                        <p>
                          <strong>{question.optionOne.text}...</strong>
                        </p>
                        <p>
                          <Button
                            color="green"
                            as={NavLink}
                            to={`/questions/${question.id}`}
                          >
                            View Poll
                          </Button>
                        </p>
                      </Segment>
                    </Grid.Column>
                  </Grid>
                </Segment>
              ))}
          </Tab.Pane>
        )
      }
    ];
    return (
      <Fragment>
        <Navigation />
        <Grid centered>
          <Grid.Column width={8}>
            <Tab
              panes={panes}
              className="dashboard-tabs"
              onTabChange={this.handleQuestionsClick}
            />
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}

function mapStateToProps({ users, authedUser, questions }) {
  return {
    users: users ? users : [],
    questions: questions ? questions : [],
    myAnswers: users[authedUser] ? Object.keys(users[authedUser].answers) : []
  };
}

export default connect(mapStateToProps)(Dashboard);
