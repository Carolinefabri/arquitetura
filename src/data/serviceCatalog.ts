export type PricingTier = "Free tier" | "Standard" | "Premium" | "Enterprise";

export type ServiceInfo = {
  id: string;
  name: string;
  description: string;
  whenToUse: string[];
  whenNotToUse: string[];
  pricingTier: PricingTier;
  docsUrl: string;
  whyThisChoice: [string, string, string];
};

export const serviceCatalog: Record<string, ServiceInfo> = {
  s4hana: {
    id: "s4hana",
    name: "SAP S/4HANA",
    description:
      "The intelligent ERP suite acting as the digital core and system of record for business processes.",
    whenToUse: [
      "You need to expose business data and processes from the digital core.",
      "Side-by-side extensions must read or write transactional data.",
      "Standardized OData / SOAP / RFC interfaces are available for your use case.",
    ],
    whenNotToUse: [
      "Heavy custom logic that would modify the core — keep it on BTP instead.",
      "Real-time, high-frequency analytics workloads better suited to HANA Cloud.",
    ],
    pricingTier: "Enterprise",
    docsUrl: "https://help.sap.com/docs/SAP_S4HANA_CLOUD",
    whyThisChoice: [
      "Authoritative source of business data — keeps the core clean.",
      "Exposes well-defined APIs and events for extensions.",
      "Aligns with SAP's clean core strategy on BTP.",
    ],
  },
  cap: {
    id: "cap",
    name: "SAP Cloud Application Programming Model (CAP)",
    description:
      "Opinionated framework to build enterprise-grade services and APIs on SAP BTP using Node.js or Java.",
    whenToUse: [
      "Building side-by-side extensions and custom OData/REST services.",
      "You want built-in support for authentication, i18n, and HANA Cloud.",
      "Need to model domain entities once and expose them via multiple protocols.",
    ],
    whenNotToUse: [
      "Pure static front-ends with no backend logic.",
      "Latency-critical streaming pipelines — use Event Mesh or Kafka instead.",
    ],
    pricingTier: "Standard",
    docsUrl: "https://cap.cloud.sap/docs/",
    whyThisChoice: [
      "Accelerates delivery with conventions for SAP-grade services.",
      "First-class integration with HANA Cloud, XSUAA, and Event Mesh.",
      "Cloud-qualified and aligned with SAP's recommended extension stack.",
    ],
  },
  "hana-cloud": {
    id: "hana-cloud",
    name: "SAP HANA Cloud",
    description:
      "Fully managed in-memory database-as-a-service for transactional and analytical workloads.",
    whenToUse: [
      "Persisting extension data with strong SAP integration patterns.",
      "Hybrid OLTP + OLAP workloads requiring sub-second response.",
      "Federated queries across SAP and non-SAP sources.",
    ],
    whenNotToUse: [
      "Simple key-value caching — use Redis or Object Store instead.",
      "Document-heavy unstructured data better served by a document DB.",
    ],
    pricingTier: "Premium",
    docsUrl: "https://help.sap.com/docs/HANA_CLOUD",
    whyThisChoice: [
      "In-memory performance for both transactional and analytical queries.",
      "Native CAP and Fiori integration reduces glue code.",
      "Managed service: backups, HA, and scaling handled by SAP.",
    ],
  },
  "event-mesh": {
    id: "event-mesh",
    name: "SAP Event Mesh",
    description:
      "Managed messaging service to publish and consume business events across SAP and non-SAP systems.",
    whenToUse: [
      "Decoupling producers and consumers around business events.",
      "Reacting to S/4HANA events such as BusinessPartner or SalesOrder changes.",
      "Choreographing async workflows between micro-services.",
    ],
    whenNotToUse: [
      "Synchronous request/response APIs — use CAP services instead.",
      "Very high-throughput streaming analytics — consider Advanced Event Mesh / Kafka.",
    ],
    pricingTier: "Standard",
    docsUrl: "https://help.sap.com/docs/SAP_EM",
    whyThisChoice: [
      "Native catalog of S/4HANA business events out of the box.",
      "Loose coupling enables independent evolution of extensions.",
      "Standard AMQP / MQTT protocols for portability.",
    ],
  },
  xsuaa: {
    id: "xsuaa",
    name: "SAP Authorization and Trust Management (XSUAA)",
    description:
      "OAuth 2.0 authorization server providing authentication, JWT issuance, and role management on BTP.",
    whenToUse: [
      "Securing CAP services and approuter-fronted applications.",
      "Implementing role-based access control with scopes and role collections.",
      "Brokering identity from a corporate IdP via SAP Cloud Identity Services.",
    ],
    whenNotToUse: [
      "Public unauthenticated APIs (still consider an API gateway).",
      "Use cases needing fine-grained ABAC beyond scope/role collections.",
    ],
    pricingTier: "Free tier",
    docsUrl:
      "https://help.sap.com/docs/btp/sap-business-technology-platform/authorization-and-trust-management-service",
    whyThisChoice: [
      "Standard auth layer expected by every BTP-native runtime.",
      "Integrates with SAP Cloud Identity and corporate IdPs (SAML/OIDC).",
      "No extra cost for typical extension workloads.",
    ],
  },
  workzone: {
    id: "workzone",
    name: "SAP Build Work Zone",
    description:
      "Central digital workplace that aggregates Fiori apps, content, and tasks for end users.",
    whenToUse: [
      "Surfacing multiple Fiori / custom apps under a unified launchpad.",
      "Role-based navigation across SAP and partner solutions.",
      "Delivering branded portals for employees, partners, or customers.",
    ],
    whenNotToUse: [
      "Single-purpose embedded apps inside S/4HANA Fiori launchpad.",
      "Marketing websites — use a CMS instead.",
    ],
    pricingTier: "Standard",
    docsUrl: "https://help.sap.com/docs/build-work-zone-standard-edition",
    whyThisChoice: [
      "Single entry point for users across multiple BTP extensions.",
      "Built-in integration with XSUAA roles and Fiori apps.",
      "Reduces UX fragmentation versus separate app URLs.",
    ],
  },
};
