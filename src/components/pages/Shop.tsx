import { ShopBoxes } from "../ui/ShopBoxes"
import { ShopData } from "../data/ShopData"
import { Link } from "@tanstack/react-router"
import { motion } from "framer-motion"

export const Shop = () => {
  const motionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  const categories = [
    "Christmas Menu",
    "Celebration Cakes",
    "Cupcakes & Cake Treats",
    "Pastries & Small Chops",
    "Treat Boxes & Gifts",
    "Drinks",
  ];

  const categoryId = (category: string) => category.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <main className="bg-lilac-50">
      <section className="relative overflow-hidden border-b border-line bg-lilac-100 px-4 py-16 md:px-8 lg:py-24">
        <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full border-36 border-white/50" />
        <motion.div
          initial="hidden" animate="visible" variants={motionVariants}
          className="relative mx-auto max-w-7xl"
        >
          <div className="max-w-3xl">
            <p             className="text-purple-bright font-light mb-3 uppercase tracking-widest">The Lavish Treats shop</p>
            <motion.h1 variants={motionVariants} className="font-serif text-5xl font-semibold leading-none text-purple-deep md:text-7xl">
              A little something for every celebration.
            </motion.h1>
            <p className="mt-6 max-w-2xl font-light text-base leading-7 text-text-body md:text-lg">
              Browse handcrafted cakes, bakes, pastries and gift boxes. Add what you would like to your basket and we will confirm collection or delivery with you directly.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3 text-sm font-medium text-purple-deep">
            <span className="border border-purple-light bg-white/70 px-4 py-2">Made to order</span>
            <span className="border border-purple-light bg-white/70 px-4 py-2">Collection in Kettering</span>
            <span className="border border-purple-light bg-white/70 px-4 py-2">Seasonal favourites</span>
          </div>
        </motion.div>
      </section>

      <div className="sticky top-0 z-20 border-b border-line bg-lilac-50/95 px-4 py-3 backdrop-blur-md md:px-8">
        <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto pb-1" aria-label="Shop categories">
          {categories.map((category) => (
            <a key={category} href={`#${categoryId(category)}`} className="shrink-0 border border-border-soft bg-white px-4 py-2 font-sans text-xs font-semibold text-text-body transition hover:border-purple-primary hover:text-purple-primary">
              {category}
            </a>
          ))}
        </nav>
      </div>

      <section className="px-4 py-14 md:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl space-y-20">
          {categories.map((category) => {
            const items = ShopData.filter((item) => item.category === category);
            if (!items.length) return null;

            return (
              <section key={category} id={categoryId(category)} className="scroll-mt-24">
                <div className="mb-7 flex items-end justify-between gap-4 border-b border-border-soft pb-4">
                  <div>
                    <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-purple-bright">{String(items.length).padStart(2, '0')} items</p>
                    <h2 className="font-serif text-4xl font-semibold text-purple-deep md:text-5xl">{category}</h2>
                  </div>
                  <span className="hidden pb-1 text-sm text-text-muted md:block">Explore the collection</span>
                </div>
                <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
                  {items.map((item) => (
                    <ShopBoxes
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      description={item.description}
                      imageUrl={item.image}
                      price={item.price ? Array.isArray(item.price) ? item.price[0] : item.price : 0}
                      product={item}
                      link={item.link}
                    />
                  ))}
                </div>
              </section>
            );
          })}

          <div className="grid items-center gap-8 border border-purple-light bg-lilac-panel p-7 md:p-12 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-purple-bright">Made just for you</p>
              <h2 className="font-serif text-4xl font-semibold text-purple-deep md:text-5xl">Have something special in mind?</h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-text-body md:text-base">
                Tell us about your theme, flavours and occasion. We love bringing thoughtful custom cakes and dessert tables to life.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link to="/custom-order" className="bg-purple-primary px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-purple-dark">Start an enquiry</Link>
              <Link to="/cakes" className="border border-purple-primary px-6 py-3 text-center text-sm font-semibold text-purple-primary transition hover:bg-purple-primary hover:text-white">Explore our bakery</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

