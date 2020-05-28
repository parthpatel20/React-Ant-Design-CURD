import React from 'react';
import { connect } from 'dva';
import style from './product/product.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import ProductPage from './product'


const LayoutPage = () => {
  const { Header, Footer, Content } = Layout
  return (
    <div>
      <Layout>
        <Header className={style.antHeader}>ANT Design - Quiz107React</Header>
        <Content className={style.siteLayoutContent}><ProductPage /></Content>
        <Footer className={style.antFooter}>Made by PARTH PATEL</Footer>
      </Layout>
    </div>
  );
}


export default connect()(LayoutPage);
