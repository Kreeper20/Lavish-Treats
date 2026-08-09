import { Ose } from "../utils/imports"

export const About = () => {
  return (
    <>
      <section className=" overflow-hidden py-12 md:py-28 items-center px-6">
        <div className="grid grid-cols-1 md:mt-0 sm:mt-8 lg:grid-cols-2 max-w-7xl mx-auto items-center">
          <section>
            <h1 className="font-light uppercase text-purple-bright tracking-widest">
              About Lavish Treats
            </h1>
            <h2 className="font-serif text-purple-deep text-4xl font-semibold lg:text-6xl mt-2">
              It All Started With One Birthday Cake
            </h2>
            <p className="text-text-dim font-extralight mt-4">
              Long before Lavish Treats became a bakery, baking had always been a passion.
              But everything changed after becoming a mum.
              Like many parents, I wanted my baby's birthday to feel unforgettable. I wanted a cake that
              wasn't just beautiful to look at but one that reflected the love behind the celebration.
            </p>
            <p className="text-text-dim font-extralight mt-4">
              Although I had been baking for years, that special moment inspired me to take my skills
              even further. I dedicated time to mastering the art of cake decorating, learning new
              techniques, refining every detail and creating bespoke cakes that looked every bit as
              beautiful as they tasted.
            </p>
          </section>
          <aside className="flex justify-self-center lg:justify-self-end items-center">
            <img
              src={Ose}
              alt="Lavish Treats"
              className=" mt-8 rounded-4xl shadow-accent-lavender shadow-xl"
            />
          </aside>
        </div>
        <div className="mx-auto max-w-5xl text-center mt-12 md:mt-18">
          <h1 className="font-serif italic text text-xl md:text-3xl mb-4">
            "If I can create beautiful cakes for my own family, why not <br className="hidden md:block" /> create them for other families too?"
          </h1>
          <h2 className="font-cursive text-gold text-xl md:text-2xl font-semibold ">
            That thought became Lavish Treats.
          </h2>
          <p className="text-text-dim font-extralight mt-4">
            Today, our bakery creates handcrafted celebration cakes, freshly baked pastries, cupcakes,
            dessert boxes, meat pies and small chops for families, businesses and celebrations across
            Kettering.
            Every order is made with care, every recipe is prepared with quality ingredients and every
            customer is welcomed like family.
            To us, baking has never been just about food. It's about helping people celebrate the
            moments they'll remember forever.
          </p>
        </div>
      </section>
      <section className="bg-purple-deep py-12  px-6">
            <div className="mx-auto max-w-7xl text-center">
              <h1 className="tracking-widest uppercase text-gold font-light">
                Our values
              </h1>
              <h2 className="font-serif text-purple-soft text-4xl lg:text-5xl mb-3 font-semibold">
                What Guides Everything We Bake
              </h2>

            </div>
      </section>

    </>
  )
}