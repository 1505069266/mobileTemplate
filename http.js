import axios from "axios";

import { Message } from "element-ui";
import router from "../router";

//设置axios的请求超时时间
axios.defaults.timeout = 10000;
//请求头设置
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";



//设置请求拦截器
axios.interceptors.request.use(config => {
  const token = "lele_token";
  token && (config.headers.Authorization = `berar ${token}`)
  return config
}, error => {
  return Promise.resolve(error)
})


//设置响应拦截器
axios.interceptors.response.use(response => {
    return Promise.resolve(response)
}, error => {
  if(error.response.status){
    switch(error.response.status){
      case 401:
        console.log("401啦");
        return;
      case 403:
        console.log("403啦");
        return;
      case 404:
        Message({
          type:"error",
          message: "接口404, 未请求到资源!"
        })
        return;
      default:
        Message({
          type:"error",
          message: `服务器${error.response.status}错误!`
        })
    }
    return Promise.resolve(error)
  }
})



export function get(url, params){
  return new Promise((resolve,reject) => {
    axios.get(url, {
      params
    }).then(res=>{
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
}


export function post(url, params){
  return new Promise((resolve,reject) => {
    axios.post(url, Qs.stringify(params))
    .then(res=>{
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
}

export function fetch(url, params, method = "get"){
  method = method.toUpperCase()
  if( method === "POST" || method === "PUT" || method === "DELETE"){
    return new Promise((resolve,reject) => {
      axios({
        url,
        data: params,
        method
      }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
    })
  }else{
    return new Promise((resolve,reject) => {
      axios({
        url,
        params,
        method
      }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
    })
  }
}
