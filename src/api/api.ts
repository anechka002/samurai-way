import type { UsersType } from "@/redux/users-reducer"
import type { ProfileType } from '@/types';
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
    return instance.get<baseResponseUsers>(`users?page=${currentPage}&count=${pageSize}`).then((res) => res.data)
  },
}

export const followAPI = {
  follow(id: number) {
    return instance.post<baseResponse<{}>>(`follow/${id}`).then((res) => res.data)
  },
  unfollow(id: number) {
    return instance.delete<baseResponse<{}>>(`follow/${id}`).then((res) => res.data)
  },
}

export const authAPI = {
  me(){
    return instance.get<baseResponse<AuthType>>(`auth/me`).then((res) => res.data)
  }
}

export const profileAPI = {
  getUserProfile(numericUserId: number) {
    return instance.get<ProfileType>(`profile/${numericUserId}`).then((res) => res.data)
  }
}


type baseResponseUsers = {
  items: UsersType[]
  totalCount: number
  error: null | string
}

type AuthType = {
  id: number
  email: string
  login: string
}

export type baseResponse<T> = {
  data: T
  message: string[]
  fieldsErrors: string[]
  resultCode: number
}
