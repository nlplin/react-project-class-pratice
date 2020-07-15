
import { GET_CHAPTER_LIST, GET_LESSON_LIST, ADD_LESSON_LIST } from './constant'
import { reqGetChapterList } from '@api/edu/chapter'
import { reqGetLessonList, reqAddLesson } from '@api/edu/lesson'

function getChapterListSync(data) {
  return { type: GET_CHAPTER_LIST, data }
}

export function getChapterList({ page, limit, courseId }) {
  return dispatch => {
    return reqGetChapterList({ page, limit, courseId }).then(res => {
      dispatch(getChapterListSync(res))
      // console.log(res)
      return res
    })
  }
}

function getLessonSync(data) {
  return { type: GET_LESSON_LIST, data }
}
 
export function getLessonList(chapterId) {
  return dispatch => {
    return reqGetLessonList(chapterId).then(res => {
      dispatch(getLessonSync(res))
      // console.log(res)
      return res
    })
  }
}

function addLessonListSync(data) {
  return { type: ADD_LESSON_LIST, data }
}

export function addLesonList() {
  return dispatch => {
    return reqAddLesson().then(res => {
      dispatch(addLessonListSync(res))
      // console.log(res)
      return res
    })
  }
}