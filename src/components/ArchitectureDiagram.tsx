import { useMemo } from "react";
import { Background, Controls, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  architectures,
  layerColors,
  type Architecture,
  type ScenarioId,
} from "../data/architectures";

export type { ScenarioId } from "../data/architectures";

type ArchitectureDiagramProps = {
  scenarioId: ScenarioId;
  onNodeClick?: (nodeId: string) => void;
};

export function ArchitectureDiagram({
  scenarioId,
  onNodeClick,
}: ArchitectureDiagramProps) {
  const diagram: Architecture | undefined = useMemo(
    () => architectures[scenarioId],
    [scenarioId]
  );

  if (!diagram) {
    return (
      <div className="flex h-[480px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
        Architecture diagram for this scenario is coming soon.
      </div>
    );
  }

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:h-[520px] md:h-[560px] dark:border-slate-800 dark:bg-slate-900">
      <ReactFlow
        nodes={diagram.nodes}
        edges={diagram.edges}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable
        panOnDrag
        zoomOnScroll
        onNodeClick={(_, node) => onNodeClick?.(node.id)}
      >
        <Background gap={16} color="#e2e8f0" />
        <Controls showInteractive={false} />
      </ReactFlow>

      <DiagramLegend />
    </div>
  );
}

const legendItems: { label: string; color: string }[] = [
  { label: "Source", color: layerColors.source },
  { label: "Edge", color: layerColors.edge },
  { label: "Integration", color: layerColors.integration },
  { label: "Core (BTP)", color: layerColors.core },
  { label: "Auth", color: layerColors.auth },
  { label: "Data", color: layerColors.data },
  { label: "AI", color: layerColors.ai },
  { label: "UI", color: layerColors.ui },
];

function DiagramLegend() {
  return (
    <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 flex max-w-[90%] -translate-x-1/2 flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-2xl border border-slate-200 bg-white/90 px-3 py-2 text-[11px] font-medium text-slate-600 shadow-sm backdrop-blur sm:gap-x-4 sm:text-xs dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-300">
      {legendItems.map((item) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ background: item.color }}
          />
          {item.label}
        </span>
      ))}
    </div>
  );
}

export default ArchitectureDiagram;
