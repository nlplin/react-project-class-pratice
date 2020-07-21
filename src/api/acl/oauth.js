import request from "@utils/request";

const BASE_URL = "/oauth";

// 获取菜单权限数据
export function reqGetMessageCode(mobile) {
  return request({
    url: `${BASE_URL}/sign_in/digits`,
    method: "POST",
    data: {
      mobile
    }
  });
}

export function reqConfirmMobileLogin( mobile, code ) {
  return request({
    url: `${BASE_URL}/mobile`,
    method: "POST",
    data: {
      mobile,
      code
    }
  });
}