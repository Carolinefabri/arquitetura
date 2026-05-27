import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "en" | "pt-BR";

type Dict = Record<string, string>;

const en: Dict = {
  "brand.tag": "SAP BTP Architecture Tool",
  "hero.title": "SAP BTP Architecture Decision Tool",
  "hero.subtitle":
    "Choose your scenario, explore a reference architecture, and export a professional proposal — all grounded in SAP Business Technology Platform best practices.",

  "selector.eyebrow": "Scenarios",
  "selector.title": "Choose your scenario",
  "selector.subtitle":
    "Pick the use case that best matches your project to generate a tailored reference architecture.",
  "selector.cta": "Select scenario",

  "app.referenceArch": "Reference architecture",
  "app.nodeTip": "Tip: click a node to see service details.",
  "app.rationaleTitle": "Architectural rationale",

  "diagram.comingSoon": "Architecture diagram for this scenario is coming soon.",
  "diagram.legend.source": "Source",
  "diagram.legend.edge": "Edge",
  "diagram.legend.integration": "Integration",
  "diagram.legend.core": "Core (BTP)",
  "diagram.legend.auth": "Auth",
  "diagram.legend.data": "Data",
  "diagram.legend.ai": "AI",
  "diagram.legend.ui": "UI",

  "panel.eyebrow": "Service detail",
  "panel.close": "Close panel",
  "panel.whenToUse": "When to use",
  "panel.whenNotToUse": "When NOT to use",
  "panel.why": "Why this choice",
  "panel.docs": "Documentation",

  "export.button": "Export PDF",
  "export.loading": "Exporting...",
  "export.notReady": "Diagram is not ready yet.",
  "export.failed": "Failed to export PDF. See console for details.",

  "theme.toLight": "Switch to light mode",
  "theme.toDark": "Switch to dark mode",
  "lang.toggle": "Mudar para Português",

  "footer.disclaimer":
    "This is a study project. The reference architectures shown here are educational examples and do not represent official SAP recommendations.",
  "footer.madeWith": "Made with",
  "footer.by": "by",
  "footer.purpose":
    "Built for learning and to help others exploring SAP BTP architectures.",

  // Scenarios
  "scenario.s4hana-extension.title": "S/4HANA Extension",
  "scenario.s4hana-extension.description":
    "Extend SAP S/4HANA with side-by-side apps without modifying the digital core.",
  "scenario.third-party-integration.title": "Third-party Integration",
  "scenario.third-party-integration.description":
    "Connect SAP and non-SAP systems through secure APIs and managed integrations.",
  "scenario.mobile-app.title": "Mobile App",
  "scenario.mobile-app.description":
    "Deliver responsive mobile experiences backed by BTP services and SAP data.",
  "scenario.analytics-data.title": "Analytics & Data",
  "scenario.analytics-data.description":
    "Unify enterprise data and surface insights with SAP Datasphere and SAC.",
  "scenario.multitenant-saas.title": "Multitenant SaaS",
  "scenario.multitenant-saas.description":
    "Build scalable, multitenant SaaS solutions on the SAP BTP foundation.",
  "scenario.ai-automation.title": "AI Automation",
  "scenario.ai-automation.description":
    "Embed Joule, generative AI, and intelligent automation into business flows.",
  "scenario.event-driven.title": "Event-Driven Architecture",
  "scenario.event-driven.description":
    "Stream business events across systems with SAP Event Mesh and Advanced Event Mesh.",
  "scenario.cloud-migration.title": "Cloud Migration",
  "scenario.cloud-migration.description":
    "Move workloads to the cloud with a clear path to clean core on SAP BTP.",

  // Rationale (English) — keep in sync with architectures.ts
  "rationale.s4hana-extension.0":
    "Keeps the digital core clean by isolating custom logic in side-by-side BTP apps.",
  "rationale.s4hana-extension.1":
    "CAP + HANA Cloud accelerates delivery with SAP-native conventions.",
  "rationale.s4hana-extension.2":
    "Event Mesh enables decoupled, reactive extension scenarios.",

  "rationale.third-party-integration.0":
    "Integration Suite centralizes mappings, security, and monitoring of A2A flows.",
  "rationale.third-party-integration.1":
    "API Management enforces consistent policies (rate limiting, auth, analytics).",
  "rationale.third-party-integration.2":
    "Cloud Connector provides secure, audited reverse-tunnel to on-prem systems.",

  "rationale.mobile-app.0":
    "Mobile Services handles offline sync, push notifications, and device security.",
  "rationale.mobile-app.1":
    "Build Apps enables low-code mobile UIs reusing CAP services.",
  "rationale.mobile-app.2":
    "XSUAA + SAP Cloud Identity provides single sign-on across mobile and web.",

  "rationale.analytics-data.0":
    "Datasphere preserves business semantics across SAP and non-SAP data.",
  "rationale.analytics-data.1":
    "HANA Cloud powers high-performance modeling and federated queries.",
  "rationale.analytics-data.2":
    "SAC delivers planning + BI on a unified, governed semantic layer.",

  "rationale.multitenant-saas.0":
    "SaaS Provisioning + Service Manager automate tenant onboarding and isolation.",
  "rationale.multitenant-saas.1":
    "Per-tenant HDI containers give strong data segregation with shared app runtime.",
  "rationale.multitenant-saas.2":
    "Multi-tenant XSUAA centralizes auth and role collections per subscriber.",

  "rationale.ai-automation.0":
    "AI Core + Launchpad standardize MLOps for both custom and prebuilt models.",
  "rationale.ai-automation.1":
    "Generative AI Hub provides governed LLM access with grounding on SAP data.",
  "rationale.ai-automation.2":
    "Joule is the conversational layer that turns insights into business actions.",

  "rationale.event-driven.0":
    "Decouples producers from consumers, enabling independent evolution.",
  "rationale.event-driven.1":
    "Advanced Event Mesh adds dynamic routing and high-throughput streaming.",
  "rationale.event-driven.2":
    "Native S/4HANA business events remove the need for custom polling.",

  "rationale.cloud-migration.0":
    "Cloud Connector enables phased migration without exposing on-prem systems.",
  "rationale.cloud-migration.1":
    "HANA Cloud + BTP Runtime support both data and workload modernization paths.",
  "rationale.cloud-migration.2":
    "Integration Suite keeps hybrid flows working through the transition.",
};

const ptBR: Dict = {
  "brand.tag": "Ferramenta de Arquitetura SAP BTP",
  "hero.title": "Ferramenta de Decisão de Arquitetura SAP BTP",
  "hero.subtitle":
    "Escolha seu cenário, explore uma arquitetura de referência e exporte uma proposta profissional — tudo baseado nas boas práticas do SAP Business Technology Platform.",

  "selector.eyebrow": "Cenários",
  "selector.title": "Escolha seu cenário",
  "selector.subtitle":
    "Selecione o caso de uso que melhor representa seu projeto para gerar uma arquitetura de referência sob medida.",
  "selector.cta": "Selecionar cenário",

  "app.referenceArch": "Arquitetura de referência",
  "app.nodeTip": "Dica: clique em um nó para ver detalhes do serviço.",
  "app.rationaleTitle": "Justificativa arquitetural",

  "diagram.comingSoon":
    "O diagrama de arquitetura deste cenário estará disponível em breve.",
  "diagram.legend.source": "Origem",
  "diagram.legend.edge": "Borda",
  "diagram.legend.integration": "Integração",
  "diagram.legend.core": "Núcleo (BTP)",
  "diagram.legend.auth": "Autenticação",
  "diagram.legend.data": "Dados",
  "diagram.legend.ai": "IA",
  "diagram.legend.ui": "Interface",

  "panel.eyebrow": "Detalhe do serviço",
  "panel.close": "Fechar painel",
  "panel.whenToUse": "Quando usar",
  "panel.whenNotToUse": "Quando NÃO usar",
  "panel.why": "Por que esta escolha",
  "panel.docs": "Documentação",

  "export.button": "Exportar PDF",
  "export.loading": "Exportando...",
  "export.notReady": "O diagrama ainda não está pronto.",
  "export.failed": "Falha ao exportar o PDF. Veja o console para detalhes.",

  "theme.toLight": "Mudar para modo claro",
  "theme.toDark": "Mudar para modo escuro",
  "lang.toggle": "Switch to English",

  "footer.disclaimer":
    "Este é um projeto de estudos. As arquiteturas de referência apresentadas aqui são exemplos educacionais e não representam recomendações oficiais da SAP.",
  "footer.madeWith": "Feito com",
  "footer.by": "por",
  "footer.purpose":
    "Criado para aprendizado e para ajudar outras pessoas explorando arquiteturas SAP BTP.",

  // Cenários
  "scenario.s4hana-extension.title": "Extensão do S/4HANA",
  "scenario.s4hana-extension.description":
    "Estenda o SAP S/4HANA com aplicações side-by-side sem modificar o núcleo digital.",
  "scenario.third-party-integration.title": "Integração com Terceiros",
  "scenario.third-party-integration.description":
    "Conecte sistemas SAP e não-SAP por meio de APIs seguras e integrações gerenciadas.",
  "scenario.mobile-app.title": "Aplicativo Mobile",
  "scenario.mobile-app.description":
    "Entregue experiências mobile responsivas apoiadas por serviços do BTP e dados SAP.",
  "scenario.analytics-data.title": "Análise & Dados",
  "scenario.analytics-data.description":
    "Unifique dados corporativos e gere insights com SAP Datasphere e SAC.",
  "scenario.multitenant-saas.title": "SaaS Multitenant",
  "scenario.multitenant-saas.description":
    "Construa soluções SaaS multitenant escaláveis sobre a base do SAP BTP.",
  "scenario.ai-automation.title": "Automação com IA",
  "scenario.ai-automation.description":
    "Incorpore Joule, IA generativa e automação inteligente nos fluxos de negócio.",
  "scenario.event-driven.title": "Arquitetura Orientada a Eventos",
  "scenario.event-driven.description":
    "Transmita eventos de negócio entre sistemas com SAP Event Mesh e Advanced Event Mesh.",
  "scenario.cloud-migration.title": "Migração para Nuvem",
  "scenario.cloud-migration.description":
    "Migre cargas de trabalho para a nuvem com um caminho claro para clean core no SAP BTP.",

  // Justificativas
  "rationale.s4hana-extension.0":
    "Mantém o núcleo digital limpo isolando a lógica customizada em apps side-by-side no BTP.",
  "rationale.s4hana-extension.1":
    "CAP + HANA Cloud aceleram a entrega com convenções nativas da SAP.",
  "rationale.s4hana-extension.2":
    "O Event Mesh viabiliza cenários de extensão desacoplados e reativos.",

  "rationale.third-party-integration.0":
    "O Integration Suite centraliza mapeamentos, segurança e monitoramento dos fluxos A2A.",
  "rationale.third-party-integration.1":
    "O API Management aplica políticas consistentes (rate limit, autenticação, analytics).",
  "rationale.third-party-integration.2":
    "O Cloud Connector oferece túnel reverso seguro e auditado para sistemas on-prem.",

  "rationale.mobile-app.0":
    "O Mobile Services cuida de sincronização offline, push notifications e segurança de dispositivos.",
  "rationale.mobile-app.1":
    "O Build Apps permite UIs mobile em low-code reutilizando os serviços CAP.",
  "rationale.mobile-app.2":
    "XSUAA + SAP Cloud Identity fornecem SSO entre mobile e web.",

  "rationale.analytics-data.0":
    "O Datasphere preserva a semântica de negócio entre dados SAP e não-SAP.",
  "rationale.analytics-data.1":
    "O HANA Cloud sustenta modelagem de alto desempenho e queries federadas.",
  "rationale.analytics-data.2":
    "O SAC entrega planejamento + BI sobre uma camada semântica unificada e governada.",

  "rationale.multitenant-saas.0":
    "SaaS Provisioning + Service Manager automatizam o onboarding e o isolamento de tenants.",
  "rationale.multitenant-saas.1":
    "Containers HDI por tenant garantem forte segregação de dados com runtime compartilhado.",
  "rationale.multitenant-saas.2":
    "O XSUAA multi-tenant centraliza autenticação e role collections por assinante.",

  "rationale.ai-automation.0":
    "AI Core + Launchpad padronizam MLOps tanto para modelos customizados quanto pré-treinados.",
  "rationale.ai-automation.1":
    "O Generative AI Hub fornece acesso governado a LLMs com grounding nos dados SAP.",
  "rationale.ai-automation.2":
    "O Joule é a camada conversacional que transforma insights em ações de negócio.",

  "rationale.event-driven.0":
    "Desacopla produtores e consumidores, permitindo evolução independente.",
  "rationale.event-driven.1":
    "O Advanced Event Mesh adiciona roteamento dinâmico e streaming de alto throughput.",
  "rationale.event-driven.2":
    "Os eventos de negócio nativos do S/4HANA eliminam a necessidade de polling customizado.",

  "rationale.cloud-migration.0":
    "O Cloud Connector permite migração em fases sem expor sistemas on-prem.",
  "rationale.cloud-migration.1":
    "HANA Cloud + BTP Runtime suportam tanto a modernização de dados quanto de cargas de trabalho.",
  "rationale.cloud-migration.2":
    "O Integration Suite mantém fluxos híbridos funcionando durante a transição.",
};

const dictionaries: Record<Locale, Dict> = { en, "pt-BR": ptBR };

const STORAGE_KEY = "btp-tool-locale";

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored === "en" || stored === "pt-BR") return stored;
  const nav = window.navigator?.language?.toLowerCase() ?? "";
  if (nav.startsWith("pt")) return "pt-BR";
  return "en";
}

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale === "pt-BR" ? "pt-BR" : "en";
  }, [locale]);

  const setLocale = useCallback((next: Locale) => setLocaleState(next), []);

  const t = useCallback(
    (key: string) => dictionaries[locale][key] ?? dictionaries.en[key] ?? key,
    [locale]
  );

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useTranslation must be used within I18nProvider");
  return ctx;
}
