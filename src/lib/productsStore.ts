import { supabase } from "./supabase";
import { getProductFAQs, type ProductFAQ } from "./productsFaqs";
import { EMSURG_CATALOG, type ProductItem } from "./productsData";
import { formatDriveImageUrl } from "./utils";

export { getProductFAQs, type ProductFAQ };
export { EMSURG_CATALOG, type ProductItem };
export { formatDriveImageUrl };

export interface Product {
  id: string;
  title: string;
  slug: string;
  division: "Manufacturing" | "Channel Partner";
  category: string;
  subCategory?: string;
  partnerBrand?: string;
  short_description: string;
  full_description: string;
  features: string[];
  specifications: Record<string, string>;
  images: string[];
  certifications?: string;
  isUpcoming?: boolean;
  is_featured: boolean;
  featured?: boolean;
  orderIndex?: number;
  brochure_url?: string;
  created_at: string;
  faqs?: ProductFAQ[];
}

export interface ProductInquiry {
  id: string;
  product_id?: string;
  product_name: string;
  category?: string;
  division?: string;
  name: string;
  institution: string;
  city: string;
  state?: string;
  phone: string;
  email?: string;
  role?: string;
  quantity_requirement?: string;
  notes?: string;
  created_at: string;
}

export const INITIAL_PRODUCTS: Product[] = [
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
    short_description: "Ultra-pure hemodialysis liquid acid concentrates and dry citrate bicarbonate powder cartridges formulated for high-flux renal dialysis.",
    full_description: `## Ultra-Pure Pharmacopeial Hemodialysis Formulations

Manufactured at Emsurg's automated formulation facility in Kolkata, our hemodialysis fluids and dry citrate sodium bicarbonate cartridges conform strictly to Indian and British Pharmacopeia (IP/BP) standards for artificial kidney therapy.

### Advanced Quality Architecture
- Multi-stage high-efficiency reverse osmosis (RO) and sub-micron endotoxin filtration ensures dialysate water meets stringent microbiological thresholds (<0.1 CFU/ml, endotoxin <0.03 EU/ml).
- Precision stoichiometric electrolyte blending containing Sodium, Potassium, Calcium, Magnesium, Chloride, and Dextrose tailored for standard dilution ratios (1:34, 1:44).
- Ergonomic HDPE containers with tamper-evident induction heat-sealed caps designed for universal machine compatibility (Fresenius, Nipro, Gambro, B. Braun).`,
    certifications: "WHO-GMP · Pharmacopeial Grade",
    features: [
      "Sub-micron double RO filtration with continuous conductivity validation",
      "Closed-loop cleanroom filling eliminating microbiological contamination",
      "Compatible with leading international hemodialysis delivery systems",
      "Supplied in Part A (Liquid Acid) & Part B (Dry Citrate / Bicarbonate Cartridges)",
      "Strict compliance with WHO-GMP and CDSCO Class C Device standards"
    ],
    specifications: {
      "Formulation": "Part A (Acid Concentrate) & Part B (Dry Citrate Bicarbonate)",
      "Dilution Ratio": "1:34 and 1:44 Machine Selectable",
      "Microbiological Purity": "Endotoxin < 0.03 EU/ml, Bioburden < 0.1 CFU/ml",
      "Packaging": "10L / 20L HDPE Canisters, 650g/900g Citrate Cartridges",
      "Shelf Life": "24 Months from manufacturing date",
      "Regulatory": "CDSCO Approved · WHO-GMP Facility Certified"
    },
    images: [
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=1200&q=80"
    ],
    is_featured: true,
    brochure_url: "#",
    created_at: new Date(Date.now() - 600000000).toISOString(),
  },
  {
    id: "m-neph-2",
    slug: "nacl-salt-tablet",
    title: "NaCl Salt Tablets",
    division: "Manufacturing",
    category: "Nephrology",
    short_description: "High-density, low-dust refined sodium chloride tablets for industrial water softening and hemodialysis pre-treatment systems.",
    full_description: `## High-Purity Water Softening Sodium Chloride Tablets

Emsurg NaCl Salt Tablets are manufactured under strict pharmaceutical compression protocols to produce high-density, dust-free sodium chloride cylinders specifically designed for hospital water softening resin regeneration in hemodialysis loops.

### Key Benefits
- Resists mushing and compaction channeling in softening brine tanks.
- Free of anti-caking agents, heavy metals, and insoluble residues that cause resin fouling.
- Provides consistent, saturated brine generation for maximum RO membrane longevity.`,
    certifications: "ISO 9001 · High Purity NaCl",
    features: [
      "Uniform high-pressure compaction prevents crumbling and brine sludge",
      "Rapid and uniform dissolution delivering 100% saturated brine",
      "Prevents cation exchange resin bed fouling in central water plants",
      "≥99.8% pure food & pharmaceutical grade sodium chloride"
    ],
    specifications: {
      "Purity": "≥ 99.8% NaCl (dry basis)",
      "Moisture Content": "< 0.1%",
      "Form": "Cylindrical high-density compacted tablet",
      "Packaging": "25 kg Heavy-duty moisture-proof laminated bags",
      "Application": "Hospital Central Water Treatment & Dialysis Pre-treatment"
    },
    images: [
      "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=1200&q=80"
    ],
    is_featured: false,
    brochure_url: "#",
    created_at: new Date(Date.now() - 580000000).toISOString(),
  },
  {
    id: "m-neph-3",
    slug: "aquasurg",
    title: "Aquasurg",
    division: "Manufacturing",
    category: "Nephrology",
    short_description: "Specialized cold sterilant and disinfectant formulated for hemodialysis machines, reprocessing units, and water distribution loops.",
    full_description: `## Clinical-Grade Cold Sterilant & High-Level Disinfectant

Aquasurg is a stabilized peracetic acid and hydrogen peroxide synergistic cold sterilant formulated specifically for the disinfection of automated dialyzer reprocessing systems, hemodialysis hydraulics, and pure water distribution loops.

### Microbiological Efficacy
- Proven bactericidal, virucidal, fungicidal, and sporicidal activity within minutes.
- Destroys stubborn microbial biofilms formed on hydraulic pipework.
- Completely breaks down into eco-friendly water, oxygen, and acetic acid upon flushing.`,
    certifications: "Clinical Disinfection Grade",
    features: [
      "Broad-spectrum bactericidal, virucidal & sporicidal efficacy",
      "Rapid rinse-out profile verified with residual test strips",
      "Non-corrosive to dialysis fluid paths, elastomer seals, and dialyzer membranes",
      "Bio-degradable breakdown products"
    ],
    specifications: {
      "Active Components": "Peracetic Acid (PAA) & Stabilized Hydrogen Peroxide",
      "Contact Time": "15 – 30 minutes for high-level disinfection",
      "Residue Detection": "Zero detection with standard PAA indicator strips after rinse",
      "Packaging": "5 Litre fluorinated HDPE safety canisters",
      "Application": "Dialyzer Reprocessors & Dialysis Machine Hydraulic Circuits"
    },
    images: [
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80"
    ],
    is_featured: false,
    brochure_url: "#",
    created_at: new Date(Date.now() - 560000000).toISOString(),
  },
  {
    id: "m-neph-4",
    slug: "citric-acid-50",
    title: "Citric Acid Disinfectant",
    division: "Manufacturing",
    category: "Nephrology",
    short_description: "Concentrated heat and chemical disinfection solution engineered for periodic descaling and bio-film destruction in dialysis equipment.",
    full_description: `## 50% Concentrated Heat Disinfection & Descaling Solution

Emsurg Citric Acid Disinfectant 50% is formulated for routine thermal-chemical disinfection cycles (up to 85°C–90°C) of hemodialysis machines equipped with automated hot-rinse protocols.

### Mechanism & Benefits
- Efficiently dissolves precipitated calcium carbonate and magnesium scale from heaters and valves.
- Synergizes with elevated temperatures to achieve total microbial and viral deactivation.
- Non-hazardous, naturally derived organic acid formulation safe for clinical engineering teams.`,
    certifications: "Hemodialysis Machine Approved",
    features: [
      "50% pharmaceutical-grade citric acid concentration",
      "Bio-degradable organic matrix leaving zero toxic residue",
      "Optimized thermal disinfection performance between 80°C and 90°C",
      "Prolongs machine heater block and flow sensor operating lifespan"
    ],
    specifications: {
      "Concentration": "50% w/v Citric Acid Solution",
      "Thermal Compatibility": "Validated for hot disinfection cycles up to 90°C",
      "Descaling Efficacy": "Rapid dissolution of inorganic mineral deposits",
      "Packaging": "5L & 10L HDPE containers with universal machine suction connectors"
    },
    images: [
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1200&q=80"
    ],
    is_featured: false,
    brochure_url: "#",
    created_at: new Date(Date.now() - 540000000).toISOString(),
  },
  {
    id: "m-neph-5",
    slug: "diaclean",
    title: "Diaclean",
    division: "Manufacturing",
    category: "Nephrology",
    short_description: "Multi-enzyme alkaline detergent specially prepared for removing organic residues and protein build-up from dialyzers and reprocessing lines.",
    full_description: `## Proteolytic Multi-Enzyme Detergent for Dialyzer Reprocessing

Diaclean is a specialized enzymatic cleaner specifically formulated to digest and dislodge heavy protein cakes, coagulated blood matrices, and lipids from hollow-fiber dialyzer membranes.

### Clinical Utility
- Protects dialyzer ultrafiltration coefficient (Kuf) across multi-use clinical cycles.
- Minimizes chemical stress on polysulfone, polyethersulfone, and cellulose triacetate fibers.
- Completely rinsable with low foam generation.`,
    certifications: "Enzymatic Grade",
    features: [
      "Rapid proteolytic enzymatic action targeting fibrin and blood proteins",
      "Neutralizes heavy organic burdens without aggressive mechanical scrubbing",
      "Safe for hollow-fiber membranes and silicone tubing loops",
      "Concentrated formula optimized for automated reprocessors"
    ],
    specifications: {
      "Enzyme Type": "Subtilisin-class medical proteolytic protease blend",
      "pH Profile": "Mild alkaline (8.0 - 9.5) optimized for protein dissolution",
      "Dilution Ratio": "1:50 to 1:100 as per reprocessor protocol",
      "Packaging": "5 Litre canister with dosing cap"
    },
    images: [
      "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=1200&q=80"
    ],
    is_featured: false,
    brochure_url: "#",
    created_at: new Date(Date.now() - 520000000).toISOString(),
  },
  {
    id: "m-neph-6",
    slug: "diakit",
    title: "Diakit",
    division: "Manufacturing",
    category: "Nephrology",
    short_description: "Single-use pre-sterilized consumable procedure kit for catheter dressing, dialyzer connection, and aseptic patient cannulation.",
    full_description: `## Comprehensive Aseptic Procedural Kit for Hemodialysis

Diakit is an indigenously manufactured, pre-packaged, sterile procedural pack assembled under Class 10,000 cleanroom conditions to standardize infection control during vascular access cannulation and catheter dressing changes.

### Infection Prevention Design
- Eliminates touch contamination risks by providing all necessary sterile consumables in sequential order of procedural use.
- Conforms to hospital acquired infection (HAI) and catheter-related bloodstream infection (CRBSI) reduction guidelines.`,
    certifications: "EO Sterile · Single Use",
    features: [
      "Hospital infection control and CRBSI reduction compliant",
      "Includes high-absorbency surgical drapes, medical gauze, povidone/chlorhexidine prep, and catheter clamps",
      "Sterilized by validated Ethylene Oxide (EtO) cycle",
      "Reduces nurse prep time and guarantees sterile field integrity"
    ],
    specifications: {
      "Sterilization": "Ethylene Oxide (EtO) Validated ISO 11135",
      "Contents": "Sterile drape, AV fistula dressings, gauze swabs, nitrile gloves, waste bag",
      "Shelf Life": "3 Years sterile integrity",
      "Packaging": "Individual medical peel pouch"
    },
    images: [
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=1200&q=80"
    ],
    is_featured: false,
    brochure_url: "#",
    created_at: new Date(Date.now() - 500000000).toISOString(),
  },

  // B. Orthobiologics
  {
    id: "m-ortho-1",
    slug: "bonesurg-cr",
    title: "BoneSurg CR",
    division: "Manufacturing",
    category: "Orthobiologics",
    short_description: "100% pure resorbable synthetic calcium sulphate hemihydrate bone graft substitute engineered as an eluting matrix for surgeon-directed antibiotics.",
    full_description: `## Advanced Resorbable Calcium Sulphate System

BoneSurg CR is a pharmaceutical-grade synthetic calcium sulphate hemihydrate system meticulously engineered for dead-space management in infected or clean bone defects. It acts as an osteoconductive scaffold that completely biodegrades synchronously with natural host bone turnover.

### Clinical Utility & Antibiotic Elution
BoneSurg CR allows the operating surgeon to incorporate heat-stable liquid or powdered antibiotics (such as Vancomycin, Tobramycin, Gentamicin, or Clindamycin) during intraoperative mixing. Once set in the sterile flexible silicone bead mold, the beads or paste deliver prolonged, high-concentration local antimicrobial therapy exceeding the minimum inhibitory concentration (MIC) by up to 100-fold without systemic toxicity.

### Key Clinical Advantages
- **Physiological Resorption:** Completely hydrolyzes into calcium and sulphate ions within 30–60 days, leaving no inert foreign body substrate that could harbor chronic biofilm.
- **Zero Second Surgery:** Eliminates the necessity for secondary surgical removal typically mandated by PMMA non-resorbable bead chains.
- **Osteoconductive Architecture:** Provides a micro-porous scaffold that actively facilitates capillary ingrowth and natural osteoblast migration.
- **Sterile Procedural Kit:** Packaged complete with high-purity powder, calibrated mixing liquid, ergonomic spatula, and multi-cavity silicone bead mold.`,
    certifications: "CDSCO Class C Approved · ISO 13485:2016",
    features: [
      "100% Medical-grade Synthetic Calcium Sulphate Hemihydrate (CaSO4·½H2O)",
      "Zero Second Surgery – Completely resorbs synchronously with host bone in 30–60 days",
      "High-Concentration Local Elution of Surgeon-Selected Antibiotics (Vancomycin, Tobramycin)",
      "Dead Space Obliteration for Infected Non-Unions, Osteomyelitis, and Trauma Defects",
      "Supplied with Flexible Silicone Bead Mold (4.5mm & 6mm bead geometries)",
      "CDSCO Approved Class C Implantable & ISO 13485 Certified Production"
    ],
    specifications: {
      "Material Composition": "Ultra-pure Synthetic Calcium Sulphate Hemihydrate",
      "Resorption Rate": "30 to 60 Days (Complete In-Vivo Bioresorption)",
      "Antibiotic Compatibility": "Vancomycin, Tobramycin, Gentamicin, Clindamycin",
      "Setting Time": "8 – 12 minutes at standard operating theater temperature",
      "Sterilization Method": "Validated Gamma Radiation (25 kGy)",
      "Regulatory Classification": "CDSCO Class C Medical Device / ISO 13485:2016",
      "Packaging Kit Variants": "5cc and 10cc Procedural Kits with Silicone Bead Mold"
    },
    images: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=1200&q=80"
    ],
    is_featured: true,
    brochure_url: "#",
    created_at: new Date(Date.now() - 480000000).toISOString(),
  },
  {
    id: "m-ortho-2",
    slug: "bonesurg-ha",
    title: "BoneSurg HA",
    division: "Manufacturing",
    category: "Orthobiologics",
    short_description: "Nanocrystalline synthetic Hydroxyapatite ceramic bone graft offering high interconnected microporosity for guided osteoblast infiltration and permanent fusion.",
    full_description: `## Biomimetic Nanocrystalline Hydroxyapatite Scaffold

BoneSurg HA is an ultra-pure synthetic nanocrystalline hydroxyapatite bone graft substitute designed to closely mimic the physical nanostructure and biochemical composition of natural human bone mineral. 

### Biomimetic Cellular Integration
Engineered with interconnected microporosity and macroporosity (pore diameter 100–500 µm), BoneSurg HA accelerates osteoblast adherence, capillary penetration, and neo-vascularization. When blended intraoperatively with autologous bone marrow aspirate (BMA) or blood, it creates a cohesive, osteostimulative matrix that resists irrigation wash-out.

### Indicative Applications
- Spinal arthrodesis and posterolateral fusion
- Metaphyseal fractures and segmental bone void filling
- Maxillofacial and reconstructive trauma surgery
- Revision arthroplasty with contained acetabular or femoral defects`,
    certifications: "CDSCO Class C Approved · ISO 13485:2016",
    features: [
      "Pure Phase Nanocrystalline Hydroxyapatite [Ca10(PO4)6(OH)2] (≥98% phase purity)",
      "Dual Micro/Macroporous Interconnected Lattice (65%–75% Total Porosity)",
      "Exceptional Hydrophilicity – Rapid capillary wicking of BMA and autologous blood",
      "High Mechanical Stability resisting early void collapse in load-bearing zones",
      "100% Synthetic & Non-Immunogenic – Zero risk of zoonotic disease transmission",
      "Available in Granules (0.5–1mm, 1–2mm) and Moldable Injectable Paste"
    ],
    specifications: {
      "Chemical Formula": "Pure Nanocrystalline Hydroxyapatite Ca10(PO4)6(OH)2",
      "Porosity Ratio": "68% – 75% Total Interconnected Porosity",
      "Pore Size Spectrum": "100 µm to 500 µm Macropores; <10 µm Micropores",
      "Crystalline Structure": "Stoichiometric Hexagonal Synthetic Hydroxyapatite",
      "Sterilization": "Ethylene Oxide (EtO) / Gamma Irradiation",
      "Packaging Volumes": "1cc, 2.5cc, 5cc, 10cc sterile vials & syringes",
      "Regulatory Standards": "Complies with ASTM F1185, CDSCO Approved"
    },
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80"
    ],
    is_featured: true,
    brochure_url: "#",
    created_at: new Date(Date.now() - 460000000).toISOString(),
  },

  // C. Wound Management
  {
    id: "m-wound-1",
    slug: "npwt-machine-kits",
    title: "NPWT Machine, Kits & Canisters",
    division: "Manufacturing",
    category: "Wound Management",
    short_description: "Digital micro-sensor negative pressure wound therapy unit paired with reticulated medical foam dressing kits and leak-proof exudate canisters.",
    full_description: `## Next-Generation Digital Negative Pressure Wound Management

Our indigenously manufactured NPWT platform combines a precision digital suction therapy pump with medical-grade reticulated hydrophobic polyurethane foam dressing kits and leak-proof exudate canisters.

### Dynamic Mechanism of Action
- **Macro-deformation:** Draws wound margins together through controlled negative pressure (-20 to -200 mmHg), reducing localized edema and dead space.
- **Micro-deformation:** Exerts shear micro-strain across the cellular interface, stimulating cell mitosis, fibroblast migration, and rapid angiogenesis.
- **Continuous Exudate Evacuation:** Continually clears infectious wound fluid and matrix metalloproteinases (MMPs) into hermetically sealed canister reservoirs.`,
    certifications: "ISO 13485:2016 · Electronic Medical Safety",
    features: [
      "Continuous, intermittent, and dynamic programmable suction modes",
      "Smart leak, blockage, tilt, and canister full audio-visual safety alarms",
      "Hydrophobic antimicrobial filter canisters with integrated solidifiers",
      "Long-life rechargeable battery providing >24 hours untethered ward mobility"
    ],
    specifications: {
      "Suction Range": "-20 mmHg to -200 mmHg (adjustable in 5 mmHg steps)",
      "Battery Autonomy": "24+ Hours continuous therapy",
      "Noise Level": "Ultra-quiet clinical acoustic profile (<38 dB)",
      "Canister Capacities": "500ml and 1000ml with hydrophobic filter",
      "Dressing Kit Sizing": "Small (10x7.5cm), Medium (18x12.5cm), Large (26x15cm)",
      "Certifications": "IEC 60601-1 Medical Electrical Safety, CDSCO Approved"
    },
    images: [
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80"
    ],
    is_featured: true,
    brochure_url: "#",
    created_at: new Date(Date.now() - 440000000).toISOString(),
  },
  {
    id: "m-wound-2",
    slug: "cellsurg-p",
    title: "Cellsurg P",
    division: "Manufacturing",
    category: "Wound Management",
    short_description: "Advanced collagen-based bio-active wound dressing sheet engineered to stimulate granulation tissue formation in non-healing acute and chronic wounds.",
    full_description: `## Bio-Active Type-I Collagen Sheet Wound Matrix

Cellsurg P is an indigenously manufactured, highly purified porous Type-I collagen sheet dressing engineered to accelerate closure in recalcitrant diabetic foot ulcers, venous stasis ulcers, pressure injuries, and surgical donor sites.

### Extracellular Matrix Stimulation
- Provides a sacrificial structural substrate that binds and deactivates excessive destructive Matrix Metalloproteinases (MMPs) in the wound fluid.
- Recruits and guides host fibroblasts and keratinocytes across the wound bed.
- Retains moist healing environment with low dressing change trauma.`,
    certifications: "Sterile Medical Device",
    features: [
      "Natural extracellular Type-I collagen scaffold with native triple-helix structure",
      "Controls exudate MMP protease levels to jumpstart stalled chronic wounds",
      "Accelerates granulation tissue deposition and re-epithelialization",
      "Can be layered with primary foam or secondary retention dressings"
    ],
    specifications: {
      "Material": "Purified Medical Grade Bovine Type-I Collagen",
      "Form": "Lyophilized porous matrix sheet",
      "Dimensions": "5cm x 5cm, 10cm x 10cm, 10cm x 20cm",
      "Sterilization": "Gamma Irradiation (25 kGy)",
      "Indications": "Diabetic Foot Ulcers, Venous Leg Ulcers, Second-degree Burns"
    },
    images: [
      "https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&w=1200&q=80"
    ],
    is_featured: false,
    brochure_url: "#",
    created_at: new Date(Date.now() - 420000000).toISOString(),
  },
  {
    id: "m-wound-3",
    slug: "cellsurg-m",
    title: "Cellsurg M",
    division: "Manufacturing",
    category: "Wound Management",
    short_description: "Bioactive collagen particle/matrix formulation tailored for irregular cavity wounds, tunneled ulcerations, and complex surgical wound beds.",
    full_description: `## Bioactive Collagen Micro-Particle Cavity Matrix

Cellsurg M is a sterile micro-particulate Type-I collagen powder and matrix system specifically engineered to pack irregular tunneled wound geometries, deep undermining wounds, and cavity surgical deficits where flat sheet dressings cannot maintain intimate cellular contact.

### Deep Cavity Adaptability
- Conforms perfectly to complex wound contours, providing intimate surface contact.
- Formulates a moist, cohesive, collagen-rich gel upon contact with wound exudate.
- Facilitates rapid autolytic debridement and non-adherent dressing exchanges.`,
    certifications: "Sterile Medical Device",
    features: [
      "Deep cavity and tunneling wound bed conformability",
      "Maintains moist wound microenvironment while binding fluid exudates",
      "Direct protease binding capacity protecting natural growth factors",
      "Supplied in easy-to-disperse sterile shaker / delivery bottles"
    ],
    specifications: {
      "Composition": "100% Medical Grade Micro-particulate Collagen",
      "Particle Geometry": "Optimized micro-granules for capillary absorption",
      "Volume/Weight": "1g, 2g, and 5g sterile dispenser vials",
      "Sterilization": "Validated Gamma Radiation",
      "Indications": "Pilonidal Sinuses, Tunneled Ulcers, Deep Dehisced Wounds"
    },
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
    ],
    is_featured: false,
    brochure_url: "#",
    created_at: new Date(Date.now() - 400000000).toISOString(),
  },

  // D. Launching Soon
  {
    id: "m-soon-1",
    slug: "bonesurg-regen",
    title: "BoneSurg Regen",
    division: "Manufacturing",
    category: "Launching Soon",
    isUpcoming: true,
    short_description: "Next-generation bioactive biphasic regeneration matrix engineered with tailored resorption kinetics for advanced reconstructive orthopaedics.",
    full_description: `## Next-Generation Biphasic Bioactive Bone Matrix

Currently in final regulatory clinical evaluations at Emsurg Bioscience R&D laboratories, BoneSurg Regen represents the future of synthetic orthobiologic graft substitutes.

### Biphasic Architecture (HA + Beta-TCP)
By pairing 60% rapidly resorbable Beta-Tricalcium Phosphate (β-TCP) with 40% stable nanocrystalline Hydroxyapatite (HA), BoneSurg Regen delivers an optimal biphasic degradation profile matching the pace of host bone remodelling over 6 to 12 months.`,
    certifications: "Clinical Trials & Approvals in Progress",
    features: [
      "Synergistic osteoinductive and osteoconductive biological potential",
      "Biphasic HA/TCP interconnected porous architectural lattice",
      "Rapid vascularization and cellular attachment verified in pre-clinical studies",
      "Anticipated release in injectable moldable putty and granule configurations"
    ],
    specifications: {
      "Ratio": "60% Beta-TCP / 40% Hydroxyapatite Biphasic Matrix",
      "Target Release": "2026/2027 Clinical Deployment",
      "Research Entity": "Emsurg Bioscience India Pvt. Ltd. R&D Unit",
      "Intended Scope": "Major Trauma, Pelvic Reconstructions & Complex Arthrodesis"
    },
    images: [
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80"
    ],
    is_featured: false,
    brochure_url: "#",
    created_at: new Date(Date.now() - 380000000).toISOString(),
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
    short_description: "World-class arthroscopic joint repair systems, suture anchors, meniscus repair kits, and RF electrosurgical ablation wands.",
    full_description: `## Smith & Nephew Sports Medicine Portfolio

As an authorized channel partner for Smith & Nephew, Emsurg supplies cutting-edge arthroscopy and sports medicine solutions designed to advance patient recovery in shoulder, knee, and hip reconstructive procedures.

### Flagship Technologies
- **REGENETEN Bioinductive Implant:** Stimulates the body’s natural healing response to facilitate new tendon-like tissue growth over rotator cuff tears.
- **NOVOSTITCH PRO Meniscal Repair System:** Enables circumferential stitching inside the knee joint for complex horizontal and radial meniscal tears.
- **FAST-FIX FLEX & ULTRABUTTON:** Meniscal and ACL femoral fixation systems offering adaptable tensioning and robust biomechanical stability.`,
    certifications: "US FDA Cleared · CE Mark",
    features: [
      "Precision ligament reconstruction implants and instruments",
      "High-fixation bioabsorbable suture anchors and tendon fixation buttons",
      "Minimally invasive arthroscopic meniscal preservation systems",
      "Authorized hospital distribution and clinical support across India"
    ],
    specifications: {
      "Partner Brand": "Smith & Nephew (UK / USA)",
      "Clinical Scope": "Knee, Shoulder & Hip Arthroscopy and Sports Trauma",
      "Flagship Lines": "REGENETEN, NOVOSTITCH PRO, ULTRABUTTON, FAST-FIX FLEX",
      "Regulatory": "US FDA Cleared, CE Marked, CDSCO Authorized Import"
    },
    images: [
      "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80"
    ],
    is_featured: true,
    brochure_url: "#",
    created_at: new Date(Date.now() - 360000000).toISOString(),
  },

  // B. Bone Cement (Demetra)
  {
    id: "cp-cement-1",
    slug: "cemex-hv",
    title: "Cemex HV (High Viscosity)",
    division: "Channel Partner",
    category: "Bone Cement",
    partnerBrand: "Demetra",
    short_description: "Premium self-curing PMMA acrylic bone cement with immediate high viscosity, optimized for manual application in total joint arthroplasty.",
    full_description: `## Demetra Cemex HV Premium Acrylic Bone Cement

In partnership with Demetra (Italy), Emsurg supplies Cemex HV, the benchmark self-curing PMMA acrylic bone cement engineered with immediate high viscosity for open total knee and hip arthroplasty.

### Innovative Chemistry
- Unique 3:1 powder-to-liquid ratio reduces monomer release and toxic fumes in the operating room.
- Provides immediate dough consistency with zero waiting delay.
- Exhibits an exceptionally safe polymerization temperature profile mitigating bone necrosis.`,
    certifications: "CE 0476 · ISO 5833",
    features: [
      "Immediate dough phase eliminating waiting time during surgery",
      "Lowest monomer liquid content (3:1 ratio) significantly reducing fumes",
      "Safe exothermic curing profile preventing localized thermal damage",
      "Excellent mechanical compressive and fatigue resistance exceeding ISO 5833"
    ],
    specifications: {
      "Manufacturer": "Demetra S.r.l. (Italy) – Distributed by Emsurg",
      "Viscosity": "High Viscosity (HV) – Immediate Dough Phase",
      "Application": "Total Hip (THA), Total Knee (TKA) Primary Arthroplasty",
      "Certifications": "CE 0476, ISO 5833, CDSCO Import License",
      "Packaging": "Pre-measured sterile powder bag and liquid monomer ampoule"
    },
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
    ],
    is_featured: true,
    brochure_url: "#",
    created_at: new Date(Date.now() - 340000000).toISOString(),
  },
  {
    id: "cp-cement-2",
    slug: "cemex-lv",
    title: "Cemex LV (Low Viscosity)",
    division: "Channel Partner",
    category: "Bone Cement",
    partnerBrand: "Demetra",
    short_description: "Low-viscosity radiopaque acrylic cement engineered specifically for vacuum mixing and syringe delivery in pressurized femoral cementing.",
    full_description: `## Demetra Cemex LV Syringe-Injectable PMMA Bone Cement

Cemex LV is formulated for modern third-generation cementing techniques where cement pressurization and deep cancellous micro-interlock are required in the femoral canal.

### Handling Qualities
- Fluid consistency facilitates air-free vacuum mixing and prolonged syringe injection window.
- Optimum micro-trabecular bone penetration without excessive extravasation.`,
    certifications: "CE 0476 · ISO 5833",
    features: [
      "Superior bone micro-interlock under pressurized delivery",
      "Prolonged working time for deliberate retrograde syringe filling",
      "Optimized injectability through long femoral cannulas",
      "Reduced free residual monomer"
    ],
    specifications: {
      "Viscosity": "Low Viscosity (LV)",
      "Delivery": "Syringe Gun & Vacuum Mixing Bowl Compatible",
      "Origin": "Italy (Demetra)",
      "Working Window": "9 – 13 minutes at 20°C"
    },
    images: [
      "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=1200&q=80"
    ],
    is_featured: false,
    brochure_url: "#",
    created_at: new Date(Date.now() - 320000000).toISOString(),
  },
  {
    id: "cp-cement-3",
    slug: "cemex-id-green",
    title: "Cemex ID Green (Medium Viscosity)",
    division: "Channel Partner",
    category: "Bone Cement",
    partnerBrand: "Demetra",
    short_description: "Medium-viscosity PMMA bone cement with distinct green chlorophyll pigmentation for visual differentiation during revision surgery and joint arthroplasty.",
    full_description: `## Distinct Visual Contrast Green PMMA Bone Cement

Cemex ID Green incorporates natural chlorophyll-derived biocompatible green pigment to provide unequivocal visual distinction between the acrylic cement mantle and surrounding cancellous or sclerotic host bone.

### Indication in Revision Surgery
- Simplifies cement mantle removal in revision joint arthroplasty.
- Eliminates guesswork between prosthetic cement boundaries and native osteotomy edges.`,
    certifications: "CE 0476 · ISO 5833",
    features: [
      "Clear visual contrast against bone with biocompatible green chlorophyll",
      "Reliable mechanical stability meeting all ISO 5833 parameters",
      "Balanced setting time suitable for both manual and gun delivery",
      "Indispensable aid in complex revision joint reconstructions"
    ],
    specifications: {
      "Coloration": "Chlorophyll-derived green visual indicator",
      "Viscosity": "Medium Viscosity (Balanced Working Profile)",
      "Origin": "Demetra (Italy)",
      "Packaging": "Standard 40g and double 80g procedure packs"
    },
    images: [
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80"
    ],
    is_featured: false,
    brochure_url: "#",
    created_at: new Date(Date.now() - 300000000).toISOString(),
  },

  // C. Spine
  {
    id: "cp-spine-1",
    slug: "mendec-spine-cement",
    title: "Mendec Spine Bone Cement & Kit",
    division: "Channel Partner",
    category: "Spine Solutions",
    partnerBrand: "Tecres (Italy)",
    short_description: "High-radiopacity PMMA formulation with complete injection kit, engineered for precise fluoroscopic guidance in percutaneous vertebroplasty and kyphoplasty.",
    full_description: `## Tecres Mendec Spine Dedicated Percutaneous Cement

Tecres (Verona, Italy) is globally renowned for specialized acrylic formulations. Mendec Spine is precision-engineered for vertebral augmentation in osteoporotic compression fractures, hemangiomas, and spinal metastases.

### Clinical Highlights
- 30% Micronized Barium Sulfate ensures crisp fluoroscopic C-arm visibility without black-out artifacts.
- Constant, stable viscosity eliminates the sudden surge risk associated with standard cements.
- Supplied with high-pressure ergonomic syringe delivery gun and biopsy/access needles.`,
    certifications: "CE Certified · Medical Device Class III",
    features: [
      "Exceptional barium sulfate radiopacity for real-time fluoroscopic C-Arm guidance",
      "Controllable injection viscosity mitigating venous plexus leakage risk",
      "Includes dedicated high-pressure syringe and sterile connecting tubing",
      "Cold-polymerizing formula with calibrated polymerization plateau"
    ],
    specifications: {
      "Manufacturer": "Tecres S.p.A. (Italy)",
      "Radiopacifier": "30% Micronized Barium Sulfate (BaSO4)",
      "Indication": "Vertebroplasty, Kyphoplasty, Sacroplasty",
      "Regulatory": "CE 0123, Class III Medical Device, CDSCO Approved"
    },
    images: [
      "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200&q=80"
    ],
    is_featured: false,
    brochure_url: "#",
    created_at: new Date(Date.now() - 280000000).toISOString(),
  },
  {
    id: "cp-spine-2",
    slug: "teknimed-opacity-plus",
    title: "Opacity+ Vertebroplasty Cement",
    division: "Channel Partner",
    category: "Spine Solutions",
    partnerBrand: "Teknimed (France)",
    short_description: "Specialized French radiopaque acrylic cement engineered for vertebral augmentation with prolonged injectability window and high visualization.",
    full_description: `## Teknimed OPACITY+® Specialized French Spine Cement

In exclusive distribution partnership with Teknimed (Vic-en-Bigorre, France), Emsurg delivers OPACITY+®, the gold-standard radiopaque PMMA cement for percutaneous spinal augmentation.

### Unsurpassed Fluoroscopic Visibility
OPACITY+® combines 45% Zirconium Dioxide and 5% Hydroxyapatite, delivering unmatched fluoroscopic visualization under low-dose C-arm imaging.

### Extended Working Window
Provides 8 to 12 minutes of consistent, injectable paste consistency allowing deliberate and controlled vertebral body infiltration without premature hardening in the cannula.`,
    certifications: "CE 0499 · ISO 13485",
    features: [
      "50% Premium Radiopaque Agents (45% Zirconium Dioxide + 5% Hydroxyapatite)",
      "Unrivaled real-time fluoroscopic tracking under low-dose C-Arm visualization",
      "Low initial viscosity for effortless injection through fine 11G & 13G spinal needles",
      "Exclusively manufactured by Teknimed in France and distributed across India by Emsurg"
    ],
    specifications: {
      "Manufacturer": "Teknimed SAS (France) – Exclusive Partner: Emsurg",
      "Composition": "PMMA with 45% ZrO2 and 5% Hydroxyapatite",
      "Working Time": "8 to 12 minutes at 20°C room temperature",
      "Compressive Strength": "> 70 MPa (Compliant with ISO 5833)",
      "Regulatory Approvals": "CE Mark 0499, US FDA 510(k), CDSCO Import License"
    },
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80"
    ],
    is_featured: true,
    brochure_url: "#",
    created_at: new Date(Date.now() - 260000000).toISOString(),
  },
  {
    id: "cp-spine-3",
    slug: "teknimed-high-v-plus",
    title: "High V+ Bone Cement",
    division: "Channel Partner",
    category: "Spine Solutions",
    partnerBrand: "Teknimed (France)",
    short_description: "High-viscosity vertebroplasty and spine cement formulated to reduce venous leakage risk during vertebral body reinforcement.",
    full_description: `## Teknimed High V+ Immediate Viscosity Vertebroplasty Cement

High V+ is formulated specifically to combat the single greatest risk in vertebral augmentation: cement leakage into the venous circulation or spinal canal.

### Instant Safe Target Viscosity
- Reaches high viscosity immediately upon mixing, completely avoiding the initial runny phase.
- Infiltrates cancellous vertebral bone uniformly without traveling into low-resistance basivertebral veins.`,
    certifications: "CE 0499 · European Standard",
    features: [
      "Immediate target high viscosity preventing liquid run-off",
      "Significantly mitigates extravasation and venous embolization hazards",
      "High compressive fatigue strength restoring axial spinal stability",
      "Supplied in sealed sterile dual-chamber packaging"
    ],
    specifications: {
      "Viscosity": "Instantaneous High Viscosity (Immediate Dough State)",
      "Leakage Mitigation": "Clinically proven to minimize cortical barrier breach risks",
      "Origin": "France (Teknimed SAS)",
      "Packaging": "Sterile 20cc unit with dedicated delivery syringe"
    },
    images: [
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80"
    ],
    is_featured: false,
    brochure_url: "#",
    created_at: new Date(Date.now() - 240000000).toISOString(),
  },

  // D. Biopsy Needles (MDL Italy)
  {
    id: "cp-biopsy-1",
    slug: "mdl-soft-tissue-biopsy",
    title: "MDL Soft Tissue Biopsy Systems",
    division: "Channel Partner",
    category: "Biopsy Needles",
    partnerBrand: "MDL S.r.l. (Italy)",
    short_description: "Precision automatic and semi-automatic guillotine biopsy systems and Tru-Cut needles for breast, kidney, liver, and prostate diagnostics.",
    full_description: `## MDL S.r.l. Precision Italian Soft-Tissue Core Biopsy

Emsurg is the exclusive Indian healthcare partner for MDL S.r.l. (Italy), a global pioneer in interventional radiology, oncology, and diagnostic biopsy instrumentation.

### Flagship Guillotine & Tru-Cut Systems
- **THEMY & SEMICUT:** Lightweight, spring-loaded core biopsy instruments allowing one-handed arming and firing under ultrasound or CT visualization.
- **Micro-Machined Sample Notch:** Delivers clean, uncrushed tissue cores with maximum diagnostic cellular architecture for pathology.`,
    certifications: "CE Marked · Made in Italy",
    features: [
      "Razor-sharp echogenic-coated tip for clear ultrasound visibility",
      "Clear sample notch geometry delivering intact histologic specimens",
      "Ergonomic one-handed firing trigger with dual cocking levers",
      "Color-coded gauge identification for rapid procedural selection (14G, 16G, 18G, 20G)"
    ],
    specifications: {
      "Manufacturer": "MDL S.r.l. (Italy) – Exclusive India Partner: Emsurg",
      "Systems Included": "THEMY (Full-Automatic), SEMICUT (Semi-Automatic), PICK UP",
      "Needle Gauges": "14G, 16G, 18G, 20G; Lengths 9cm to 20cm",
      "Material": "Medical AISI 304/316 Surgical Grade Stainless Steel",
      "Sterilization": "Ethylene Oxide (EtO) Single-Use Sterile"
    },
    images: [
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80"
    ],
    is_featured: true,
    brochure_url: "#",
    created_at: new Date(Date.now() - 220000000).toISOString(),
  },
  {
    id: "cp-biopsy-2",
    slug: "mdl-bone-marrow-biopsy",
    title: "MDL Bone Marrow Biopsy & Aspiration",
    division: "Channel Partner",
    category: "Biopsy Needles",
    partnerBrand: "MDL S.r.l. (Italy)",
    short_description: "Ergonomic Jamshidi-type bone marrow aspiration needles with extraction cannula designed for intact histopathological core specimens.",
    full_description: `## MDL Italian Bone Marrow Aspiration & Biopsy Solutions

The MDL ILLY, JAM BLU, and OSTEOJ needle families provide hematologists and oncologists with unparalleled cortical bone penetration and intact bone marrow core retrieval.

### Minimal Patient Discomfort
- Triple-sharpened trocar and diamond bevel points facilitate effortless cortical penetration.
- Internal extraction cannula secures the bone marrow cylinder without painful needle deflection or specimen distortion.`,
    certifications: "CE Marked · Sterile Class IIa",
    features: [
      "Comfortable anatomical palm-grip handle optimizing rotational torque",
      "Hardened trocar stylet for smooth cortical penetration into the iliac crest",
      "Includes specialized specimen extraction cannula and push rod",
      "Luer-lock syringe connector for immediate fluid aspiration"
    ],
    specifications: {
      "Manufacturer": "MDL S.r.l. (Italy) – Distributed by Emsurg",
      "Models": "ILLY (Ergonomic Aspiration), JAM BLU (Biopsy), OSTEOJ (Sclerotic Bone)",
      "Sizes": "8G, 9G, 11G, 13G; Lengths 10cm & 15cm",
      "Approvals": "CE 0476, ISO 13485, CDSCO Approved"
    },
    images: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80"
    ],
    is_featured: false,
    brochure_url: "#",
    created_at: new Date(Date.now() - 200000000).toISOString(),
  },
];

const LOCAL_STORAGE_PRODUCTS_KEY = "emsurg_products_v2_synced";
const LOCAL_STORAGE_INQUIRIES_KEY = "emsurg_inquiries";
const LOCAL_STORAGE_INQUIRIES_FALLBACK_KEY = "emsurg_product_inquiries";

// Map old slug aliases to new slugs
export const SLUG_ALIAS_MAP: Record<string, string> = {
  "em-vac-npwt": "npwt-machine-kits",
  "hemodialysis-fluids-dry-powders": "dialysis-fluid-drycitrate",
  "teknimed-opacity-plus-bone-cement": "teknimed-opacity-plus",
  "mdl-biopsy-devices": "mdl-soft-tissue-biopsy",
};

// Pre-populate orderIndex and featured on INITIAL_PRODUCTS if not set
INITIAL_PRODUCTS.forEach((p, idx) => {
  if (typeof p.orderIndex !== "number") {
    p.orderIndex = idx;
  }
  if (p.featured === undefined) {
    p.featured = p.is_featured ?? false;
  }
  if (p.is_featured === undefined) {
    p.is_featured = p.featured ?? false;
  }
});

let inMemoryProductsCache: Product[] | null = null;
let isSeedingProducts = false;

/**
 * Universal Database-to-Frontend Product Mapper:
 * Normalizes all database columns (is_featured, order_index, partner_brand, etc.)
 * to frontend Product and ProductItem compatible fields.
 */
export function mapDbToProduct(rowOrRows: any): any {
  if (Array.isArray(rowOrRows)) {
    const list = rowOrRows.map((r, idx) => mapSingleDbProduct(r, idx));
    list.sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));
    return list;
  }
  return mapSingleDbProduct(rowOrRows);
}

function mapSingleDbProduct(p: any, idx?: number): Product {
  const order = typeof p.order_index === "number" 
    ? p.order_index 
    : typeof p.orderIndex === "number" 
    ? p.orderIndex 
    : (typeof idx === "number" ? idx : 0);
  
  const isFeat = p.is_featured ?? p.featured ?? (typeof idx === "number" ? idx < 7 : false);
  const brand = p.partner_brand ?? p.partnerBrand ?? undefined;
  const desc = p.short_description ?? p.description ?? p.shortDescription ?? "";
  const fullDesc = p.full_description ?? p.fullDescription ?? p.description ?? desc;
  
  let featList: string[] = [];
  if (Array.isArray(p.features)) {
    featList = p.features;
  } else if (typeof p.features === "string") {
    try {
      const parsed = JSON.parse(p.features);
      if (Array.isArray(parsed)) featList = parsed;
    } catch {
      featList = [p.features];
    }
  }

  let specMap: Record<string, string> = {};
  if (p.specifications && typeof p.specifications === "object") {
    specMap = p.specifications;
  } else if (typeof p.specifications === "string") {
    try {
      specMap = JSON.parse(p.specifications);
    } catch {}
  }

  let imgList: string[] = [];
  if (Array.isArray(p.images) && p.images.length > 0) {
    imgList = p.images;
  } else if (p.image) {
    imgList = [p.image];
  } else {
    imgList = ["https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop"];
  }

  const product: Product = {
    id: p.id || `prod-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    title: p.title || "Medical Product",
    slug: p.slug || (p.title ? p.title.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-") : "product"),
    division: (p.division === "Channel Partner" ? "Channel Partner" : "Manufacturing"),
    category: p.category || "Orthobiologics",
    subCategory: p.sub_category || p.subCategory,
    partnerBrand: brand,
    short_description: desc,
    full_description: fullDesc,
    features: featList,
    specifications: specMap,
    images: imgList,
    certifications: p.certifications || undefined,
    isUpcoming: p.is_upcoming ?? p.isUpcoming ?? false,
    is_featured: isFeat,
    featured: isFeat,
    orderIndex: order,
    brochure_url: p.brochure_url || p.brochureUrl || "#",
    created_at: p.created_at || new Date().toISOString(),
  };

  if (!product.faqs || product.faqs.length === 0) {
    product.faqs = getProductFAQs(product);
  }

  return product;
}

export const normalizeProduct = mapSingleDbProduct;

/**
 * Returns products from in-memory cache or localStorage as synchronous fallback.
 */
export function getLocalProducts(): Product[] {
  if (inMemoryProductsCache && inMemoryProductsCache.length > 0) {
    return inMemoryProductsCache;
  }
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const normalized = mapDbToProduct(parsed);
        inMemoryProductsCache = normalized;
        return normalized;
      }
    }
  } catch (err) {
    console.warn("Error reading local product cache:", err);
  }

  const initial = mapDbToProduct(INITIAL_PRODUCTS);
  inMemoryProductsCache = initial;
  return initial;
}

export const getProducts = getLocalProducts;

/**
 * Seeds initial products catalog to Supabase if table is empty
 */
export async function seedProductsToSupabase(): Promise<Product[]> {
  if (isSeedingProducts) return getLocalProducts();
  isSeedingProducts = true;
  try {
    console.log("Supabase products table is empty. Seeding initial catalog...");
    const recordsToInsert = EMSURG_CATALOG.map((p, idx) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      division: p.division,
      category: p.category,
      partner_brand: p.partnerBrand || null,
      description: p.description,
      certifications: p.certifications || null,
      image: p.image,
      is_featured: p.featured ?? (idx < 7),
      featured: p.featured ?? (idx < 7),
      order_index: p.orderIndex ?? idx,
    }));

    const { data: insertedData, error } = await supabase
      .from("products")
      .upsert(recordsToInsert, { onConflict: "slug" })
      .select();

    if (!error && insertedData && insertedData.length > 0) {
      const mapped = mapDbToProduct(insertedData);
      inMemoryProductsCache = mapped;
      try {
        localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(mapped));
      } catch {}
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("products-updated", { detail: mapped }));
      }
      return mapped;
    }
  } catch (err) {
    console.info("Supabase seeding products notice:", err);
  } finally {
    isSeedingProducts = false;
  }

  return getLocalProducts();
}

/**
 * Primary product fetcher: Queries Supabase directly.
 * Auto-seeds on empty remote database and updates memory cache.
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("order_index", { ascending: true });

    if (!error && (!data || data.length === 0)) {
      return await seedProductsToSupabase();
    }

    if (!error && Array.isArray(data) && data.length > 0) {
      const mapped: Product[] = mapDbToProduct(data);
      inMemoryProductsCache = mapped;
      try {
        localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(mapped));
      } catch {}

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("products-updated", { detail: mapped }));
      }
      return mapped;
    }
  } catch (err) {
    console.info("Supabase products fetch fallback:", err);
  }

  return getLocalProducts();
}

/**
 * Updates a product's attributes (featured flag, image, orderIndex, etc.) directly in Supabase
 */
export async function updateProduct(id: string, updates: Partial<ProductItem> | Partial<Product>): Promise<boolean> {
  try {
    // 1. Prepare exact Supabase column mappings
    const dbPayload: any = {};
    if (updates.title !== undefined) dbPayload.title = updates.title;
    if (updates.slug !== undefined) dbPayload.slug = updates.slug;
    if (updates.division !== undefined) dbPayload.division = updates.division;
    if (updates.category !== undefined) dbPayload.category = updates.category;
    if ((updates as any).partner_brand !== undefined) dbPayload.partner_brand = (updates as any).partner_brand;
    else if (updates.partnerBrand !== undefined) dbPayload.partner_brand = updates.partnerBrand;
    
    if ((updates as any).description !== undefined) {
      dbPayload.description = (updates as any).description;
      dbPayload.short_description = (updates as any).description;
    } else if ((updates as any).short_description !== undefined) {
      dbPayload.description = (updates as any).short_description;
      dbPayload.short_description = (updates as any).short_description;
    }
    
    if ((updates as any).full_description !== undefined) {
      dbPayload.full_description = (updates as any).full_description;
    }
    if (updates.certifications !== undefined) dbPayload.certifications = updates.certifications;
    if (updates.features !== undefined) dbPayload.features = updates.features;
    if ((updates as any).specifications !== undefined) dbPayload.specifications = (updates as any).specifications;
    if (updates.featured !== undefined) {
      dbPayload.is_featured = updates.featured;
      dbPayload.featured = updates.featured;
    }
    if ((updates as any).is_featured !== undefined) {
      dbPayload.is_featured = (updates as any).is_featured;
      dbPayload.featured = (updates as any).is_featured;
    }
    if (updates.orderIndex !== undefined) {
      dbPayload.order_index = updates.orderIndex;
    } else if ((updates as any).order_index !== undefined) {
      dbPayload.order_index = (updates as any).order_index;
    }

    // Handle image update
    const primaryImg = (updates as any).image || (updates.images && updates.images[0]);
    if (primaryImg) {
      const cleanImg = formatDriveImageUrl(primaryImg);
      dbPayload.image = cleanImg;
      dbPayload.images = updates.images && updates.images.length > 0
        ? updates.images.map(formatDriveImageUrl).filter(Boolean)
        : [cleanImg];
    } else if (updates.images && updates.images.length > 0) {
      const cleanImages = updates.images.map(formatDriveImageUrl).filter(Boolean);
      dbPayload.image = cleanImages[0];
      dbPayload.images = cleanImages;
    }

    console.log("Writing payload to Supabase for ID:", id, dbPayload);

    // Update in-memory cache immediately
    if (inMemoryProductsCache) {
      const idx = inMemoryProductsCache.findIndex((p) => p.id === id || p.slug === id);
      if (idx !== -1) {
        inMemoryProductsCache[idx] = mapSingleDbProduct({ ...inMemoryProductsCache[idx], ...dbPayload });
        try {
          localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(inMemoryProductsCache));
        } catch {}
      }
    }

    // 2. Perform direct update
    const { data, error } = await supabase
      .from("products")
      .update(dbPayload)
      .eq("id", id)
      .select();

    if (error) {
      console.warn("Supabase update by ID rejected or error:", error.message);
      // Attempt update by slug or upsert
      const targetSlug = updates.slug || id;
      const { data: slugData, error: slugErr } = await supabase
        .from("products")
        .update(dbPayload)
        .eq("slug", targetSlug)
        .select();

      if (slugErr || !slugData || slugData.length === 0) {
        console.warn("Update by slug rejected, attempting upsert with onConflict slug:", slugErr?.message);
        const { error: upsertErr } = await supabase
          .from("products")
          .upsert({ id, slug: targetSlug, ...dbPayload }, { onConflict: "slug" });
        if (upsertErr) {
          console.error("Critical error in updateProduct:", upsertErr);
          throw upsertErr;
        }
      }
    } else if (!data || data.length === 0) {
      console.warn("No rows matched ID:", id, "Attempting update by slug...");
      const targetSlug = updates.slug || id;
      const { data: slugData, error: slugErr } = await supabase
        .from("products")
        .update(dbPayload)
        .eq("slug", targetSlug)
        .select();

      if (slugErr || !slugData || slugData.length === 0) {
        console.warn("No rows matched slug, performing upsert by slug...");
        await supabase
          .from("products")
          .upsert({ id, slug: targetSlug, ...dbPayload }, { onConflict: "slug" });
      }
    }

    console.log("Successfully persisted update to Supabase!");
    // Notify all tabs and active views
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("products-updated", { detail: inMemoryProductsCache }));
      window.dispatchEvent(new CustomEvent("emsurg-products-changed"));
    }
    return true;
  } catch (err: any) {
    console.error("Critical error in updateProduct:", err);
    throw err;
  }
}

/**
 * Fetches a single product by slug from Supabase
 */
export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const normalized = slug.toLowerCase().trim();
  const targetSlug = SLUG_ALIAS_MAP[normalized] || normalized;

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", targetSlug)
      .maybeSingle();

    if (!error && data) {
      return mapSingleDbProduct(data);
    }
  } catch (err) {
    console.info("Supabase fetchProductBySlug notice:", err);
  }

  const local = getLocalProducts().find((p) => p.slug === targetSlug);
  return local || null;
}

export function getLocalProductBySlug(slug: string): Product | undefined {
  const normalized = slug.toLowerCase().trim();
  const targetSlug = SLUG_ALIAS_MAP[normalized] || normalized;
  const current = getLocalProducts();
  return current.find((p) => p.slug === targetSlug);
}

/**
 * Saves/Upserts a product directly to Supabase with verified persistence and Drive URL sanitization
 */
export async function saveProduct(productData: Partial<Product> | Partial<ProductItem>, existingId?: string): Promise<Product> {
  const current = getLocalProducts();
  const isFeat = (productData as any).is_featured ?? productData.featured ?? false;
  
  const rawPrimary = (productData.images && productData.images.length > 0)
    ? productData.images[0]
    : ((productData as any).image || "");
  const cleanImage = formatDriveImageUrl(rawPrimary) || "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop";

  const cleanImages = (productData.images && productData.images.length > 0)
    ? productData.images.map(formatDriveImageUrl).filter(Boolean)
    : [cleanImage];

  const targetId = existingId || productData.id || `prod-${Date.now()}`;
  const targetSlug = productData.slug || productData.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || `prod-${Date.now()}`;

  const payload: any = {
    id: targetId,
    slug: targetSlug,
    title: productData.title || "Medical Product",
    division: productData.division || "Manufacturing",
    category: productData.category || "Orthobiologics",
    partner_brand: (productData as any).partner_brand || productData.partnerBrand || null,
    description: (productData as any).description || (productData as any).short_description || "",
    short_description: (productData as any).short_description || (productData as any).description || "",
    full_description: (productData as any).full_description || (productData as any).description || "",
    features: productData.features || [],
    specifications: (productData as any).specifications || {},
    certifications: (productData as any).certifications || null,
    image: cleanImage,
    images: cleanImages.length > 0 ? cleanImages : [cleanImage],
    is_featured: isFeat,
    featured: isFeat,
    order_index: (productData as any).order_index ?? (productData as any).orderIndex ?? 0,
    brochure_url: (productData as any).brochure_url || (productData as any).brochureUrl || "#",
    created_at: (productData as any).created_at || new Date().toISOString()
  };

  console.log("Saving product payload to Supabase:", payload);

  const targetProduct = mapSingleDbProduct(payload);

  // Update in-memory & local cache
  const existingIdx = current.findIndex((p) => p.id === targetId || p.slug === targetSlug);
  if (existingIdx !== -1) {
    current[existingIdx] = { ...current[existingIdx], ...targetProduct };
  } else {
    current.push(targetProduct);
  }

  inMemoryProductsCache = current;
  try {
    localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(current));
  } catch {}

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("products-updated", { detail: current }));
    window.dispatchEvent(new CustomEvent("emsurg-products-changed"));
  }

  // Supabase upsert: Try onConflict: 'id' first, fallback to onConflict: 'slug'
  try {
    const { data, error } = await supabase
      .from("products")
      .upsert(payload, { onConflict: "id" })
      .select();

    if (error || !data || data.length === 0) {
      console.warn("Supabase upsert onConflict id notice, retrying with onConflict slug:", error?.message);
      const { data: retryData, error: retryErr } = await supabase
        .from("products")
        .upsert(payload, { onConflict: "slug" })
        .select();
      
      if (retryErr) {
        console.error("Supabase upsert retry by slug failed:", retryErr);
        throw retryErr;
      }
      if (retryData && retryData.length > 0) {
        console.log("Successfully saved product to Supabase (slug conflict matched)!");
        return mapSingleDbProduct(retryData[0]);
      }
    } else if (data && data.length > 0) {
      console.log("Successfully saved product to Supabase (id conflict matched)!");
      return mapSingleDbProduct(data[0]);
    }
  } catch (err: any) {
    console.error("Critical error in saveProduct:", err);
    throw err;
  }

  return targetProduct;
}

export const saveLocalProduct = saveProduct;

/**
 * Deletes a product directly from Supabase and local cache
 */
export async function deleteProduct(id: string): Promise<boolean> {
  const current = getLocalProducts();
  const productToDelete = current.find((p) => p.id === id || p.slug === id);
  
  const filtered = current.filter((p) => p.id !== id && p.slug !== id);
  filtered.forEach((p, idx) => {
    p.orderIndex = idx;
  });

  inMemoryProductsCache = filtered;
  try {
    localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(filtered));
  } catch {}

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("products-updated", { detail: filtered }));
  }

  // Delete from Supabase
  try {
    if (productToDelete) {
      await supabase.from("products").delete().eq("slug", productToDelete.slug);
      if (id && !id.startsWith("prod-")) {
        await supabase.from("products").delete().eq("id", id);
      }
    } else {
      await supabase.from("products").delete().or(`id.eq.${id},slug.eq.${id}`);
    }
  } catch (err) {
    console.info("Supabase deleteProduct error:", err);
  }

  return true;
}

export const deleteLocalProduct = deleteProduct;

/**
 * Toggles featured state for a product directly in Supabase
 */
export async function toggleFeatured(id: string): Promise<Product | null> {
  const current = getLocalProducts();
  const prod = current.find((p) => p.id === id || p.slug === id);
  if (!prod) return null;

  const nextVal = !(prod.featured ?? prod.is_featured ?? false);
  prod.featured = nextVal;
  prod.is_featured = nextVal;

  inMemoryProductsCache = current;
  try {
    localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(current));
  } catch {}

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("products-updated", { detail: current }));
  }

  await updateProduct(prod.id || prod.slug, {
    featured: nextVal,
    is_featured: nextVal,
  });

  return prod;
}

export const toggleLocalProductFeatured = toggleFeatured;

/**
 * Reorders products by moving from sourceIndex to destinationIndex
 * and persists the updated order_index values directly to Supabase.
 */
export async function reorderProducts(sourceIndex: number, destinationIndex: number): Promise<Product[]> {
  const current = [...getLocalProducts()];
  if (
    sourceIndex < 0 ||
    sourceIndex >= current.length ||
    destinationIndex < 0 ||
    destinationIndex >= current.length ||
    sourceIndex === destinationIndex
  ) {
    return current;
  }

  const [moved] = current.splice(sourceIndex, 1);
  current.splice(destinationIndex, 0, moved);

  current.forEach((item, idx) => {
    item.orderIndex = idx;
  });

  inMemoryProductsCache = current;
  try {
    localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(current));
  } catch {}

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("products-updated", { detail: current }));
  }

  // Persist order directly to Supabase
  try {
    const updates = current.map((p, idx) => ({
      slug: p.slug,
      order_index: idx,
    }));

    for (const item of updates) {
      supabase.from("products").update({ order_index: item.order_index }).eq("slug", item.slug).then(() => {});
    }
  } catch (err) {
    console.info("Supabase reorderProducts update error:", err);
  }

  return current;
}

export async function updateProductsOrder(orderedIds: string[]): Promise<Product[]> {
  const current = getLocalProducts();
  const idMap = new Map<string, Product>();
  current.forEach((p) => idMap.set(p.id, p));

  const ordered: Product[] = [];
  orderedIds.forEach((id, idx) => {
    const item = idMap.get(id);
    if (item) {
      item.orderIndex = idx;
      ordered.push(item);
      idMap.delete(id);
    }
  });

  idMap.forEach((item) => {
    item.orderIndex = ordered.length;
    ordered.push(item);
  });

  inMemoryProductsCache = ordered;
  try {
    localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(ordered));
  } catch {}

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("products-updated", { detail: ordered }));
  }

  // Sync to Supabase
  try {
    for (let idx = 0; idx < ordered.length; idx++) {
      const p = ordered[idx];
      supabase.from("products").update({ order_index: idx }).eq("slug", p.slug).then(() => {});
    }
  } catch (err) {
    console.info("Supabase updateProductsOrder error:", err);
  }

  return ordered;
}

/**
 * Real-time Supabase subscription for Products
 */
export function subscribeToProducts(callback: (products: Product[]) => void): () => void {
  const channel = supabase
    .channel("public:products-live-sync")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "products" },
      async () => {
        const refreshed = await fetchProducts();
        callback(refreshed);
      }
    )
    .subscribe();

  const handleCustomEvent = (e: any) => {
    if (e.detail) {
      callback(e.detail);
    } else {
      callback(getLocalProducts());
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("products-updated", handleCustomEvent);
    window.addEventListener("emsurg-products-changed", handleCustomEvent);
  }

  return () => {
    supabase.removeChannel(channel);
    if (typeof window !== "undefined") {
      window.removeEventListener("products-updated", handleCustomEvent);
      window.removeEventListener("emsurg-products-changed", handleCustomEvent);
    }
  };
}

/* =========================================================================
   INQUIRIES MANAGEMENT
   ========================================================================= */

let inMemoryInquiriesCache: ProductInquiry[] | null = null;

export async function fetchInquiries(): Promise<ProductInquiry[]> {
  try {
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && Array.isArray(data)) {
      inMemoryInquiriesCache = data;
      try {
        localStorage.setItem(LOCAL_STORAGE_INQUIRIES_KEY, JSON.stringify(data));
      } catch {}
      return data;
    }

    // Fallback table name product_inquiries
    const res2 = await supabase
      .from("product_inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (!res2.error && Array.isArray(res2.data)) {
      inMemoryInquiriesCache = res2.data;
      try {
        localStorage.setItem(LOCAL_STORAGE_INQUIRIES_KEY, JSON.stringify(res2.data));
      } catch {}
      return res2.data;
    }
  } catch (err) {
    console.info("Supabase fetchInquiries fallback:", err);
  }

  return getLocalInquiries();
}

export function getLocalInquiries(): ProductInquiry[] {
  if (inMemoryInquiriesCache) return inMemoryInquiriesCache;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_INQUIRIES_KEY) || localStorage.getItem(LOCAL_STORAGE_INQUIRIES_FALLBACK_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    const arr = Array.isArray(parsed) ? parsed : [];
    inMemoryInquiriesCache = arr;
    return arr;
  } catch {
    return [];
  }
}

export async function deleteInquiry(id: string): Promise<void> {
  const current = getLocalInquiries().filter((inq) => inq.id !== id);
  inMemoryInquiriesCache = current;
  try {
    localStorage.setItem(LOCAL_STORAGE_INQUIRIES_KEY, JSON.stringify(current));
    localStorage.setItem(LOCAL_STORAGE_INQUIRIES_FALLBACK_KEY, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent("emsurg-inquiries-updated", { detail: current }));
  } catch {}

  try {
    await supabase.from("inquiries").delete().eq("id", id);
    await supabase.from("product_inquiries").delete().eq("id", id);
  } catch (err) {
    console.info("Supabase delete inquiry notice:", err);
  }
}

export const deleteLocalInquiry = deleteInquiry;

export async function submitProductInquiry(inquiry: Omit<ProductInquiry, "id" | "created_at">): Promise<ProductInquiry> {
  const newInquiry: ProductInquiry = {
    ...inquiry,
    id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    created_at: new Date().toISOString(),
  };

  const current = [newInquiry, ...getLocalInquiries()];
  inMemoryInquiriesCache = current;
  try {
    localStorage.setItem(LOCAL_STORAGE_INQUIRIES_KEY, JSON.stringify(current));
    localStorage.setItem(LOCAL_STORAGE_INQUIRIES_FALLBACK_KEY, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent("emsurg-inquiries-updated", { detail: current }));
  } catch {}

  // Direct Supabase insert
  try {
    const payload = {
      product_name: newInquiry.product_name,
      name: newInquiry.name,
      email: newInquiry.email || "",
      phone: newInquiry.phone,
      institution: newInquiry.institution || "",
      city: newInquiry.city || "",
      role: newInquiry.role || "Surgeon",
      notes: newInquiry.notes || "",
      created_at: newInquiry.created_at,
    };

    const { error } = await supabase.from("inquiries").insert([payload]);
    if (error) {
      await supabase.from("product_inquiries").insert([payload]);
    }
  } catch (err) {
    console.info("Supabase inquiry insert fallback:", err);
  }

  return newInquiry;
}

export function subscribeToInquiries(callback: (inquiries: ProductInquiry[]) => void): () => void {
  const channel = supabase
    .channel("public:inquiries-live-sync")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "inquiries" },
      async () => {
        const refreshed = await fetchInquiries();
        callback(refreshed);
      }
    )
    .subscribe();

  const handleCustomEvent = (e: any) => {
    if (e.detail) {
      callback(e.detail);
    } else {
      callback(getLocalInquiries());
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("emsurg-inquiries-updated", handleCustomEvent);
  }

  return () => {
    supabase.removeChannel(channel);
    if (typeof window !== "undefined") {
      window.removeEventListener("emsurg-inquiries-updated", handleCustomEvent);
    }
  };
}

/**
 * Category-to-WhatsApp Routing Rules:
 * 1. +91 74397 57452 (Phone: 917439757452):
 *    - Nephrology (Dialysis Fluid, Drycitrate, NaCl Tablets, Aquasurg, Citric Acid, Diaclean, Diakit)
 *    - Trading Cements / Bone Cement (Demetra Cemex HV, LV, ID Green)
 *    - Spine Solutions (Tecres Mendec, Teknimed Opacity+, High V+)
 *    - Default fallback for general/unassigned inquiries
 * 
 * 2. +91 98745 35674 (Phone: 919874535674):
 *    - BoneSurg / Orthobiologics (BoneSurg CR, BoneSurg HA, BoneSurg Regen)
 *    - Sports Medicine (Smith & Nephew Arthroscopy)
 * 
 * 3. +91 83350 29278 (Phone: 918335029278):
 *    - NPWT / Wound Management (NPWT Machine & Kits, Cellsurg P, Cellsurg M)
 *    - MDL / Biopsy Needles (MDL Soft Tissue & Bone Marrow Biopsy Systems)
 */
export function getWhatsAppNumberForProduct(
  product?: { category?: string; division?: string; partnerBrand?: string; title?: string } | null
): string {
  if (!product) return "917439757452";

  const cat = (product.category || "").toLowerCase();
  const title = (product.title || "").toLowerCase();
  const brand = (product.partnerBrand || "").toLowerCase();

  // 2. BoneSurg and Sports Medicine -> +91 98745 35674
  if (
    cat.includes("orthobiologic") ||
    title.includes("bonesurg") ||
    cat.includes("sport") ||
    brand.includes("smith")
  ) {
    return "919874535674";
  }

  // 3. NPWT and MDL Biopsy -> +91 83350 29278
  if (
    cat.includes("wound") ||
    title.includes("npwt") ||
    title.includes("cellsurg") ||
    cat.includes("biopsy") ||
    brand.includes("mdl")
  ) {
    return "918335029278";
  }

  // 1. Nephrology, Trading Cements, Spine (Default) -> +91 74397 57452
  return "917439757452";
}

