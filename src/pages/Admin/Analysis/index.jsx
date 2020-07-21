import React, { Component } from 'react'
import { Row, Col, Statistic, Progress } from 'antd'
import { AreaChart, ColumnChart } from 'bizcharts';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import Card from '@comps/Card'
const firsrRowCol = {
  sx: { span: 24 },
  md: { span: 12 },
  lg: { span: 6 }
}

// 数据源
const data = [
  { year: '1991', value: 10 },
  { year: '1992', value: 30 },
  { year: '1993', value: 70 },
  { year: '1994', value: 30 },
  { year: '1995', value: 20 },
  { year: '1996', value: 100 },

];
const datas = [
  {
    type: '家具家电',
    sales: 38,
  },
  {
    type: '粮油副食',
    sales: 52,
  },
  {
    type: '生鲜水果',
    sales: 61,
  },
  {
    type: '美容洗护',
    sales: 145,
  },
  {
    type: '母婴用品',
    sales: 48,
  },
  {
    type: '进口食品',
    sales: 38,
  },
  {
    type: '食品饮料',
    sales: 38,
  },
  {
    type: '家庭清洁',
    sales: 38,
  },
];
export default class Analysis extends Component {
  state = {
    loading: false
  }

  componentDidMount() {
    this.setState({
      loading: true
    })
    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 2000)
  }
  render() {

    return (
      <div>
        <Row gutter={[16, 16]}>
          {/* 总销售额 */}
          <Col {...firsrRowCol}>
            {/* 01 */}
            <Card
              loading={this.state.loading}
              title={
                <Statistic title='总销售额' value={"112893"} prevfix={'￥'} />
              }
              footer={<span>日销售额 ￥12423</span>}
            >
              <span>周同比12% <CaretUpOutlined style={{ color: 'red' }} /> </span>
              <span style={{ marginLeft: 10 }}>日同比10% <CaretDownOutlined style={{ color: 'seagreen' }} /></span>

            </Card>
          </Col>
          {/* 访问量 */}
          <Col {...firsrRowCol}>
            {/* 02 */}
            <Card
              loading={this.state.loading}
              title={
                <Statistic title='访问量' value={"22222"} />
              }
              footer={<span>日销售额 ￥12423</span>}
            >
              {
                <AreaChart
                  data={data}
                  title={{
                    // visible: true,
                    // text: '面积图',
                  }}
                  xField='year'
                  yField='value'
                  padding='0'
                  xAxis={
                    {
                      visible: false
                    }
                  }
                  yAxis={
                    {
                      visible: false
                    }
                  }
                  smooth={true}
                  color='pink'
                />
              }
            </Card>
          </Col>
          {/* 支付订单数量 */}
          <Col {...firsrRowCol}>
            {/* 03 */}
            <Card
              loading={this.state.loading}
              title={
                <Statistic title='支付订单数' value={"33333"} />
              }
              footer={<span>转化率60%</span>}
            >
              {<ColumnChart
                data={datas}
                title={{
                  // visible: true,
                  // text: '基础柱状图',
                }}
                forceFit
                padding='auto'
                xField='type'
                yField='sales'
                meta={{
                  type: {
                    alias: '类别',
                  },
                  sales: {
                    alias: '销售额(万)',
                  },
                }}
                padding='0'
                xAxis={
                  {
                    visible: false
                  }
                }
                yAxis={
                  {
                    visible: false
                  }
                }
                smooth={true}
              // color='pink'
              />}
            </Card>
          </Col>
          {/* KOI */}
          <Col {...firsrRowCol}>
            {/* 04 */}
            <Card
              loading={this.state.loading}
              title={
                <Statistic title='KOI' value={"44444"} />
              }
              footer={<span>转化率80.9%</span>}
            >
              <Progress
                strokeColor={{
                  from: '#108ee9',
                  to: '#87d068',
                }}
                percent={80.9}
                status="active"
              />
            </Card>
          </Col>

        </Row>
      </div>
    )
  }
}
