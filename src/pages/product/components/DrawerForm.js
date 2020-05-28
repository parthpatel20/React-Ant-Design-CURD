import React, { useEffect } from 'react'
import { connect } from "dva"
import { Spin, message } from "antd";
import AddEditForm from "./AddEditForm";
import { Button, Drawer, Form } from 'antd';


const DrawerForm = (props) => {
    const { title, toggle, product, onClose, dispatch } = props;
    const [form] = Form.useForm();
    useEffect(() => {
        if (product) {
            form.setFieldsValue(product)
        }
    }, [])

    const onSave = (formdata) => {
        if (product !== null) {
            const payload = {
                data: formdata,
                id: product.id
            }
            dispatch({ type: `product/editProduct`, payload: payload });
            message.success('Modified')
        } else {
            const data = {
                id: Date.now(),
                name: formdata.name,
                type: formdata.type,
                price: formdata.price,
                description: formdata.description
            }
            dispatch({ type: `product/saveNewProduct`, payload: data });
            message.success('Saved')
        }
    }
    const onCancel = () => {
        form.resetFields();
        dispatch({ type: `product/fetchProducts` });
    }
    const renderFooter = () => {
        return (<div style={{ float: 'right' }}>
            <Button style={{ marginRight: 8 }} onClick={onCancel}>
                Cancel
              </Button>
            <Button type="primary" form="productForm" htmlType="submit">
                {(product) ? "Edit" : "Submit"}
            </Button>
        </div>)
    }
    const renderForm = () => {
        return (<Spin spinning={props.loading}>
            <AddEditForm form={form} onSave={onSave} />
        </Spin>)
    }
    return (<Drawer
        title={title}
        placement="right"
        closable={true}
        onClose={() => { onClose() }}
        visible={toggle}
        getContainer={false}
        style={{ position: 'absolute' }}
        width='450px'
        footer={
            renderFooter()
        }
    >
        {renderForm()}
    </Drawer>)
}

export default connect()(DrawerForm);