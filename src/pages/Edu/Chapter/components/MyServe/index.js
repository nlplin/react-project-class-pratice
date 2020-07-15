import React, { Component } from 'react'
import { Button, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons';

import { reqGetToken } from '@api/edu/lesson.js'

import * as qiniu from 'qiniu-js'
import { nanoid } from 'nanoid'

const MAX_VIDEO_SIZE = 20 * 1024 * 1024
export default class MyUpload extends Component {
  state = {
    expires: 0,
    uploadToken: ''
  }
  constructor() {
    super()
    const str = localStorage.getItem('upload_Token')
    // console.log(str)

    if (str) {
      const res = JSON.parse(str)
      this.state = {
        expires: res.expires,
        uploadToken: res.uploadToken
      }
      // console.log(this.state)
    } else {
      this.state = {
        expires: 0,
        uploadToken: ''
      }
    }
  }
  // SDK 标准开发工具
  handleUpload = (file, fileList) => {
    // console.log(file, fileList)
    return new Promise(async (resolve, reject) => {
      if (file.size > MAX_VIDEO_SIZE) {
        message.error('Your video file size was too big , Please choose another source')
        reject('Your video file size was too big , Please choose another source')
        return

      }
      if (Date.now() > this.state.expires) {
        const { uploadToken, expires } = await reqGetToken()
        this.saveUpload(uploadToken, expires)
      }
      message.success('success')
      resolve(file)
    })
  }
  saveUpload = (uploadToken, expires) => {
    // console.log(uploadToken, expires)

    const targetTime = Date.now() + expires * 1000 - 2 * 60 * 1000
    expires = targetTime
    // console.log(expires)
    const upload_token = JSON.stringify({ uploadToken, expires })
    // console.log(upload_token)
    localStorage.setItem('upload_token', upload_token)
    this.setState({
      uploadToken,
      expires
    })
  }
  handleCostom = value => {
    // console.log(value)
    // console.log(this.state)

    const file = value.file
    console.log(file)
    console.log(value)

    const key = nanoid(10)
    const token = this.state.uploadToken
    // console.log(token)
    const putExtra = {
      mimeType: "video/*"
    };
    const config = {
      region: qiniu.region.z2
    };
    const observer = {
      //上传过程中触发的回调函数
      next(res) {
        // console.log('上传中')
        value.onProgress(res.total)
        console.log(Math.ceil(res.total.percent))
        
      },
      //上传失败触发的回调函数
      error(err) {
        console.log('失败了')
        value.onError(err)
      },
      // 上传成功触发的回调函数
      complete: res => {
        console.log(res)

        console.log('success')
        console.log(res, '1111111111111111111111')
        this.props.onChange('http://qdgftt8wp.bkt.clouddn.com/' + res.key)
        value.onSuccess(res)

      }
    }

    const observable = qiniu.upload(file, key, token, putExtra, config)
    this.subscription = observable.subscribe(observer)
    // const subscription = observable.subscribe(next, error, complete)
    // console.log(this.subscription)
  }
  componentWillUnmount() {
    this.subscription && this.subscription.unsubscribe() // 上传取消
  }
  render() {
    // console.log(MAX_VIDEO_SIZE)

    return (
      <div>
        <Upload
          beforeUpload={this.handleUpload}
          customRequest={this.handleCostom}
          accept="video/*"
        >
          <Button>
            <UploadOutlined /> 上传视频
          </Button>
        </Upload>
      </div>
    )
  }
}
