import React from 'react';

import Jumbo from './scenes/jumbotron/jumbo';
import { Card, Icon, Avatar, Row, Col, Button, Divider,Header,Layout,Sider } from 'antd/lib';

export default class App extends React.Component {
  render() {
    return (

      <Layout>
  <Header>header</Header>
  <Layout>
    <Sider>left sidebar</Sider>
    <Content>main content</Content>
    <Sider>right sidebar</Sider>
  </Layout>
  <Footer>footer</Footer>
</Layout>
    );
  }
}
