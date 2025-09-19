// import icons
import { useState } from 'react';
import left_arrow from '../../../assets/icons/left_arrow.png';
import olx_icon from '../../../assets/icons/olx.jpeg';
import { signUp } from '../../../firebase';
import { useAuth } from '../../../hooks/useAuth';

const SignUpForm = () => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [matchPassword, setMatchPassword] = useState(true);
    const { setEmailSignUP } = useAuth();

    const createAccount = async () => {
        if (newPassword !== confirmPassword) {
            setMatchPassword(false);
            console.log("This function is trigged")
        } else {
            console.log("This else case is working")
            setMatchPassword(true);
            await signUp(name, email, confirmPassword);
        }
    }


    return (
        <div>
            <img onClick={() => setEmailSignUP(false)} className='absolute w-7 m-4 cursor-pointer' src={left_arrow} alt="" />
            <div className='flex justify-center'>
                <img className='w-30 mt-20 absolute' src={olx_icon} alt="" />
                <form className='absolute h-[400px] w-full px-10 mt-20 pt-30 flex flex-col gap-5 ' action="">
                    <input onChange={(e) => setName(e.target.value)} className='h-12 w-full border-1 rounded-sm border-gray-400 px-3 focus:border-3 focus:outline-none focus:border-blue-800' type="text" placeholder='Full Name' />
                    <input onChange={(e) => setEmail(e.target.value)} className='h-12 w-full border-1 rounded-sm border-gray-400 px-3 focus:border-3 focus:outline-none focus:border-blue-800' type="email" placeholder='Email' />
                    <input onChange={(e) => setNewPassword(e.target.value)} className='h-12 w-full border-1 rounded-sm border-gray-400 px-3 focus:border-3 focus:outline-none focus:border-blue-800' type="password" placeholder='New Password' />
                    <input onChange={(e) => setConfirmPassword(e.target.value)} className={`h-12 w-full border-1 rounded-sm ${matchPassword ? `border-gray-400` : `border-red-400`}  px-3 focus:border-3 focus:outline-none focus:border-blue-800`} type="password" placeholder='Confirm Password' />
                    <button onClick={createAccount} className='h-13 text-center text-white hover:text-blue-900 font-bold bg-blue-900 hover:border-4 hover:border-blue-900 hover:bg-white rounded-sm' type='button'>SignUP</button>
                </form>
                <div className='h-30 w-full absolute bottom-0 p-8'>
                    <div className='relative h-full w-full bg-red-100 p-3 text-center rounded-md'>
                        <p className='text-red-500'><span className='font-bold'>Warning:</span><span>Google auth not available now</span></p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SignUpForm
