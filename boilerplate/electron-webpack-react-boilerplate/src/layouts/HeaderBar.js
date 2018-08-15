import React, { Component } from 'react';

import { Layout, Icon, Button } from 'antd';

import './HeaderBar.scss';

const { Header } = Layout;

export default class HeaderBar extends Component {

    state = {}

    render() {
        return (
            <Header className="header-bar" >

            
                <Button type="primary" > Open Folder </Button>

            </Header>
        );
    }

}
