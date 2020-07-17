
import { GET_CHAPTER_LIST, GET_LESSON_LIST, ADD_LESSON_LIST, DELETE_CHAPTER, DELETE_LESSON } from './constant'
import { reqGetChapterList, reqDeleteChapterList } from '@api/edu/chapter'
import { reqGetLessonList, reqAddLesson, reqDeleteLessonList } from '@api/edu/lesson'

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

function deleteChapterSync(data) {
  console.log(data)
  return { type: DELETE_CHAPTER, data }
}

export function delChapter(chapterIds) {
  return dispatch => {
    return reqDeleteChapterList(chapterIds).then(res => {
      dispatch(deleteChapterSync(chapterIds))
      return res
    })
  }
}

function deleteLessonSync(data) {
  return { type: DELETE_LESSON, data }
}

export function delLesson(lessonIds) {
  return dispatch => {
    return reqDeleteLessonList(lessonIds).then(res => {
      dispatch(deleteLessonSync(lessonIds))
      return res
    })
  }
}