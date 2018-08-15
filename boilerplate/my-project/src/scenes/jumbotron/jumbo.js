import React, { Component } from 'react';
//import { UncontrolledCollapse, Button, CardBody, Card, Jumbotron, Container, Row, Col} from 'reactstrap';

import OpenFolderBTN from '../buttons/openFolderButton';


class Jumbo extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            shown: true
        };
    }
    toggle() {
  		this.setState({
  			shown: !this.state.shown
  		});
	}
    render() {
        return (
          <UncontrolledCollapse toggler="jumboBTN">
          <Jumbotron >
              <Container>
                  <Row>
                  <Col>
                      <OpenFolderBTN />

                  </Col>
                      <Col>
                          <h1>Welcome to React</h1>

                      </Col>
                  </Row>
              </Container>
          </Jumbotron>
          </UncontrolledCollapse>
        );
    }
}

export default Jumbo;
