import React, { useEffect, useState } from 'react';
import { Row, Col, Layout, Table, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { GetProducts, DeleteProduct } from '../../api/index'
import Column from 'antd/lib/table/Column';
import AddEditProduct from './AddEditProduct';
const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchProducts, setSearchProducts] = useState([])
    const [toggleDrawer, setToggleDrawer] = useState(false);
    const [drawerTitle, setDrawerTitle] = useState("Add New");
    const [productId, setProductId] = useState(0);
    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        GetProducts().then(res => {
            setProducts(res);
            setSearchProducts(res)
        }).catch(err => {
            console.log(err)
        });
    }
    useEffect(() => {
        if (!toggleDrawer) {
            loadData()
        }
    }, [toggleDrawer])
    const onSearch = (e) => {
        var filterdData = []
        products.forEach((product) => {
            if (product.name.toString().toLowerCase().includes(e.target.value.toLowerCase())) {
                filterdData.push(product)
            }
        })
        if (filterdData) {
            setSearchProducts(filterdData)
        }
    }
    const openDrawer = () => {
        setToggleDrawer(!toggleDrawer);
        setProductId(null);
        setDrawerTitle('Add New');
    }
    const deleteProduct = (id) => {
        DeleteProduct(id).then((res) => {
            loadData()
        })
    }
    const renderAction = (product) => {
        return (<div>
            <Button onClick={() => {
                setDrawerTitle('Edit');
                setProductId(product.id);
                setToggleDrawer(true)
            }}>Edit</Button>
            <Button onClick={() => { deleteProduct(product.id) }}>Delete</Button>
        </div>)
    }
    return (<Layout>
        <Layout.Content className='layoutContent'>
            <Row>
                <Col span={20} className='searchDiv'>
                    <Button className='addButton' onClick={openDrawer} >Add</Button>
                </Col>
                <Col span={4} className='searchDiv' >
                    <Input onChange={onSearch}
                        suffix={<SearchOutlined />} />
                </Col>
            </Row>
            <Row className='antRaw' >
                <Col>
                    <Table rowKey='id' dataSource={searchProducts} size="large" pagination={false}>
                        <Column title="Name" dataIndex="name" sorter={(a, b) => ((a.name === b.name) ? 0 : ((a.name > b.name) ? 1 : -1))} key="name" />
                        <Column title="Price" dataIndex="price" key="price" sorter={(a, b) => ((a.price === b.price) ? 0 : ((a.price > b.price) ? 1 : -1))} />
                        <Column title="Type" dataIndex="type" key="type" />
                        <Column title="Description" dataIndex="description" key="description" />
                        <Column title="Action" key="action" render={(product) => renderAction(product)
                        }
                        />
                    </Table>{
                        (toggleDrawer) ?
                            <AddEditProduct toggle={toggleDrawer} close={openDrawer} title={drawerTitle} id={productId} /> : null
                    }
                </Col>
            </Row>
        </Layout.Content>
    </Layout>)
}
export default Products;