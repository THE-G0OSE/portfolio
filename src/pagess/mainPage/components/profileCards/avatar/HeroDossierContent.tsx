import { IProfile } from "@/entities/portfolio";
import { Caption } from "@/shared/comic";
import { motion, Variants } from "motion/react";

interface IProps {
  profile: IProfile;
  // fullscreen card and phone sheet animate items with their own states
  itemVariants: Variants;
}

// story, facts and contact block of the hero
export const HeroDossierContent: React.FC<IProps> = ({ profile, itemVariants }) => {
  const { bio, location, languages, currently, hobbies, email } = profile;

  const facts = [
    { label: "BASED IN", value: location, className: "ht-yellow" },
    { label: "SPEAKS", value: languages || "[Languages]", className: "bg-white" },
    { label: "CURRENTLY", value: currently || "[Role / open to work]", className: "bg-white" },
    { label: "OFF-DUTY", value: hobbies || "[Hobbies]", className: "ht-yellow" },
  ];

  return (
    <>
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-2 bg-white shadow-[5px_5px_0_var(--color-ink)] p-4 border-4 border-ink"
      >
        <Caption className="self-start">Our story begins…</Caption>
        <p className="font-bold text-[17px] leading-snug">
          {bio || "[2–3 sentences: who you are, what kind of products you love building, and what you're looking for right now.]"}
        </p>
      </motion.div>

      <div className="gap-3 grid grid-cols-2">
        {facts.map(({ label, value, className }) => (
          <motion.div
            key={label}
            variants={itemVariants}
            className={`shadow-[4px_4px_0_var(--color-ink)] px-3.5 py-2.5 border-4 border-ink ${className}`}
          >
            <p className="font-bangers text-base">{label}</p>
            <p className="font-bold text-[17px] leading-tight">{value}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={itemVariants}
        className="flex flex-wrap justify-between items-center gap-4 shadow-[5px_5px_0_var(--color-ink)] mt-auto px-5 py-4 border-4 border-ink ht-red"
      >
        <p className="font-bangers text-[34px] text-white leading-none [-webkit-text-stroke:1.2px_var(--color-ink)] [text-shadow:3px_3px_0_var(--color-ink)]">
          GOT A MISSION?
        </p>
        {email ? (
          <a
            href={`mailto:${email}`}
            onClick={(e) => e.stopPropagation()}
            className="bg-comic-yellow shadow-[4px_4px_0_var(--color-ink)] hover:shadow-[2px_2px_0_var(--color-ink)] px-4 py-2 border-3 border-ink font-bangers text-ink text-[22px] no-underline transition-transform hover:translate-0.5"
          >
            SEND A SIGNAL ►
          </a>
        ) : (
          <Caption white>[EMAIL]</Caption>
        )}
      </motion.div>
    </>
  );
};
