import { useEffect, useState, type ChangeEvent } from "react"
import s from "./ProfileInfo.module.css"
import { useAppDispatch } from "@/hooks"
import { updateStatusTC } from "@/redux/profile-reducer"

type Props = {
  status: string
}

export const ProfileStatus = ({ status }: Props) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState(status)

  useEffect(() => {
    setTitle(status)
  }, [status])

  const dispatch = useAppDispatch()

  const activateEditModeHandler = () => {
    setEditMode(true)
  }
  const deactivateEditModeHandler = () => {
    if(title !== status) {
      dispatch(updateStatusTC(title))
    }
    setEditMode(false)
  }
  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return (  
    <div className={s.status}>
      {!editMode ? (
        <div>
          <h3 className={s.statusTitle}>Status:<span className={s.statusText} onDoubleClick={activateEditModeHandler}>{status || "No status"}</span></h3>
          
        </div>
      ) : (
        <div>
          <input onChange={onChangeStatusHandler} autoFocus onBlur={deactivateEditModeHandler} value={title} />
        </div>
      )}
    </div>
  )
}
