import { reqGetCoursePage } from '@api/edu/course.js'

import { GET_COURSE_PAGE } from './constant'

function getCousePageSync(data) {
  return { type: GET_COURSE_PAGE, data }
}

export function getCoursePage(data) {
  return dispatch => {
    return reqGetCoursePage(data).then(res => {
      dispatch(getCousePageSync(res))
      return res
    })
  }
}