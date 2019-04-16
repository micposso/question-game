import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { authenticate } from '../actions/shared'
import { Menu, Button, Container } from 'semantic-ui-react'

class Navigation extends Component {

    state = {}

    handleLogout = () => {
        this.props.dispatch(authenticate(""))
        this.props.history.push('/')
    }

    componentDidMount(){
        // redirect to login if no authedUser
        this.props.authedUser === "" && this.props.history.push('/login')
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render(){
        const { activeItem } = this.state

        const { avatar, authedUser, name } = this.props
        return (
          <Container>

               <Menu>
                    <Menu.Item
                      as={NavLink}
                      to="/Dashboard"
                      name='Dashboard'
                      active={activeItem === 'Dashboard'}
                    />
                    <Menu.Item
                      as={NavLink}
                      to="/add"                    
                      name='Add Question'
                      active={activeItem === 'Add Question'}
                    />
                    <Menu.Item
                      as={NavLink}
                      to="/LeaderBoard"                    
                      name='LeaderBoard'
                      active={activeItem === 'LeaderBoard'}
                    />
                    <Menu.Menu position='right'>
                      <Menu.Item>
                        {avatar
                      ? <img src={avatar} className="profile-image" alt="profile"/>
                      : <img src="https://via.placeholder.com/150" className="profile-image" alt="profile"/> }
                      </Menu.Item>
                      <Menu.Item>
                        <p className="text-center">Hello, <strong>{name}</strong> </p>
                      </Menu.Item>
                      <Menu.Item>
                        <Button color='orange' className="center-block" onClick={this.handleLogout}>
                            Logout
                        </Button>
                      </Menu.Item>
                    </Menu.Menu>
               </Menu>
               </Container>

        );
    }
}
function mapStateToProps ({ users, authedUser }) {
    if(users[authedUser] !== undefined ){
        return {
            authedUser: authedUser,
            name: users[authedUser].name,
            avatar: users[authedUser].avatarURL,
        } 
    }
    return {authedUser: ""}
}
export default withRouter(connect(mapStateToProps)(Navigation));
  