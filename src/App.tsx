import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScenarioSelector, type Scenario } from "./components/ScenarioSelector";
import {
  ArchitectureDiagram,
  type ScenarioId,
} from "./components/ArchitectureDiagram";
import { ServiceDetailPanel } from "./components/ServiceDetailPanel";
import { ExportButton } from "./components/ExportButton";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { serviceCatalog, type ServiceInfo } from "./data/serviceCatalog";
import { architectures } from "./data/architectures";
import { useTranslation } from "./i18n/i18n";

function App() {
  const [selected, setSelected] = useState<Scenario | null>(null);
  const [activeService, setActiveService] = useState<ServiceInfo | null>(null);
  const { t } = useTranslation();

  const architecture = selected
    ? architectures[selected.id as ScenarioId]
    : null;

  return (
    <main className="min-h-full bg-slate-50 dark:bg-slate-950">
      <Hero />

      <ScenarioSelector
        selectedId={selected?.id}
        onSelect={(scenario) => setSelected(scenario)}
      />

      <AnimatePresence mode="wait">
        {selected && architecture && (
          <motion.section
            key={selected.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-slate-900 sm:text-xl dark:text-slate-100">
                {selected.title} — {t("app.referenceArch")}
              </h3>
              <ExportButton architecture={architecture} />
            </div>

            <div>
              <ArchitectureDiagram
                scenarioId={selected.id as ScenarioId}
                onNodeClick={(nodeId) => {
                  const service = serviceCatalog[nodeId];
                  if (service) setActiveService(service);
                }}
              />
            </div>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              {t("app.nodeTip")}
            </p>

            {architecture.rationale.length > 0 && (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h4 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {t("app.rationaleTitle")}
                </h4>
                <ul className="space-y-2">
                  {architecture.rationale.map((reason, idx) => {
                    const key = `rationale.${architecture.id}.${idx}`;
                    const translated = t(key);
                    const text = translated === key ? reason : translated;
                    return (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
                      >
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#0070F3]" />
                        <span>{text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      <ServiceDetailPanel
        service={activeService}
        onClose={() => setActiveService(null)}
      />

      <Footer />
    </main>
  );
}

export default App;
