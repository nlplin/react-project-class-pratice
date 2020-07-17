import request from "@utils/request";

const BASE_URL = "/admin/edu/subject";

// 获取讲师
export function reqGetSubject(page, limit) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
  });
}
export function reqGetSecSubject(parentId) {
  return request({
    url: `${BASE_URL}/get/${parentId}`,
    method: "GET",
  });
}

export function reqSaveSubject(title, parentId) {
  return request({
    url: `${BASE_URL}/save`,
    method: "POST",
    data: {
      title,
      parentId
    }
  });
}
// http://47.103.203.152/admin/edu/subject/save
// /admin/edu/subject/get/:parentId
export function reqUpdateSubject(id, title) {
  return request({
    // /admin/edu/subject/update
    url: `${BASE_URL}/update`,
    method: "PUT",
    data: {
      id,
      title
    }
  });
}

export function reqDelSubject(id){
  return request({
    // /admin/edu/subject/update
    url: `${BASE_URL}/remove/${id}`,
    method: "DELETE",
  });
}
// /admin/edu/subject
export function reqGetAllFirstClass(){
  return request({
    // /admin/edu/subject/update
    url: `${BASE_URL}`,
    method: "GET",
  });
}
export function reqGetSecClass(parentId){
  return request({ 
    url:`${BASE_URL}/get/${parentId}`,
    method: "GET"
  })
}