import { photo, type PhotoKey } from "./photos";

export type ProjectTag =
  | "Renovations"
  | "Bathrooms"
  | "Kitchens"
  | "Painting"
  | "Building"
  | "Carpentry"
  | "Exterior";

export type ProjectImage = {
  key: PhotoKey;
  alt: string;
  caption?: string;
};

export type Stage = {
  label: "Before" | "Work in Progress" | "Completed";
  key: PhotoKey;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  tags: ProjectTag[];
  description: string;
  scope: string[];
  featured: boolean;
  cover: PhotoKey;
  images: ProjectImage[];
  stages?: Stage[];
  comparison?: { before: PhotoKey; after: PhotoKey; beforeAlt: string; afterAlt: string };
};

export const img = (key: PhotoKey) => photo[key];

export const projects: Project[] = [
  {
    slug: "modern-kitchen-transformation",
    title: "Modern Kitchen Transformation",
    category: "Kitchen Renovation",
    tags: ["Kitchens", "Renovations", "Carpentry"],
    description:
      "A complete kitchen transformation showing cabinetry, work surfaces, tiling, lighting and finishing details brought together in one space.",
    scope: [
      "Cabinetry and island construction",
      "Work surface installation",
      "Floor tiling and skirting",
      "Ceiling and lighting installation",
      "Painting and finishing",
    ],
    featured: true,
    cover: "kitchen-island-2",
    images: [
      { key: "kitchen-island-2", alt: "Finished kitchen with dark ribbed island and bar stools" },
      { key: "kitchen-island-1", alt: "Kitchen island with seating and glass-front upper cabinetry" },
      { key: "kitchen-island-3", alt: "Kitchen island viewed from the dining side" },
      { key: "kitchen-1", alt: "Kitchen with stainless appliances and island seating" },
      { key: "kitchen-stove", alt: "Gas hob, extractor and tiled splashback" },
      { key: "kitchen-counter", alt: "Close-up of the speckled stone work surface edge" },
      { key: "kitchen-open", alt: "Open plan kitchen and living area" },
      { key: "kitchen-sink-1", alt: "Corner sink run with black mixer tap" },
      { key: "kitchen-sink-2", alt: "Undermount sink and window splashback" },
      {
        key: "kitchen-fit-1",
        alt: "Kitchen units and island during installation",
        caption: "During installation",
      },
      { key: "kitchen-fit-2", alt: "Cabinetry being fitted before finishing", caption: "During installation" },
      { key: "kitchen-fit-3", alt: "Kitchen carcasses and island in place", caption: "During installation" },
      { key: "kitchen-fit-4", alt: "Kitchen installation nearing completion" },
      { key: "finish-skirting-1", alt: "Tiled floor with painted skirting detail" },
      { key: "finish-skirting-3", alt: "Close-up of skirting and wall finish" },
    ],
    stages: [
      { label: "Work in Progress", key: "kitchen-fit-3", alt: "Kitchen units during installation" },
      { label: "Completed", key: "kitchen-island-1", alt: "Completed kitchen with island" },
    ],
  },
  {
    slug: "complete-bathroom-transformation",
    title: "Complete Bathroom Transformation",
    category: "Bathroom Renovation",
    tags: ["Bathrooms", "Renovations"],
    description:
      "Bathroom work covering shower construction, large-format wall and floor tiling, mosaic feature banding, vanities, mirrors and sanitaryware.",
    scope: [
      "Shower build and waterproof detailing",
      "Large-format wall tiling with mosaic feature band",
      "Floor tiling",
      "Vanity, basin and mixer installation",
      "Mirror and lighting installation",
    ],
    featured: true,
    cover: "bath-shower-1",
    images: [
      { key: "bath-shower-1", alt: "Walk-in shower with mosaic feature band and dark floor tiles" },
      { key: "bath-shower-2", alt: "Shower corner detail with mosaic banding and recessed niche" },
      { key: "bath-shower-tiling", alt: "Shower floor tiling being completed", caption: "Selected project photography" },
      { key: "bath-shower-3", alt: "Shower enclosure with glass screen" },
      { key: "bath-niche", alt: "Recessed shower niche set into large-format tiling" },
      { key: "bath-floor-tiles", alt: "Dark mosaic shower floor with linear drain" },
      { key: "bath-suite", alt: "Bathroom with freestanding bath, vanity and wall-hung toilet" },
      { key: "bath-vanity-1", alt: "Marble-effect tiled wall with round mirror and basin" },
      { key: "bath-marble", alt: "Marble-effect tiling with black mixer" },
      { key: "bath-basin", alt: "Close-up of basin and black mixer tap" },
      { key: "bath-mirror-1", alt: "Vanity unit, basin and round mirror installed" },
      { key: "bath-mirror-2", alt: "Bathroom vanity with mirror during final clean" },
      { key: "bath-tub-1", alt: "Freestanding bath against grey marble-effect tiling with brass mixer" },
      { key: "bath-tub-2", alt: "Freestanding bath with lit niche detail" },
      { key: "bath-slat-1", alt: "Timber slat feature wall behind twin basins" },
      { key: "bath-slat-2", alt: "Basin and brass tapware against slat panelling" },
      { key: "bath-mirror-led", alt: "Round illuminated mirror being installed" },
      { key: "bath-basic", alt: "Tiled shower and basin in a compact bathroom" },
    ],
    stages: [
      { label: "Work in Progress", key: "bath-shower-tiling", alt: "Shower floor tiling in progress" },
      { label: "Completed", key: "bath-tub-1", alt: "Completed bathroom with freestanding bath" },
    ],
  },
  {
    slug: "interior-renovation-and-finishing",
    title: "Interior Renovation & Finishing",
    category: "Renovation & Painting",
    tags: ["Renovations", "Painting", "Carpentry"],
    description:
      "Interior work covering wall preparation and painting, door and frame installation, ceilings, floor finishes and built-in cupboards.",
    scope: [
      "Wall preparation and painting",
      "Door and frame installation",
      "Ceiling and cornice work",
      "Floor tiling and skirting",
      "Built-in cupboard installation",
    ],
    featured: true,
    cover: "room-done-1",
    images: [
      { key: "room-done-1", alt: "Finished bedroom with tiled floor and built-in cupboard" },
      { key: "room-done-2", alt: "Painted room with blinds and built-in cupboard" },
      { key: "wardrobe-1", alt: "White built-in cupboard installed against a painted wall" },
      { key: "interior-paint-1", alt: "Freshly painted interior with protective sheeting on the floor" },
      { key: "interior-doors-1", alt: "Interior doors installed during fit-out" },
      { key: "interior-room-1", alt: "Painted interior with new door opening" },
      { key: "interior-door-fit", alt: "Door being fitted on site", caption: "Selected project photography" },
      { key: "interior-door-2", alt: "Painted room with security door installed" },
      { key: "interior-door-3", alt: "Interior door and light switch after painting" },
      { key: "finish-skirting-1", alt: "Polished floor tiles with white skirting" },
      { key: "finish-skirting-2", alt: "Floor finishing work in a hallway" },
      { key: "finish-skirting-3", alt: "Skirting and wall finish detail" },
      { key: "bath-basic", alt: "Compact bathroom after renovation" },
    ],
    stages: [
      { label: "Work in Progress", key: "interior-paint-1", alt: "Interior painting in progress" },
      { label: "Completed", key: "room-done-2", alt: "Completed painted room" },
    ],
  },
  {
    slug: "building-and-carpentry-project",
    title: "Building & Carpentry Project",
    category: "Building & Carpentry",
    tags: ["Building", "Carpentry", "Renovations"],
    description:
      "Structural work from roof strip-out and timber framing through to cladding, roof sheeting and completed interior rooms.",
    scope: [
      "Roof strip-out and structural preparation",
      "Timber wall framing",
      "Insulated wall cladding",
      "Roof structure and sheeting",
      "Interior completion",
    ],
    featured: true,
    cover: "frame-roof-2",
    images: [
      { key: "roof-strip-1", alt: "Roof stripped back to timber battens", caption: "Before" },
      { key: "roof-strip-2", alt: "Roof structure exposed with geyser in place", caption: "Before" },
      { key: "frame-wall-1", alt: "Team fixing wall panels to a timber frame" },
      { key: "frame-wall-2", alt: "Timber frame with insulated wall panels going up" },
      { key: "frame-wall-3", alt: "Wall panel being positioned by the team" },
      { key: "frame-inside-1", alt: "Interior view of timber framing and cladding" },
      { key: "frame-clad-1", alt: "Clad exterior wall with new window opening" },
      { key: "frame-inside-2", alt: "Framed interior walls with roof structure above" },
      { key: "frame-roof-1", alt: "Carpenter fixing roof timbers" },
      { key: "frame-roof-2", alt: "Roof beams being installed over framed walls" },
      { key: "frame-roof-3", alt: "Completed timber frame with roof beams" },
      { key: "frame-roof-4", alt: "Carpenter setting a roof beam in place" },
      { key: "frame-gable-1", alt: "Gable framing on a new extension" },
      { key: "frame-gable-2", alt: "Carpenter working on gable framing" },
      { key: "frame-gable-3", alt: "Timber structure taking shape on site" },
      { key: "blockwork-1", alt: "Block walls and timber roof structure under construction" },
      { key: "room-done-1", alt: "Completed room inside the new structure", caption: "Completed" },
    ],
    stages: [
      { label: "Before", key: "roof-strip-1", alt: "Roof stripped back to timber battens" },
      { label: "Work in Progress", key: "frame-roof-2", alt: "Roof beams being installed" },
      { label: "Completed", key: "room-done-1", alt: "Completed interior room" },
    ],
  },
  {
    slug: "exterior-and-property-improvements",
    title: "Exterior & Property Improvements",
    category: "Exterior Work",
    tags: ["Exterior", "Building", "Painting"],
    description:
      "Exterior improvements including driveway paving from ground preparation to laid finish, carport structures and exterior painting.",
    scope: [
      "Site and ground preparation",
      "Paving laying and cutting",
      "Carport structure and roof sheeting",
      "Exterior painting",
    ],
    featured: true,
    cover: "paving-after-1",
    images: [
      { key: "paving-before-1", alt: "Grassed side area before paving", caption: "Before" },
      { key: "paving-before-2", alt: "Property access strip before paving", caption: "Before" },
      { key: "paving-lay-1", alt: "Team laying paving with water", caption: "Work in progress" },
      { key: "paving-progress-1", alt: "Paving being laid across the driveway", caption: "Work in progress" },
      { key: "paving-progress-2", alt: "Paving pattern taking shape", caption: "Work in progress" },
      { key: "paving-after-1", alt: "Completed paved driveway", caption: "Completed" },
      { key: "paving-after-2", alt: "Completed paving viewed along the property", caption: "Completed" },
      { key: "paving-before-4", alt: "Open grassed area before work started" },
      { key: "paving-before-5", alt: "Side of the property before paving" },
      { key: "carport-build-1", alt: "Carport timber structure with roof sheeting" },
      { key: "carport-build-2", alt: "Carport under construction over a paved area" },
      { key: "carport-build-3", alt: "Carport structure with team on site" },
      { key: "roof-work-1", alt: "Roof sheeting being fixed above a carport" },
      { key: "exterior-paint-1", alt: "Exterior wall painted in dark grey with new door and window" },
    ],
    comparison: {
      before: "paving-before-1",
      after: "paving-after-1",
      beforeAlt: "Side area before paving",
      afterAlt: "Same area after paving was completed",
    },
    stages: [
      { label: "Before", key: "paving-before-1", alt: "Area before paving" },
      { label: "Work in Progress", key: "paving-progress-1", alt: "Paving being laid" },
      { label: "Completed", key: "paving-after-1", alt: "Completed paved driveway" },
    ],
  },
  {
    slug: "cabinetry-and-fittings-installation",
    title: "Cabinetry & Fittings Installation",
    category: "Carpentry & Installations",
    tags: ["Carpentry", "Kitchens", "Renovations"],
    description:
      "Cabinetry and fittings installed on site, from setting units and carcasses through to ceilings, lighting and final finishes.",
    scope: [
      "Cabinet setting and levelling",
      "Ceiling and lighting installation",
      "Cupboard and shelving installation",
      "Finishing and clean-up",
    ],
    featured: false,
    cover: "cabinetry-fit-2",
    images: [
      { key: "cabinetry-fit-2", alt: "Cabinet carcasses set out under a new ceiling" },
      { key: "cabinetry-fit-1", alt: "Team member fitting a cabinet upright" },
      { key: "cabinetry-fit-3", alt: "Cabinetry installation with ceiling completed" },
      { key: "kitchen-fit-4", alt: "Cabinetry and island fitted before finishing" },
      { key: "wardrobe-1", alt: "Built-in cupboard installed in a bedroom" },
    ],
  },
];

export const projectTags: ("All" | ProjectTag)[] = [
  "All",
  "Renovations",
  "Bathrooms",
  "Kitchens",
  "Painting",
  "Building",
  "Carpentry",
  "Exterior",
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);
