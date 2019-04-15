import React, { Component } from "react";
import { connect } from "react-redux";
import { authenticate } from "../actions/shared";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment
} from "semantic-ui-react";
import { GiGamepad } from 'react-icons/gi';


class Login extends Component {
  state = {
    user: "",
    login_failed: false
  };

  componentDidMount() {
    // redirect to home if user is already authenticated
    this.props.authedUser && this.props.history.push("/dashboard");
  }

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
      this.props.match.params.id
        ? this.props.history.push(`/questions/${this.props.match.params.id}`)
        : this.props.history.push("/dashboard");
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
      <div className='login-form'>
      {/*
        Heads up! The styles below are necessary for the correct render of this example.
        You can do same with CSS, the main idea is that all the elements up to the `Grid`
        below must have a height of 100%.
      */}
      <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
      `}
      </style>
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <GiGamepad color='green' size='small' style={{ maxWidth: 200 }} />
          <Form size="large">
 
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
                    <option className='login-options' value={user.id} key={user.id}>
                      {user.name}
                    </option>
                  ))}
              </select>
              <Button
                color="green"
                fluid
                size="large"
                onClick={this.handleClick}
              >
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
