// import icons
import { useState } from 'react';
import left_arrow from '../../../assets/icons/left_arrow.png';
import olx_icon from '../../../assets/icons/olx.jpeg'
import { signIn } from '../../../firebase';
import { useAuth } from '../../../hooks/useAuth';

const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setNewPassword] = useState("");

    const {setEmailLogin} = useAuth();


    return (
        <div>
            <img onClick={() => setEmailLogin(false)} className='absolute w-7 m-4 cursor-pointer' src={left_arrow} alt="" />
            <div className='flex justify-center'>
                <img className='w-30 mt-20 absolute' src={olx_icon} alt="" />
                <form className='absolute h-[400px] w-full px-10 mt-20 pt-30 flex flex-col gap-5 ' action="">
                    <input onChange={(e) => setEmail(e.target.value)} className='h-12 w-full border-1 rounded-sm border-gray-400 px-3 focus:border-3 focus:outline-none focus:border-blue-800' type="email" placeholder='Email' />
                    <input onChange={(e) => setNewPassword(e.target.value)} className='h-12 w-full border-1 rounded-sm border-gray-400 px-3 focus:border-3 focus:outline-none focus:border-blue-800' type="password" placeholder='Password' />
                    <button onClick={async () => await signIn(email, password)} className='h-13 text-center text-white hover:text-blue-900 font-bold bg-blue-900 hover:border-4 hover:border-blue-900 hover:bg-white rounded-sm' type='button'>LogIn</button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm
