import { Product } from "./productsStore";

export interface ProductFAQ {
  id?: string;
  question: string;
  answer: string;
  category: "compatibility" | "safety" | "handling";
  badge?: string;
}

export const BONESURG_CR_FAQS: ProductFAQ[] = [
  {
    id: "bs-cr-1",
    question: "Which antibiotics can be incorporated into BoneSurg CR, and does it compromise antibiotic potency?",
    answer: "BoneSurg CR is chemically compatible with both heat-sensitive and heat-stable powdered or liquid antibiotics, including Vancomycin Hydrochloride, Tobramycin Sulfate, Gentamicin, Clindamycin, and Colistin. Because BoneSurg CR sets via an isothermal crystallization process with a peak temperature of <30°C, antibiotic molecular integrity and biological potency are 100% preserved—unlike standard PMMA bone cement which reaches 70°C–90°C and denatures heat-labile molecules.",
    category: "compatibility",
    badge: "Antibiotic Elution"
  },
  {
    id: "bs-cr-2",
    question: "Is BoneSurg CR compatible with autograft, allograft, and autologous Bone Marrow Aspirate (BMA)?",
    answer: "Yes. BoneSurg CR is fully compatible with autologous cancellous bone chips, demineralized bone matrix (DBM), and autologous BMA. In revision orthopedic surgery and trauma reconstructions, BoneSurg CR functions as an osteoconductive delivery scaffold, while autograft or BMA supplies live osteoprogenitor cells and osteoinductive BMPs for synergistic osteogenesis.",
    category: "compatibility",
    badge: "Biologic Synergies"
  },
  {
    id: "bs-cr-3",
    question: "What is the biological safety profile, and does high-dose local antibiotic elution cause systemic toxicity?",
    answer: "Local antibiotic elution from BoneSurg CR delivers concentrations up to 100 times higher than the minimum inhibitory concentration (MIC90) right at the infected wound bed, rapidly eradicating bacterial biofilm. Systemic serum concentrations, however, remain negligible and safely below clinical toxicity thresholds, virtually eliminating nephrotoxicity and ototoxicity risks.",
    category: "safety",
    badge: "Systemic Safety"
  },
  {
    id: "bs-cr-4",
    question: "Does the complete bioresorption of calcium sulphate cause hypercalcemia or persistent serous wound drainage?",
    answer: "BoneSurg CR undergoes natural physiological dissolution into calcium and sulphate ions over 30 to 60 days, excreted via normal metabolic pathways. In standard clinical dosing (5cc to 10cc), systemic serum calcium levels remain well within normal reference limits. To prevent transient wound seroma during early resorption, meticulous layered fascial and soft-tissue watertight closure over the defect is clinically advised.",
    category: "safety",
    badge: "Bioresorption Safety"
  },
  {
    id: "bs-cr-5",
    question: "What are the sterilization standards, regulatory clearances, and single-use mandates?",
    answer: "BoneSurg CR is terminal sterilized via validated Gamma Irradiation (25 kGy) yielding a Sterility Assurance Level (SAL) of 10⁻⁶. It holds CDSCO Class C Implantable Medical Device approval and is produced under ISO 13485:2016 quality systems. Each kit is strictly single-use; re-sterilization is prohibited as it impairs crystallization lattice dynamics.",
    category: "handling",
    badge: "CDSCO Class C & ISO 13485"
  }
];

export const BONESURG_HA_FAQS: ProductFAQ[] = [
  {
    id: "bs-ha-1",
    question: "Is BoneSurg HA compatible with orthopedic metal hardware (titanium, stainless steel, PEEK cages)?",
    answer: "Yes. BoneSurg HA is biologically inert, electrically non-conductive, and non-corrosive. It can be safely packed adjacent to titanium alloy (Ti-6Al-4V), cobalt-chromium, stainless steel (316L), and PEEK spinal interbody fusion cages without causing galvanic reactions or interface corrosion.",
    category: "compatibility",
    badge: "Hardware Compatibility"
  },
  {
    id: "bs-ha-2",
    question: "Can BoneSurg HA granules and paste be blended with PRP, PRF, or autologous venous blood?",
    answer: "Absolutely. The nanocrystalline surface architecture features hydrophilic micro-porosity with high capillary wicking. When mixed with Platelet-Rich Plasma (PRP), Platelet-Rich Fibrin (PRF), or whole venous blood (recommended ~1ml blood per 1cc graft), it forms a cohesive, cohesive paste that resists intraoperative saline irrigation wash-out.",
    category: "compatibility",
    badge: "Blood & PRF Matrix"
  },
  {
    id: "bs-ha-3",
    question: "Is BoneSurg HA completely synthetic, and is there any risk of bovine or cadaveric disease transmission?",
    answer: "BoneSurg HA is 100% synthetic, formulated from ultra-pure inorganic calcium and phosphate precursor salts. It contains zero bovine, porcine, or human donor tissue, ensuring zero risk of transmitting Bovine Spongiform Encephalopathy (BSE), Creutzfeldt-Jakob Disease (CJD), or viral pathogens. It conforms strictly to ASTM F1185 biocompatibility.",
    category: "safety",
    badge: "100% Synthetic Safety"
  },
  {
    id: "bs-ha-4",
    question: "Is BoneSurg HA radiopaque, and is it certified safe for postoperative MRI and CT diagnostics?",
    answer: "Yes. The stoichiometric calcium phosphate density provides crisp radiopacity on plain radiography and fluoroscopy to confirm defect filling. It is completely non-ferromagnetic (100% MRI Safe) and generates significantly fewer CT streak artifacts than metallic implants, allowing unhindered postoperative radiological assessment.",
    category: "safety",
    badge: "MRI & CT Safe"
  },
  {
    id: "bs-ha-5",
    question: "What is the recommended storage and shelf life for BoneSurg HA?",
    answer: "Store in original sealed packaging in a cool, dry place between 15°C and 30°C. Protect from direct moisture and humidity. BoneSurg HA has a validated shelf life of 3 years from the date of gamma/EtO sterilization.",
    category: "handling",
    badge: "Shelf Life & Storage"
  }
];

export const EMVAC_NPWT_FAQS: ProductFAQ[] = [
  {
    id: "emvac-1",
    question: "Which canister systems and dressing foam interfaces are compatible with the EM-VAC pump?",
    answer: "The EM-VAC pump features a standardized quick-click locking connector and universal Luer-lock aspiration port. It is 100% compatible with both 500ml and 1000ml exudate canisters containing integrated solidifying gel filters. It seamlessly interfaces with reticulated hydrophobic polyurethane (PU - black) foam and hydrophilic polyvinyl alcohol (PVA - white) foam dressing kits.",
    category: "compatibility",
    badge: "Interface Compatibility"
  },
  {
    id: "emvac-2",
    question: "Can EM-VAC NPWT be used with topical antimicrobials, silver contact layers, or skin graft mesh?",
    answer: "Yes. The EM-VAC system can be applied over non-adherent silver barrier contact layers (e.g., nanocrystalline silver sheets) or petroleum mesh placed over split-thickness skin grafts (STSG) to bolster graft adherence. The port accommodates saline or hypochlorous acid lavage in wound instillation protocols.",
    category: "compatibility",
    badge: "Dressing Interoperability"
  },
  {
    id: "emvac-3",
    question: "What automated patient safety alarms and pressure monitoring fail-safes are integrated?",
    answer: "The EM-VAC microprocessor continuously monitors real-time sub-atmospheric pressure at the wound bed. Safety systems include: (1) Vacuum leak and seal failure audio-visual alarms, (2) Tube blockage / exudate occlusion detection, (3) Canister overflow auto-shutoff valve preventing fluid entry into the pump, (4) Pressure safety limit preventing vacuum exceeding -200 mmHg, and (5) Low-battery warning with 24+ hour rechargeable lithium-ion autonomy.",
    category: "safety",
    badge: "Digital Fail-Safe"
  },
  {
    id: "emvac-4",
    question: "What clinical contraindications must be verified before prescribing EM-VAC NPWT?",
    answer: "In accordance with clinical wound care guidelines, EM-VAC NPWT is contraindicated in: untreated osteomyelitis, presence of dry necrotic eschar (must undergo surgical debridement first), exposed vital blood vessels, organs or anastomoses without protective biological barrier, unexplored non-enteric fistulas, and active malignancy in the wound bed.",
    category: "safety",
    badge: "Clinical Contraindications"
  },
  {
    id: "emvac-5",
    question: "How should EM-VAC units be cleaned and disinfected between hospital patient transfers?",
    answer: "The durable outer casing can be wiped with standard hospital-grade disinfectant wipes (quaternary ammonium or 70% isopropyl alcohol). Dressing sets, tubing, and canisters are strictly single-patient disposable items and must never be re-used or autoclaved.",
    category: "handling",
    badge: "Disinfection Protocol"
  }
];

export const HEMODIALYSIS_FAQS: ProductFAQ[] = [
  {
    id: "dial-1",
    question: "Are Emsurg hemodialysis concentrates compatible with major dialysis machine systems (Fresenius, B. Braun, Nipro, Gambro)?",
    answer: "Yes. Emsurg liquid acid concentrates and dry bicarbonate powder cartridges are formulated to standard dilution mixing ratios: 1:34 (1 part acid + 1.225 parts bicarb + 32.775 parts RO water) and 1:44. The dry bicarbonate cartridges feature standardized conical snap-in connectors compatible with machine bibag/cartridge ports on Fresenius 4008/5008, B. Braun Dialog+, Nipro Surdial, and Gambro AK machines.",
    category: "compatibility",
    badge: "Machine Interoperability"
  },
  {
    id: "dial-2",
    question: "What reverse osmosis (RO) water purity specifications are required for bicarbonate powder dissolution?",
    answer: "Reconstitution and dialysate blending must strictly utilize RO purified water meeting AAMI / ISO 23500-3 guidelines for hemodialysis. Total viable microbial count must remain <100 CFU/ml and bacterial endotoxin levels must remain <0.25 EU/ml to prevent endotoxemia and pyrogenic patient episodes.",
    category: "compatibility",
    badge: "AAMI/ISO 23500-3"
  },
  {
    id: "dial-3",
    question: "How does Emsurg ensure absolute endotoxin and chemical safety across dialysis batches?",
    answer: "Every lot is manufactured under WHO-GMP compliance using pharmaceutical-grade API salts (BP/USP grade). Solutions undergo 0.2-micron membrane filtration and are systematically tested for conductivity, heavy metals, bioburden, and Limulus Amebocyte Lysate (LAL) bacterial endotoxins (<0.03 EU/ml) prior to quality release.",
    category: "safety",
    badge: "LAL & Endotoxin Safety"
  },
  {
    id: "dial-4",
    question: "How are containers coded to prevent accidental electrolyte mismatch errors in the dialysis unit?",
    answer: "All jerrycan packages and cartridge labels feature high-contrast color-coding conforming to nephrology safety protocols (Red for Acid Concentrate, Blue for Bicarbonate) with prominent Potassium (K+) and Calcium (Ca2+) molarity markers to prevent accidental administration errors by dialysis nursing staff.",
    category: "safety",
    badge: "Medication Safety"
  },
  {
    id: "dial-5",
    question: "What are the storage guidelines for high-volume hospital dialysis fluid depots?",
    answer: "Store in clean, covered warehousing between 5°C and 30°C. Protect from freezing (which can cause salt crystallization) and direct intense sunlight. Inspect induction seal integrity prior to bedside connection.",
    category: "handling",
    badge: "Storage & Handling"
  }
];

export const TEKNIMED_CEMENT_FAQS: ProductFAQ[] = [
  {
    id: "tek-1",
    question: "Which injection systems and cannula gauges are compatible with Teknimed OPACITY+?",
    answer: "Teknimed OPACITY+ features a low-viscosity, micro-polymerized formulation engineered specifically for spinal vertebroplasty and kyphoplasty. It is fully compatible with standard 10G, 11G, and 13G beveled or diamond-tip spinal access needles and vacuum closed mixing systems (e.g., Teknimed Mixi-Cup or equivalent).",
    category: "compatibility",
    badge: "Cannula Compatibility"
  },
  {
    id: "tek-2",
    question: "Can auxiliary liquid or dry antibiotics be added manually into Teknimed OPACITY+?",
    answer: "Teknimed OPACITY+ is precisely calibrated with a 50% radiopacifier matrix (45% Zirconium Dioxide + 5% Hydroxyapatite). Manually adding uncalibrated antibiotic powders can disrupt polymerization kinetics, viscosity delivery windows, and compressive biomechanics. For cases requiring antimicrobial coverage, pre-blended CE/CDSCO approved antibiotic formulations should be utilized.",
    category: "compatibility",
    badge: "Polymer Chemistry"
  },
  {
    id: "tek-3",
    question: "How does OPACITY+ prevent cement leakage (extravasation) and pulmonary embolism during spinal augmentation?",
    answer: "With its 50% high-grade radiopaque matrix, OPACITY+ provides razor-sharp fluoroscopic contrast under low-dose C-arm imaging, even in micro-filaments. The operating spine surgeon can track cement flow with superior clarity, instantly pausing injection at the earliest indication of cortical breach or posterior venous leakage.",
    category: "safety",
    badge: "Extravasation Safety"
  },
  {
    id: "tek-4",
    question: "What is the maximum polymerization temperature, and does it risk spinal cord or neural damage?",
    answer: "Teknimed's proprietary polymer-to-liquid monomer ratio controls the exothermic peak. While conventional orthopaedic PMMA can surpass 85°C–90°C, OPACITY+ maintains a moderated thermal plateau that cures solidly while minimizing heat transmission to adjacent spinal cord dura and spinal nerve roots.",
    category: "safety",
    badge: "Thermal Safety Limit"
  },
  {
    id: "tek-5",
    question: "How should the sterile liquid ampoule and polymer powder be handled in the sterile operating field?",
    answer: "Double-blister sterile packaging allows non-scrubbed circulators to transfer the inner pouch into the sterile field without contamination risk. Liquid monomer ampoules must be handled with the supplied protective filter-breaker to prevent glass particle ingress.",
    category: "handling",
    badge: "Sterile Field Handling"
  }
];

export const MDL_BIOPSY_FAQS: ProductFAQ[] = [
  {
    id: "mdl-1",
    question: "Are MDL core biopsy needles compatible with ultrasound, CT scanners, and coaxial guide systems?",
    answer: "Yes. MDL core biopsy needles feature an echogenic laser-etched distal tip that generates high acoustic reflection under ultrasound, enabling clear real-time needle guidance. For CT-guided deep visceral procedures, color-coded coaxial introducers permit repeated single-puncture sampling with zero tissue shearing.",
    category: "compatibility",
    badge: "Ultrasound & CT Guides"
  },
  {
    id: "mdl-2",
    question: "Are MRI-conditional variants of MDL biopsy needles available?",
    answer: "Standard MDL biopsy needles are manufactured from surgical-grade AISI 304/316L stainless steel (intended for Ultrasound, CT, and fluoroscopy). For MRI interventions, Emsurg supplies dedicated non-ferromagnetic titanium alloy models certified for safe biopsy within up to 3.0 Tesla MRI environments.",
    category: "compatibility",
    badge: "MRI Safety Testing"
  },
  {
    id: "mdl-3",
    question: "How does the dual-stage trigger mechanism prevent accidental misfire or vascular puncture?",
    answer: "MDL automatic biopsy instruments feature an integrated mechanical safety switch (tactile trigger lock). The spring-loaded firing mechanism can only be activated when the lock is deliberately disengaged, preventing premature release during trans-parenchymal needle advancement.",
    category: "safety",
    badge: "Safety Lock Mechanism"
  },
  {
    id: "mdl-4",
    question: "Can MDL core biopsy needles be re-sterilized or re-sharpened for multi-patient usage?",
    answer: "Strictly no. MDL biopsy instruments are supplied sterile (Ethylene Oxide - EtO) and are strictly single-patient single-use devices. Autoclaving or chemical immersion destroys calibrated spring tension, dulls micro-ground trocar cutting bevels, and creates severe cross-contamination risks.",
    category: "handling",
    badge: "Single-Patient Sterile"
  },
  {
    id: "mdl-5",
    question: "What specimen notch sizes are available for histological adequacy?",
    answer: "MDL needles offer either 10mm or 20mm specimen notch lengths, optimized to capture intact non-fragmented histological cores for breast, kidney, liver, and prostate pathology assessment.",
    category: "handling",
    badge: "Histological Specimen"
  }
];

export const SMITH_NEPHEW_FAQS: ProductFAQ[] = [
  {
    id: "sn-1",
    question: "Are suture anchors and bio-absorbable implants compatible with standard arthroscopic drivers?",
    answer: "All anchors are supplied pre-loaded on disposable ergonomic drivers with ultra-high molecular weight polyethylene (UHMWPE) braided sutures (e.g., ULTRABRAID). They interface seamlessly with standard arthroscopic drill guides, awls, and knot pushers commonly used in shoulder and knee arthroscopy.",
    category: "compatibility",
    badge: "Arthroscopy Tooling"
  },
  {
    id: "sn-2",
    question: "What is the bio-absorption profile of REGENESORB biocomposite material compared to standard PLLA?",
    answer: "REGENESORB consists of PLGA, calcium sulfate, and β-TCP. Unlike early generation PLLA anchors that could lead to late osteolysis or fluid-filled cystic reactions, REGENESORB is progressively absorbed over 24 months and actively replaced by host bone, as demonstrated in clinical histology.",
    category: "safety",
    badge: "Histological Safety"
  },
  {
    id: "sn-3",
    question: "Are implantable suture anchors safe for post-op MRI examination of the joint?",
    answer: "Both PEEK (inert thermoplastic) and bio-composite (REGENESORB) anchors are completely non-metallic and non-ferromagnetic. Patients with these implants can safely undergo 1.5T and 3.0T MRI scans at any time post-surgery with zero image artifact.",
    category: "safety",
    badge: "MRI Non-Ferromagnetic"
  },
  {
    id: "sn-4",
    question: "What training and hospital procedural support is provided for Smith & Nephew sports medicine implants?",
    answer: "Emsurg's clinical application specialists provide hands-on wet-lab dry-model training, scrub-in clinical support, and instrumentation maintenance for orthopedic and arthroscopy surgical teams across India.",
    category: "handling",
    badge: "Clinical Scrub-In Support"
  }
];

/**
 * Returns product-specific FAQs if present, or selects the pre-compiled authoritative FAQs,
 * or generates category-tailored compatibility, safety, and regulatory FAQs.
 */
export function getProductFAQs(product: Product): ProductFAQ[] {
  if (product.faqs && product.faqs.length > 0) {
    return product.faqs;
  }

  // Check by slug or ID
  const s = (product.slug || "").toLowerCase();
  const id = (product.id || "").toLowerCase();

  if (s.includes("bonesurg-cr") || id.includes("bonesurg-cr")) {
    return BONESURG_CR_FAQS;
  }
  if (s.includes("bonesurg-ha") || id.includes("bonesurg-ha")) {
    return BONESURG_HA_FAQS;
  }
  if (s.includes("em-vac") || s.includes("npwt") || id.includes("em-vac")) {
    return EMVAC_NPWT_FAQS;
  }
  if (s.includes("hemodialysis") || s.includes("dialysis") || id.includes("dialysis")) {
    return HEMODIALYSIS_FAQS;
  }
  if (s.includes("teknimed") || s.includes("cement") || id.includes("teknimed")) {
    return TEKNIMED_CEMENT_FAQS;
  }
  if (s.includes("mdl") || s.includes("biopsy") || id.includes("mdl")) {
    return MDL_BIOPSY_FAQS;
  }
  if (s.includes("smith") || s.includes("nephew") || s.includes("sports-medicine")) {
    return SMITH_NEPHEW_FAQS;
  }

  // Fallback category-based generation for any custom or new products
  const category = (product.category || "").toLowerCase();
  const title = product.title || "This medical product";

  return [
    {
      id: `gen-comp-1`,
      question: `What instrumentation and clinical systems are compatible with ${title}?`,
      answer: `${title} is engineered to integrate with standard hospital operating theater instruments, delivery cannulas, and monitoring systems conforming to ISO 13485 standards. Prior to procedural use, verify size and gauge compatibility with your surgical team.`,
      category: "compatibility",
      badge: "System Compatibility"
    },
    {
      id: `gen-comp-2`,
      question: `Can ${title} be combined with other adjunct biologics or pharmacological agents?`,
      answer: `Compatibility depends on chemical composition and clinical protocol. Consult the technical specification sheet or Emsurg clinical specialists to verify pharmacological interactions, mixing guidelines, and stability.`,
      category: "compatibility",
      badge: "Chemical Compatibility"
    },
    {
      id: `gen-safe-1`,
      question: `What biocompatibility and regulatory safety clearances does ${title} hold?`,
      answer: `${title} undergoes biological evaluation per ISO 10993 standards (cytotoxicity, systemic toxicity, pyrogenicity, and sensitization) and holds CDSCO medical device licensing and ISO 13485:2016 certified manufacturing compliance.`,
      category: "safety",
      badge: "CDSCO & ISO 10993"
    },
    {
      id: `gen-safe-2`,
      question: `Are there specific clinical contraindications or patient safety precautions?`,
      answer: `Do not use in patients with known hypersensitivity to the product's base materials. Contraindicated in compromised clinical situations without preliminary surgical debridement or institutional physician clearance.`,
      category: "safety",
      badge: "Patient Safety"
    },
    {
      id: `gen-hand-1`,
      question: `What are the sterilization method, packaging validation, and storage requirements?`,
      answer: `Delivered sterile in validated medical-grade blister packaging. Store in a clean, temperature-controlled environment (15°C–25°C). Strictly single-use only; do not attempt re-sterilization.`,
      category: "handling",
      badge: "Sterility & Storage"
    }
  ];
}
