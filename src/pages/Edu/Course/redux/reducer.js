import { GET_COURSE_PAGE } from './constant'
// import _default from 'antd/lib/time-picker'
const initCourseList = {
  total: 0,
  items: []
}

export default function courseList(prevState = initCourseList, action) {
  switch (action.type) {
    case GET_COURSE_PAGE:
      return action.data
    default:
      return prevState
  }

}