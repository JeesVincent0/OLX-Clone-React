import { useAuth } from '../../hooks/useAuth';
import EmailSignUp from './SubComponents/EmailSignUp';
import GoogleSignUp from './SubComponents/GoogleSignUp';
import LoginFooter from './SubComponents/LoginFooter';
import PhoneButton from './SubComponents/PhoneButton';
import SlideSection from './SubComponents/SlideSection';

import close_icon from '../../assets/icons/close_icon.png';
import LoginForm from './SubComponents/LoginForm';
import SignUpForm from './SubComponents/SignUpForm';

const LogIn = () => {
    const { setLogInPopUp } = useAuth();

    const { isLoggedIn, logInPopUp, emailLogin, setEmailLogin, emailSignUp } = useAuth();

    const changeStates = () => {
        setLogInPopUp(false);
        setEmailLogin(false);
    }

    if (logInPopUp && !isLoggedIn) {
        return (
            <>
                <div className="fixed top-0 h-screen w-screen bg-black/70 flex justify-center items-center z-51">
                    <div className="relative h-[82vh] w-[26vw] bg-white rounded-sm">
                        <img onClick={changeStates} className='absolute top-3 right-3 w-9 cursor-pointer' src={close_icon} alt="" />

                        {
                            !emailLogin && !emailSignUp ? (
                                <div>
                                    <SlideSection />
                                    <PhoneButton />
                                    <GoogleSignUp />
                                    <EmailSignUp />
                                    <LoginFooter />
                                </div>
                            ) : (
                                <></>
                            )


                        }

                        {
                            emailSignUp ? (<SignUpForm />) : (<></>)
                        }

                        {
                            emailLogin ? (<LoginForm />) : (<></>)
                        }
                    </div>
                </div>
            </>
        )

    }
}

export default LogIn
