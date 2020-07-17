import React, { useState, useEffect } from "react";
import { Form, Input, Select, Cascader, Button } from "antd";
import { reqGetAllTeacherList } from '@api/edu/teacher'
import { reqGetAllFirstClass, reqGetSecClass } from '@api/edu/subject'
import { reqGetCourseList } from '@api/edu/course.js'
import "./index.less";

const { Option } = Select;

function SearchForm() {
  const [form] = Form.useForm();
  const [teacherList, setTeacherList] = useState([])
  const [subjectList, setSubjectList] = useState([])
  useEffect(() => {
    async function fetchData() {
      const [teacherList, subjectList] = await Promise.all([
        reqGetAllTeacherList(setTeacherList),

        reqGetAllFirstClass(setSubjectList)
      ])
      let arr = subjectList.map(item => ({ label: item.title, value: item._id, isLeaf: false }))
      setTeacherList(teacherList)
      setSubjectList(arr)
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
  const targetOption = subjectList.map(subject => {
    // console.log(subjectList)
    // console.log(subject)
    return {
      value: subject._id,
      label: subject.title,
      isLeaf: false
    }
  })

  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);


  };

  const loadData = async selectedOptions => {

    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    const result = await reqGetSecClass(targetOption.value)
    // console.log(targetOption)
    // console.log(result)
    const { items } = result
    targetOption.loading = false;
    if (items.length) {
      targetOption.children = items.map(item => {
        // console.log(targetOption)
        // console.log(item)
        // console.log(item.title)
        // console.log(item._id)

        return {
          label: item.title,
          value: item._id
        }
      })
    } else {
      targetOption.isLeaf = true
    }
    console.log(targetOption.children)
    setSubjectList([...subjectList])
    // load options lazily
    setTimeout(() => {

      targetOption.loading = false;
      targetOption.children = [
        // {
        //   label: 'aa',
        //   value: "dynamic1"
        // },
      ];
      // setOptions([...options]);
    }, 1000);
  };

  const resetForm = () => {
    form.resetFields();
  };

  const onFinish = async values => {
    console.log(values)
    if(values.title && values.teacherId && values.subject){
      const res = await reqGetCourseList()
      console.log(res)
    }else{
      alert('请输入课程标题，讲师，及分类')
    }
    // console.log(values.title)
    // console.log(values.teacherId)
    // console.log(values.subject)
  
  
  }

  return (
    <Form layout="inline" onFinish={onFinish} form={form}>
      <Form.Item name="title" label="标题">
        <Input placeholder="课程标题" style={{ width: 250, marginRight: 20 }} />
      </Form.Item>
      <Form.Item name="teacherId" label="讲师">
        <Select
          allowClear
          placeholder="课程讲师"
          style={{ width: 250, marginRight: 20 }}
        >
          {teacherList.map(teacher => {
            // console.log(teacher)
            return (<Option key={teacher._id} value={teacher._id}>{teacher.name}</Option>)
          })}
        </Select>
      </Form.Item>
      <Form.Item name="subject" label="分类">
        <Cascader
          style={{ width: 250, marginRight: 20 }}
          options={subjectList}
          loadData={loadData}
          onChange={onChange}
          changeOnSelect
          placeholder="课程分类"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
        >
          查询
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  );
}

export default SearchForm;
