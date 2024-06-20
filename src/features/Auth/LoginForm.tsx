import { useForm } from "react-hook-form"
import InputAuth from "~/components/Input/InputAuth"

const LoginForm = () => {
    const { register, handleSubmit } = useForm()
    return (
        <form onSubmit={handleSubmit((data) => {
            console.log(data);
        })}>
            <InputAuth label="Email" name="username" type="text" required register={register}></InputAuth>
            <div className="mt-[5px]"></div>
            <InputAuth label="Password" name="password" type="password" required register={register}></InputAuth>
            <button type="submit" className="mt-[8px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-[5px] rounded w-full">Đăng nhập</button>
        </form>
    )
}

export default LoginForm