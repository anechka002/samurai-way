import { useAppDispatch, useAppSelector } from "@/hooks"
import { savePhotoTC } from "@/redux/profile-reducer"
import { useRef, type ChangeEvent } from "react"
import addPhoto from '../../../../assets/add_person.png'
import userPhoto from "../../../../assets/images/user.png"
import styles from './AddPhoto.module.css'

export const AddPhoto = () => {
  const inRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  const photo = useAppSelector(state => state.profilePage.profile?.photos.large)

  const onClickUploadHandler = () => {
    inRef && inRef.current?.click()
  }

  const onMainPhotoSelectedHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      dispatch(savePhotoTC(e.target.files[0]))
    }
  }

  return (
    <div className={styles.photoContainer}>
      <img
        className={styles.photo}
        src={photo !== null ? photo: userPhoto} 
        alt="avatar" 
      />
      <div className={styles.photoOverlay}>
        <img onClick={onClickUploadHandler} src={addPhoto} alt="Add" style={{ width: '80px', height: '80px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      </div>
      <input ref={inRef} type={"file"} onChange={onMainPhotoSelectedHandler} accept={"image/*"} style={{ display: "none" }} />
    </div>
  )
}
