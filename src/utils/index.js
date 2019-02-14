import { Modal, Toast } from "antd-mobile";

// 返回一个action，这个action接收param, cb, ecb
export const createAjaxAction = (api, startAction, endAction) => (
  param,
  cb,
  ecb
) => dispatch => {
  dispatch(startAction());
  param = isArray(param) ? param : [param];
  api(...param)
    .then(checkStatus)
    .then(response => response.json())
    .then(res => {
      dispatch(endAction({ req: param, res }));
      return Promise.resolve(res);
    })
    .then(res => {
      if (res.success === true || res.status === 1) {
        cb && cb(res);
      } else {
        const errorMessage = res.errorMessage;
        if (errorMessage.length > 50 && errorMessage.substr(0, 1) === "[") {
          Modal.alert("错误", errorMessage, [
            { text: "Ok", onPress: () => console.log("ok") }
          ]);
        } else {
          Toast.fail(errorMessage || "操作失败，请联系管理员", 1);
        }
        ecb && ecb(res);
      }
    })
    .catch(catchError);
};

export function checkStatus(response) {
  const status = response.status;
  if ((status >= 200 && status < 300) || status === 400 || status === 500) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function catchError(error) {
  const { response } = error;
  if (!response) {
    console.log(error);
    return;
  }
  if (response.status === 401) {
    Toast.fail("请重新登录！", 1);
    // 线上环境，刷新页面以重定向到登录页面
    // process.env.NODE_ENV === 'production' && location.reload()
  } else if (response.status === 403) {
    Toast.fail("抱歉，你没有操作的权限", 1);
  } else if (response.status === 504) {
    Toast.fail("服务器繁忙, 请求超时", 1);
  } else if (response.status) {
    Toast.fail(`${response.status}:请联系管理员`, 1);
  }
}
