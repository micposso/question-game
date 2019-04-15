import React, { Component, Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import NotFound from './NotFound'
import Login from './Login'
import Dashboard from './Dashboard'
import AddQuestion from './AddQuestion'
import LeaderBoard from './LeaderBoard'
import Question from './Question'
import Result from './Result'
import { Container } from 'semantic-ui-react';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <div>
        <Router>
          <Fragment>
              <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/login/redirect/:id' exact component={Login} />
                <Route path='/dashboard' exact component={Dashboard} />
                <Route path='/questions/:id' exact component={Question} />
                <Route path='/results/:id' exact component={Result} />
                <Route path='/add' exact component={AddQuestion} />
                <Route path='/leaderBoard' exact component={LeaderBoard} />
                <Route component={NotFound} />
              </Switch>
          </Fragment>
        </Router>
      
      </div>
    );
  }
}
export default connect()(App)
// export default App;
