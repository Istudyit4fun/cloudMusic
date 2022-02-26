import request from "../utils/request.js"

//登录模块

export const Login = (params) => {
    return request({
        url: "/login/cellphone",
        params
        // phone  password
    })

}

// export const GetState = () => request({
//     url: "/login/status"
// })