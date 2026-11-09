// ProductDescription.tsx
// One place that knows how every kind of description looks.
// Products just provide data; they never contain JSX.

export type DescriptionBlock =
    | { type: "p"; text: string }
    | { type: "heading"; text: string }
    | { type: "list"; items: string[] }
    | { type: "note"; label?: string; text: string };

// A plain string still works for simple products.
export type Description = string | DescriptionBlock[];

const renderBlock = (block: DescriptionBlock, i: number) => {
    switch (block.type) {
        case "p":
            return <p key={i}>{block.text}</p>;

        case "heading":
            return (
                <h2 key={i} className="pt-3 font-serif text-2xl font-semibold text-purple-deep">
                    {block.text}
                </h2>
            );

        case "list":
            return (
                <ul key={i} className="list-disc space-y-2 pl-5 marker:text-purple-primary">
                    {block.items.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            );

        case "note":
            return (
                <p key={i} className="pt-2 text-sm">
                    {block.label && (
                        <strong className="text-purple-deep">{block.label} </strong>
                    )}
                    {block.text}
                </p>
            );
    }
};

export const ProductDescription = ({ description }: { description?: Description }) => {
    if (!description) return null;

    if (typeof description === "string") {
        return (
            <p className="mt-7 whitespace-pre-line text-base leading-7 text-text-body">
                {description}
            </p>
        );
    }

    return (
        <div className="mt-7 space-y-4 text-base leading-7 text-text-body">
            {description.map(renderBlock)}
        </div>
    );
};