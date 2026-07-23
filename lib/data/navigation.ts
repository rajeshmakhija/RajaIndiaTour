export const circuitRegions = [
  {
    slug: "ladakh",
    label: "Ladakh",
    description: "Himalaya, monastères tibétains et paysages lunaires du Ladakh.",
  },
  {
    slug: "rajasthan",
    label: "Rajasthan",
    description: "Palais, désert du Thar et cités royales du Rajasthan.",
  },
  {
    slug: "nord",
    label: "L'Inde du Nord",
    description: "Delhi, Taj Mahal, Jaipur et les trésors du nord indien.",
  },
  {
    slug: "sud",
    label: "L'Inde du Sud",
    description: "Kerala, Tamil Nadu et les backwaters du sud de l'Inde.",
  },
  {
    slug: "madhya-pradesh",
    label: "Madhya Pradesh",
    description: "Inde centrale — Khajuraho, Orchha, Bhopal et parcs nationaux.",
  },
  {
    slug: "nepal",
    label: "Népal",
    description: "Kathmandou, Annapurna et l'Himalaya népalais avec Raja.",
  },
  {
    slug: "bhoutan",
    label: "Bhoutan",
    description: "Monastères, dzongs et le royaume du Bonheur National Brut.",
  },
] as const;

export const circuitMenuItems = circuitRegions.map((region) => ({
  label: region.label,
  href: `/destinations/${region.slug}`,
}));
