import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-star review of Monday, written as if Monday were a restaurant.
// Single line, plain text: a table, a dish and a bill that went wrong.
const ENTRY =
  "One star. Waited forty minutes for a table, got served a cold plate of meetings, and the waiter charged me the whole weekend.";
const MAX_CHARS = 180;

if (ENTRY.length > MAX_CHARS) {
  throw new Error(`entry too long: ${ENTRY.length} > ${MAX_CHARS}`);
}
const words = ENTRY.trim().split(/\s+/).length;
if (words > 25) {
  throw new Error(`entry too wordy: ${words} > 25`);
}
if (/\n/.test(ENTRY)) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
