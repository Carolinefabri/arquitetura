import { Heart } from "lucide-react";
import { useTranslation } from "../i18n/i18n";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-10 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 text-center">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {t("footer.disclaimer")}
        </p>
        <p className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
          {t("footer.madeWith")}
          <Heart
            className="h-4 w-4 fill-[#0070F3] text-[#0070F3]"
            aria-hidden
          />
          {t("footer.by")}{" "}
          <span className="font-semibold text-[#0070F3]">Caroline Fabri</span>
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-500">
          © {year} · {t("footer.purpose")}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
