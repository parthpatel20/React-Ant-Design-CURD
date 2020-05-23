import React from 'react';
import './ant.css';
import './App.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import Products from './components/product';

function App() {
  const { Header, Footer, Content } = Layout
  return (
    <div  >
      <Layout >
        <Header>ANT Design - Quiz107React</Header>
        <Content className='site-layout-content'><Products /></Content>
        <Footer>Made by PARTH PATEL</Footer>
      </Layout>
    </div>
  );
}

export default App;
