// Unit test copyTextToClipboard (src/lib/copy-text.ts).
// Dijalankan: node --experimental-strip-types scripts/test-copy-text.ts
import { copyTextToClipboard } from "../src/lib/copy-text.ts";

let passed = 0;
let failed = 0;
function ok(name: string, cond: boolean) {
  if (cond) {
    passed++;
    console.log(`  ✓ ${name}`);
  } else {
    failed++;
    console.log(`  ✗ ${name}`);
  }
}

function setGlobal(key: string, value: unknown) {
  // Node 24 punya global navigator bawaan (getter-only) → override via defineProperty.
  Object.defineProperty(globalThis, key, {
    value,
    writable: true,
    configurable: true,
    enumerable: true,
  });
}

function resetGlobals() {
  setGlobal("navigator", undefined);
  setGlobal("document", undefined);
}

// 1. Pakai navigator.clipboard.writeText bila tersedia.
resetGlobals();
const clipboardStub = {
  written: "",
  async writeText(t: string) {
    clipboardStub.written = t;
  },
};
setGlobal("navigator", { clipboard: clipboardStub });
{
  const text = "بِسْمِ اللَّهِ";
  const result = await copyTextToClipboard(text);
  ok(
    "clipboard API: resolve true dan teks persis tersalin",
    result === true && clipboardStub.written === text,
  );
}

// 2. Fallback execCommand bila clipboard API tidak ada.
resetGlobals();
let copiedViaFallback = "";
let textareaRemoved = false;
const documentStub = {
  body: {
    appendChild() {},
    removeChild() {
      textareaRemoved = true;
    },
  },
  createElement() {
    return {
      value: "",
      style: {} as Record<string, string>,
      select(this: { value: string }) {
        copiedViaFallback = this.value;
      },
      setAttribute() {},
    };
  },
  execCommand(cmd: string) {
    return cmd === "copy";
  },
};
setGlobal("document", documentStub);
{
  const result = await copyTextToClipboard("teks terjemah");
  ok(
    "fallback: resolve true, teks tersalin, textarea dibersihkan",
    result === true && copiedViaFallback === "teks terjemah" && textareaRemoved,
  );
}

// 3. clipboard.writeText gagal lalu fallback juga gagal → false.
resetGlobals();
setGlobal("navigator", {
  clipboard: {
    async writeText(): Promise<void> {
      throw new Error("denied");
    },
  },
});
setGlobal("document", {
  body: { appendChild() {}, removeChild() {} },
  createElement() {
    return { value: "", style: {}, select() {}, setAttribute() {} };
  },
  execCommand() {
    return false;
  },
});
{
  const result = await copyTextToClipboard("apa pun");
  ok("semua jalur gagal: resolve false", result === false);
}

// 4. Tidak ada clipboard API dan tidak ada document → false (mis. SSR).
resetGlobals();
{
  const result = await copyTextToClipboard("apa pun");
  ok("tanpa navigator & document: resolve false", result === false);
}

// 5. navigator.clipboard ada tapi writeText bukan fungsi → pakai fallback.
resetGlobals();
let fallbackUsed5 = false;
let removed5 = false;
setGlobal("navigator", { clipboard: {} });
setGlobal("document", {
  body: {
    appendChild() {},
    removeChild() {
      removed5 = true;
    },
  },
  createElement() {
    return {
      value: "",
      style: {},
      select() {
        fallbackUsed5 = true;
      },
      setAttribute() {},
    };
  },
  execCommand() {
    return true;
  },
});
{
  const result = await copyTextToClipboard("fallback dong");
  ok(
    "writeText bukan fungsi: fallback dipakai, resolve true",
    result === true && fallbackUsed5 && removed5,
  );
}

// 6. execCommand me-throw → false DAN textarea tetap dibersihkan.
resetGlobals();
let removed6 = false;
setGlobal("document", {
  body: {
    appendChild() {},
    removeChild() {
      removed6 = true;
    },
  },
  createElement() {
    return { value: "", style: {}, select() {}, setAttribute() {} };
  },
  execCommand(): boolean {
    throw new Error("boom");
  },
});
{
  const result = await copyTextToClipboard("apa pun");
  ok(
    "execCommand throw: resolve false, textarea tetap dibersihkan",
    result === false && removed6,
  );
}

console.log(`\n${passed} lulus, ${failed} gagal`);
if (failed > 0) process.exit(1);
