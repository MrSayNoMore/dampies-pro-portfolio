export const site = {
  name: "Dampies & Sons Pro Projects",
  shortName: "Dampies & Sons",
  tagline: "Building. Renovating. Transforming.",
  phone: "+27 62 592 7737",
  phoneHref: "tel:+27625927737",
  whatsappNumber: "27625927737",
  email: "deetinstall21@gmail.com",
  emailHref: "mailto:deetinstall21@gmail.com",
  address: "5 Christine Close, Brentwood Park, Bloedow(ns)",
  facebookUrl: "https://www.facebook.com/people/Dampies-and-Sons-Pro-Projects/",
  facebookFollowers: "64K+",
  registration: "Incorporated in the Republic of South Africa — 2022/418801/07",
} as const;

export const whatsappMessage =
  "Hi Dampies & Sons Pro Projects, I would like to enquire about a project.";

export function whatsappLink(message: string = whatsappMessage) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
