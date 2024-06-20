import { ChangeEvent, useEffect } from "react"
import { UseFormRegister } from "react-hook-form"

type InputProps = {
    label: string
    register: UseFormRegister<any>
    required: boolean
    validate?: any
    name: string
    type: string
}

const InputAuth = ({ label, register, required, validate, name, type }: InputProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            console.log('da click');
            
            const input = document.querySelectorAll('input')
            input.forEach(item => console.log(item.value));
            
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const label = document.querySelector(`.label-${e.target.id}`)
        const input = document.querySelector(`#${e.target.id}`)
        if (e.target.value != '') {
            label?.classList.add('text-[10px]', '!top-[1px]')
            input?.classList.add('text-[13px]', 'pb-[1px]')

        } else {
            label?.classList.remove('text-[10px]', '!top-[1px]')
            input?.classList.remove('text-[13px]', 'pb-[1px]')
        }
        return
    }
    return (
        <div className="relative w-full">
            <span className={`label-${name} text-[#848484] text-[12px] absolute top-[9px] left-[8px]`}>{label}</span>
            <input id={name} {...register(name, { required, ...validate })} type={type} className="block rounded-[3px] bg-[#fafafa] border-[1px] text-black py-[9px] px-[7px] focus:border-[#a8a8a8] focus:outline-none w-full h-[38px]" onChange={handleOnChange} />
        </div>
    )
}

export default InputAuth