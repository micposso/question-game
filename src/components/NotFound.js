import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Container,
  Header,
  Button
} from "semantic-ui-react";

class NotFound extends Component {
    render() {
      return (
        <Container textAlign='centered'>            
            <Header as='h2'>Opps, you got lost</Header>
                <Button as={NavLink} to='/dashboard' exact>
                    Return to the Dashboard
                </Button>
        </Container>
      );
    }
  }
  
  export default NotFound;