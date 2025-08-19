import { useAppDispatch, useAppSelector } from "@/hooks"
import { savePhotoTC } from "@/redux/profile-reducer"
import { useRef, type ChangeEvent } from "react"
import addPhoto from '../../../../assets/add_person.png'
import styles from './AddPhoto.module.css'

export const AddPhoto = () => {
  const inRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  const photo = useAppSelector(state => state.profilePage.profile?.photos.large)
  console.log(photo)

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
      <div className={styles.photoOverlay} onClick={onClickUploadHandler}>
        <img className={styles.uploadIcon} src={addPhoto} alt="Add" />
      </div>
      <input ref={inRef} type={"file"} onChange={onMainPhotoSelectedHandler} accept={"image/*"} style={{ display: "none" }} />
    </div>
  )
}
