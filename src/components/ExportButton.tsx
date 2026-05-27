import { useState, type RefObject } from "react";
import { motion } from "framer-motion";
import { Download, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import type { Architecture } from "../data/architectures";
import { serviceCatalog } from "../data/serviceCatalog";
import { useTranslation } from "../i18n/i18n";

type ExportButtonProps = {
  architecture: Architecture;
  diagramRef: RefObject<HTMLElement | null>;
};

const PRIMARY = "#0070F3";
const ACCENT = "#00B386";
const MUTED = "#475569";
const BORDER = "#e2e8f0";

export function ExportButton({ architecture, diagramRef }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleExport = async () => {
    if (!diagramRef.current) {
      setError(t("export.notReady"));
      return;
    }

    setError(null);
    setIsExporting(true);
    try {
      const canvas = await html2canvas(diagramRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        logging: false,
      });

      await buildPdf(canvas, architecture);
    } catch (err) {
      console.error(err);
      setError(t("export.failed"));
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <motion.button
        type="button"
        onClick={handleExport}
        disabled={isExporting}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center gap-2 rounded-lg bg-[#0070F3] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#005bd1] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0070F3] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isExporting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t("export.loading")}
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            {t("export.button")}
          </>
        )}
      </motion.button>
      {error && <p className="text-xs text-rose-600">{error}</p>}
    </div>
  );
}

// ---------- PDF construction ----------

async function buildPdf(diagramCanvas: HTMLCanvasElement, arch: Architecture) {
  const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginX = 48;
  const contentW = pageW - marginX * 2;

  let y = drawHeader(doc, pageW, marginX, arch.title);

  // Diagram
  y = ensureSpace(doc, y, 60, pageW, marginX, arch.title);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text("Reference Architecture", marginX, y);
  y += 14;

  const imgData = diagramCanvas.toDataURL("image/png");
  const ratio = diagramCanvas.height / diagramCanvas.width;
  const imgW = contentW;
  const imgH = imgW * ratio;
  const fittedH = Math.min(imgH, pageH - y - marginX);
  const fittedW = fittedH < imgH ? fittedH / ratio : imgW;
  const imgX = marginX + (contentW - fittedW) / 2;

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.roundedRect(imgX - 4, y - 2, fittedW + 8, fittedH + 8, 6, 6);
  doc.addImage(imgData, "PNG", imgX, y + 2, fittedW, fittedH);
  y += fittedH + 24;

  // Services table
  y = ensureSpace(doc, y, 80, pageW, marginX, arch.title);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text("Services", marginX, y);
  y += 14;
  y = drawServicesTable(doc, arch, marginX, contentW, y, pageH);

  // Why these choices
  y += 18;
  y = ensureSpace(doc, y, 80, pageW, marginX, arch.title);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text("Why these choices", marginX, y);
  y += 10;

  // accent underline
  doc.setDrawColor(0, 179, 134);
  doc.setLineWidth(1.5);
  doc.line(marginX, y, marginX + 60, y);
  y += 14;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(51, 65, 85);

  for (const reason of arch.rationale) {
    const lines = doc.splitTextToSize(reason, contentW - 18) as string[];
    y = ensureSpace(doc, y, lines.length * 14 + 6, pageW, marginX, arch.title);

    doc.setFillColor(PRIMARY);
    doc.circle(marginX + 3, y - 4, 2, "F");
    doc.text(lines, marginX + 14, y);
    y += lines.length * 14 + 4;
  }

  drawFooter(doc, pageW, pageH, marginX);

  const filename = `btp-architecture-${arch.id}.pdf`;
  doc.save(filename);
}

function drawHeader(
  doc: jsPDF,
  pageW: number,
  marginX: number,
  title: string
): number {
  // primary band
  doc.setFillColor(PRIMARY);
  doc.rect(0, 0, pageW, 6, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(0, 112, 243);
  doc.text("SAP BTP ARCHITECTURE TOOL", marginX, 32);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(15, 23, 42);
  doc.text(title, marginX, 56);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text("Technical Architecture Proposal", marginX, 72);

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(marginX, 88, pageW - marginX, 88);

  return 108;
}

function drawFooter(
  doc: jsPDF,
  pageW: number,
  pageH: number,
  marginX: number
) {
  const totalPages = doc.getNumberOfPages();
  const generatedAt = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(marginX, pageH - 36, pageW - marginX, pageH - 36);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(`Generated ${generatedAt}`, marginX, pageH - 20);
    doc.text(
      `Page ${i} of ${totalPages}`,
      pageW - marginX,
      pageH - 20,
      { align: "right" }
    );
  }
}

function ensureSpace(
  doc: jsPDF,
  y: number,
  needed: number,
  pageW: number,
  marginX: number,
  title: string
): number {
  const pageH = doc.internal.pageSize.getHeight();
  if (y + needed > pageH - 56) {
    doc.addPage();
    return drawHeader(doc, pageW, marginX, title);
  }
  return y;
}

function drawServicesTable(
  doc: jsPDF,
  arch: Architecture,
  marginX: number,
  contentW: number,
  startY: number,
  pageH: number
): number {
  const cols = [
    { key: "name", label: "Service", width: contentW * 0.4 },
    { key: "tier", label: "Pricing tier", width: contentW * 0.2 },
    { key: "desc", label: "Description", width: contentW * 0.4 },
  ];

  const headerH = 22;
  const padX = 8;
  let y = startY;

  // header
  doc.setFillColor(PRIMARY);
  doc.rect(marginX, y, contentW, headerH, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);

  let x = marginX;
  for (const col of cols) {
    doc.text(col.label, x + padX, y + 15);
    x += col.width;
  }
  y += headerH;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);

  let zebra = false;
  for (const id of arch.services) {
    const svc = serviceCatalog[id];
    const name = svc?.name ?? id;
    const tier = svc?.pricingTier ?? "—";
    const desc = svc?.description ?? "Defined in this scenario layout.";

    const descLines = doc.splitTextToSize(
      desc,
      cols[2].width - padX * 2
    ) as string[];
    const nameLines = doc.splitTextToSize(
      name,
      cols[0].width - padX * 2
    ) as string[];
    const rowLines = Math.max(descLines.length, nameLines.length, 1);
    const rowH = rowLines * 12 + 10;

    if (y + rowH > pageH - 56) {
      doc.addPage();
      y = drawHeader(doc, doc.internal.pageSize.getWidth(), marginX, arch.title);
      // redraw table header
      doc.setFillColor(PRIMARY);
      doc.rect(marginX, y, contentW, headerH, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      let hx = marginX;
      for (const col of cols) {
        doc.text(col.label, hx + padX, y + 15);
        hx += col.width;
      }
      y += headerH;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
    }

    if (zebra) {
      doc.setFillColor(248, 250, 252);
      doc.rect(marginX, y, contentW, rowH, "F");
    }
    zebra = !zebra;

    // borders
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.line(marginX, y + rowH, marginX + contentW, y + rowH);

    let cx = marginX;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text(nameLines, cx + padX, y + 14);

    cx += cols[0].width;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 112, 243);
    doc.text(tier, cx + padX, y + 14);

    cx += cols[1].width;
    doc.setTextColor(MUTED);
    doc.setTextColor(71, 85, 105);
    doc.text(descLines, cx + padX, y + 14);

    y += rowH;
  }

  // outer border
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.rect(marginX, startY, contentW, y - startY);

  // unused vars retain readability
  void ACCENT;
  void BORDER;

  return y;
}

export default ExportButton;
