import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Tag,
  X,
  XCircle,
} from "lucide-react";
import type { ServiceInfo } from "../data/serviceCatalog";

type ServiceDetailPanelProps = {
  service: ServiceInfo | null;
  onClose: () => void;
};

export function ServiceDetailPanel({
  service,
  onClose,
}: ServiceDetailPanelProps) {
  return (
    <AnimatePresence>
      {service && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.aside
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label={`${service.name} details`}
            className="fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col overflow-y-auto bg-white shadow-2xl dark:bg-slate-900"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-200 bg-white/95 px-6 py-5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
              <div>
                <p className="text-xs font-semibold tracking-widest text-[#0070F3] uppercase">
                  Service detail
                </p>
                <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-slate-100">
                  {service.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close panel"
                className="rounded-full p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0070F3] dark:hover:bg-slate-800 dark:hover:text-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="flex flex-1 flex-col gap-6 px-6 py-6">
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {service.description}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0070F3]/10 px-3 py-1 text-xs font-semibold text-[#0070F3]">
                  <Tag className="h-3.5 w-3.5" />
                  {service.pricingTier}
                </span>
                <a
                  href={service.docsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 transition-colors hover:border-[#0070F3] hover:text-[#0070F3] dark:border-slate-700 dark:text-slate-300"
                >
                  Documentation
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>

              <Section
                title="When to use"
                icon={
                  <CheckCircle2 className="h-4 w-4 text-[#00B386]" />
                }
                items={service.whenToUse}
                itemIconColor="text-[#00B386]"
              />

              <Section
                title="When NOT to use"
                icon={<XCircle className="h-4 w-4 text-rose-500" />}
                items={service.whenNotToUse}
                itemIconColor="text-rose-500"
              />

              <div className="rounded-xl border border-[#0070F3]/20 bg-[#0070F3]/5 p-5 dark:border-[#0070F3]/30 dark:bg-[#0070F3]/10">
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#0070F3]" />
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Why this choice
                  </h4>
                </div>
                <ul className="space-y-2">
                  {service.whyThisChoice.map((reason, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"
                    >
                      <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#0070F3]" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

type SectionProps = {
  title: string;
  icon: React.ReactNode;
  items: string[];
  itemIconColor: string;
};

function Section({ title, icon, items, itemIconColor }: SectionProps) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        {icon}
        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h4>
      </div>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
          >
            <span
              className={`mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-current ${itemIconColor}`}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ServiceDetailPanel;
