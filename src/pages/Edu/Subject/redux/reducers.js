import { GET_SUBJECT_LIST, GET_SECSUBJECT_LIST, GET_UPDATESECSUBJECT_LIST } from "./constants";

const initSubjectList = {
  total: 0, // 总数
  items: [], // 详细user数据
};

export default function subjectList(prevState = initSubjectList, action) {
  switch (action.type) {
    case GET_SUBJECT_LIST:
      action.data.items.forEach(item => {
        item.children = []
      })
      return action.data;


    case GET_SECSUBJECT_LIST:
      console.log(111)
      if (action.data.items.length > 0) {
        const parentId = action.data.items[0].parentId
        prevState.items.forEach(item => {
          if (item._id === parentId) {
            item.children = action.data.items
          }
        })
      }
        return {
          ...prevState
        };

    case GET_UPDATESECSUBJECT_LIST:
        prevState.items.forEach(subject=>{
          if(subject._id === action.data.id){
            subject.title = action.data.title
            return
          }
          subject.children.forEach(secSubject => {
            if(secSubject._id === action.data.id){
              secSubject.title = action.data.title
            }
          })
        })
        return {
          ...prevState
        }

    default:
      return prevState;
  }
}
