import React, { Component } from 'react'
// 导入antd组件
import { Button, Table, Tooltip, Input, message, Modal } from 'antd'
// 导入antd-图标
import { PlusOutlined, DeleteOutlined, FormOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { getSubjectList, getSecSubjectList, updateSubjectList } from './redux'
import { reqDelSubject } from '@api/edu/subject'
//导入样式文件
import './index.less'

const { confirm } = Modal
@connect(
  state => ({ subjectList: state.subjectList }),
  { getSubjectList, getSecSubjectList, updateSubjectList }
)
class Subject extends Component {
  currentPage = 1
  pageSize = 10
  state = {
    subjectId: '',
    subject: {},
    subjectTitle: ''
  }
  componentDidMount() {
    this.props.getSubjectList(1, 10)
  }
  handleOnChange = (page, pageSize) => {
    console.log('pp', page, pageSize)
    this.props.getSubjectList(page, pageSize)
    this.currentPage = page
  }
  handleOnShowPage = (current, size) => {
    console.log(current, size);
    this.props.getSubjectList(current, size)
    this.currentPage = current
    this.pageSize = size
  }
  // 新建功能
  handleAddSubject = () => {
    console.log(11)
    console.log(this.props)
    this.props.history.push('/edu/subject/add')
    // this.props.push()
  }
  handlePageChange = (expanded, record) => {
    console.log(expanded, record);
    if (expanded) {
      // getSecSubjectList(record._id)
      this.props.getSecSubjectList(record._id)

    }
  }
  handleUpdate = (value) => {
    return () => {
      console.log(value);
      this.setState({
        subjectId: value._id,
        subjectTitle: value.title 
      })
      this.oldState = value.title
    }
  }
  handleInputChange = (e) => {
    this.setState({
      subjectTitle: e.target.value.trim()
    })
  }
  handleCancel = () => {
    this.setState({
      subjectId: '',
      subjectTitle: ''

    })
  }
  handleConfirm = async () => {
    let { subjectId, subjectTitle } = this.state
    if (subjectTitle.length === 0) {
      alert('请确认课程信息')
      return
    }
    if (this.oldState === subjectTitle) return alert('课程名称未改变 请确认')
    await this.props.updateSubjectList(subjectId, subjectTitle)
    message.success('success')
    this.handleCancel()
    console.log(FormOutlined, subjectTitle)

  }
  handleDelete = value => () => {
    console.log(value)
    confirm({
      title: `you sure about this?${value.title}`,
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        await reqDelSubject(value._id)
        message.success('it work')
        const totalPage = Math.ceil(this.props.subjectList.total / this.pageSize)
        console.log(totalPage)
        if (this.currentPage !== 1 && this.props.subjectList.items.length === 1 && totalPage === this.currentPage) {
          this.props.getSubjectList(--this.currentPage, this.pageSize)
          return
        }
        // console.log('ok')
        this.props.getSubjectList(this.currentPage, this.pageSize)
      }
    })
  }
  render() {
    const columns = [
      // columns 定义表格的列
      // title属性: 表示列的名称
      // dataIndex决定: 这一列展示的是data中哪一项的数据
      {
        title: '分类名称',
        // dataIndex: 'title', 
        key: 'title', render: (value) => {
          if (this.state.subjectId === value._id) {
            return <Input onChange={this.handleInputChange} value={this.state.subjectTitle} className="inputStyle" />
          }
          return <span>{value.title}</span>
        }
      },

      {
        title: '操作',
        dataIndex: '', //表示这一列不渲染data里的数据
        key: 'x',
        // 自定义这一列要渲染的内容
        render: value => {
          if (this.state.subjectId === value._id) {
            return (
              <>
                <Button type="primary" onClick={this.handleConfirm} className="confirmList">确认</Button>
                <Button type="danger" onClick={this.handleCancel}> 取消</Button>
              </>
            )
          }
          return (
            <>
              <Tooltip placement="top" title="添加">
                <Button type='primary' className='update-btn' onClick={this.handleUpdate(value)}>
                  <FormOutlined />
                </Button>
              </Tooltip>

              <Tooltip placement="top" title="删除">
                <Button type='danger' onClick={this.handleDelete(value)}>
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </>
          )
        },
        // 设置这一列的宽度
        width: 200
      }

      //  return <span>{value.title}</span>

    ]
    // console.log(this.props);
    return (
      <div className='subject' >
        <Button type='primary' className='subject-btn' onClick={this.handleAddSubject}>
          <PlusOutlined />
          新建
        </Button>
        <Table
          // 控制列
          columns={columns}
          // 控制可展开项
          expandable={{
            // 可展开项展示的内容
            // expandedRowRender: record => (
            //   <p style={{ margin: 0 }}>{record.description}</p>
            // ),
            // // 控制这一列是否可展开
            // rowExpandable: record => record.name !== 'Not Expandable'
            onExpand: this.handlePageChange

          }}

          //表示里面的数据
          dataSource={this.props.subjectList.items}
          rowKey='_id'
          pagination={{
            total: this.props.subjectList.total, //total表示数据总数
            showQuickJumper: true, //是否显示快速跳转
            showSizeChanger: true, // 是否显示修改每页显示数据数量
            pageSizeOptions: ['5', '10', '15', '20'], //设置每天显示数据数量的配置项
            // defaultPageSize: 5, //每页默认显示数据条数 默认是10,
            onChange: this.handleOnChange,//页码改变的时候触发,
            onShowSizeChange: this.handleOnShowPage,//一页展示几条数据变化时触发 current 当前页码, size 一页几条
            current: this.currentPage
          }}
        />
      </div>
    )
  }
}
export default Subject 
