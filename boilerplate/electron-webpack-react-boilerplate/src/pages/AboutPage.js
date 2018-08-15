import React, { Component } from 'react';

import { Layout } from 'antd';

const { Content } = Layout;

export default class AboutPage extends Component {

    state = {}

    render() {
        return (
            <Content>
                <h1>About</h1>

                <p>
                    Sample project using Electron Forge + webpack + React + React Router
                    + Ant Design + Recharts + Sass and Less.
                </p>
                <p>
                    Source code on
                    <a href="https://github.com/douglasjunior/electron-webpack-react-boilerplate" >
                        GitHib Repo
                    </a>
                    .
                </p>
            </Content>
        );
    }

}
