import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import NotFound from "./NotFound";
import Login from "./Login";
import Dashboard from "./Dashboard";
import AddQuestion from "./AddQuestion";
import LeaderBoard from "./LeaderBoard";
import Question from "./Question";
import Result from "./Result";
import protect from "./Protected";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <div>
        <Router>
            <Fragment>
              <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/login/redirect/:id" exact component={protect(Login)} />
                <Route path="/dashboard" exact component={protect(Dashboard)} />
                <Route path="/questions/:id" exact component={protect(Question)} />
                <Route path="/results/:id" exact component={protect(Result)} />
                <Route path="/add" exact component={protect(AddQuestion)} />
                <Route path="/leaderboard" exact component={protect(LeaderBoard)} />
                <Route component={NotFound} />
              </Switch>
            </Fragment>
        </Router>
      </div>
    );
  }
}
export default connect()(App);
