import { MarkerType, Position, type Edge, type Node } from "@xyflow/react";

export type ScenarioId =
  | "s4hana-extension"
  | "third-party-integration"
  | "mobile-app"
  | "analytics-data"
  | "multitenant-saas"
  | "ai-automation"
  | "event-driven"
  | "cloud-migration";

export type LayerKey =
  | "source"
  | "integration"
  | "core"
  | "auth"
  | "data"
  | "ai"
  | "ui"
  | "edge";

export type Architecture = {
  id: ScenarioId;
  title: string;
  nodes: Node[];
  edges: Edge[];
  services: string[];
  rationale: string[];
};

// ---------- styling helpers ----------

export const layerColors: Record<LayerKey, string> = {
  source: "#94a3b8",
  integration: "#6366f1",
  core: "#0070F3",
  auth: "#00B386",
  data: "#0ea5e9",
  ai: "#f59e0b",
  ui: "#7c3aed",
  edge: "#64748b",
};

const layerStyles: Record<LayerKey, React.CSSProperties> = {
  source: { background: "#f1f5f9", color: "#0f172a", border: "2px solid #94a3b8" },
  integration: { background: "#6366f1", color: "#ffffff", border: "2px solid #4338ca" },
  core: { background: "#0070F3", color: "#ffffff", border: "2px solid #0059c1" },
  auth: { background: "#00B386", color: "#ffffff", border: "2px solid #00875f" },
  data: { background: "#0ea5e9", color: "#ffffff", border: "2px solid #0369a1" },
  ai: { background: "#f59e0b", color: "#ffffff", border: "2px solid #b45309" },
  ui: { background: "#7c3aed", color: "#ffffff", border: "2px solid #5b21b6" },
  edge: { background: "#e2e8f0", color: "#0f172a", border: "2px solid #64748b" },
};

const baseNodeStyle: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 12,
  fontSize: 13,
  fontWeight: 600,
  width: 180,
  textAlign: "center",
  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
  cursor: "pointer",
};

function node(
  id: string,
  label: string,
  layer: LayerKey,
  x: number,
  y: number
): Node {
  return {
    id,
    position: { x, y },
    data: { label, layer },
    style: { ...baseNodeStyle, ...layerStyles[layer] },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  };
}

function edge(
  id: string,
  source: string,
  target: string,
  color: string,
  label?: string
): Edge {
  return {
    id,
    source,
    target,
    animated: true,
    label,
    labelStyle: { fontSize: 11, fill: "#475569", fontWeight: 600 },
    labelBgStyle: { fill: "#ffffff" },
    labelBgPadding: [4, 2],
    labelBgBorderRadius: 4,
    style: { stroke: color, strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color,
      width: 18,
      height: 18,
    },
  };
}

// ---------- 1. S/4HANA Extension ----------

const s4hanaExtension: Architecture = {
  id: "s4hana-extension",
  title: "S/4HANA Extension",
  nodes: [
    node("s4hana", "S/4HANA", "source", 0, 200),
    node("cap", "CAP", "core", 320, 40),
    node("hana-cloud", "SAP HANA Cloud", "core", 320, 150),
    node("event-mesh", "SAP Event Mesh", "core", 320, 260),
    node("xsuaa", "XSUAA", "auth", 320, 370),
    node("workzone", "Build Work Zone / Fiori", "ui", 660, 200),
  ],
  edges: [
    edge("e1", "s4hana", "cap", layerColors.core, "OData"),
    edge("e2", "s4hana", "hana-cloud", layerColors.core, "replication"),
    edge("e3", "s4hana", "event-mesh", layerColors.core, "events"),
    edge("e4", "cap", "workzone", layerColors.ui),
    edge("e5", "hana-cloud", "workzone", layerColors.ui),
    edge("e6", "event-mesh", "workzone", layerColors.ui),
    edge("e7", "xsuaa", "workzone", layerColors.auth, "JWT"),
    edge("e8", "xsuaa", "cap", layerColors.auth, "OAuth2"),
  ],
  services: ["s4hana", "cap", "hana-cloud", "event-mesh", "xsuaa", "workzone"],
  rationale: [
    "Keeps the digital core clean by isolating custom logic in side-by-side BTP apps.",
    "CAP + HANA Cloud accelerates delivery with SAP-native conventions.",
    "Event Mesh enables decoupled, reactive extension scenarios.",
  ],
};

// ---------- 2. Third-party Integration ----------

const thirdPartyIntegration: Architecture = {
  id: "third-party-integration",
  title: "Third-party Integration",
  nodes: [
    node("third-party", "Third-party System", "source", 0, 100),
    node("on-prem-app", "On-prem App", "source", 0, 280),
    node("cloud-connector", "Cloud Connector", "edge", 280, 280),
    node("integration-suite", "SAP Integration Suite", "integration", 540, 100),
    node("api-management", "API Management", "integration", 540, 240),
    node("destination", "Destination Service", "core", 540, 380),
    node("s4hana", "S/4HANA", "core", 860, 240),
  ],
  edges: [
    edge("e1", "third-party", "integration-suite", layerColors.integration, "REST / SOAP"),
    edge("e2", "on-prem-app", "cloud-connector", layerColors.edge),
    edge("e3", "cloud-connector", "api-management", layerColors.integration),
    edge("e4", "integration-suite", "s4hana", layerColors.core),
    edge("e5", "api-management", "s4hana", layerColors.core),
    edge("e6", "destination", "integration-suite", layerColors.core),
    edge("e7", "destination", "api-management", layerColors.core),
  ],
  services: [
    "integration-suite",
    "api-management",
    "cloud-connector",
    "destination",
    "s4hana",
  ],
  rationale: [
    "Integration Suite centralizes mappings, security, and monitoring of A2A flows.",
    "API Management enforces consistent policies (rate limiting, auth, analytics).",
    "Cloud Connector provides secure, audited reverse-tunnel to on-prem systems.",
  ],
};

// ---------- 3. Mobile App ----------

const mobileApp: Architecture = {
  id: "mobile-app",
  title: "Mobile App",
  nodes: [
    node("mobile-device", "Mobile Device", "source", 0, 200),
    node("mobile-services", "SAP Mobile Services", "core", 300, 100),
    node("build-apps", "SAP Build Apps", "ui", 300, 240),
    node("xsuaa", "XSUAA", "auth", 300, 380),
    node("cap", "CAP Backend", "core", 620, 100),
    node("hana-cloud", "SAP HANA Cloud", "data", 620, 240),
    node("s4hana", "S/4HANA", "source", 940, 170),
  ],
  edges: [
    edge("e1", "mobile-device", "mobile-services", layerColors.core, "HTTPS / push"),
    edge("e2", "mobile-device", "build-apps", layerColors.ui),
    edge("e3", "mobile-services", "cap", layerColors.core),
    edge("e4", "build-apps", "cap", layerColors.core),
    edge("e5", "cap", "hana-cloud", layerColors.data),
    edge("e6", "cap", "s4hana", layerColors.core, "OData"),
    edge("e7", "xsuaa", "mobile-services", layerColors.auth),
    edge("e8", "xsuaa", "build-apps", layerColors.auth),
  ],
  services: [
    "mobile-services",
    "build-apps",
    "xsuaa",
    "cap",
    "hana-cloud",
    "s4hana",
  ],
  rationale: [
    "Mobile Services handles offline sync, push notifications, and device security.",
    "Build Apps enables low-code mobile UIs reusing CAP services.",
    "XSUAA + SAP Cloud Identity provides single sign-on across mobile and web.",
  ],
};

// ---------- 4. Analytics & Data ----------

const analyticsData: Architecture = {
  id: "analytics-data",
  title: "Analytics & Data",
  nodes: [
    node("s4hana", "S/4HANA", "source", 0, 80),
    node("non-sap", "Non-SAP Sources", "source", 0, 220),
    node("legacy-dw", "Legacy DW", "source", 0, 360),
    node("datasphere", "SAP Datasphere", "data", 320, 150),
    node("hana-cloud", "SAP HANA Cloud", "data", 320, 290),
    node("sac", "SAP Analytics Cloud", "ui", 660, 220),
  ],
  edges: [
    edge("e1", "s4hana", "datasphere", layerColors.data, "replication"),
    edge("e2", "non-sap", "datasphere", layerColors.data, "federation"),
    edge("e3", "legacy-dw", "hana-cloud", layerColors.data),
    edge("e4", "datasphere", "hana-cloud", layerColors.data),
    edge("e5", "datasphere", "sac", layerColors.ui, "live"),
    edge("e6", "hana-cloud", "sac", layerColors.ui),
  ],
  services: ["datasphere", "hana-cloud", "sac", "s4hana"],
  rationale: [
    "Datasphere preserves business semantics across SAP and non-SAP data.",
    "HANA Cloud powers high-performance modeling and federated queries.",
    "SAC delivers planning + BI on a unified, governed semantic layer.",
  ],
};

// ---------- 5. Multitenant SaaS ----------

const multitenantSaas: Architecture = {
  id: "multitenant-saas",
  title: "Multitenant SaaS",
  nodes: [
    node("tenant-a", "Tenant A", "source", 0, 80),
    node("tenant-b", "Tenant B", "source", 0, 200),
    node("tenant-c", "Tenant C", "source", 0, 320),
    node("approuter", "Approuter", "ui", 300, 200),
    node("xsuaa", "XSUAA (MT)", "auth", 300, 360),
    node("saas-provisioning", "SaaS Provisioning", "core", 600, 80),
    node("cap", "CAP Services", "core", 600, 200),
    node("hana-cloud", "HANA Cloud (HDI)", "data", 600, 320),
    node("service-manager", "Service Manager", "core", 920, 200),
  ],
  edges: [
    edge("e1", "tenant-a", "approuter", layerColors.ui),
    edge("e2", "tenant-b", "approuter", layerColors.ui),
    edge("e3", "tenant-c", "approuter", layerColors.ui),
    edge("e4", "approuter", "cap", layerColors.core),
    edge("e5", "xsuaa", "approuter", layerColors.auth, "JWT"),
    edge("e6", "xsuaa", "cap", layerColors.auth),
    edge("e7", "cap", "hana-cloud", layerColors.data, "per-tenant"),
    edge("e8", "saas-provisioning", "cap", layerColors.core, "subscribe"),
    edge("e9", "cap", "service-manager", layerColors.core),
    edge("e10", "service-manager", "hana-cloud", layerColors.data),
  ],
  services: [
    "approuter",
    "xsuaa",
    "saas-provisioning",
    "cap",
    "hana-cloud",
    "service-manager",
  ],
  rationale: [
    "SaaS Provisioning + Service Manager automate tenant onboarding and isolation.",
    "Per-tenant HDI containers give strong data segregation with shared app runtime.",
    "Multi-tenant XSUAA centralizes auth and role collections per subscriber.",
  ],
};

// ---------- 6. AI Automation ----------

const aiAutomation: Architecture = {
  id: "ai-automation",
  title: "AI Automation",
  nodes: [
    node("business-data", "Business Data", "source", 0, 100),
    node("documents", "Documents", "source", 0, 240),
    node("events", "Process Events", "source", 0, 380),
    node("ai-core", "SAP AI Core", "ai", 320, 100),
    node("gen-ai-hub", "Generative AI Hub", "ai", 320, 240),
    node("ai-launchpad", "AI Launchpad", "ai", 320, 380),
    node("joule", "Joule", "ai", 640, 170),
    node("business-apps", "Business Apps / S/4HANA", "core", 960, 240),
  ],
  edges: [
    edge("e1", "business-data", "ai-core", layerColors.ai, "train"),
    edge("e2", "documents", "gen-ai-hub", layerColors.ai, "RAG"),
    edge("e3", "events", "ai-launchpad", layerColors.ai),
    edge("e4", "ai-core", "joule", layerColors.ai),
    edge("e5", "gen-ai-hub", "joule", layerColors.ai),
    edge("e6", "ai-launchpad", "joule", layerColors.ai),
    edge("e7", "joule", "business-apps", layerColors.core, "actions"),
  ],
  services: ["ai-core", "gen-ai-hub", "ai-launchpad", "joule"],
  rationale: [
    "AI Core + Launchpad standardize MLOps for both custom and prebuilt models.",
    "Generative AI Hub provides governed LLM access with grounding on SAP data.",
    "Joule is the conversational layer that turns insights into business actions.",
  ],
};

// ---------- 7. Event-Driven Architecture ----------

const eventDriven: Architecture = {
  id: "event-driven",
  title: "Event-Driven Architecture",
  nodes: [
    node("s4hana", "S/4HANA", "source", 0, 80),
    node("custom-app", "Custom App", "source", 0, 220),
    node("iot", "IoT / Sensors", "source", 0, 360),
    node("event-mesh", "SAP Event Mesh", "core", 320, 150),
    node("advanced-event-mesh", "Advanced Event Mesh", "core", 320, 290),
    node("cap-consumer", "CAP Consumer", "core", 660, 80),
    node("function", "Serverless Function", "core", 660, 220),
    node("integration-suite", "Integration Suite", "integration", 660, 360),
    node("downstream", "Downstream Systems", "ui", 960, 220),
  ],
  edges: [
    edge("e1", "s4hana", "event-mesh", layerColors.core, "business events"),
    edge("e2", "custom-app", "event-mesh", layerColors.core),
    edge("e3", "iot", "advanced-event-mesh", layerColors.core, "MQTT"),
    edge("e4", "event-mesh", "cap-consumer", layerColors.core),
    edge("e5", "event-mesh", "function", layerColors.core),
    edge("e6", "advanced-event-mesh", "function", layerColors.core),
    edge("e7", "advanced-event-mesh", "integration-suite", layerColors.integration),
    edge("e8", "cap-consumer", "downstream", layerColors.ui),
    edge("e9", "function", "downstream", layerColors.ui),
    edge("e10", "integration-suite", "downstream", layerColors.ui),
  ],
  services: ["event-mesh", "advanced-event-mesh", "cap", "integration-suite"],
  rationale: [
    "Decouples producers from consumers, enabling independent evolution.",
    "Advanced Event Mesh adds dynamic routing and high-throughput streaming.",
    "Native S/4HANA business events remove the need for custom polling.",
  ],
};

// ---------- 8. Cloud Migration ----------

const cloudMigration: Architecture = {
  id: "cloud-migration",
  title: "Cloud Migration",
  nodes: [
    node("on-prem-app", "On-prem App", "source", 0, 80),
    node("on-prem-db", "On-prem DB", "source", 0, 220),
    node("on-prem-files", "File Shares", "source", 0, 360),
    node("cloud-connector", "Cloud Connector", "edge", 300, 220),
    node("integration-suite", "Integration Suite", "integration", 600, 100),
    node("hana-cloud", "SAP HANA Cloud", "data", 600, 240),
    node("btp-runtime", "BTP Runtime (CF / Kyma)", "core", 600, 380),
    node("modernized-app", "Modernized App", "ui", 940, 240),
  ],
  edges: [
    edge("e1", "on-prem-app", "cloud-connector", layerColors.edge),
    edge("e2", "on-prem-db", "cloud-connector", layerColors.edge),
    edge("e3", "on-prem-files", "cloud-connector", layerColors.edge),
    edge("e4", "cloud-connector", "integration-suite", layerColors.integration, "secure tunnel"),
    edge("e5", "cloud-connector", "hana-cloud", layerColors.data, "replicate"),
    edge("e6", "cloud-connector", "btp-runtime", layerColors.core, "lift & shift"),
    edge("e7", "integration-suite", "modernized-app", layerColors.ui),
    edge("e8", "hana-cloud", "modernized-app", layerColors.ui),
    edge("e9", "btp-runtime", "modernized-app", layerColors.ui),
  ],
  services: [
    "cloud-connector",
    "integration-suite",
    "hana-cloud",
    "btp-runtime",
  ],
  rationale: [
    "Cloud Connector enables phased migration without exposing on-prem systems.",
    "HANA Cloud + BTP Runtime support both data and workload modernization paths.",
    "Integration Suite keeps hybrid flows working through the transition.",
  ],
};

// ---------- registry ----------

export const architectures: Record<ScenarioId, Architecture> = {
  "s4hana-extension": s4hanaExtension,
  "third-party-integration": thirdPartyIntegration,
  "mobile-app": mobileApp,
  "analytics-data": analyticsData,
  "multitenant-saas": multitenantSaas,
  "ai-automation": aiAutomation,
  "event-driven": eventDriven,
  "cloud-migration": cloudMigration,
};
