import { formatCurrency } from "../utils/formatCurrency";

type DiscountedPriceProps = {
    price: number;
    className?: string;
    total: number;
};



export const DiscountedPrice = ({ price, total, className = "" }: DiscountedPriceProps) => {
    return (
        <span className={`inline-flex flex-wrap items-baseline gap-x-2 gap-y-0.5 ${className}`}>
            <span className="text-xs font-normal text-text-muted line-through">
                {formatCurrency(total)}
            </span>
            <span className="font-semibold text-purple-bright">
                {formatCurrency(price)}
            </span>
        </span>
    );
};