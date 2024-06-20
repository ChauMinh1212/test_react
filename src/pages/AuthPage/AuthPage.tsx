import { useEffect, useState } from "react"
import LoginForm from "~/features/Auth/LoginForm"

const Left = () => {
    const [isShow, setShow] = useState(1)

    //hình chạy
    useEffect(() => {
        const interval = setInterval(() => {
            if (isShow < 4) {
                setShow(isShow + 1)
            } else {
                setShow(1)
            }
        }, 3000)

        return () => {
            clearInterval(interval);
        };
    }, [isShow])

    return (
        <div className="left relative">
            <img src="/images/loginPage.png" alt="" />
            <div className="left-change absolute top-[25px] right-[59px]">
                <img src="/images/loginpage1.png" className={`${isShow == 1 ? 'show' : 'hidden'}`} />
                <img src="/images/loginpage2.png" className={`${isShow == 2 ? 'show' : 'hidden'}`} />
                <img src="/images/loginpage3.png" className={`${isShow == 3 ? 'show' : 'hidden'}`} />
                <img src="/images/loginpage4.png" className={`${isShow == 4 ? 'show' : 'hidden'}`} />
            </div>
        </div>
    )
}

const AuthPage = () => {
    
    return (
        <div className="flex">
            <Left></Left>
            {/* <div className="right w-[350px]">
                <form onSubmit={handleLogin} className="w-[268px]">
                    <div className="relative">
                        <input
                        onChange={handleOnChange}  type="text" autoComplete="one-time-code" id="username" className="block rounded-[3px] bg-[#fafafa] border-[1px] text-black py-[9px] px-[7px] focus:border-[#a8a8a8] focus:outline-none w-full h-[38px]" name="abc"
                        />
                        <span className="label-username text-[#848484] text-[12px] absolute top-[9px] left-[8px]">Email</span>
                    </div>
                    <div className="relative mt-[5px]">
                        <input onChange={handleOnChange} autoComplete="one-time-code" type="password" id="password" className="block rounded-[3px] bg-[#fafafa] border-[1px] text-black py-[9px] px-[7px] focus:border-[#a8a8a8] focus:outline-none w-full h-[38px]"/>
                        <span className="label-password text-[#848484] text-[12px] absolute top-[9px] left-[8px]">Mật khẩu</span>
                    </div>
                    <button type="submit" className="mt-[8px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-[5px] rounded w-full">Đăng nhập</button>
                </form>
            </div> */}
            <LoginForm></LoginForm>
        </div>
    )
}

export default AuthPage