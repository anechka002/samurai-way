import type { ResultCode } from "@/enum";
import type { UsersType } from "@/redux/users-reducer"
import type { Inputs, ProfileType } from '@/types';
import axios from "axios"

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "7189f0b8-50c2-4b55-95ec-a70a8a3db4a5",
  },
})

export const usersAPI = {
  getUsers(currentPage: number, pageSize: number) {
    return instance.get<BaseResponseUsers>(`users?page=${currentPage}&count=${pageSize}`).then((res) => res.data)
  },
}

export const followAPI = {
  follow(id: number) {
    return instance.post<BaseResponse<{}>>(`follow/${id}`).then((res) => res.data)
  },
  unfollow(id: number) {
    return instance.delete<BaseResponse<{}>>(`follow/${id}`).then((res) => res.data)
  },
}

export const authAPI = {
  me(){
    return instance.get<BaseResponse<AuthType>>(`auth/me`).then((res) => res.data)
  },
  login(payload: Inputs) {
    return instance.post<BaseResponse<Login>>(`/auth/login`, { ...payload })
  }, 
  logout() {
    return instance.delete<BaseResponse<{}>>(`/auth/login`)
  }
}

export const profileAPI = {
  getUserProfile(numericUserId: number) {
    return instance.get<ProfileType>(`profile/${numericUserId}`).then((res) => res.data)
  },
  getStatus(userId: number) {
    return instance.get<string>(`profile/status/${userId}`).then((res) => res.data)
  },
  updateStatus(status: string) {
    return instance.put<BaseResponse<{}>>(`profile/status`, { status }).then((res) => res.data)
  }
}


type BaseResponseUsers = {
  items: UsersType[]
  totalCount: number
  error: null | string
}

type AuthType = {
  id: number
  email: string
  login: string
}

export type BaseResponse<T> = {
  data: T
  messages: string[]
  fieldsErrors: string[]
  resultCode: ResultCode
}

type Login = {
  userId: number
  token: string
}
