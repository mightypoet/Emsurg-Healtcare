import { supabase } from "./supabase";
import { getProductFAQs, type ProductFAQ } from "./productsFaqs";

export { getProductFAQs, type ProductFAQ };

/*
Supabase SQL Schema Requirements for Products & Inquiries:

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  specifications JSONB DEFAULT '{}'::jsonb,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_featured BOOLEAN DEFAULT true,
  brochure_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Setup RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Admins have full access to products" ON products
  FOR ALL USING (auth.role() = 'authenticated');

-- Create inquiries table
CREATE TABLE IF NOT EXISTS product_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id TEXT,
  product_name TEXT NOT NULL,
  name TEXT NOT NULL,
  institution TEXT NOT NULL,
  city TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  quantity_requirement TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE product_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert product inquiries" ON product_inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view product inquiries" ON product_inquiries
  FOR SELECT USING (auth.role() = 'authenticated');
*/

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  short_description: string;
  full_description: string;
  features: string[];
  specifications: Record<string, string>;
  images: string[];
  is_featured: boolean;
  brochure_url?: string;
  created_at: string;
  faqs?: ProductFAQ[];
}

export interface ProductInquiry {
  id: string;
  product_id?: string;
  product_name: string;
  name: string;
  institution: string;
  city: string;
  phone: string;
  email: string;
  quantity_requirement?: string;
  created_at: string;
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-bonesurg-cr",
    title: "BoneSurg CR",
    slug: "bonesurg-cr",
    category: "Orthobiologics",
    short_description: "Rapid, resorbable calcium sulphate hemihydrate matrix engineered for dead space management and targeted local antibiotic elution.",
    full_description: `## Advanced Resorbable Calcium Sulphate System

BoneSurg CR is a pharmaceutical-grade synthetic calcium sulphate hemihydrate system meticulously engineered for dead-space management in infected or clean bone defects. It acts as an osteoconductive scaffold that completely biodegrades synchronously with natural host bone turnover.

### Clinical Utility & Antibiotic Elution
BoneSurg CR allows the operating surgeon to incorporate heat-stable liquid or powdered antibiotics (such as Vancomycin, Tobramycin, Gentamicin, or Clindamycin) during intraoperative mixing. Once set in the sterile flexible silicone bead mold, the beads or paste deliver prolonged, high-concentration local antimicrobial therapy exceeding the minimum inhibitory concentration (MIC) by up to 100-fold without systemic toxicity.

### Key Clinical Advantages
- **Physiological Resorption:** Completely hydrolyzes into calcium and sulphate ions within 30–60 days, leaving no inert foreign body substrate that could harbor chronic biofilm.
- **Zero Second Surgery:** Eliminates the necessity for secondary surgical removal typically mandated by PMMA non-resorbable bead chains.
- **Osteoconductive Architecture:** Provides a micro-porous scaffold that actively facilitates capillary ingrowth and natural osteoblast migration.
- **Sterile Procedural Kit:** Packaged complete with high-purity powder, calibrated mixing liquid, ergonomic spatula, and multi-cavity silicone bead mold.`,
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
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1600&auto=format&fit=crop"
    ],
    is_featured: true,
    brochure_url: "#",
    created_at: new Date(Date.now() - 500000000).toISOString(),
  },
  {
    id: "prod-bonesurg-ha",
    title: "BoneSurg HA",
    slug: "bonesurg-ha",
    category: "Orthobiologics",
    short_description: "Nanocrystalline hydroxyapatite synthetic bone graft scaffold mimicking natural human trabecular architecture for true osteogenesis.",
    full_description: `## Biomimetic Nanocrystalline Hydroxyapatite Scaffold

BoneSurg HA is an ultra-pure synthetic nanocrystalline hydroxyapatite bone graft substitute designed to closely mimic the physical nanostructure and biochemical composition of natural human bone mineral. 

### Biomimetic Cellular Integration
Engineered with interconnected microporosity and macroporosity (pore diameter 100–500 µm), BoneSurg HA accelerates osteoblast adherence, capillary penetration, and neo-vascularization. When blended intraoperatively with autologous bone marrow aspirate (BMA) or blood, it creates a cohesive, osteostimulative matrix that resists irrigation wash-out.

### Indicative Applications
- Spinal arthrodesis and posterolateral fusion
- Metaphyseal fractures and segmental bone void filling
- Maxillofacial and reconstructive trauma surgery
- Revision arthroplasty with contained acetabular or femoral defects`,
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
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?q=80&w=1600&auto=format&fit=crop"
    ],
    is_featured: true,
    brochure_url: "#",
    created_at: new Date(Date.now() - 400000000).toISOString(),
  },
  {
    id: "prod-em-vac-npwt",
    title: "EM-VAC Negative Pressure Wound Therapy",
    slug: "em-vac-npwt",
    category: "Wound Management",
    short_description: "Smart digital NPWT therapy pump and biocompatible reticulated foam dressing system for accelerated wound closure.",
    full_description: `## Next-Generation Negative Pressure Wound Management

EM-VAC is a hospital-grade digital Negative Pressure Wound Therapy (NPWT) solution engineered to expedite postoperative healing, facilitate granulation tissue formation, and manage copious exudate across complex surgical and traumatic wounds.

### Mechanism of Action
- **Macro-deformation:** Draws wound margins together through controlled negative pressure (-20 to -200 mmHg), reducing edema and tissue tension.
- **Micro-deformation:** Exerts shear stress at the cellular interface, stimulating cell mitosis, fibroblast proliferation, and rapid angiogenesis.
- **Active Exudate Evacuation:** Continually clears infectious fluids and matrix metalloproteinases (MMPs) into hermetically sealed canister reservoirs.

### Complete Consumables Ecosystem
The EM-VAC platform is backed by our indigenously produced sterile dressing kits containing hydrophobic polyurethane foam, semi-permeable adhesive drape with high moisture vapor transmission rate (MVTR), and low-profile suction bell tubing with integrated pressure sensors.`,
    features: [
      "Precision Microprocessor Digital Pump with Continuous, Intermittent & Dynamic Modes",
      "Pressure Range from -20 mmHg to -200 mmHg with Real-Time Pressure Feedback",
      "Multi-Sensor Smart Alarm Suite: Air Leak, Canister Full, Low Battery, Blockage",
      "High-Performance Reticulated Hydrophobic Polyurethane Foam Dressing Kits",
      "Long-Life Rechargeable Lithium Battery (>24 Hours continuous operation)",
      "Sterile 500ml and 1000ml Solidifier-Integrated Canisters with Hydrophobic Filters"
    ],
    specifications: {
      "Operating Modes": "Continuous, Intermittent, Dynamic Cycle",
      "Pressure Range": "-20 mmHg to -200 mmHg (calibrated in 5 mmHg increments)",
      "Battery Autonomy": "24+ Hours continuous clinical suction",
      "Noise Level": "Whisper-quiet clinical acoustic profile (<38 dB)",
      "Canister Capacities": "500ml and 1000ml with integrated gelling solidifier",
      "Dressing Kit Sizing": "Small (10x7.5cm), Medium (18x12.5cm), Large (26x15cm)",
      "Certifications": "IEC 60601-1 Medical Electrical Safety, CDSCO Approved"
    },
    images: [
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1600&auto=format&fit=crop"
    ],
    is_featured: true,
    brochure_url: "#",
    created_at: new Date(Date.now() - 350000000).toISOString(),
  },
  {
    id: "prod-hemodialysis-fluids",
    title: "Hemodialysis Fluids & Dry Powders",
    slug: "hemodialysis-fluids-dry-powders",
    category: "Nephro Care",
    short_description: "Ultra-pure pharmacopeial hemodialysis acid concentrates and dry bicarbonate powder cartridges manufactured under WHO-GMP compliance.",
    full_description: `## Ultra-Pure Dialysis Consumables for Renal Replacement

Manufactured at Emsurg's state-of-the-art automated formulation plant in Kolkata, our hemodialysis fluids and dry sodium bicarbonate cartridges conform to the strictest Indian and British Pharmacopeia (IP/BP) standards for artificial kidney therapy.

### Advanced Quality Architecture
- Multi-stage high-efficiency reverse osmosis (RO) and sub-micron endotoxin filtration ensures dialysate water meets stringent microbiological thresholds (<0.1 CFU/ml, endotoxin <0.03 EU/ml).
- Precision stoichiometric electrolyte blending containing Sodium, Potassium, Calcium, Magnesium, Chloride, and Dextrose tailored for standard dilution ratios (1:34, 1:44).
- Ergonomic HDPE containers with tamper-evident induction heat-sealed caps designed for universal machine compatibility (Fresenius, Nipro, Gambro, B. Braun).`,
    features: [
      "Strict Compliance with WHO-GMP, IP and BP Pharmacopeial Guidelines",
      "Formulated with Pharmaceutical-Grade Raw Materials & Continuous Automated Conductivity Checks",
      "Multiple Acid Concentrate Formulations: Low Potassium (1.0 K), Standard (2.0 K, 3.0 K)",
      "Dry Sodium Bicarbonate Cartridges & Bags Minimizing Storage Bulk and Eliminating Bacterial Growth",
      "Universal Machine Spigot & Luer Lock Couplings for Seamless Bedside Setup",
      "Dedicated High-Volume Fleet Logistics Guaranteeing Unbroken Hospital Supply Chains"
    ],
    specifications: {
      "Formulation Variants": "Part A (Acid Concentrate) & Part B (Dry Sodium Bicarbonate Powder)",
      "Electrolyte Ratios": "Available in 1:34 and 1:44 mixing ratios",
      "Endotoxin Standard": "Bacterial Endotoxin < 0.03 EU/ml",
      "Container Sizing": "10 Litre & 20 Litre High-Density Polyethylene Jerrycans; 650g/900g Cartridges",
      "Quality Certification": "WHO-GMP Certified Facility, CDSCO Form MD-9 Approved",
      "Shelf Life": "24 Months from manufacturing date under standard ambient storage"
    },
    images: [
      "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1600&auto=format&fit=crop"
    ],
    is_featured: true,
    brochure_url: "#",
    created_at: new Date(Date.now() - 300000000).toISOString(),
  },
  {
    id: "prod-teknimed-bone-cements",
    title: "Teknimed OPACITY+® PMMA Bone Cements",
    slug: "teknimed-opacity-plus-bone-cement",
    category: "Bone Cements",
    short_description: "Premium French manufactured low-viscosity PMMA acrylic bone cement with 50% radiopacifiers for Vertebroplasty and Kyphoplasty.",
    full_description: `## Exclusive Import: Teknimed OPACITY+® Vertebral Cement

In exclusive partnership with Teknimed (Vic-en-Bigorre, France), Emsurg supplies OPACITY+®, the internationally benchmarked radiopaque polymethylmethacrylate (PMMA) acrylic cement formulated specifically for spinal augmentation procedures.

### Unsurpassed Fluoroscopic Visibility
OPACITY+® incorporates an optimized concentration of 45% Zirconium Dioxide and 5% Hydroxyapatite, delivering unmatched fluoroscopic visualization under low-dose C-arm imaging without obstructing adjacent anatomical landmarks.

### Working Handling Profile
- **Extended Working Window:** 8 to 12 minutes of consistent, injectable paste consistency allowing deliberate vertebral body infiltration.
- **Low Exothermic Polymerization:** Formulated to mitigate thermal osteonecrosis and neural damage during cement hardening.
- **High Biomechanical Compressive Strength:** Exceeds ISO 5833 standards to restore height and stability to osteoporotic vertebral compression fractures (VCFs).`,
    features: [
      "50% Premium Radiopaque Agents (45% Zirconium Dioxide + 5% Hydroxyapatite)",
      "Unrivaled Real-Time Fluoroscopic Tracking under C-Arm Visualization",
      "Low Initial Viscosity for Effortless Injection through Small-Bore 11G & 13G Needles",
      "Controlled Exothermic Peak preventing adjacent neural thermal injury",
      "Exclusively Manufactured by Teknimed in France & Distributed Across India by Emsurg",
      "Full Biocompatibility in compliance with ISO 10993-1 and ISO 5833"
    ],
    specifications: {
      "Origin": "Teknimed SAS (France) – Exclusive India Distribution by Emsurg",
      "Composition": "PMMA copolymer with 45% ZrO2 and 5% HA radiopaque matrix",
      "Viscosity": "Low-viscosity injectable paste (ideal for vertebral bodies)",
      "Working Time": "8 to 12 minutes at 20°C ambient room temperature",
      "Compressive Strength": "> 70 MPa (Compliant with ISO 5833)",
      "Packaging": "Sterile blister pack containing pre-measured Powder and Liquid Ampoule",
      "Regulatory Approvals": "CE Mark 0459, US FDA 510(k), CDSCO Import License"
    },
    images: [
      "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?q=80&w=1600&auto=format&fit=crop"
    ],
    is_featured: true,
    brochure_url: "#",
    created_at: new Date(Date.now() - 250000000).toISOString(),
  },
  {
    id: "prod-mdl-biopsy-devices",
    title: "MDL Precision Biopsy Devices",
    slug: "mdl-biopsy-devices",
    category: "Biopsy Devices",
    short_description: "Exclusive Italian engineered biopsy needles including ILLY, JAM BLU, OSTEOJ, and SEMICUT for precision oncology diagnosis.",
    full_description: `## Exclusive Import: MDL Precision Biopsy Needles

Emsurg is the exclusive Indian importer and healthcare partner for MDL S.r.l. (Italy), a world leader in high-precision interventional radiology, oncology, and hematology biopsy instrumentation.

### Comprehensive Biopsy Portfolio
- **ILLY & JAM BLU:** Ergonomically contoured bone marrow aspiration and biopsy needles featuring sharpened trocar tips and extraction cannulas designed for intact core retrieval with minimal patient trauma.
- **OSTEOJ:** Heavy-duty bone biopsy systems engineered with reinforced diamond-bevel cutting geometry for sclerotic lesions.
- **SEMICUT & THEMY:** Semi-automatic and fully automatic guillotine core needle systems for breast, kidney, liver, and soft-tissue diagnostic biopsy under ultrasound or CT guidance.`,
    features: [
      "Precision Italian Engineering from MDL S.r.l. (Italy)",
      "Ultra-Sharp Echogenic Echogenic-Coated Needle Tips for Flawless Ultrasound Guidance",
      "Ergonomic Handles Engineered for One-Handed Physician Tactile Control",
      "Maximum Core Specimen Preservation Minimizing Crush Artifact for Pathologists",
      "Color-Coded Gauge Identification (11G, 13G, 14G, 16G, 18G, 20G)",
      "Sterile Double-Blister Packaging for Fast Operating Room Delivery"
    ],
    specifications: {
      "Manufacturer": "MDL S.r.l. (Italy) – Exclusive India Distribution by Emsurg",
      "Specialty Domains": "Interventional Oncology, Hematology, Soft Tissue Biopsy",
      "Models Included": "ILLY, JAM BLU, OSTEOJ, PICK UP, HARVEST, SEMICUT, THEMY",
      "Gauge Sizes": "Available from 8G down to 20G; Needle lengths 70mm to 200mm",
      "Material": "Surgical Grade AISI 304 / 316 Stainless Steel with Medical Polymer Hub",
      "Sterilization": "Ethylene Oxide (EtO) Single-Use Sterile",
      "Approvals": "CE Marked, ISO 13485, CDSCO Medical Device Import License"
    },
    images: [
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1600&auto=format&fit=crop"
    ],
    is_featured: true,
    brochure_url: "#",
    created_at: new Date(Date.now() - 200000000).toISOString(),
  },
  {
    id: "prod-smith-nephew-sports-med",
    title: "Smith & Nephew Sports Medicine Joint Repair",
    slug: "smith-nephew-sports-medicine",
    category: "Sports Medicine",
    short_description: "Advanced arthroscopic joint repair implants and bio-inductive solutions including REGENETEN, NOVOSTITCH PRO, and ULTRABUTTON.",
    full_description: `## Smith & Nephew Sports Medicine Portfolio

As an authorized channel partner for Smith & Nephew, Emsurg supplies cutting-edge arthroscopy and sports medicine solutions designed to advance patient recovery in shoulder, knee, and hip reconstructive procedures.

### Flagship Technologies
- **REGENETEN Bioinductive Implant:** Stimulates the body’s natural healing response to facilitate new tendon-like tissue growth over rotator cuff tears.
- **NOVOSTITCH PRO Meniscal Repair System:** Enables circumferential stitching inside the knee joint for complex horizontal and radial meniscal tears.
- **FAST-FIX FLEX & ULTRABUTTON:** Meniscal and ACL femoral fixation systems offering adaptable tensioning and robust biomechanical stability.`,
    features: [
      "Authorized Channel Distribution of Smith & Nephew Sports Medicine Solutions",
      "Bioinductive Tendon Regeneration (REGENETEN) for Rotator Cuff Pathology",
      "All-Inside Arthroscopic Meniscal Preservation (NOVOSTITCH PRO, FAST-FIX FLEX)",
      "High-Strength Continuous Loop Adjustable Fixation for ACL Reconstructions",
      "Specialized Procedural Training & Hospital Operating Room Support in India",
      "CE and US FDA Approved Technologies with Global Clinical Evidence"
    ],
    specifications: {
      "Partner": "Smith & Nephew – Authorized Channel Distribution by Emsurg",
      "Clinical Specialization": "Shoulder, Knee, Hip, Foot & Ankle Arthroscopy",
      "Primary Implants": "REGENETEN, NOVOSTITCH PRO, ULTRABUTTON, FAST-FIX FLEX",
      "Application": "Rotator Cuff Repair, Meniscal Repair, ACL/PCL Reconstruction",
      "Material Composition": "Type 1 Collagen Scaffold, UHMWPE High-Tensile Braided Sutures, PEEK",
      "Regulatory Clearances": "US FDA Cleared, CE Marked, CDSCO Authorized"
    },
    images: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?q=80&w=1600&auto=format&fit=crop"
    ],
    is_featured: false,
    brochure_url: "#",
    created_at: new Date(Date.now() - 150000000).toISOString(),
  }
];

const LOCAL_STORAGE_PRODUCTS_KEY = "emsurg_products_catalog";
const LOCAL_STORAGE_INQUIRIES_KEY = "emsurg_product_inquiries";

export function getLocalProducts(): Product[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((p: Product) => {
        if (!p.faqs || p.faqs.length === 0) {
          p.faqs = getProductFAQs(p);
        }
        return p;
      });
    }
    localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  } catch (err) {
    console.info("Reading local products fallback:", err);
    return INITIAL_PRODUCTS;
  }
}

export function saveLocalProduct(productData: Partial<Product>, existingId?: string): Product {
  const current = getLocalProducts();
  let updatedProduct: Product;

  if (existingId) {
    const index = current.findIndex(p => p.id === existingId);
    if (index !== -1) {
      updatedProduct = {
        ...current[index],
        ...productData,
        id: existingId,
      } as Product;
      current[index] = updatedProduct;
    } else {
      updatedProduct = {
        id: existingId,
        created_at: new Date().toISOString(),
        is_featured: true,
        features: [],
        specifications: {},
        images: [],
        ...productData,
      } as Product;
      current.unshift(updatedProduct);
    }
  } else {
    updatedProduct = {
      id: "prod-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
      created_at: new Date().toISOString(),
      is_featured: true,
      features: [],
      specifications: {},
      images: [],
      ...productData,
    } as Product;
    current.unshift(updatedProduct);
  }

  try {
    localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(current));
  } catch (err) {
    console.info("Saving product locally error:", err);
  }

  return updatedProduct;
}

export function deleteLocalProduct(id: string): void {
  const current = getLocalProducts();
  const filtered = current.filter(p => p.id !== id);
  try {
    localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.info("Deleting product locally error:", err);
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  deleteLocalProduct(id);
  try {
    if (!id.startsWith("prod-")) {
      const promise = Promise.resolve(supabase.from("products").delete().eq("id", id));
      await Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 3000))
      ]);
    }
    return true;
  } catch (err) {
    console.info("Supabase product delete graceful fallback:", err);
    return true;
  }
}

export function toggleLocalProductFeatured(id: string): Product | null {
  const current = getLocalProducts();
  const prod = current.find(p => p.id === id);
  if (!prod) return null;
  prod.is_featured = !prod.is_featured;
  try {
    localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(current));
  } catch (err) {
    console.info("Toggling featured error:", err);
  }
  return prod;
}

export function getLocalProductBySlug(slug: string): Product | undefined {
  const current = getLocalProducts();
  return current.find(p => p.slug === slug);
}

// Supabase fetching with safe timeout fallback
export async function fetchProducts(): Promise<Product[]> {
  const local = getLocalProducts();
  try {
    const promise = Promise.resolve(
      supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })
    );

    const { data, error } = (await Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 3000))
    ])) as any;

    if (error) {
      console.info("Supabase products table info, using local store:", error.message || error.code);
      return local;
    }

    if (data && Array.isArray(data) && data.length > 0) {
      const map = new Map<string, Product>();
      local.forEach(p => map.set(p.slug, p));
      data.forEach((p: Product) => map.set(p.slug, p));
      return Array.from(map.values()).sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
    return local;
  } catch {
    return local;
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const local = getLocalProductBySlug(slug);
  try {
    const promise = Promise.resolve(
      supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .maybeSingle()
    );

    const { data, error } = (await Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 3000))
    ])) as any;

    if (!error && data) {
      return data as Product;
    }
    return local || null;
  } catch {
    return local || null;
  }
}

// Inquiries handling
export function getLocalInquiries(): ProductInquiry[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_INQUIRIES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function submitProductInquiry(inquiry: Omit<ProductInquiry, "id" | "created_at">): Promise<ProductInquiry> {
  const newInquiry: ProductInquiry = {
    ...inquiry,
    id: "inq-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
    created_at: new Date().toISOString(),
  };

  const current = getLocalInquiries();
  current.unshift(newInquiry);
  try {
    localStorage.setItem(LOCAL_STORAGE_INQUIRIES_KEY, JSON.stringify(current));
  } catch (err) {
    console.info("Could not save inquiry locally:", err);
  }

  // Attempt Supabase insert if table exists
  try {
    const promise = Promise.resolve(
      supabase.from("product_inquiries").insert([newInquiry])
    );
    await Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 2500))
    ]);
  } catch (err) {
    console.info("Supabase inquiry insert skipped:", err);
  }

  return newInquiry;
}
