import request from "@utils/request";
const BASE_URL = "/admin/edu/course";

// 获取课程
export function reqGetCourseList() {
  return request({
    url: `${BASE_URL}`,
    method: "GET",
  });
}

export function reqGetCoursePage({ page, limit, teacherId, subjectId, subjectParentId, title }) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
    params:{
      page, limit, teacherId, subjectId, subjectParentId, title
    }
  });
}

// 发布课程
// 新增课程
// 更新课程
// 获取课程分页列表