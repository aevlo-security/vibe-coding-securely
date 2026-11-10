import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const approved = new Set(
  readFileSync("approved-packages.txt", "utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
);

const deps = { ...pkg.dependencies, ...pkg.devDependencies };

const unapproved = Object.keys(deps).filter((name) => !approved.has(name));
const unpinned = Object.entries(deps)
  .filter(([, version]) => /^[\^~><*]|latest|\.x/.test(version))
  .map(([name, version]) => `${name}@${version}`);

if (unapproved.length) {
  console.error("Unapproved dependencies:", unapproved.join(", "));
}
if (unpinned.length) {
  console.error("Unpinned versions:", unpinned.join(", "));
}
if (unapproved.length || unpinned.length) {
  process.exit(1);
}
console.log("Dependencies OK");
