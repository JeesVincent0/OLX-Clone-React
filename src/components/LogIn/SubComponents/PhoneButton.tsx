import mobile_icon from '../../../assets/icons/mobile_icon.png'

const PhoneButton = () => {
    return (
        <>
            <div className="relative h-15 w-full bg-white flex justify-center items-center">
                <div className="group h-[80%] w-[90%] gap-2 cursor-pointer bg-white border-lg border-blue-900 border-2 hover:border-4 hover:border-gray-300 rounded-sm flex items-center">
                    <img className='ml-2 w-8' src={mobile_icon} alt="" />
                    <p className="text-blue-800 font-bold group-hover:hidden">Continue with phone</p>
                    <p className='text-gray-500 font-bold hidden group-hover:block'>At this time phone not available</p>
                </div>
            </div>
        </>
    )
}

export default PhoneButton
