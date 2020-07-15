import request from "@utils/request";
const BASE_URL = "/admin/edu/course";

// 获取课程
export function reqGetCourseList() {
  return request({
    url: `${BASE_URL}`,
    method: "GET",
  });
}
// 发布课程
// 新增课程
// 更新课程
// 获取课程分页列表