import { connect } from "dva"
import { Row, Col, Button, Input } from 'antd'
import style from '../product.css'
import { SearchOutlined } from '@ant-design/icons';

const ProductHeader = ({ dispatch }) => {
    const textChnage = (e) => {
        dispatch({ type: `product/searchProduct`, payload: e.target.value.toLowerCase() })

    }
    return (<Row>
        <Col span={20} className={style.searchDiv}>
            <Button className={style.addButton} onClick={() => {
                dispatch({ type: `product/addNew` })
            }} >Add</Button>
        </Col>
        <Col span={4} className={style.searchDiv} >
            <Input suffix={<SearchOutlined />} onChange={textChnage} />
        </Col>
    </Row>
    )
}
export default connect()(ProductHeader)