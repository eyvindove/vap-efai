import axios, { AxiosInstance } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://yuri-w.net',
})

axiosInstance.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    return Promise.reject(err)
  }
)

const axiosInstanceWithToken: AxiosInstance = axios.create({
  baseURL: 'http://yuri-w.net',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('_admin-playground_token')}`,
  },
})

axiosInstanceWithToken.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    return Promise.reject(err)
  }
)

interface LoginFormData {
  account: string
  password: string
}

export const PostLogin = ({ account, password }: LoginFormData) => {
  return axiosInstance({
    method: 'post',
    url: '/api/v1/user/login',
    params: {
      account,
      password,
    },
  })
}

export const GetUser = () => {
  return axiosInstanceWithToken({
    method: 'get',
    url: '/api/v1/user',
  })
}

interface OneUser {
  account: string
}

export const GetOneUser = ({ account }: OneUser) => {
  return axiosInstanceWithToken({
    method: 'get',
    url: `/api/v1/user/${account}`,
  })
}

interface User {
  account?: string
  password?: string
  passwordConfirmation?: string
  name?: string
}

export const PostUser = ({
  account,
  password,
  passwordConfirmation,
  name,
}: User) => {
  return axiosInstanceWithToken({
    method: 'post',
    url: '/api/v1/user',
    params: {
      account,
      password,
      password_confirmation: passwordConfirmation,
      name,
    },
  })
}

export const PutUser = ({ password, passwordConfirmation, name }: User) => {
  return axiosInstanceWithToken({
    method: 'put',
    url: '/api/v1/user',
    params: {
      password,
      password_confirmation: passwordConfirmation,
      name,
    },
  })
}

export const DeleteUser = ({ account }: User) => {
  return axiosInstanceWithToken({
    method: 'delete',
    url: '/api/v1/user',
    params: {
      account,
    },
  })
}
