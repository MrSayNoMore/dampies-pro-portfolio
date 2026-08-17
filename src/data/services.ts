import type { PhotoKey } from "./photos";

export type Service = {
  slug: string;
  name: string;
  short: string;
  description: string;
  examples: string[];
  cover: PhotoKey;
  gallery: PhotoKey[];
};

export const services: Service[] = [
  {
    slug: "renovations",
    name: "Renovations",
    short: "Existing spaces reworked, upgraded and finished properly.",
    description:
      "Renovation work across kitchens, bathrooms and living spaces — stripping back what needs to go, rebuilding it correctly and finishing it to a standard that holds up.",
    examples: ["Kitchen renovations", "Bathroom renovations", "Interior upgrades and re-fits"],
    cover: "kitchen-island-1",
    gallery: ["kitchen-island-2", "bath-suite", "room-done-2", "interior-room-1"],
  },
  {
    slug: "building",
    name: "Building",
    short: "Structural work, extensions and new roof structures.",
    description:
      "Building work from ground and block level through to timber framing, cladding and roof structures, including extensions to existing homes.",
    examples: ["Room extensions", "Block work", "Roof structures and sheeting"],
    cover: "frame-roof-3",
    gallery: ["blockwork-1", "frame-wall-2", "frame-roof-2", "roof-strip-1"],
  },
  {
    slug: "painting",
    name: "Painting",
    short: "Interior and exterior painting with clean preparation.",
    description:
      "Interior and exterior painting, including surface preparation, cutting in around new doors, frames and skirting, and protecting finished floors while work is under way.",
    examples: ["Interior painting", "Exterior wall painting", "Post-renovation repaints"],
    cover: "interior-paint-1",
    gallery: ["exterior-paint-1", "interior-door-3", "room-done-2", "interior-doors-1"],
  },
  {
    slug: "tiling",
    name: "Tiling",
    short: "Wall and floor tiling, mosaics and feature detailing.",
    description:
      "Large-format wall and floor tiling, mosaic feature bands, shower niches and level finishes with careful setting out around fittings and openings.",
    examples: ["Bathroom and shower tiling", "Floor tiling", "Mosaic feature detailing"],
    cover: "bath-shower-1",
    gallery: ["bath-niche", "bath-floor-tiles", "bath-marble", "finish-skirting-1"],
  },
  {
    slug: "carpentry",
    name: "Carpentry / Wood Structures",
    short: "Timber framing, carports and built-in cabinetry.",
    description:
      "Timber work from structural framing and roof beams to carports, pergola-style structures and built-in cupboards and cabinetry installed on site.",
    examples: ["Timber framing", "Carports and wood structures", "Built-in cupboards and cabinetry"],
    cover: "carport-build-1",
    gallery: ["frame-gable-2", "frame-roof-4", "wardrobe-1", "cabinetry-fit-2"],
  },
  {
    slug: "electrical",
    name: "Electrical / COC",
    short: "Electrical work and certificate of compliance.",
    description:
      "Electrical work as part of renovation and building projects, including lighting installations, and certificate of compliance (COC) work.",
    examples: ["Lighting installations", "Electrical work on renovations", "COC"],
    cover: "cabinetry-fit-3",
    gallery: ["kitchen-open", "bath-mirror-led", "room-done-1"],
  },
];

export const quoteServiceOptions = [
  "Renovation",
  "Building",
  "Painting",
  "Tiling",
  "Carpentry",
  "Electrical",
  "Other",
] as const;

export const startTimeframes = [
  "As soon as possible",
  "Within 1 month",
  "1–3 months",
  "Just planning",
] as const;
