import s from "./AddMessageForm.module.css"
import { useForm, type SubmitHandler } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"

export interface IForm {
  text: string
}

type Props = {
  onSubmit: (data: IForm) => void
}

export const AddMessageForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IForm>({ defaultValues: { text: "" } })

  const handleFormSubmit: SubmitHandler<IForm> = (data) => {
    // console.log(data)
    onSubmit(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={s.messageInput}>
        <textarea
          placeholder="Enter your message"
          {...register("text", {
            required: "This is required.",
            minLength: { value: 2, message: "Minimum length is 2." },
          })}
        ></textarea>
        <button type="submit">send</button>
      </div>
      <ErrorMessage errors={errors} name="text" render={({ message }) => <p className={s.errorMessage}>{message}</p>} />
    </form>
  )
}
