import React, { Component } from "react";
import { Button, message, Tooltip, Modal, Alert, Table } from "antd";
import Player from 'griffith'
import {
  FullscreenOutlined,
  RedoOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { connect } from "react-redux";
import SearchForm from "./SearchForm";
import screenfull from 'screenfull'
import { getLessonList, addLesonList, delChapter, delLesson } from './redux'
import "./index.less";
dayjs.extend(relativeTime);
@connect(
  state => ({
    // courseList: <state className="courseList"></state>,
    // permissionValueList: filterPermissions(
    //   state.course.permissionValueList,
    //   "Course"
    // )
    chapterList: state.chapterList,
  }),
  { getLessonList, addLesonList, delChapter, delLesson }
)
class Chapter extends Component {
  state = {
    searchLoading: false,
    previewVisible: false,
    // previewImage: "",
    selectedRowKeys: [],
    video: ''
  };

  showVideoModal = video => () => {
    // return () => {
    // console.log(111);
    this.setState({
      previewVisible: true,
      // previewImage: img,
      video
    });
    // };
  };
  handleImgModal = () => {
    this.setState({
      previewVisible: false,
    });
  };
  handleAdd = () => {
    console.log(111)
    console.log(this.props);
    // console.log(this.props.state)
    console.log(this.state)

  }
  componentDidMount() {
    // const { page, limit } = this.state;
    // this.handleTableChange(page, limit);
  }
  handleTableChange = (page, limit) => {
    this.setState({
      tableLoading: true,
    });

    this.getcourseList({ page, limit }).finally(() => {
      this.setState({
        tableLoading: false,
        page,
        limit,
      });
    });
  };
  getcourseList = ({ page, limit, Coursename, nickName }) => {
    return this.props
      .getcourseList({ page, limit, Coursename, nickName })
      .then((total) => {
        if (total === 0) {
          message.warning("暂无用户列表数据");
          return;
        }
        message.success("获取用户列表数据成功");
      });
  };
  onSelectChange = selectedRowKeys => {
    // console.log(selectedRowKeys)
    // console.log(this.props)

    // const chapterId =  this.props.chapterList
    // // selectedRowKeys
    // console.log(chapterId)
    this.setState({
      selectedRowKeys,
    });
  };
  handleDelSel = () => {
    Modal.confirm({
      title: 'you sure about this',
      onOk: async () => { // 疑问
        let chapterIds = []
        let lessonIds = []
        let selectedRowKeys = this.state.selectedRowKeys
        // console.log(selectedRowKeys)
        // console.log(this.props)
        let chapterArr = this.props.chapterList.items
        // console.log(chapterArr)
        chapterArr.forEach(chapter => {
          let chapterId = chapter._id
          // console.log('11',chapterId)
          let index = selectedRowKeys.indexOf(chapterId)
          if (index > -1) {
            let newArr = selectedRowKeys.splice(index, 1)
            // console.log(newArr)
            chapterIds.push(newArr[0])

          }
          console.log(chapterIds)
          console.log(selectedRowKeys)
        })
        lessonIds = [...selectedRowKeys]
        await this.props.delChapter(chapterIds)
        await this.props.delLesson(lessonIds)
      }
    })
  }
  handleOpen = (expand, record) => {
    // console.log(1111111111)
    // console.log(expand, record)
    if (expand) {
      // console.log(this.props.chapterList.items[0].children)
      this.props.getLessonList(record._id)
    }

  }
  handleAddLesson = data => () => {
    // console.log(111);
    console.log(data)
    this.props.history.push('/edu/chapter/addlesson', data)
  }
  // handlePreView = () => {
  //   console.log(111)
  // }
  handleScreen = () => {
    // screenfull.request()
    screenfull.toggle()
  }
  handleUpdateLesson = values => () => {
    console.log(values)
    console.log(1111111111111)
  }
  render() {
    const { previewVisible, previewImage, selectedRowKeys } = this.state;
    const sources = {
      hd: {
        play_url: this.state.video,
        bitrate: 1,
        duration: 1000,
        format: '',
        height: 500,
        size: 160000,
        width: 500
      }
    }
    // console.log(this.props);

    const columns = [
      {
        title: "章节名称",
        dataIndex: "title",

      },
      {
        title: "是否免费",
        dataIndex: "free",
        render: (isFree) => {
          return isFree === true ? "是" : isFree === false ? "否" : "";
        },
      },
      {
        title: "视频",
        // dataIndex: "free",
        render: value => {
          // return isFree === true ? "是" : isFree === false ? "否" : "";
          // console.log(value)
          if (!value.free) return
          // 本身为false 取反为 true 则return   本身为false
          return <Button onClick={this.showVideoModal(value.video)}>预览</Button>
        },
      },
      {
        title: "操作",
        width: 300,
        fixed: "right",
        render: data => {
          // if ("free" in data) {
          return (
            <div>

              {data.free === undefined && <Tooltip title="新增课时">
                <Button type="primary" style={{ marginRight: "10px" }} onClick={this.handleAddLesson(data)}>
                  <PlusOutlined />
                </Button>
              </Tooltip>}

              <Tooltip title={data.free === undefined ? "更新章节" : "更新课时"}>
                <Button type="primary" style={{ marginRight: "10px" }} onClick={this.handleUpdateLesson(data)} >
                  {/* onClick={this.handleUpdateLesson(data)} */}
                  <FormOutlined />
                </Button>
              </Tooltip>
              <Tooltip title={data.free === undefined ? "删除章节" : "删除课时"}>
                <Button type="danger">
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </div>
          );
          // }
        },
      },
    ];

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div>
        <div className="course-search">
          <SearchForm />
        </div>
        <div className="course-table">
          <div className="course-table-header">
            <h3>课程章节列表</h3>
            <div>
              <Button onClick={this.handleAdd} type="primary" style={{ marginRight: 10 }}>
                <PlusOutlined />
                <span>新增</span>
              </Button>
              <Button type="danger" style={{ marginRight: 10 }} onClick={this.handleDelSel}>
                <span>批量删除</span>
              </Button>
              <Tooltip onClick={this.handleScreen} title="全屏" className="course-table-btn">
                <FullscreenOutlined />
              </Tooltip>
              <Tooltip title="刷新" className="course-table-btn">
                <RedoOutlined />
              </Tooltip>
              <Tooltip title="设置" className="course-table-btn">
                <SettingOutlined />
              </Tooltip>
            </div>
          </div>
          <Alert
            message={
              <span>
                <InfoCircleOutlined
                  style={{ marginRight: 10, color: "#1890ff" }}
                />
                {`已选择 ${selectedRowKeys.length} 项`}
              </span>
            }
            type="info"
            style={{ marginBottom: 20 }}
          />
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.props.chapterList.items}
            rowKey="_id"
            expandable={{
              onExpand: this.handleOpen
            }}
          />
        </div>

        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleImgModal}
          title="视频"
          destroyOnClose={true}
        >
          {/* <img alt="example" style={{ width: "100%" }} src={previewImage} /> */}
          <Player
            sources={sources}
            id={'1'}
            cover={'http://localhost:3000/logo512.png'}
            duration={1000}
          >

          </Player>
        </Modal>
      </div>
    );
  }
}
export default Chapter;