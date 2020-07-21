import React, { Component, useState } from "react";
import { Form, Input, Button, Checkbox, Row, Col, Tabs } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  GithubOutlined,
  WechatOutlined,
  QqOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { login, mobileLogin } from "@redux/actions/login";
import { reqGetMessageCode, reqConfirmMobileLogin } from '@api/acl/oauth'

import "./index.less";

const { TabPane } = Tabs;


function LoginForm(props) {
  const [form] = Form.useForm()
  const [SwitchShow, setSwitchShow] = useState(false)
  const [activeKey, setActiveKey] = useState('user')

  let [Count, setCount] = useState(5)

  const handleTabChange = (activeKey) => {
    // console.log(activeKey)
    setActiveKey(activeKey)
  }
  // const onFinish = ({ username, password }) => {

  //   //#region 
  //   // console.log(username, password)
  //   // // console.log('执行了')

  //   // props.login(username, password).then((token) => {
  //   //   // 登录成功
  //   //   // console.log("登陆成功~");
  //   //   // 持久存储token
  //   //   localStorage.setItem("user_token", token);
  //   //   props.history.replace("/");
  //   // });
  //   // .catch(error => {
  //   //   notification.error({
  //   //     message: "登录失败",
  //   //     description: error
  //   //   });
  //   // });
  //   //#endregion
  // };
  const onFinish = () => {
    console.log(activeKey)
    if (activeKey === 'user') {
      form.validateFields(['username', 'password']).then(res => {
        console.log(res)
        let { username, password } = res
        props.login(username, password).then((token) => {
          localStorage.setItem("user_token", token);
          props.history.replace("/");
        });
      })
    } else {
      form.validateFields(['phone', 'verify']).then(res => {
        console.log(res)
        let { phone, verify } = res
        props.mobileLogin(phone, verify).then((token) => {
          localStorage.setItem("user_token", token);
          props.history.replace("/");
        });
      })
    }
  }
  const validator = (rules, value) => {
    // console.log(rules,value)
    return new Promise((resolve, reject) => {
      if (!value) {
        return reject('密码为空')
      }
      if (value.length < 4) {
        return reject('密码不能少于4个字符')
      }
      if (value.length > 16) {
        return reject('密码不能大于16个字符')
      }
      if (!/^[a~zA~Z_0-9]+$/.test(value)) {
        return reject('密码必须由数字字母下划线组成')
      }
      resolve()
    })
  }
  const handleSendMes = async () => {
    // form.validateFields(['phone']).then(res => {
    //   console.log(res)
    // })
    const res = await form.validateFields(['phone'])
    await reqGetMessageCode(res.phone)
    setSwitchShow(true)
    let timeId = setInterval(() => {
      Count--
      setCount(Count)
      if (Count <= 0) {
        clearInterval(timeId)
        setSwitchShow(false)
        setCount(5)
      }
    }, 1000)
  }

  const handleGit = () => {
    console.log(11111)
    window.location.href = 
    'https://github.com/login/oauth/authorize?client_id=49c9909d14d3d9bd3f4b'
  }
  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
      >
        <Tabs
          onChange={handleTabChange}
          defaultActiveKey="user"
          tabBarStyle={{ display: "flex", justifyContent: "center" }}
        >
          <TabPane tab="账户密码登陆" key="user">
            <Form.Item name="username" rules={[
              {
                required: true,
                message: '用户名必须填入'
              },
              {
                min: 4,
                message: '最少输入4个字符'
              },
              {
                max: 16,
                message: '最多不能输入超过16个字符'
              },
              // {
              //   pattern: /^[a~zA~Z_0-9]+$/,
              //   message: '请输入字母数字下划线的格式'
              // }
            ]}>
              <Input
                prefix={<UserOutlined className="form-icon" />}
                placeholder="用户名: admin"
              />
            </Form.Item>
            <Form.Item name="password" rules={[
              {
                validator
              },

            ]}>
              <Input
                prefix={<LockOutlined className="form-icon" />}
                type="password"
                placeholder="密码: 111111"
              />
            </Form.Item>
          </TabPane>
          <TabPane tab="手机号登陆" key="phone">
            <Form.Item name="phone" rules={[
              {
                required: true,
                message: '手机号码必须填入'
              },
              {
                min: 11,
                message: '最少输入11个字符'
              },
              {
                max: 11,
                message: '最多不能输入超过11个字符'
              },
              {
                pattern: /^1[3456789]\d{9}$/,
                message: '请输入11位的电话号码'
              }
            ]}>
              <Input
                prefix={<MobileOutlined className="form-icon" />}
                placeholder="手机号"
              />
            </Form.Item>

            <Row justify="space-between">
              <Col span={16}>
                <Form.Item name="verify">
                  <Input
                    prefix={<MailOutlined className="form-icon" />}
                    placeholder="验证码"
                  />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Button className="verify-btn" onClick={handleSendMes} disabled={SwitchShow}>
                  {SwitchShow ? `${Count}秒后获取` : '获取验证码'}
                </Button>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
        <Row justify="space-between">
          <Col span={7}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>自动登陆</Checkbox>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Button type="link">忘记密码</Button>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            // htmlType="submit"
            onClick={onFinish}
            className="login-form-button"
          >
            登陆
            </Button>
        </Form.Item>
        <Form.Item>
          <Row justify="space-between">
            <Col span={16}>
              <span>
                其他登陆方式
                  <GithubOutlined className="login-icon" onClick={handleGit} />
                <WechatOutlined className="login-icon" />
                <QqOutlined className="login-icon" />
              </span>
            </Col>
            <Col span={3}>
              <Button type="link">注册</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );

}

export default withRouter(connect(null, { login, mobileLogin })(LoginForm))

