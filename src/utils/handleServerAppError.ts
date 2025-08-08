import type { Dispatch } from "@reduxjs/toolkit"
import { setErrorAC } from "@/redux/app-reducer"
import type { BaseResponse } from "@/api/api"

export const handleServerAppError = <T>(dispatch: Dispatch, data: BaseResponse<T>) => {
  if (data.messages.length) {
    dispatch(setErrorAC({ error: data.messages[0] }))
  } else {
    dispatch(setErrorAC({ error: "Some error occurred" }))
  }
}
