import { reqGetCoursePage } from '@api/edu/course.js'

import { GET_COURSE_PAGE } from './constant'

function getCousePageSync(data) {
  return { type: GET_COURSE_PAGE, data }
}

export function getCoursePageSync({ page, limit, teacherId, subjectId, subjectParentId, title }) {
  return dispatch => {
    return reqGetCoursePage({ page, limit, teacherId, subjectId, subjectParentId, title }).then(res => {
      dispatch(getCousePageSync(res))
      return res
    })
  }
}