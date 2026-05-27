import { motion } from "framer-motion";
import { useTranslation } from "../i18n/i18n";

export function LanguageToggle() {
  const { locale, setLocale, t } = useTranslation();
  const next = locale === "en" ? "pt-BR" : "en";

  return (
    <motion.button
      type="button"
      onClick={() => setLocale(next)}
      aria-label={t("lang.toggle")}
      title={t("lang.toggle")}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/30 bg-white/10 text-white shadow-sm backdrop-blur transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      <motion.span
        key={locale}
        initial={{ rotateY: -90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="inline-flex h-6 w-8 items-center justify-center overflow-hidden rounded-sm shadow-sm ring-1 ring-black/10"
      >
        {locale === "en" ? <FlagBR /> : <FlagGB />}
      </motion.span>
    </motion.button>
  );
}

function FlagBR() {
  return (
    <svg
      viewBox="0 0 28 20"
      width="32"
      height="24"
      aria-hidden
      className="block"
    >
      <rect width="28" height="20" fill="#009c3b" />
      <polygon points="14,2 26,10 14,18 2,10" fill="#ffdf00" />
      <circle cx="14" cy="10" r="4" fill="#002776" />
      <path
        d="M10.4 10.4 Q14 8.5 17.6 10.4"
        stroke="#ffffff"
        strokeWidth="0.6"
        fill="none"
      />
    </svg>
  );
}

function FlagGB() {
  return (
    <svg
      viewBox="0 0 60 30"
      width="32"
      height="24"
      aria-hidden
      className="block"
    >
      <clipPath id="gb-clip">
        <rect width="60" height="30" />
      </clipPath>
      <g clipPath="url(#gb-clip)">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#ffffff" strokeWidth="6" />
        <path
          d="M0,0 L60,30 M60,0 L0,30"
          stroke="#C8102E"
          strokeWidth="4"
          clipPath="url(#gb-clip)"
        />
        <path d="M30,0 V30 M0,15 H60" stroke="#ffffff" strokeWidth="10" />
        <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

export default LanguageToggle;
