export const PROMOTION_DISCOUNT = 0.05;
export const PROMOTION_DISCOUNT_LARGE = 0.10;
export const PROMOTION_END_DATE = new Date("2026-10-17T23:59:59");

export const getSalePrice = (price: number) =>
    Math.round(price * (1 - PROMOTION_DISCOUNT) * 100) / 100;

export const getSalePriceLarge = (price: number) =>
    Math.round(price * (1 - PROMOTION_DISCOUNT_LARGE) * 100) / 100;

export const getDiscountedTotal = (subtotal: number) => {
    const discount = subtotal > 100 ? 0.10 : 0.05;

    return Math.round(subtotal * (1 - discount) * 100) / 100;
};
export const getPromotionTimeLeft = () => {
    const difference = Math.max(0, PROMOTION_END_DATE.getTime() - Date.now());
    const totalSeconds = Math.floor(difference / 1000);

    return {
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
        isActive: difference > 0,
    };
};