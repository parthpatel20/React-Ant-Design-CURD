import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Row, Col, Layout, Table, Button, Popconfirm, message } from 'antd';
import Column from 'antd/lib/table/Column';
import style from './product.css'
import 'antd/dist/antd.css';
import DrawerForm from './components/DrawerForm';
import ProductHeader from './components/productHeader';

const ProductPage = (props) => {
    const [searchProducts, setSearchProducts] = useState(props.products);
    var { dispatch, } = props
    useEffect(() => {
        setSearchProducts(props.products)
    }, [props.products])
    useEffect(() => {
        dispatch({ type: `product/fetchProducts` })
    }, [])
    const onDrawerClose = () => {
        dispatch({ type: `product/closetToggle` })
    }

    const deleteConfirm = (val) => {
        message.success('Deleted')
        dispatch({ type: `product/deleteProduct`, payload: val })
    }
    const renderAction = (product) => {
        return (<div>
            <Button style={{ marginRight: '8px' }} onClick={() => {
                dispatch({ type: `product/fetchProduct`, payload: product })
            }}>Edit</Button>

            <a className='ant-btn ant-btn-dangerous'>
                <Popconfirm title='Are You Sure You Want to delete this?'
                    onConfirm={() => { deleteConfirm(product.id) }}
                    okText='Yes'
                    cancelText="No">Delete</Popconfirm></a>
        </div>)
    }
    return (<Layout>
        <Layout.Content className={style.layoutContent}>
            <ProductHeader />
            <Row className={style.antRaw} >
                <Col>
                    <Table rowKey='id' loading={props.loading} dataSource={searchProducts} size="large" pagination={false}>
                        <Column title="Name" dataIndex="name" sorter={(a, b) => ((a.name === b.name) ? 0 : ((a.name > b.name) ? 1 : -1))} key="name" />
                        <Column title="Price" dataIndex="price" key="price" sorter={(a, b) => ((a.price === b.price) ? 0 : ((a.price > b.price) ? 1 : -1))} />
                        <Column title="Type" dataIndex="type" key="type" />
                        <Column title="Description" dataIndex="description" key="description" />
                        <Column title="Action" key="action" render={(product) => renderAction(product)
                        }
                        />
                    </Table>
                    {
                        (props.toggleDrawer) ?
                            <DrawerForm toggle={props.toggleDrawer} loading={props.loading} onClose={onDrawerClose} title={props.drawerTitle} product={props.product} /> : null
                    }
                </Col>
            </Row>
        </Layout.Content>
    </Layout>
    )

}

const mapStatetToPorps = (state) => {
    const { products, loading, productId, product, toggleDrawer, drawerTitle } = state.product
    return {
        products: products,
        productId: productId,
        toggleDrawer: toggleDrawer,
        onClose: null,
        product: product,
        loading: loading,
        drawerTitle: drawerTitle
    }
}
export default connect(mapStatetToPorps)(ProductPage);