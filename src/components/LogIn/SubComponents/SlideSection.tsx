//Import icons
import love_icon from '../../../assets/icons/love_login.png';
import guitar_icon from '../../../assets/icons/guitar_login.png';
import avatar_icon from '../../../assets/icons/avatar_login.png';
import angle_icon from '../../../assets/icons/angle_icon.png';

// import hooks
import { useState } from 'react';

const SlideSection = () => {

    const images = [guitar_icon, avatar_icon, love_icon];
    const imgData = [
        'Help us become one of the safest places to buy and sell',
        'Keep all your favorites in one place',
        'Close deals from the comfort of your home',
    ]

    const [imageIndex, setImageIndex] = useState(0);

    const forwardImg = () => {
        setImageIndex((imageIndex + 1) % images.length);
    }

    const backwardImg = () => {
        setImageIndex((imageIndex - 1 + images.length) % images.length);
    }

    return (
        <div className='h-67'>
            <div className='h-[250px] w-full flex'>

                {/* left side image back button */}
                <div onClick={backwardImg} className='w-[10%] mt-6 cursor-pointer flex items-center'>
                    <img className='h-5 ml-6 opacity-50 rotate-315' src={angle_icon} alt="" />
                </div>

                {/* image container */}
                <div className='w-[80%] mt-6'>
                    <div className={`h-[65%]`}>
                        <img className='object-contain h-full w-full' src={images[imageIndex]} alt="" />
                    </div>
                    <div className='flex justify-center items-center text-center px-3 font-semibold'>
                        <p>{imgData[imageIndex]}</p>
                    </div>
                </div>

                {/* Right side image forward button */}
                <div onClick={forwardImg} className='w-[10%] mt-6 cursor-pointer flex items-center'>
                    <img className='relative h-5 right-1 opacity-50 rotate-135' src={angle_icon} alt="" />
                </div>

            </div>

            {/* Carousel indicators  */}
            <div className='h-2 w-full flex justify-center'>
                <ul className='flex gap-4'>
                    {
                        [...Array(3)].map((_, index) => (
                            <li onClick={() => setImageIndex(index)} className={`h-2 w-2  rounded-3xl cursor-pointer ${imageIndex === index ? `bg-blue-600` : `bg-gray-300`}`}></li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default SlideSection
