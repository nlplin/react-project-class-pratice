import React, { Component } from 'react'
import { Card, Form, Select, Button, Input, message, Upload, Switch } from 'antd'
import { ArrowLeftOutlined, UploadOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

import { reqAddLesson } from '@api/edu/lesson.js'
import MyUpload from '../components/MyServe'
import './index.css'
const layout = {
  // antd把一个宽度分为24份
  // 表单文字描述部分
  labelCol: {
    span: 3
  },
  // 表单项部分
  wrapperCol: {
    span: 6
  }
}
const onFinish = values => {
  console.log('Success:', values)
}
// 表单校验失败的回调函数
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo)
}
// @connect(
//   state => ({ addSubjectList: state.subjectList }),
//   { getSubjectList }
// )
class addLesson extends Component {
  page = 1
  state = {
    subjectList: {
      total: 0,
      items: []
    }

  }
  // handleLeftArrow = () => {
  //   this.props.history.push('/edu/subject/list')
  // }
  async componentDidMount() {

  }
  onFinish = async values => {
    console.log(values)
    const chapterId = this.props.location.state._id
    const data = {
      ...values,
      chapterId
    }
    await reqAddLesson(data)
    this.props.history.push('/edu/chapter/list')
  }
  handleAddList = async () => {
    // const res = await reqGetSubject(this.page++, 10)

    // const newItems = [...this.state.subjectList.items, ...res.items]

    this.setState({
      subjectList: {
        // total: res.total,
        // items: newItems
      }
    })
  }
  render() {
    // console.log(this.props)
    return (
      <Card title={
        <>
          <Link to="/edu/chapter/list">
            <ArrowLeftOutlined />
          </Link>
          <span className="addLessonStyle">添加课时</span>
        </>
      }>
        <Form initialValues={{
          'free': true
        }} {...layout} name='subject' onFinish={this.onFinish}>
          <Form.Item label='课时名称' name='title'
            rules={[
              {
                required: true,
                message: '请输入课时!'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label='是否免费' name='free'
            rules={[
              {
                required: true,
                message: '是否免费'
              }
            ]}
            valuePropName='checked'
          >
            {/* <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked /> */}
            <Switch
              checkedChildren="开启"
              unCheckedChildren="关闭"
              defaultChecked
            />
          </Form.Item>

          <Form.Item label='上传视频' name='video'
            rules={[
              {
                required: true,
                message: '请上传视频'
              }
            ]}
          >
            {/* <Upload>
              <Button>
                <UploadOutlined /> 上传视频
              </Button>
            </Upload>, */}
            <MyUpload></MyUpload>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              SUBMIT
          </Button>
          </Form.Item>
        </Form>
      </Card >
    )
  }
}
export default addLesson

// {
//   {
//     this.props.addSubjectList.items.map(subject => {
//       return <Option key={subject._id} value={subject._id}>{subject.title}</Option>
//     })
//   } 