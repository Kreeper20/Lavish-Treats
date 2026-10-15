import { Link } from "@tanstack/react-router";

type PastriesBoxesProps = {
    name: string;
    description: string;
    imageUrl: string;
    link?: string;
};

export const PastriesBoxes = ({ name, description, imageUrl, link }: PastriesBoxesProps) => {
    return (
        <div className="bg-white items-center rounded-2xl  border border-border-soft overflow-hidden hover:shadow-md shadow-accent-lavender transition duration-300 delay-50 ease-in-out hover:-translate-y-1">
           <Link to={link || "/shop"} className="block">
            <div className="aspect-4/3.5">
                <img src={imageUrl} alt={name} className="w-full h-full object-fit hover:scale-105 duration-500" />
            </div>
            <div className="p-6 border-t border-border-soft">
                <h1 className="text-2xl font-bold font-serif text-purple-deep ">{name}</h1>
                <p className="text-text-dim font-extralight text-sm md:text-base ">{description}</p>
            </div>
            </Link>
        </div>
        
    )
}