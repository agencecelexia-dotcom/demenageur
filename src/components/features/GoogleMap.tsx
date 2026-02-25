import { company } from "@/data/company";
import { clientConfig } from "@/config/client.config";

export default function GoogleMap() {
  const query = encodeURIComponent(
    `${company.address.street}, ${company.address.postalCode} ${company.address.city}`
  );

  return (
    <div className="w-full h-64 rounded-2xl overflow-hidden border border-neutral-200">
      <iframe
        title={`${clientConfig.NOM_ENTREPRISE} - Localisation`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${query}&output=embed`}
      />
    </div>
  );
}
