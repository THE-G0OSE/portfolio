import { Variants } from "motion";

export const TextBlickVariants: Variants = {
    start: { left: -40, right: 'unset', skewX: 10 },
    end: { right: -80, left: 'unset', skewX: 40, transition: { duration: .5, delay: 3, ease: "easeIn"}}
}