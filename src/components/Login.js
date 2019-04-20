import React, { Component } from "react";
import { connect } from "react-redux";
import { authenticate } from "../actions/shared";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";

class Login extends Component {
  state = {
    user: "",
    login_failed: false
  };

  handleUserSelected = user => {
    if (user !== "") {
      this.setState({
        user: user,
        login_failed: false
      });
    }
  };

  handleClick = () => {
    if (this.state.user !== "") {
      this.props.dispatch(authenticate(this.state.user));

      if (this.props.history.location.state !== undefined) {
        let location = this.props.history.location.state.referrer;
        this.props.history.push(location);
      } else {
        this.props.history.push("/dashboard");
      }
    } else {
      this.setState({
        login_failed: true
      });
    }
  };

  render() {
    const { users } = this.props;
    const { login_failed, user } = this.state;

    return (
      <div className="login-form">
        <style>
          {`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
      `}
        </style>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size="large" onSubmit={this.handleClick.bind(this)}>
              <Segment stacked>
                <Header as="h2" color="teal" textAlign="center">
                  Play the Questions Game
                  {login_failed && (
                    <div>
                      <small className="pink-text">
                        You have to choose a user to login
                      </small>
                    </div>
                  )}
                </Header>
                <select
                  className="form-control"
                  value={user}
                  onChange={e => this.handleUserSelected(e.target.value)}
                >
                  <option value="">Choose a User</option>
                  {users.length > 0 &&
                    users.map(user => (
                      <option
                        className="login-options"
                        value={user.id}
                        key={user.id}
                      >
                        {user.name}
                      </option>
                    ))}
                </select>
                <Button color="green" fluid size="large">
                  Login
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  var userArray = [];
  Object.entries(users).forEach(([key, value]) =>
    userArray.push({
      id: value.id,
      name: value.name,
      image: value.avatarURL
    })
  );
  return {
    users: userArray,
    authedUser
  };
}

export default connect(mapStateToProps)(Login);
