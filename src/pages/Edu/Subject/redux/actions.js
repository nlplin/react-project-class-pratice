import { reqGetSubject, reqGetSecSubject, reqUpdateSubject } from "@api/edu/subject";

import { GET_SUBJECT_LIST, GET_SECSUBJECT_LIST, GET_UPDATESECSUBJECT_LIST } from "./constants";

const getSubjectListSync = list => ({
  type: GET_SUBJECT_LIST,
  data: list,
});

export const getSubjectList = (page, limit) => {
  return dispatch => {
    return reqGetSubject(page, limit).then((response) => {
      dispatch(getSubjectListSync(response));
      return response
    });
  };
};

// 二级菜单
const getSecSubjectListSync = list => ({
  type: GET_SECSUBJECT_LIST,
  data: list,
});

export const getSecSubjectList = (parentId) => {
  return dispatch => {
    return reqGetSecSubject(parentId).then((response) => {
      dispatch(getSecSubjectListSync(response));
      return response
    });
  };
};

const updateSubjectListSync = data => ({
  type: GET_UPDATESECSUBJECT_LIST,
  // data: list,
  data

});

export const updateSubjectList = (id, title) => {
  return dispatch => {
    return reqUpdateSubject(id, title).then((response) => {
      console.log('resssssssssssssssssssssss',response);
      dispatch(updateSubjectListSync({id, title}))
      return response
    });
  };
};