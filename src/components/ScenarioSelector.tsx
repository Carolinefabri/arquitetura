import { motion } from "framer-motion";
import {
  Database,
  Plug,
  Smartphone,
  BarChart3,
  Building2,
  Bot,
  Radio,
  CloudUpload,
  type LucideIcon,
} from "lucide-react";

export type Scenario = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const scenarios: Scenario[] = [
  {
    id: "s4hana-extension",
    title: "S/4HANA Extension",
    description:
      "Extend SAP S/4HANA with side-by-side apps without modifying the digital core.",
    icon: Database,
  },
  {
    id: "third-party-integration",
    title: "Third-party Integration",
    description:
      "Connect SAP and non-SAP systems through secure APIs and managed integrations.",
    icon: Plug,
  },
  {
    id: "mobile-app",
    title: "Mobile App",
    description:
      "Deliver responsive mobile experiences backed by BTP services and SAP data.",
    icon: Smartphone,
  },
  {
    id: "analytics-data",
    title: "Analytics & Data",
    description:
      "Unify enterprise data and surface insights with SAP Datasphere and SAC.",
    icon: BarChart3,
  },
  {
    id: "multitenant-saas",
    title: "Multitenant SaaS",
    description:
      "Build scalable, multitenant SaaS solutions on the SAP BTP foundation.",
    icon: Building2,
  },
  {
    id: "ai-automation",
    title: "AI Automation",
    description:
      "Embed Joule, generative AI, and intelligent automation into business flows.",
    icon: Bot,
  },
  {
    id: "event-driven",
    title: "Event-Driven Architecture",
    description:
      "Stream business events across systems with SAP Event Mesh and Advanced Event Mesh.",
    icon: Radio,
  },
  {
    id: "cloud-migration",
    title: "Cloud Migration",
    description:
      "Move workloads to the cloud with a clear path to clean core on SAP BTP.",
    icon: CloudUpload,
  },
];

type ScenarioSelectorProps = {
  onSelect?: (scenario: Scenario) => void;
  selectedId?: string;
};

export function ScenarioSelector({
  onSelect,
  selectedId,
}: ScenarioSelectorProps) {
  return (
    <section className="w-full px-4 py-10 sm:px-6 sm:py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 text-center sm:mb-10">
          <p className="text-xs font-semibold tracking-widest text-[#0070F3] uppercase sm:text-sm">
            Scenarios
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl md:text-4xl dark:text-slate-100">
            Choose your scenario
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base md:text-lg dark:text-slate-400">
            Pick the use case that best matches your project to generate a
            tailored reference architecture.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {scenarios.map((scenario, index) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              index={index}
              isSelected={selectedId === scenario.id}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type ScenarioCardProps = {
  scenario: Scenario;
  index: number;
  isSelected: boolean;
  onSelect?: (scenario: Scenario) => void;
};

function ScenarioCard({
  scenario,
  index,
  isSelected,
  onSelect,
}: ScenarioCardProps) {
  const Icon = scenario.icon;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect?.(scenario)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative flex h-full flex-col items-start gap-4 rounded-2xl border bg-white p-5 text-left shadow-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0070F3] focus-visible:ring-offset-2 sm:p-6 dark:bg-slate-900 dark:focus-visible:ring-offset-slate-950 ${
        isSelected
          ? "border-[#0070F3] ring-2 ring-[#0070F3]/30"
          : "border-slate-200 hover:border-[#0070F3]/40 hover:shadow-xl dark:border-slate-800 dark:hover:border-[#0070F3]/60"
      }`}
    >
      <motion.span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-[#0070F3] to-[#00B386] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        initial={false}
      />

      <motion.div
        className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0070F3]/10 text-[#0070F3] transition-colors duration-200 group-hover:bg-[#00B386]/10 group-hover:text-[#00B386]"
        whileHover={{ rotate: -6, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      >
        <Icon className="h-6 w-6" strokeWidth={2} />
      </motion.div>

      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {scenario.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {scenario.description}
        </p>
      </div>

      <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-[#0070F3] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Select scenario
        <motion.span
          aria-hidden
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
          className="inline-block"
        >
          →
        </motion.span>
      </span>
    </motion.button>
  );
}

export default ScenarioSelector;
