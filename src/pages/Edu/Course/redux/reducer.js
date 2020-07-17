import { GET_COURSE_PAGE } from './constant'
import _default from 'antd/lib/time-picker'
const prevState = {
  title: '',
  description: ''
}

export default function courseList(state = prevState, action) {
  switch (action.type) {
    case GET_COURSE_PAGE:
      return {
        ...prevState
      }
    default:
      return prevState
  }

}