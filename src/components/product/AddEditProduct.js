import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Drawer, Select } from 'antd';
import { GetProduct, SaveProduct, EditProduct } from '../../api'

export const AddEditProduct = (props) => {
    const { title, toggle, id, close } = props;
    const [form] = Form.useForm();
    const [product, setProduct] = useState()
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const loadProduct = () => {
        if (id) {

            GetProduct(id).then(res => {
                setProduct(res);
                form.setFieldsValue(res)
            }).catch(err => {
                console.log(err)
            });
        }
    }

    useEffect(() => {
        loadProduct() // eslint-disable-next-line
    }, [id])

    useEffect(() => {
        if (!toggle || id === null || id === 0) {
            form.resetFields()
            setProduct()
        }// eslint-disable-next-line
    }, [toggle])

    const saveProduct = (product) => {
        if (id !== null) {
            const data = {
                name: product.name,
                type: product.type,
                price: product.price,
                description: product.description
            }
            EditProduct(data, id).then((res) => {
                close()
            })
        } else {
            const data = {
                id: Date.now(),
                name: product.name,
                type: product.type,
                price: product.price,
                description: product.description
            }
            SaveProduct(data).then((res) => {
                close();
            });
        }
    }

    const onFinish = (values) => {
        saveProduct(values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const renderForm = () => {
        return (<Form
            {...layout}
            id="productForm"
            name="product-form"
            form={form}
            initialValues={product}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Name"
                name='name'
                rules={[{ required: true, message: 'Please input Name' }]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="Price"
                name='price'
                rules={[{ required: true, message: 'Please input Price' }, { type: 'number', min: 0, message: 'Please Inputs only Number' }
                ]}
            >
                <InputNumber formatter={value => `$ ${value}`} />
            </Form.Item>
            <Form.Item name='type' label="Type"
                rules={[{ required: true, message: 'Please Select Type' }]}  >
                <Select style={{ float: 'left' }} >
                    <Select.Option value="Software">Software</Select.Option>
                    <Select.Option value="Hardware">Hardware</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="Description"
                name='description'>
                <Input.TextArea />
            </Form.Item>
        </Form >
        )
    }
    const renderFooter = () => {
        return (<div style={{ float: 'right' }}>
            <Button style={{ marginRight: 8 }} onClick={close}>
                Cancel
              </Button>
            <Button type="primary" form="productForm" htmlType="submit">
                {(id) ? "Edit" : "Submit"}
            </Button>
        </div>)
    }
    return (<div>
        <Drawer
            title={title}
            placement="right"
            closable={true}
            onClose={close}
            visible={toggle}
            getContainer={false}
            style={{ position: 'absolute' }}
            width='450px'
            footer={
                renderFooter()
            }
        >
            {renderForm()}
        </Drawer>
    </div>
    )
}

export default (AddEditProduct);