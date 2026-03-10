/**
 * sync-client.ts -- Template Demenageur
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

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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
    lines.push('  SIRET: "",');
    lines.push('  METIER: "demenageur",');
    lines.push('  METIER_LABEL: "Demenageur",');
    lines.push('  GENRE_DIRIGEANT: "M",');
    lines.push('  PRENOM_DIRIGEANT: "",');
    lines.push('  NOM_DIRIGEANT: "",');
    lines.push('  ANNEE_CREATION: "2010",');
    lines.push('  ANNEES_EXPERIENCE: "15",');
    lines.push('  TELEPHONE: "",');
    lines.push('  TELEPHONE_HREF: "",');
    lines.push('  EMAIL: "",');
    lines.push('  ADRESSE: "",');
    lines.push('  CODE_POSTAL: "",');
    lines.push('  VILLE: "",');
    lines.push('  DEPARTEMENT: "",');
    lines.push('  REGION: "",');
    lines.push('  COMMUNE_1: "",');
    lines.push('  COMMUNE_2: "",');
    lines.push('  COMMUNE_3: "",');
    lines.push('  FONDATEUR_NOM: "",');
    lines.push('  PAYS: "France",');
    lines.push('  HORAIRES: "Lun-Ven: 8h00-18h00",');
    lines.push('  HORAIRES_SEMAINE: "8h - 18h",');
    lines.push('  HORAIRES_SAMEDI: "9h - 12h",');
    lines.push('  HORAIRES_DIMANCHE: "Ferme",');
    lines.push('  ZONE_INTERVENTION: "",');
    lines.push('  ZONE_KM: "30",');
    lines.push('  LATITUDE: "46.603354",');
    lines.push('  LONGITUDE: "1.888334",');
    lines.push('  DOMAINE: "www.example.fr",');
    lines.push('  NOMBRE_INTERVENTIONS: 500,');
    lines.push('  NOTE_GOOGLE: 4.8,');
    lines.push('  NOMBRE_AVIS: 45,');
    lines.push('  TAUX_SATISFACTION: "98",');
    lines.push('  META_TITLE: "",');
    lines.push('  META_DESCRIPTION: "",');
    lines.push('  META_KEYWORDS: "demenageur, demenagement",');
    lines.push('  SLOGAN: "",');
    lines.push('  ACCROCHE_HERO: "",');
    lines.push('  DESCRIPTION_ENTREPRISE: "",');
    lines.push('  DESCRIPTION_FOOTER: "",');
    lines.push('  DESCRIPTION_APROPOS: "",');
    lines.push('  GOOGLE_MAPS_URL: "",');
    lines.push('  FACEBOOK_URL: "",');
    lines.push('  INSTAGRAM_URL: "",');
    lines.push('  LINKEDIN_URL: "",');
    lines.push('  GOOGLE_URL: "",');
    lines.push('  N8N_WEBHOOK: "",');
    lines.push('  COULEUR_PRIMAIRE: "#2563eb",');
    lines.push('  COULEUR_SECONDAIRE: "#f59e0b",');
    lines.push('  ADMIN_PASSWORD: "admin123",');
    lines.push("} as const;");
    lines.push("");
    lines.push("export type ClientConfig = typeof clientConfig;");
    lines.push("export type ClientConfigKey = keyof typeof clientConfig;");
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
  var ville = get("VILLE");
  var departement = get("DEPARTEMENT");
  var region = get("REGION");
  var prenomDirigeant = get("PRENOM_DIRIGEANT");
  var nomDirigeant = get("NOM_DIRIGEANT");
  var fondateurNom = get("FONDATEUR_NOM") || (prenomDirigeant + " " + nomDirigeant).trim();

  // Derive DOMAINE from CLIENT.md or slugify company name
  var domaine = get("DOMAINE") || ("www." + slugify(nomEntreprise) + ".fr");

  // METIER fields
  var metier = get("METIER") || "demenageur";
  var metierLabel = get("METIER_LABEL") || (metier.charAt(0).toUpperCase() + metier.slice(1));

  // Commune fields - derive from ZONE_INTERVENTION if not set
  var zoneIntervention = get("ZONE_INTERVENTION");
  var communes = zoneIntervention.split(",").map(function(c: string) { return c.trim(); }).filter(function(c: string) { return c !== "" && c !== ville; });
  var commune1 = get("COMMUNE_1") || (communes.length > 0 ? communes[0] : "");
  var commune2 = get("COMMUNE_2") || (communes.length > 1 ? communes[1] : "");
  var commune3 = get("COMMUNE_3") || (communes.length > 2 ? communes[2] : "");

  var pays = get("PAYS") || "France";
  var latitude = get("LATITUDE") || "46.603354";
  var longitude = get("LONGITUDE") || "1.888334";

  // Horaires: template expects single HORAIRES field
  var horaires = get("HORAIRES") || ("Lun-Ven: " + (get("HORAIRES_SEMAINE") || "8h - 18h") + ", Sam: " + (get("HORAIRES_SAMEDI") || "9h - 12h"));

  // SEO / description fields
  var metaKeywords = get("META_KEYWORDS") || ("demenageur, demenagement, " + ville + ", " + departement);
  var accrocheHero = get("ACCROCHE_HERO") || ("Demenagement - " + ville + " & " + region);
  var descriptionFooter = get("DESCRIPTION_FOOTER") || (nomEntreprise + ", votre demenageur de confiance a " + ville + ".");
  var descriptionApropos = get("DESCRIPTION_APROPOS") || ("Fondee par " + fondateurNom + ", " + nomEntreprise + " accompagne les particuliers et professionnels dans leurs demenagements depuis " + anneeCreation + ".");

  var out: string[] = [];
  out.push("// FICHIER AUTO-GENERE - ne pas modifier manuellement");
  out.push("// Modifie CLIENT.md puis relance : npm run sync-client");
  out.push("");
  out.push("export const clientConfig = {");
  out.push('  NOM_ENTREPRISE: "' + esc(nomEntreprise) + '",');
  out.push('  NOM_LEGAL: "' + esc(nomLegal) + '",');
  out.push('  SIRET: "' + esc(get("SIRET")) + '",');
  out.push('  METIER: "' + esc(metier) + '",');
  out.push('  METIER_LABEL: "' + esc(metierLabel) + '",');
  out.push('  GENRE_DIRIGEANT: "' + esc(get("GENRE_DIRIGEANT") || "M") + '",');
  out.push('  PRENOM_DIRIGEANT: "' + esc(prenomDirigeant) + '",');
  out.push('  NOM_DIRIGEANT: "' + esc(nomDirigeant) + '",');
  out.push('  ANNEE_CREATION: "' + anneeCreation + '",');
  out.push('  ANNEES_EXPERIENCE: "' + anneesExperience + '",');
  out.push('  TELEPHONE: "' + esc(telephone) + '",');
  out.push('  TELEPHONE_HREF: "' + esc(telephoneHref) + '",');
  out.push('  EMAIL: "' + esc(get("EMAIL")) + '",');
  out.push('  ADRESSE: "' + esc(get("ADRESSE")) + '",');
  out.push('  CODE_POSTAL: "' + esc(get("CODE_POSTAL")) + '",');
  out.push('  VILLE: "' + esc(ville) + '",');
  out.push('  DEPARTEMENT: "' + esc(departement) + '",');
  out.push('  REGION: "' + esc(region) + '",');
  out.push('  COMMUNE_1: "' + esc(commune1) + '",');
  out.push('  COMMUNE_2: "' + esc(commune2) + '",');
  out.push('  COMMUNE_3: "' + esc(commune3) + '",');
  out.push('  FONDATEUR_NOM: "' + esc(fondateurNom) + '",');
  out.push('  PAYS: "' + esc(pays) + '",');
  out.push('  HORAIRES: "' + esc(horaires) + '",');
  out.push('  HORAIRES_SEMAINE: "' + esc(get("HORAIRES_SEMAINE") || "8h - 18h") + '",');
  out.push('  HORAIRES_SAMEDI: "' + esc(get("HORAIRES_SAMEDI") || "9h - 12h") + '",');
  out.push('  HORAIRES_DIMANCHE: "' + esc(get("HORAIRES_DIMANCHE") || "Ferme") + '",');
  out.push('  ZONE_INTERVENTION: "' + esc(zoneIntervention) + '",');
  out.push('  ZONE_KM: "' + esc(get("ZONE_KM") || "30") + '",');
  out.push('  LATITUDE: "' + esc(latitude) + '",');
  out.push('  LONGITUDE: "' + esc(longitude) + '",');
  out.push('  DOMAINE: "' + esc(domaine) + '",');
  out.push("  NOMBRE_INTERVENTIONS: " + nombreInterventions + ",");
  out.push("  NOTE_GOOGLE: " + noteGoogle + ",");
  out.push("  NOMBRE_AVIS: " + nombreAvis + ",");
  out.push('  TAUX_SATISFACTION: "' + tauxSatisfaction + '",');
  out.push('  META_TITLE: "' + esc(get("META_TITLE")) + '",');
  out.push('  META_DESCRIPTION: "' + esc(get("META_DESCRIPTION")) + '",');
  out.push('  META_KEYWORDS: "' + esc(metaKeywords) + '",');
  out.push('  SLOGAN: "' + esc(get("SLOGAN")) + '",');
  out.push('  ACCROCHE_HERO: "' + esc(accrocheHero) + '",');
  out.push('  DESCRIPTION_ENTREPRISE: "' + esc(get("DESCRIPTION_ENTREPRISE")) + '",');
  out.push('  DESCRIPTION_FOOTER: "' + esc(descriptionFooter) + '",');
  out.push('  DESCRIPTION_APROPOS: "' + esc(descriptionApropos) + '",');
  out.push('  GOOGLE_MAPS_URL: "' + esc(get("GOOGLE_MAPS_URL")) + '",');
  out.push('  FACEBOOK_URL: "' + esc(get("FACEBOOK_URL")) + '",');
  out.push('  INSTAGRAM_URL: "' + esc(get("INSTAGRAM_URL")) + '",');
  out.push('  LINKEDIN_URL: "' + esc(get("LINKEDIN_URL")) + '",');
  out.push('  GOOGLE_URL: "' + esc(get("GOOGLE_URL")) + '",');
  out.push('  N8N_WEBHOOK: "' + esc(get("N8N_WEBHOOK")) + '",');
  out.push('  COULEUR_PRIMAIRE: "' + esc(get("COULEUR_PRIMAIRE") || "#2563eb") + '",');
  out.push('  COULEUR_SECONDAIRE: "' + esc(get("COULEUR_SECONDAIRE") || "#f59e0b") + '",');
  out.push('  ADMIN_PASSWORD: "' + esc(get("ADMIN_PASSWORD") || "admin123") + '",');
  out.push("} as const;");
  out.push("");
  out.push("export type ClientConfig = typeof clientConfig;");
  out.push("export type ClientConfigKey = keyof typeof clientConfig;");

  var dir = path.dirname(OUTPUT);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(OUTPUT, out.join("\n"), "utf-8");
  console.log("client.config.ts genere -> " + OUTPUT);
}

main();
