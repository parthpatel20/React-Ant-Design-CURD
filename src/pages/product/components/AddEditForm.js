import { Form, Input, InputNumber, Select, message } from 'antd';

const AddEditForm = (props) => {
    const { form, onSave } = props
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const onFinish = (val) => {
        onSave(val)
    }
    const onFinishFailed = (errorInfo) => {
        message.error(errorInfo)
    }
    return (<div>
        <Form
            {...layout}
            id="productForm"
            name="product-form"
            form={form}
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
    </div>)
}
export default (AddEditForm)