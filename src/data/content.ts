export const companyInfo = {
  name: "Emsurg Healthcare (India) Pvt. Ltd.",
  shortName: "Emsurg Healthcare",
  rdEntity: "Emsurg Bioscience India Pvt. Ltd.",
  founded: "2010",
  headquarters: "Kolkata",
  phone: "+91 33-2537-0069",
  whatsapp: "+91 7439757452",
  email: "info@emsurghealthcare.com",
  hours: "Monday–Friday, 9:00 AM–4:00 PM",
  mission: "Advancing healthcare with innovation, integrity and expertise.",
  vision: "Engineering better outcomes through medical innovation and care.",
};

export const locations = [
  {
    type: "REGISTERED OFFICE",
    address: "30, Joy Gopal Das Road, Sodepur, Kolkata 700110",
  },
  {
    type: "CORPORATE OFFICE",
    address: "8/2/74/1B, Sachi Apartment, Aravinda Sarani, East Kamalapur, Dumdum, Kolkata 700028",
  },
  {
    type: "MANUFACTURING UNIT 2",
    company: "Emsurg Healthcare (India) Pvt. Ltd.",
    address: "Board Ghar, Bilkanda, Talbanda, Kolkata 700110",
  },
  {
    type: "MANUFACTURING & R&D UNIT 1",
    company: "Emsurg Bioscience India Pvt. Ltd.",
    address: "Chand Dalal Ghat Road, Panihati, Kolkata 700114",
  },
];

export const products = [
  {
    id: "bonesurg-cr",
    name: "BoneSurg CR",
    category: "Orthobiologics",
    tagline: "The Rapid, Resorbable Calcium Sulphate System for Local Antibiotic Delivery and Bone Preservation",
    features: [
      "Resorbable calcium sulphate hemihydrate",
      "Local delivery",
      "CDSCO approved",
      "Bead customization",
      "Physician-selected antibacterial agent",
      "High purity",
    ],
    isManufactured: true,
  },
  {
    id: "bonesurg-ha",
    name: "BoneSurg HA",
    category: "Orthobiologics",
    tagline: "Nanocrystalline Hydroxyapatite for Effortless Bone Defect Filling and True Bone Regeneration",
    features: [
      "Nanocrystalline hydroxyapatite",
      "Osteoconductive",
      "CDSCO approved",
      "Excellent biocompatibility",
      "Bone defect filling",
    ],
    isManufactured: true,
  },
  {
    id: "em-vac",
    name: "EM-VAC",
    category: "Wound Management",
    tagline: "Advanced Negative Pressure Wound Therapy",
    features: [
      "Macro-deformation",
      "Micro-deformation",
      "Angiogenesis",
      "Granulation tissue formation",
    ],
    isManufactured: true,
  },
  {
    id: "hemodialysis",
    name: "Hemodialysis Fluids & Powder Concentrates",
    category: "Nephro Care",
    tagline: "Reliable Dialysis Solutions for Modern Healthcare",
    features: ["Hemodialysis fluids", "Powder concentrates", "Dialysis consumables", "Equipment/channel support"],
    partner: "Fresenius",
    isManufactured: true, 
  },
  {
    id: "mdl-biopsy",
    name: "MDL Portfolio",
    category: "Biopsy Devices",
    tagline: "Precision Biopsy Devices for Clinical Practice",
    partner: "MDL",
    partnerType: "Exclusive Import Relationship",
    products: ["ILLY", "JAM BLU", "OSTEOJ", "PICK UP", "HARVEST", "SEMICUT", "THEMY", "THEMYQ"]
  },
  {
    id: "opacity-plus",
    name: "OPACITY+®",
    category: "Bone Cements",
    tagline: "Bone Cement Solutions for Spine Procedures",
    partner: "Teknimed, France",
    partnerType: "Exclusive Import Relationship",
    features: ["Low-viscosity PMMA", "50% radiopacity", "Vertebroplasty", "Kyphoplasty", "Two-part system", "ISO 10993-1", "45% Zirconium Dioxide", "5% Hydroxyapatite"]
  },
  {
    id: "smith-nephew",
    name: "Smith & Nephew Portfolio",
    category: "Sports Medicine",
    tagline: "Advanced Sports Medicine Solutions",
    partner: "Smith & Nephew",
    partnerType: "Channel Partner",
    joints: ["SHOULDER", "KNEE", "HIP", "FOOT & ANKLE"],
    products: ["REGENETEN", "NOVOSTITCH PRO", "ULTRABUTTON", "FAST-FIX FLEX", "WEREWOLF FASTSEAL 6.0", "INTELLIO", "CAP-FIX"]
  }
];

export const partners = [
  { name: "Smith & Nephew", type: "CHANNEL PARTNER" },
  { name: "Fresenius", type: "CHANNEL PARTNER" },
  { name: "Teknimed", type: "EXCLUSIVE IMPORT RELATIONSHIP", country: "France" },
  { name: "MDL", type: "EXCLUSIVE IMPORT RELATIONSHIP", country: "Italy" },
  { name: "Tecres", type: "COLLABORATING PARTNER" },
];

export const clients = [
  "Apollo Hospitals",
  "Fortis Hospitals",
  "Narayana Health",
  "Manipal Hospitals",
  "CMRI / Woodlands",
  "CK Birla Hospitals"
];

export const rdpillars = [
  {
    title: "GRANULE DEVELOPMENT",
    points: ["Orthopaedic bone granules", "Biocompatibility", "Particle size", "Texture", "Absorption rate", "Bone regeneration"]
  },
  {
    title: "CITRIC ACID RESEARCH",
    points: ["Aspergillus niger fermentation", "Yield efficiency", "Green chemistry", "Strain improvement", "Fermentation optimization", "Purification"]
  },
  {
    title: "WOUND HEALING ADVANCEMENTS",
    points: ["Next-generation NPWT", "Quieter systems", "Efficiency", "Ease of use", "Biocompatible dressings"]
  }
];

export const whyChoose = [
  "INDIGENOUS MANUFACTURING",
  "GLOBAL COLLABORATIONS",
  "RESEARCH & INNOVATION",
  "ETHICAL EXCELLENCE",
  "EDUCATION & TRAINING",
  "CUSTOMER-CENTRIC APPROACH"
];

export const timeline = [
  { year: "2010", description: "Founded in Kolkata. Initial focus on biologics, vertebroplasty and kyphoplasty." },
  { year: "2012", description: "Smith & Nephew channel partnership." },
  { year: "2020", description: "Indigenous manufacturing facility established for dry citrate powder and hemodialysate." },
  { year: "2023", description: "Diversification into wound care materials and orthopaedic biologics." },
  { year: "2024", description: "Manufacturing and marketing of NPWT machines." },
];
