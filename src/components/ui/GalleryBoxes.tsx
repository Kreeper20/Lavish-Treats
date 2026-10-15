
type GalleryBoxesProps = {
    name: string | undefined;
    imageUrl: string | undefined;
};

export const GalleryBoxes = ({ name, imageUrl }: GalleryBoxesProps) => {
    return (
        <>
            <div className="overflow-hidden rounded-2xl">
                <div className=" overflow-hidden group  hover:scale-105 duration-500" >
                    <img src={imageUrl} alt={name} width="400" height="400" loading="lazy" className="object-cover w-full aspect-square group-hover:scale-105 duration-500" />
                    <div className="absolute inset-0 flex items-end justify-center pb-3
                  bg-linear-to-t from-purple-dark/60 via-purple-light/20 to-transparent
                  opacity-0 pointer-events-none
                  group-hover:opacity-100 group-hover:pointer-events-auto
                  transition-opacity duration-300"                    >
                        <span className="text-white text-sm font-serif tracking-widest">
                            {name}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}