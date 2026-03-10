/**
 * sync-client.ts — Template Demenageur
 * Lit CLIENT.md et genere src/config/client.config.ts
 * Usage: npm run sync-client
 */

import * as fs from "fs";
import * as path from "path";

var ROOT = path.resolve(__dirname, "..");
var CLIENT_MD = path.join(ROOT, "CLIENT.md");
var OUTPUT = path.join(ROOT, "src", "config", "client.config.ts");

function extractNumber(s: string): number {
  var match = s.match(/[\d.]+/);
  return match ? Number(match[0]) : 0;
}

function phoneToHref(phone: string): string {
  var digits = phone.replace(/\s+/g, "");
  if (digits.startsWith("0")) return "tel:+33" + digits.slice(1);
  return "tel:" + digits;
}

function esc(s: string): string {
  var result = s;
  result = result.split("\\").join("\\\\");
  result = result.split('"').join('\\"');
  return result;
}

function main() {
  if (!fs.existsSync(CLIENT_MD)) {
    console.warn("CLIENT.md introuvable - generation config par defaut.");
    var lines: string[] = [];
    lines.push("// FICHIER AUTO-GENERE - ne pas modifier manuellement");
    lines.push("// CLIENT.md introuvable - config par defaut generee");
    lines.push("");
    lines.push("export const clientConfig = {");
    lines.push('  NOM_ENTREPRISE: "",');
    lines.push('  NOM_LEGAL: "",');
    lines.push('  NOM_DIRIGEANT: "",');
    lines.push('  PRENOM_DIRIGEANT: "",');
    lines.push('  GENRE_DIRIGEANT: "masculin",');
    lines.push('  TELEPHONE: "",');
    lines.push('  TELEPHONE_HREF: "",');
    lines.push('  EMAIL: "",');
    lines.push('  ADRESSE: "",');
    lines.push('  VILLE: "",');
    lines.push('  CODE_POSTAL: "",');
    lines.push('  DEPARTEMENT: "",');
    lines.push('  REGION: "",');
    lines.push('  HORAIRES_SEMAINE: "8h - 18h",');
    lines.push('  HORAIRES_SAMEDI: "9h - 12h",');
    lines.push('  HORAIRES_DIMANCHE: "Ferme",');
    lines.push("  ANNEES_EXPERIENCE: 15,");
    lines.push("  NOMBRE_INTERVENTIONS: 500,");
    lines.push("  NOTE_GOOGLE: 4.8,");
    lines.push("  NOMBRE_AVIS: 45,");
    lines.push('  TAUX_SATISFACTION: "98",');
    lines.push("  ANNEE_CREATION: 2010,");
    lines.push('  SLOGAN: "",');
    lines.push('  DESCRIPTION_ENTREPRISE: "",');
    lines.push('  META_TITLE: "",');
    lines.push('  META_DESCRIPTION: "",');
    lines.push('  FACEBOOK_URL: "",');
    lines.push('  INSTAGRAM_URL: "",');
    lines.push('  GOOGLE_URL: "",');
    lines.push('  SIRET: "",');
    lines.push('  ZONE_INTERVENTION: "",');
    lines.push('  ZONE_KM: "30",');
    lines.push('  COULEUR_PRIMAIRE: "#2563eb",');
    lines.push('  COULEUR_SECONDAIRE: "#f59e0b",');
    lines.push('  ADMIN_PASSWORD: "admin123",');
    lines.push("} as const;");
    lines.push("");
    lines.push("export type ClientConfig = typeof clientConfig;");
    var dir = path.dirname(OUTPUT);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(OUTPUT, lines.join("\n"), "utf-8");
    console.log("client.config.ts par defaut genere -> " + OUTPUT);
    process.exit(0);
  }

  var content = fs.readFileSync(CLIENT_MD, "utf-8");
  var rawLines = content.split(/\r?\n/);
  var vars = new Map<string, string>();

  for (var i = 0; i < rawLines.length; i++) {
    var trimmed = rawLines[i].trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    var match = trimmed.match(/^([A-Z_0-9]+):\s*"(.*)"$/);
    if (match) vars.set(match[1], match[2]);
  }

  console.log("CLIENT.md lu (" + vars.size + " variables)");

  var get = function(key: string): string {
    return vars.get(key) || "";
  };

  var telephone = get("TELEPHONE");
  var telephoneHref = phoneToHref(telephone);
  var anneesExperience = extractNumber(get("ANNEES_EXPERIENCE")) || 15;
  var nombreInterventions = extractNumber(get("NOMBRE_INTERVENTIONS")) || 500;
  var noteGoogle = extractNumber(get("NOTE_GOOGLE")) || 4.8;
  var nombreAvis = extractNumber(get("NOMBRE_AVIS")) || 45;
  var tauxSatisfaction = get("TAUX_SATISFACTION").replace(/%/g, "").trim() || "98";
  var anneeCreation = extractNumber(get("ANNEE_CREATION")) || 2010;
  var nomEntreprise = get("NOM_ENTREPRISE");
  var nomLegal = get("NOM_LEGAL") || nomEntreprise;

  var out: string[] = [];
  out.push("// FICHIER AUTO-GENERE - ne pas modifier manuellement");
  out.push("// Modifie CLIENT.md puis relance : npm run sync-client");
  out.push("");
  out.push("export const clientConfig = {");
  out.push('  NOM_ENTREPRISE: "' + esc(nomEntreprise) + '",');
  out.push('  NOM_LEGAL: "' + esc(nomLegal) + '",');
  out.push('  NOM_DIRIGEANT: "' + esc(get("NOM_DIRIGEANT")) + '",');
  out.push('  PRENOM_DIRIGEANT: "' + esc(get("PRENOM_DIRIGEANT")) + '",');
  out.push('  GENRE_DIRIGEANT: "' + esc(get("GENRE_DIRIGEANT") || "masculin") + '",');
  out.push('  TELEPHONE: "' + esc(telephone) + '",');
  out.push('  TELEPHONE_HREF: "' + esc(telephoneHref) + '",');
  out.push('  EMAIL: "' + esc(get("EMAIL")) + '",');
  out.push('  ADRESSE: "' + esc(get("ADRESSE")) + '",');
  out.push('  VILLE: "' + esc(get("VILLE")) + '",');
  out.push('  CODE_POSTAL: "' + esc(get("CODE_POSTAL")) + '",');
  out.push('  DEPARTEMENT: "' + esc(get("DEPARTEMENT")) + '",');
  out.push('  REGION: "' + esc(get("REGION")) + '",');
  out.push('  HORAIRES_SEMAINE: "' + esc(get("HORAIRES_SEMAINE") || "8h - 18h") + '",');
  out.push('  HORAIRES_SAMEDI: "' + esc(get("HORAIRES_SAMEDI") || "9h - 12h") + '",');
  out.push('  HORAIRES_DIMANCHE: "' + esc(get("HORAIRES_DIMANCHE") || "Ferme") + '",');
  out.push("  ANNEES_EXPERIENCE: " + anneesExperience + ",");
  out.push("  NOMBRE_INTERVENTIONS: " + nombreInterventions + ",");
  out.push("  NOTE_GOOGLE: " + noteGoogle + ",");
  out.push("  NOMBRE_AVIS: " + nombreAvis + ",");
  out.push('  TAUX_SATISFACTION: "' + tauxSatisfaction + '",');
  out.push("  ANNEE_CREATION: " + anneeCreation + ",");
  out.push('  SLOGAN: "' + esc(get("SLOGAN")) + '",');
  out.push('  DESCRIPTION_ENTREPRISE: "' + esc(get("DESCRIPTION_ENTREPRISE")) + '",');
  out.push('  META_TITLE: "' + esc(get("META_TITLE")) + '",');
  out.push('  META_DESCRIPTION: "' + esc(get("META_DESCRIPTION")) + '",');
  out.push('  FACEBOOK_URL: "' + esc(get("FACEBOOK_URL")) + '",');
  out.push('  INSTAGRAM_URL: "' + esc(get("INSTAGRAM_URL")) + '",');
  out.push('  GOOGLE_URL: "' + esc(get("GOOGLE_URL")) + '",');
  out.push('  SIRET: "' + esc(get("SIRET")) + '",');
  out.push('  ZONE_INTERVENTION: "' + esc(get("ZONE_INTERVENTION")) + '",');
  out.push('  ZONE_KM: "' + esc(get("ZONE_KM") || "30") + '",');
  out.push('  COULEUR_PRIMAIRE: "' + esc(get("COULEUR_PRIMAIRE") || "#2563eb") + '",');
  out.push('  COULEUR_SECONDAIRE: "' + esc(get("COULEUR_SECONDAIRE") || "#f59e0b") + '",');
  out.push('  ADMIN_PASSWORD: "' + esc(get("ADMIN_PASSWORD") || "admin123") + '",');
  out.push("} as const;");
  out.push("");
  out.push("export type ClientConfig = typeof clientConfig;");

  var dir = path.dirname(OUTPUT);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(OUTPUT, out.join("\n"), "utf-8");
  console.log("client.config.ts genere -> " + OUTPUT);
}

main();
