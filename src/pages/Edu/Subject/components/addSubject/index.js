import React, { Component } from 'react'
import { Card, Form, Select, Button, Input, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
// import { connect } from 'react-redux'
// import { getSubjectList } from '../../redux'
import { reqGetSubject, reqSaveSubject } from '@api/edu/subject'

import './index.css'
const Option = Select.Option
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
class addSubjectList extends Component {
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
    // this.props.getSubjectList(1, 10)
    // this.reqGetSubject(page,10)
    const res = await reqGetSubject(this.page++, 10)
    console.log(res)
    // console.log(this.state.subjectList)
    this.setState({
      subjectList: res
    })
    console.log(this.state)
    console.log(this.state.subjectList)


  }
  onFinish = async value => {
    console.log(value)

    try {
      await reqSaveSubject(value.subjectname, value.parentid)
      message.success('请求添加成功')
      this.props.history.push('/edu/subject/list')
    } catch{
      message.error('请求添加失败')
    }
  }
  handleAddList = async () => {
    const res = await reqGetSubject(this.page++, 10)
    console.log('res67', res)

    const newItems = [...this.state.subjectList.items, ...res.items]
    console.log('items70', newItems)

    this.setState({
      subjectList: {
        total: res.total,
        items: newItems
      }
    })
  }
  render() {
    console.log(this.props)
    return (
      <Card title={
        <>
          <Link to="/edu/subject/list">
            <ArrowLeftOutlined />
          </Link>
          <span className="addSpanStyle">添加课程</span>
        </>
      }>
        <Form {...layout} name='subject' onFinish={this.onFinish}>
          <Form.Item label='课程分类名称' name='subjectname'
            rules={[
              {
                required: true,
                message: '请输入课程分类!'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label='父级分类id' name='parentid'
            rules={[
              {
                required: true,
                message: '请选择分类id'
              }
            ]}
          >
            <Select
              dropdownRender={
                menu => {
                  return (
                    <>
                      {menu}
                      {this.state.subjectList.total > this.state.subjectList.items.length &&
                        (<Button type='link' onClick={this.handleAddList}>more</Button>)}

                    </>
                  )
                }
              }
            >
              <Option key={0} value={0}>{'一级菜单'}</Option>
              {this.state.subjectList.items.map(subject => {
                return (<Option key={subject._id} value={subject._id}>{subject.title}</Option>)
              })}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              提交
          </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
export default addSubjectList

// {
//   {
//     this.props.addSubjectList.items.map(subject => {
//       return <Option key={subject._id} value={subject._id}>{subject.title}</Option>
//     })
//   } 