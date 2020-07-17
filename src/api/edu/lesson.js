import request from "@utils/request";
const BASE_URL = "/admin/edu/lesson";

// 获取课时列表
export function reqGetLessonList(chapterId) {
  return request({
    url: `${BASE_URL}/get/${chapterId}`,
    method: "GET"
  });
}

export function reqDelLesson(lessonId) {
  return request({
    url: `${BASE_URL}/remove/${lessonId}`,
    method: "DELETE"
  });
}

export function reqAddLesson({ chapterId, title, free, video }) {
  return request({
    url: `${BASE_URL}/save`,
    method: "POST",
    data: {
      chapterId, title, free, video
    }
  });
}

export function reqGetToken() {
  return request({
    url: `/uploadtoken`,
    method: 'GET'
  })
}

export function reqDeleteLessonList(idList) {
  return request({
    url: `${BASE_URL}/batchRemove`,
    method: "DELETE",
    data:{
      idList
    }
  });
}