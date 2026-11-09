import type { Description, DescriptionBlock } from "./productDescription"; // adjust path to where ProductDescription.tsx lives

// Paste your existing cakeIncludes items here (or import your existing array instead)
const cakeIncludes: string[] = ["6-inch, two-layer celebration cake.",
    "Beautifully smooth American buttercream finish.",
    "Delicate piped buttercream borders.",
    "Gold Happy Birthday cake topper.",
    "Only in vanilla flavour.",
    "White or peach colour buttercream.",
    "Carefully boxed and presented, ready for your celebration.",];

export const descriptionSummary = (description?: Description): string => {
    if (!description) return "";
    if (typeof description === "string") return description;
    const first = description.find(
        (b): b is Extract<DescriptionBlock, { type: "p" }> => b.type === "p"
    );
    return first ? first.text : "";
};
// ---- tiny builders so ShopData stays short ----
export const p = (text: string): DescriptionBlock => ({ type: "p", text });
export const heading = (text: string): DescriptionBlock => ({ type: "heading", text });
export const list = (items: string[]): DescriptionBlock => ({ type: "list", items });
export const note = (text: string, label?: string): DescriptionBlock => ({ type: "note", text, label });
export const minOrder = (n: number): DescriptionBlock => note(String(n), "Minimum order:");

// "A box containing:" + bullet list
export const containing = (intro: string, items: string[]): Description => [p(intro), list(items)];

// ---- long / one-off descriptions ----
export const lavishClassicDescription: Description = [
    p("Introducing The Lavish Classic, a beautifully finished 6-inch celebration cake from our Lavish Treats Signature Collection."),
    p("Designed for those who love something elegant without all the extras, this cake features smooth buttercream finishing, delicate piped details and a touch of gold for a timeless celebration look."),
    heading("Cake includes"),
    list(cakeIncludes),
    note("This is a signature design with a set style. For a bespoke design, please enquire about a custom cake.", "Please note:"),
];

export const lavishCustomCakeDescription: Description = [
    p("Make your celebration extra special with a beautifully handcrafted cake, designed around your chosen theme, style and occasion."),
    p("Choose your preferred cake size and flavours, and let us bring your vision to life with a cake that is as beautiful as it is delicious."),
    note("A 70% deposit is required to secure your booking, with the remaining balance due before collection or delivery.", "Please note:"),
    p(" Every cake is made to order, with love and attention to detail.",),
];