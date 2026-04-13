const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(__dirname, "..", "data", "dictionary.jsonl");

let dictionaryCache;
let indexCache;

function loadDictionary() {
  if (dictionaryCache) {
    return dictionaryCache;
  }

  const raw = fs.readFileSync(DATA_PATH, "utf8");
  const lines = raw.split(/\r?\n/).filter(Boolean);

  dictionaryCache = lines.map((line) => JSON.parse(line));
  return dictionaryCache;
}

function buildIndexes() {
  if (indexCache) {
    return indexCache;
  }

  const dictionary = loadDictionary();
  const byBn = new Map();
  const byRomanised = new Map();

  for (const entry of dictionary) {
    const bnKey = normalize(entry.bn, false);
    const romanisedKey = normalize(entry.romanised, true);

    if (bnKey) {
      const list = byBn.get(bnKey) || [];
      list.push(entry);
      byBn.set(bnKey, list);
    }

    if (romanisedKey) {
      const list = byRomanised.get(romanisedKey) || [];
      list.push(entry);
      byRomanised.set(romanisedKey, list);
    }
  }

  indexCache = { byBn, byRomanised };
  return indexCache;
}

function normalize(input, lowercase) {
  if (typeof input !== "string") {
    return "";
  }

  const value = input.trim();
  return lowercase ? value.toLowerCase() : value;
}

function translate(input) {
  const { byBn, byRomanised } = buildIndexes();
  const bnKey = normalize(input, false);
  const romanisedKey = normalize(input, true);

  const matchMap = new Map();

  for (const item of byBn.get(bnKey) || []) {
    matchMap.set(JSON.stringify(item), item);
  }

  for (const item of byRomanised.get(romanisedKey) || []) {
    matchMap.set(JSON.stringify(item), item);
  }

  return Array.from(matchMap.values());
}

module.exports = {
  translate,
  get dictionary() {
    return loadDictionary();
  }
};
