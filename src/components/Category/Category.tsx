import angle_icon from '../../assets/icons/angle_icon.png';
import { catStyle } from './CategoryStyle';

const Category = () => {

    const categories = [
        "Cars",
        "Motorcycles",
        'Mobile Phones',
        "For Sale: Houses & Apartment",
        "Scooters",
        "Commercial & Other Vehicle",
        "For Rent: Houses & Apartment"
    ];

    return (
        <div className="pt-18 w-full relative">
            <div className="relative h-10 shadow-sm flex justify-between items-center pl-30 pr-40">
                <div className='relative flex gap-1.5 cursor-pointer'>
                    <p className="font-semibold text-md">ALL CATEGORIES</p>
                    <img className='w-5 h-5 rotate-225' src={angle_icon} alt="" />
                </div>
                <div className='flex justify-between gap-3.5'>
                    {categories.map((cat) => (<button className={catStyle.catButton}>{cat}</button>))}
                </div>
            </div>
        </div>
    )
}

export default Category
