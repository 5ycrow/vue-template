import axios from 'axios'

// axios 配置
const instance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 50000,
  baseURL: process.env.BASE_URL
})

// 添加请求拦截器
instance.interceptors.request.use(config => {
  // 在发送请求之前做些什么，比如传token
  // const token = localStorage.getItem('token')
  // token && (config.headers.Authorization = token)
  return config
}, error => {
  // 对请求错误做些什么
  console.log(error)
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(response => {
  // removeRepeatUrl(response.config);        // 执行取消操作，把已经完成的请求从pending中移除
  // 对响应数据做点什么
  const res = response.data
  // 服务器异常
  if (res.code === 500) {
    this.$message.error(res.msg)
  }
  // 错误
  if (res.code === 100) {
    this.$message.error(res.msg)
  }
  // 对错误代码做处理
  return response
}, error => {
  // 对响应错误做点什么
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '请求错误（400）'
        this.$message.error(error.message)
        break
      case 401:
        error.message = '未授权，请重新登录(401)'
        this.$message.error(error.message)
        break
      case 403:
        error.message = '拒绝访问(403)'
        this.$message.error(error.message)
        break
      case 404:
        error.message = '请求出错(404)'
        this.$message.error(error.message)
        break
      case 408:
        error.message = '请求超时(408)'
        this.$message.error(error.message)
        break
      case 500:
        error.message = '服务器错误(500)'
        this.$message.error(error.message)
        break
      case 501:
        error.message = '服务未实现(501)'
        this.$message.error(error.message)
        break
      case 502:
        error.message = '网络错误(502)'
        this.$message.error(error.message)
        break
      case 503:
        error.message = '服务不可用(503)'
        this.$message.error(error.message)
        break
      case 504:
        error.message = '网络超时(504)'
        this.$message.error(error.message)
        break
      case 505:
        error.message = 'HTTP版本不受支持(505)'
        this.$message.error(error.message)
        break
      default:
        error.message = `连接出错(${error.response.status})!`
        this.$message.error(error.message)
    }
  } else {
    error.message = '连接服务器失败！'
    this.$message.error(error.message)
  }
  return Promise.reject(error)
})

export default instance

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    instance.post(url, data).then(response => {
      // 对接口错误码做处理
      resolve(response.data)
    }, err => {
      reject(err)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * get 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get (url, data = {}) {
  return new Promise((resolve, reject) => {
    instance.get(url, {
      params: data
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}
