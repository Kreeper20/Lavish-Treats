import { Link } from "@tanstack/react-router"
import { pastryData } from "../data/PastryData"

export const Gallery = () => {
    return (
        <>
            <section className="bg-lilac-50 py-12 md:py-28">
                <div className="text-center items-center px-4 mx-auto">
                    <h1 className=" text-purple-bright font-light mb-3 uppercase tracking-widest">Gallery</h1>
                    <h2 className="font-serif text-purple-deep text-4xl lg:text-6xl mb-3 font-semibold">
                        Every Creation Is Made With Love
                    </h2>
                    <p className=" text-text-body font-extralight text-lg">
                        Browse a collection of some of our favourite cakes, pastries, and desserts created for <br className='hidden md:block' /> birthdays, weddings, baby showers, anniversaries, and special occasions.
                    </p>
                </div>
            </section>

            <section aria-labelledby="gallery-heading" className="px-4 md:px-8 ">
                <h2 id="gallery-heading" className="sr-only">Image Gallery</h2>
                <div className="max-w-7xl mx-auto">
                    <div className="columns-2 md:columns-3 lg:columns-4 space-y-4 gap-4">
                        {pastryData.map((image) => (
                            <div
                                key={image.name}
                                className="bg-gray-100 rounded-lg overflow-hidden break-inside-avoid"
                            >
                                <img
                                    src={image.image}
                                    alt={image.name}
                                    loading="lazy"
                                    className="h-auto max-w-full object-cover object-top hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <Link to="/enquiryForm" className="bg-purple-primary uppercase text-white px-6 py-3 rounded-full hover:bg-purple-dark transition delay-100 duration-300 ease-in-out hover:-translate-y-1 w-max mx-auto mt-6 block mb-6">
                    Order something like this
                 </Link>
            </section>


        </>
    )
}