import google_icon from '../../../assets/icons/google_icon.png'
import { useAuth } from '../../../hooks/useAuth';

const GmailSingUp = () => {

  const {setEmailSignUP} = useAuth();
  return (
    <div className="h-15 w-full bg-white flex justify-center">
      <div onClick={() => setEmailSignUP(true)} className="h-[60%] w-[90%] mt-1 bg-white hover:bg-gray-200 border-1 border-gray-300 rounded-sm flex justify-between">
        <p className='ml-5 mt-1'>Countinue with google</p>
        <img className='mr-2' src={google_icon} alt="" />
      </div>
    </div>
  )
}

export default GmailSingUp
