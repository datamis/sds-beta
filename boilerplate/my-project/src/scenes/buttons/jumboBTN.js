import React, { Component } from 'react';
//import {  Button, CardBody, Card } from 'reactstrap';



class JumboBTN extends Component {
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
          <div>
            <button type="button" class="btn btn-primary"  id="jumboBTN" onClick = {this.toggle.bind(this)}>Src</button>

          </div>
        );
    }
}

export default JumboBTN;
