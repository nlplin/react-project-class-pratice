import { GET_CHAPTER_LIST, GET_LESSON_LIST, ADD_LESSON_LIST } from './constant'
// import

const initPrevState = {
  total: 0,
  items: []
}
export default function chapterList(prevState = initPrevState, action) {
  // console.log(action)
  switch (action.type) {
    case GET_CHAPTER_LIST:
      action.data.items.forEach(item => {
        item.children = []
      })
      // console.log(action.data)
      // console.log(prevState)
      return action.data

    case GET_LESSON_LIST:
      // console.log(action.data.length)
      if (action.data.length > 0) {
        // console.log(action.data)
        const chapterId = action.data[0].chapterId
        // console.log(111)
        // console.log('chapterId', chapterId)
        // console.log(prevState)
        prevState.items.forEach(chapter => {
          // console.log(chapter._id,'llllllllllllllllllllllllllllllllllll')

          if (chapter._id === chapterId) {
            // console.log(chapter._id,'llllllllllllllllllllllllllllllllllll')
            chapter.children = action.data
          }
        })
      }
      return {
        ...prevState
      }
     case ADD_LESSON_LIST:
       return action.data
    default:
      return prevState
  }
}
// const childrenId = action.data