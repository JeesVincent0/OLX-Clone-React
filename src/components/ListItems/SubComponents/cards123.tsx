import favorit_icon from '../../../assets/icons/favorite_icon.png';

const Cards = () => {

    const amount = 7000;
    const title = 'this is sample title'

    return (
        <div className="relative mt-1 grid grid-cols-4 gap-4 ">

            {
                [...Array(17)].map(() => (
                    <div className=" relative h-65 cursor-pointer border-1 border-gray-500 rounded-sm">
                        <div className="h-[60%] bg-amber-200 m-2">
                            <img src="" alt="" />
                            <div className="absolute h-8 w-8 bg-white right-3 top-3 rounded-4xl z-5 flex items-center justify-center">
                                 <img className='w-5' src={favorit_icon} alt="" />
                            </div>
                        </div>

                        <div className='m-2'>
                            <p className='font-bold text-2xl'>₹ {amount}</p>
                            <p>{title}</p>
                            <p>sample date</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Cards