import { useAuth } from "../../../hooks/useAuth";

const EmailSignUp = () => {

  const {setEmailLogin} = useAuth();
  return (
    <div className="h-20 w-full bg-white flex justify-center">
      <div className="relative h-[80%] w-[33%] bg-white text-center">
        <p className="font-semibold">OR</p>
        <p
          onClick={() => setEmailLogin(true)}
          className="font-semibold underline underline-offset-5 cursor-pointer"
        >
          Login with Email
        </p>
      </div>
    </div>
  );
};

export default EmailSignUp;
