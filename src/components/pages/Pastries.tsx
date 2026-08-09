import { Link } from "@tanstack/react-router"

export const Pastries = () => {
  return (
    <section className="overflow-hidden py-12 md:py-28 items-center">
      <div className="grid grid-cols-1 sm:mt-8 lg:grid-cols-2 px-6  max-w-7xl mx-auto items-center">
        <section>
          <h1 className="font-light uppercase text-purple-bright tracking-widest">
            Pastries
          </h1>
          <h2 className="font-serif text-purple-deep text-4xl lg:text-6xl mb-3 font-semibold">
            Freshly Baked Pastries
          </h2>
          <p className=" text-text-body font-light text-lg lg:text-xl mb-4">
            Whether you're looking for an everyday indulgence, a thoughtful gift, or treats for an event, our
            handcrafted pastries are baked fresh using quality ingredients and plenty of love. From flaky pastries
            to delicious sweet bakes, every bite is made to delight.
          </p>

          <p className=" text-text-body font-extralight italic text-base mb-4">
            Our pastry selection changes regularly based on availability and seasonal specials.
          </p>
          <div className="flex mt-6">
            <Link to="/enquiryForm" className="bg-purple-primary text-white px-6 py-3 rounded-full hover:bg-purple-dark transition delay-100 duration-300 ease-in-out hover:-translate-y-1">
              ENQUIRE ABOUT PASTRIES
            </Link>
          </div>
        </section>
        <aside className="flex justify-self-center lg:justify-self-end items-center">
          <img src="" alt="Lavish Treats" className=" mt-8  rounded-full shadow-accent-lavender shadow-xl " />
        </aside>
      </div>
    </section>
  )
}