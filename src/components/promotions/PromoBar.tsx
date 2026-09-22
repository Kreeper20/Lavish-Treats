import { useEffect, useState } from "react";
import { IconClock } from "@tabler/icons-react";
import { getPromotionTimeLeft } from "./promotion";

const pad = (value: number) => String(value).padStart(2, "0");

export const PromoBar = () => {
    const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getPromotionTimeLeft> | null>(null);

    useEffect(() => {
        setTimeLeft(getPromotionTimeLeft());
        const timer = window.setInterval(() => setTimeLeft(getPromotionTimeLeft()), 1000);
        return () => window.clearInterval(timer);
    }, []);

    if (!timeLeft?.isActive) return null;

    return (
        <aside className="bg-gold-panel px-4 py-2.5 text-center text-purple-deep" aria-label="Current promotion">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm">
                <span className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-wide">
                    <IconClock className="h-4 w-4" aria-hidden="true" />
                    5% off orders below £100, 10% off orders over £100
                </span>
                <span className="text-xs text-text-body">
                    Ends in {timeLeft.days}d {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
                </span>
            </div>
        </aside>
    );
};