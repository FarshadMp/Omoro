import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;

if (!FIGMA_ACCESS_TOKEN || !FIGMA_FILE_KEY) {
  console.error("Error: Missing configuration.");
  console.error("Please create a .env.local file with the following:");
  console.error("");
  console.error("FIGMA_ACCESS_TOKEN=your_token");
  console.error("FIGMA_FILE_KEY=your_file_key");
  console.error("");
  console.error("--- How to get them ---");
  console.error("1. Access Token:");
  console.error("   - Go to Figma -> Settings (click your profile pic)");
  console.error(
    '   - Scroll to "Personal Access Tokens" -> "Generate new token"'
  );
  console.error("2. File Key:");
  console.error("   - Open your Figma file in the browser");
  console.error(
    "   - Copy the ID from the URL: https://www.figma.com/file/THIS_IS_THE_KEY/Name..."
  );
  process.exit(1);
}

const BASE_URL = "https://api.figma.com/v1";
const OUTPUT_DIR = path.join(process.cwd(), "public", "assets", "figma");

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function fetchFigma(endpoint: string) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "X-Figma-Token": FIGMA_ACCESS_TOKEN!,
    },
  });

  if (!res.ok) {
    throw new Error(`Figma API Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

interface ExportSetting {
  suffix: string;
  format: "PNG" | "SVG" | "JPG" | "PDF";
  constraint: { type: string; value: number };
}

interface FigmaNode {
  id: string;
  name: string;
  type: string;
  exportSettings?: ExportSetting[];
  children?: FigmaNode[];
}

const exportableNodes: { id: string; name: string; format: string }[] = [];

function traverse(node: FigmaNode) {
  if (node.exportSettings && node.exportSettings.length > 0) {
    // Use the first export setting for simplicity, or prefer SVG for icons
    const setting =
      node.exportSettings.find((s) => s.format === "SVG") ||
      node.exportSettings[0];
    exportableNodes.push({
      id: node.id,
      name: node.name,
      format: setting.format.toLowerCase(),
    });
  }

  if (node.children) {
    node.children.forEach(traverse);
  }
}

async function downloadImage(url: string, filepath: string) {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  fs.writeFileSync(filepath, Buffer.from(buffer));
}

async function main() {
  console.log(`Fetching file: ${FIGMA_FILE_KEY}...`);
  const fileData = await fetchFigma(`/files/${FIGMA_FILE_KEY}`);

  console.log("Traversing document for exportable assets...");
  traverse(fileData.document);

  if (exportableNodes.length === 0) {
    console.log("No nodes with export settings found.");
    console.log(
      'Tip: Select layers in Figma and add an "Export" setting to them.'
    );
    return;
  }

  console.log(`Found ${exportableNodes.length} exportable assets.`);

  // Group by format to batch requests if needed (Figma API handles multiple IDs)
  // We'll just do one big batch for now, but URL length might be an issue if huge.
  // Let's chunk it just in case (e.g., 50 at a time).
  const CHUNK_SIZE = 50;

  for (let i = 0; i < exportableNodes.length; i += CHUNK_SIZE) {
    const chunk = exportableNodes.slice(i, i + CHUNK_SIZE);
    const ids = chunk.map((n) => n.id).join(",");

    // We need to group by format because the API takes one format parameter?
    // Actually GET /v1/images takes 'format' (default png).
    // If we have mixed formats, we need separate calls.

    // Regroup chunk by format
    const byFormat: Record<string, typeof chunk> = {};
    chunk.forEach((n) => {
      if (!byFormat[n.format]) byFormat[n.format] = [];
      byFormat[n.format].push(n);
    });

    for (const format of Object.keys(byFormat)) {
      const nodes = byFormat[format];
      const nodeIds = nodes.map((n) => n.id).join(",");

      console.log(`Getting URLs for ${nodes.length} ${format} assets...`);
      const imagesData = await fetchFigma(
        `/images/${FIGMA_FILE_KEY}?ids=${nodeIds}&format=${format}`
      );

      const urlMap = imagesData.images;

      for (const node of nodes) {
        const url = urlMap[node.id];
        if (url) {
          const filename = `${node.name.replace(
            /[^a-zA-Z0-9-_]/g,
            "_"
          )}.${format}`;
          const filepath = path.join(OUTPUT_DIR, filename);
          console.log(`Downloading ${filename}...`);
          await downloadImage(url, filepath);
        } else {
          console.warn(`Could not get URL for ${node.name} (${node.id})`);
        }
      }
    }
  }

  console.log("Done! Assets saved to public/assets/figma");
}

main().catch(console.error);
