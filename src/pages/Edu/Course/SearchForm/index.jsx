import React, { useState, useEffect } from "react";
import { Form, Input, Select, Cascader, Button } from "antd";
import { reqGetAllTeacherList } from '@api/edu/teacher'
import { reqGetAllFirstClass, reqGetSecClass } from '@api/edu/subject'
// import { reqGetCourseList } from '@api/edu/course.js'
import { connect } from 'react-redux'
import { getCoursePage } from '../redux'
import { FormattedMessage, useIntl } from 'react-intl'

import "./index.less";

const { Option } = Select;

function SearchForm(props) {
  const intl = useIntl()
  const [form] = Form.useForm();
  const [teacherList, setTeacherList] = useState([])
  const [subjectList, setSubjectList] = useState([])
  useEffect(() => {
    async function fetchData() {
      const [teacherList, subjectList] = await Promise.all([
        reqGetAllTeacherList(),

        reqGetAllFirstClass()
      ])
      // let arr = subjectList.map(item => ({ label: item.title, value: item._id, isLeaf: false }))

      const targetOption = subjectList.map(subject => {
        // console.log(subjectList)
        // console.log(subject)
        return {
          value: subject._id,
          label: subject.title,
          isLeaf: false
        }
      })
      setTeacherList(teacherList)
      setSubjectList(targetOption)
    }
    return () => {
      fetchData()
    }

    fetchData()
  }, [])
  //#region 
  // const [options, setOptions] = useState([
  //   {
  //     value: "zhejiang",
  //     label: "Zhejiang",
  //     isLeaf: false
  //   },
  //   {
  //     value: "jiangsu",
  //     label: "Jiangsu",
  //     isLeaf: false
  //   }
  // ]);
  //#endregion

  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  const loadData = async selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    let result = await reqGetSecClass(targetOption.value)
    console.log(result)
    result = result.items.map(item => {
      return {
        value: item._id,
        label: item.title,
      }
    })
    targetOption.loading = false;
    if (result.length) {
      targetOption.children = result

    } else {
      targetOption.isLeaf = true
    }
    setSubjectList([...subjectList])
    //#region 
    // const targetOption = selectedOptions[selectedOptions.length - 1];
    // targetOption.loading = true;
    // const result = await reqGetSecClass(targetOption.value)
    // // console.log(targetOption)
    // // console.log(result)
    // const { items } = result
    // targetOption.loading = false;
    // if (items.length) {
    //   targetOption.children = items.map(item => {
    //     // console.log(targetOption)
    //     // console.log(item)
    //     // console.log(item.title)
    //     // console.log(item._id)

    //     return {
    //       label: item.title,
    //       value: item._id
    //     }
    //   })
    // } else {
    //   targetOption.isLeaf = true
    // }
    // console.log(targetOption.children)
    // setSubjectList([...subjectList])
    // // load options lazily
    // setTimeout(() => {

    //   targetOption.loading = false;
    //   targetOption.children = [
    //     // {
    //     //   label: 'aa',
    //     //   value: "dynamic1"
    //     // },
    //   ];
    //   // setOptions([...options]);
    // }, 1000);
    //#endregion
  };
  const resetForm = () => {
    form.resetFields();
  };

  const onFinish = async values => {
    console.log(values)
    // console.log(this.props)x
    // if (values.title && values.teacherId && values.subject) {
    // const res = await reqGetCourseList()
    // console.log(res)
    let subjectId
    let subjectParentId
    if (values.subject && values.subject.length > 1) {
      subjectParentId = values.subject[0]
      subjectId = values.subject[1]
    }
    if (values.subject && values.subject.length === 1) {
      subjectParentId = 0
      subjectId = values.subject[0]
    }

    const data = {
      page: 1,
      limit: 5,
      title: values.title,
      teacherId: values.teacherId,
      subjectId,
      subjectParentId
    }
    const resu = await props.getCoursePage(data)
    console.log(resu);
    console.log(data.title)
    console.log(data.teacherId)
    console.log(data.subjectId)
    console.log(data.subjectParentId)

    // } else {
    // alert('请输入课程标题，讲师，及分类')
    // }
  }

  return (
    <Form layout="inline" onFinish={onFinish} form={form}>
      <Form.Item name="title" label={<FormattedMessage id="title" />}>
        <Input placeholder={
          intl.formatMessage({
            id: 'title'
          })
        } style={{ width: 250, marginRight: 20 }} />
      </Form.Item>
      <Form.Item name="teacherId" label={<FormattedMessage id="teacher" />}>
        <Select
          allowClear
          placeholder={
            intl.formatMessage({
              id: 'teacher'
            })
          }
          style={{ width: 250, marginRight: 20 }}
        >
          {teacherList.map(teacher => {
            // console.log(teacher)
            return (<Option key={teacher._id} value={teacher._id}>{teacher.name}</Option>)
          })}
        </Select>
      </Form.Item>
      <Form.Item name="subject" label={<FormattedMessage id="subject" />}>
        <Cascader
          style={{ width: 250, marginRight: 20 }}
          options={subjectList}
          loadData={loadData}
          onChange={onChange}
          changeOnSelect
          placeholder={
            intl.formatMessage({
              id: 'subject'
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
        >
          {<FormattedMessage id="searchBtn" />}
        </Button>
        <Button onClick={resetForm}>{<FormattedMessage id="resetBtn" />}</Button>
      </Form.Item>
    </Form>
  );
}
export default connect(null,
  { getCoursePage }
)(SearchForm);
