type CakeBoxesProps = {
    name: string;
    description1: string;
    description2: string;
    description3: string | undefined;
    price1: string;
    price2: string;
    price3: string | undefined;
    image: string;
};
export const CakeBoxes = ({ name, description1, description2, description3, price1, price2, price3, image }: CakeBoxesProps) => {
    return (
        <div className="relative">
            <img src={image} alt={name} width="400" height="400" className="w-full h-80 object-cover rounded-2xl" />
            <div className="bg-white shadow-xl rounded-xl p-6 -mt-16 mx-6 relative z-10">
                <h3 className="text-xl font-bold tracking-wide mb-3 uppercase text-left">{name}</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex justify-between"><span>{description1}</span><span className="font-semibold text-purple-deep">{price1}</span></li>
                    <li className="flex justify-between"><span>{description2}</span><span className="font-semibold text-purple-deep">{price2}</span></li>
                    <li className="flex justify-between"><span>{description3}</span><span className="font-semibold text-purple-deep">{price3}</span></li>                    
                </ul>
            </div>
        </div>
    )
}