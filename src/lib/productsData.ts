export interface ProductItem {
  id: string;
  slug: string;
  title: string;
  division: "Manufacturing" | "Channel Partner";
  category: string;
  subCategory?: string;
  partnerBrand?: string;
  description: string;
  indications?: string;
  features?: string[];
  certifications?: string;
  isUpcoming?: boolean;
  featured?: boolean;
  orderIndex?: number;
  image: string;
  images?: string[];
}

export const EMSURG_CATALOG: ProductItem[] = [
  // ==========================================
  // DIVISION 1: INDIGENOUS MANUFACTURING
  // ==========================================
  // A. Nephrology
  {
    id: "m-neph-1",
    slug: "dialysis-fluid-drycitrate",
    title: "Dialysis Fluid & Drycitrate Powder",
    division: "Manufacturing",
    category: "Nephrology",
    description: "Ultra-pure hemodialysis liquid acid concentrates and dry citrate bicarbonate powder cartridges formulated for high-flux renal dialysis.",
    certifications: "WHO-GMP · Pharmacopeial Grade",
    features: [
      "Sub-micron double RO filtration",
      "Closed-loop cleanroom filling",
      "Compatible with leading dialysis systems"
    ],
    featured: true,
    orderIndex: 0,
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "m-neph-2",
    slug: "nacl-salt-tablet",
    title: "NaCl Salt Tablets",
    division: "Manufacturing",
    category: "Nephrology",
    description: "High-density, low-dust refined sodium chloride tablets for industrial water softening and hemodialysis pre-treatment systems.",
    certifications: "ISO 9001 · High Purity NaCl",
    features: [
      "Uniform compaction",
      "Rapid uniform dissolution",
      "Prevents resin bed fouling"
    ],
    featured: false,
    orderIndex: 1,
    image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "m-neph-3",
    slug: "aquasurg",
    title: "Aquasurg",
    division: "Manufacturing",
    category: "Nephrology",
    description: "Specialized cold sterilant and disinfectant formulated for hemodialysis machines, reprocessing units, and water distribution loops.",
    certifications: "Clinical Disinfection Grade",
    features: [
      "Bactericidal, virucidal & sporicidal",
      "Rapid rinse-out profile",
      "Non-corrosive to dialysis fluid paths"
    ],
    featured: false,
    orderIndex: 2,
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "m-neph-4",
    slug: "citric-acid-50",
    title: "Citric Acid Disinfectant",
    division: "Manufacturing",
    category: "Nephrology",
    description: "Concentrated heat and chemical disinfection solution engineered for periodic descaling and bio-film destruction in dialysis equipment.",
    certifications: "Hemodialysis Machine Approved",
    features: [
      "50% concentration",
      "Bio-degradable organic matrix",
      "Optimized thermal disinfection performance"
    ],
    featured: false,
    orderIndex: 3,
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "m-neph-5",
    slug: "diaclean",
    title: "Diaclean",
    division: "Manufacturing",
    category: "Nephrology",
    description: "Multi-enzyme alkaline detergent specially prepared for removing organic residues and protein build-up from dialyzers and reprocessing lines.",
    certifications: "Enzymatic Grade",
    features: [
      "Proteolytic action",
      "Neutralizes heavy organic burdens",
      "Safe for hollow-fiber membranes"
    ],
    featured: false,
    orderIndex: 4,
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "m-neph-6",
    slug: "diakit",
    title: "Diakit",
    division: "Manufacturing",
    category: "Nephrology",
    description: "Single-use pre-sterilized consumable procedure kit for catheter dressing, dialyzer connection, and aseptic patient cannulation.",
    certifications: "EO Sterile · Single Use",
    features: [
      "Hospital infection control compliant",
      "Includes high-absorbency drapes & gauze",
      "Reduces bloodstream infection risks"
    ],
    featured: false,
    orderIndex: 5,
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=1200&q=80"
    ]
  },

  // B. Orthobiologics
  {
    id: "m-ortho-1",
    slug: "bonesurg-cr",
    title: "BoneSurg CR",
    division: "Manufacturing",
    category: "Orthobiologics",
    description: "100% pure resorbable synthetic calcium sulphate hemihydrate bone graft substitute engineered as an eluting matrix for surgeon-directed antibiotics.",
    certifications: "CDSCO Class C Approved · ISO 13485:2016",
    features: [
      "Dissolves at physiological pace",
      "No foreign body residue",
      "Reliable elution vehicle in osteomyelitis"
    ],
    featured: true,
    orderIndex: 6,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "m-ortho-2",
    slug: "bonesurg-ha",
    title: "BoneSurg HA",
    division: "Manufacturing",
    category: "Orthobiologics",
    description: "Nanocrystalline synthetic Hydroxyapatite ceramic bone graft offering high interconnected microporosity for guided osteoblast infiltration and permanent fusion.",
    certifications: "CDSCO Class C Approved · ISO 13485:2016",
    features: [
      "Stoichiometric Ca/P ratio",
      "High compressive strength",
      "Rapid capillary ingrowth"
    ],
    featured: true,
    orderIndex: 7,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80"
    ]
  },

  // C. Wound Management
  {
    id: "m-wound-1",
    slug: "npwt-machine-kits",
    title: "NPWT Machine, Kits & Canisters",
    division: "Manufacturing",
    category: "Wound Management",
    description: "Digital micro-sensor negative pressure wound therapy unit paired with reticulated medical foam dressing kits and leak-proof exudate canisters.",
    certifications: "ISO 13485:2016 · Electronic Medical Safety",
    features: [
      "Continuous & intermittent modes",
      "Smart leak and blockage alarms",
      "Hydrophobic antimicrobial filter canisters"
    ],
    featured: true,
    orderIndex: 8,
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "m-wound-2",
    slug: "cellsurg-p",
    title: "Cellsurg P",
    division: "Manufacturing",
    category: "Wound Management",
    description: "Advanced collagen-based bio-active wound dressing sheet engineered to stimulate granulation tissue formation in non-healing acute and chronic wounds.",
    certifications: "Sterile Medical Device",
    features: [
      "Natural extracellular scaffold",
      "Controls exudate MMP protease levels",
      "Accelerates epithelialization"
    ],
    featured: false,
    orderIndex: 9,
    image: "https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "m-wound-3",
    slug: "cellsurg-m",
    title: "Cellsurg M",
    division: "Manufacturing",
    category: "Wound Management",
    description: "Bioactive collagen particle/matrix formulation tailored for irregular cavity wounds, tunneled ulcerations, and complex surgical wound beds.",
    certifications: "Sterile Medical Device",
    features: [
      "Deep cavity conformability",
      "Maintains moist wound microenvironment",
      "Direct protease binding capacity"
    ],
    featured: false,
    orderIndex: 10,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
    ]
  },

  // D. Launching Soon
  {
    id: "m-soon-1",
    slug: "bonesurg-regen",
    title: "BoneSurg Regen",
    division: "Manufacturing",
    category: "Launching Soon",
    isUpcoming: true,
    description: "Next-generation bioactive biphasic regeneration matrix engineered with tailored resorption kinetics for advanced reconstructive orthopaedics.",
    certifications: "Clinical Trials & Approvals in Progress",
    features: [
      "Synergistic osteoinductive potential",
      "Biphasic HA/TCP architecture",
      "Rapid vascularization"
    ],
    featured: false,
    orderIndex: 11,
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80"
    ]
  },

  // ==========================================
  // DIVISION 2: CHANNEL PARTNER ALLIANCES
  // ==========================================
  // A. Sports Medicine
  {
    id: "cp-sports-1",
    slug: "smith-nephew-sports-medicine",
    title: "Arthroscopy & Sports Medicine Implants",
    division: "Channel Partner",
    category: "Sports Medicine",
    partnerBrand: "Smith & Nephew",
    description: "World-class arthroscopic joint repair systems, suture anchors, meniscus repair kits, and RF electrosurgical ablation wands.",
    certifications: "US FDA Cleared · CE Mark",
    features: [
      "Precision ligament reconstruction",
      "High-fixation bioabsorbable anchors",
      "Minimally invasive instrumentation"
    ],
    featured: true,
    orderIndex: 12,
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80"
    ]
  },

  // B. Bone Cement (Demetra)
  {
    id: "cp-cement-1",
    slug: "cemex-hv",
    title: "Cemex HV (High Viscosity)",
    division: "Channel Partner",
    category: "Bone Cement",
    partnerBrand: "Demetra",
    description: "Premium self-curing PMMA acrylic bone cement with immediate high viscosity, optimized for manual application in total joint arthroplasty.",
    certifications: "CE 0476 · ISO 5833",
    features: [
      "Immediate dough phase",
      "Minimal monomer fumes",
      "Safe exothermic curing profile"
    ],
    featured: true,
    orderIndex: 13,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "cp-cement-2",
    slug: "cemex-lv",
    title: "Cemex LV (Low Viscosity)",
    division: "Channel Partner",
    category: "Bone Cement",
    partnerBrand: "Demetra",
    description: "Low-viscosity radiopaque acrylic cement engineered specifically for vacuum mixing and syringe delivery in pressurized femoral cementing.",
    certifications: "CE 0476 · ISO 5833",
    features: [
      "Superior bone micro-interlock",
      "Prolonged working time",
      "Optimized syringe injectability"
    ],
    featured: false,
    orderIndex: 14,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "cp-cement-3",
    slug: "cemex-id-green",
    title: "Cemex ID Green (Medium Viscosity)",
    division: "Channel Partner",
    category: "Bone Cement",
    partnerBrand: "Demetra",
    description: "Medium-viscosity PMMA bone cement with distinct green chlorophyll pigmentation for visual differentiation during revision surgery and joint arthroplasty.",
    certifications: "CE 0476 · ISO 5833",
    features: [
      "Clear visual contrast against bone",
      "Reliable mechanical stability",
      "Balanced setting time"
    ],
    featured: false,
    orderIndex: 15,
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80"
    ]
  },

  // C. Spine
  {
    id: "cp-spine-1",
    slug: "mendec-spine-cement",
    title: "Mendec Spine Bone Cement & Kit",
    division: "Channel Partner",
    category: "Spine Solutions",
    partnerBrand: "Tecres (Italy)",
    description: "High-radiopacity PMMA formulation with complete injection kit, engineered for precise fluoroscopic guidance in percutaneous vertebroplasty and kyphoplasty.",
    certifications: "CE Certified · Medical Device Class III",
    features: [
      "Exceptional barium sulfate radiopacity",
      "Controllable injection viscosity",
      "Includes dedicated high-pressure syringe"
    ],
    featured: false,
    orderIndex: 16,
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "cp-spine-2",
    slug: "teknimed-opacity-plus",
    title: "Opacity+ Vertebroplasty Cement",
    division: "Channel Partner",
    category: "Spine Solutions",
    partnerBrand: "Teknimed (France)",
    description: "Specialized French radiopaque acrylic cement engineered for vertebral augmentation with prolonged injectability window and high visualization.",
    certifications: "CE 0499 · ISO 13485",
    features: [
      "High concentration radiopacifier",
      "Consistent extrusion through fine needles",
      "Predictable vertebral stabilization"
    ],
    featured: true,
    orderIndex: 17,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "cp-spine-3",
    slug: "teknimed-high-v-plus",
    title: "High V+ Bone Cement",
    division: "Channel Partner",
    category: "Spine Solutions",
    partnerBrand: "Teknimed (France)",
    description: "High-viscosity vertebroplasty and spine cement formulated to reduce venous leakage risk during vertebral body reinforcement.",
    certifications: "CE 0499 · European Standard",
    features: [
      "Immediate target viscosity",
      "Significantly mitigates extravasation",
      "High compressive fatigue strength"
    ],
    featured: false,
    orderIndex: 18,
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80"
    ]
  },

  // D. Biopsy Needles (MDL Italy)
  {
    id: "cp-biopsy-1",
    slug: "mdl-soft-tissue-biopsy",
    title: "MDL Soft Tissue Biopsy Systems",
    division: "Channel Partner",
    category: "Biopsy Needles",
    partnerBrand: "MDL S.r.l. (Italy)",
    description: "Precision automatic and semi-automatic guillotine biopsy systems and Tru-Cut needles for breast, kidney, liver, and prostate diagnostics.",
    certifications: "CE Marked · Made in Italy",
    features: [
      "Razor-sharp echogenic tip",
      "Clear sample notch geometry",
      "Ergonomic one-handed firing trigger"
    ],
    featured: true,
    orderIndex: 19,
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "cp-biopsy-2",
    slug: "mdl-bone-marrow-biopsy",
    title: "MDL Bone Marrow Biopsy & Aspiration",
    division: "Channel Partner",
    category: "Biopsy Needles",
    partnerBrand: "MDL S.r.l. (Italy)",
    description: "Ergonomic Jamshidi-type bone marrow aspiration needles with extraction cannula designed for intact histopathological core specimens.",
    certifications: "CE Marked · Sterile Class IIa",
    features: [
      "Comfortable palm-grip handle",
      "Trocar stylet for smooth cortical penetration",
      "Includes specimen push rod"
    ],
    featured: false,
    orderIndex: 20,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80"
    ]
  },
];

// Helper functions & metadata constants
export const DIVISIONS = ["All", "Manufacturing", "Channel Partner"] as const;

export const MANUFACTURING_CATEGORIES = [
  "All",
  "Nephrology",
  "Orthobiologics",
  "Wound Management",
  "Launching Soon",
] as const;

export const CHANNEL_PARTNER_CATEGORIES = [
  "All",
  "Sports Medicine",
  "Bone Cement",
  "Spine Solutions",
  "Biopsy Needles",
] as const;

export const ALL_CATEGORIES = [
  "All",
  "Nephrology",
  "Orthobiologics",
  "Wound Management",
  "Sports Medicine",
  "Bone Cement",
  "Spine Solutions",
  "Biopsy Needles",
  "Launching Soon",
] as const;

export function getProductBySlug(slug: string): ProductItem | undefined {
  // Support slug aliases for seamless backward compatibility
  const normalizedSlug = slug.toLowerCase().trim();
  const aliasMap: Record<string, string> = {
    "em-vac-npwt": "npwt-machine-kits",
    "hemodialysis-fluids-dry-powders": "dialysis-fluid-drycitrate",
    "teknimed-opacity-plus-bone-cement": "teknimed-opacity-plus",
    "mdl-biopsy-devices": "mdl-soft-tissue-biopsy",
  };

  const targetSlug = aliasMap[normalizedSlug] || normalizedSlug;
  return EMSURG_CATALOG.find((p) => p.slug === targetSlug);
}

export function getProductsByDivision(
  division: "Manufacturing" | "Channel Partner"
): ProductItem[] {
  return EMSURG_CATALOG.filter((p) => p.division === division);
}

export function getProductsByCategory(category: string): ProductItem[] {
  if (category === "All") return EMSURG_CATALOG;
  return EMSURG_CATALOG.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}
