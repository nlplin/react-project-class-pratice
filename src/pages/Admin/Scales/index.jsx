import React, { Component } from 'react'
import { Card, Button, DatePicker } from 'antd'
import moment from 'moment'
const { RangePicker } = DatePicker;
const tabListNoTitle = [
  {
    key: 'sale',
    tab: '销售量',
  },
  {
    key: 'visit',
    tab: '访问量',
  },

];

const contentListNoTitle = {
  sale: <p>article content</p>,
  visit: <p>app content</p>,
};
export default class Scales extends Component {
  state = {
    noTitleKey: 'sale',
    chooseDate: 'day',
    rangeData: [moment(), moment()]
  }
  switchDate = switchDate => () => {
    let rangeData
    switch (switchDate) {
      case 'day':
        rangeData = [moment(), moment()]
        break
      case 'week':
        rangeData = [moment(), moment().add(1, 'w')]
        break
      case 'month':
        rangeData = [moment(), moment().add(1, 'M')]
        break
      case 'year':
        rangeData = [moment(), moment().add(1, 'y')]
        break
    }

    this.setState({
      chooseDate: switchDate,
      rangeData
    })
  }
  handleChangeDate = (dates, dateString) => {
    // console.log(A,B)
    this.setState({
      rangeData: dates
    })
  }
  render() {
    let { chooseDate, rangeData } = this.state
    const day = (<>
      <Button type={chooseDate === 'day' ? 'link' : 'text'} onClick={this.switchDate('day')}>今日</Button>
      <Button type={chooseDate === 'week' ? 'link' : 'text'} onClick={this.switchDate('week')}>本周</Button>
      <Button type={chooseDate === 'month' ? 'link' : 'text'} onClick={this.switchDate('month')}>本月</Button>
      <Button type={chooseDate === 'year' ? 'link' : 'text'} onClick={this.switchDate('year')}>本年</Button>

      <RangePicker value={rangeData} onChange={this.handleChangeDate} />
    </>
    )
    return (
      <>
        <Card
          style={{ width: '100%' }}
          tabList={tabListNoTitle}
          activeTabKey={this.state.noTitleKey}
          tabBarExtraContent={day}
          onTabChange={key => {
            // this.onTabChange(key, 'noTitleKey');
            this.setState({
              noTitleKey: key
            })
          }}
        >
          {contentListNoTitle[this.state.noTitleKey]}
        </Card>
      </>
    )
  }
}
