import request from "@utils/request";
const BASE_URL = "/admin/edu/chapter";

// 获取章节列表
export function reqGetChapterList({ page, limit, courseId }) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
    params: {
      courseId
    }
  });
}

export function reqDeleteChapterList(idList) {
  return request({
    url: `${BASE_URL}/batchRemove`,
    method: "DELETE",
    data:{
      idList
    }
  });
}
// 快速复制黏贴