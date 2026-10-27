/**
 * RUVO Marine - Central Configuration File
 * All brand information, specifications, imagery paths, contact info,
 * and form endpoints are configurable in this file.
 */

const RUVO_CONFIG = {
  // Brand Identity
  brand: {
    name: "RUVO",
    fullName: "RUVO Marine India",
    tagline: "India's First Manufactured Electric Jet Ski & Aqua Kart.",
    subTagline: "Proudly manufactured in India for water sports, coastal resorts, and thrilling private adventures. 12 kW electric jet thrust, go-kart carving agility, and zero emissions.",
    category: "India's First Manufactured Electric Jet Ski & Aqua Kart",
    model: "RUVO One — Electric Water-Kart & Hydro-Jet",
    heroBadge: "INDIA'S FIRST MANUFACTURED ELECTRIC JET SKI",
  },

  // Pricing
  pricing: {
    range: "₹8L – ₹10 Lakhs",
    terms: "Ex-Showroom",
    display: "₹8L – ₹10 Lakhs (Ex-Showroom)",
    description: "Introductory ex-showroom pricing for India. Unprecedented commercial and recreational value."
  },

  // Contact Details
  contact: {
    email: "sureshreddy.per@gmail.com",
    phone: "+91 90199 40045",
    displayPhone: "+91 90199 40045",
    location: "Manufactured in India // National Sales & Demo Fleet",
    hours: "Monday – Saturday, 09:00 – 19:00 IST",
    whatsAppNumber: "+919019940045",
    whatsAppDefaultMessage: "Hello Suresh, I am interested in inquiring about India's first manufactured RUVO electric jet ski (₹8L - ₹10 Lakhs ex-showroom).",
  },

  // Technical Specifications (Exact manufacturer-stated values)
  specifications: [
    {
      id: "price",
      label: "Introductory Price",
      value: "₹8L – ₹10 Lakhs",
      detail: "Ex-showroom India. Zero import duties and lowest running cost.",
      highlight: true,
      category: "Pricing"
    },
    {
      id: "material",
      label: "Hull Material",
      value: "PE (Polyethylene)",
      detail: "High-density impact-resistant rotomolded polyethylene",
      category: "Construction"
    },
    {
      id: "max_power",
      label: "Maximum Power",
      value: "12 kW",
      detail: "Direct-drive electric water-jet motor",
      highlight: true,
      category: "Propulsion"
    },
    {
      id: "speed",
      label: "Stated Speed",
      value: "30–40 km/h",
      detail: "Manufacturer-stated velocity (approx. 16–22 knots)",
      category: "Performance"
    },
    {
      id: "battery_type",
      label: "Battery Type",
      value: "Ternary Lithium",
      detail: "High energy-density rechargeable lithium chemistry",
      category: "Energy"
    },
    {
      id: "battery_capacity",
      label: "Battery Capacity",
      value: "5.8 kWh",
      detail: "Integrated marine lithium battery pack",
      highlight: true,
      category: "Energy"
    },
    {
      id: "cycle_life",
      label: "Battery Cycle Life",
      value: "800 Cycles",
      detail: "Manufacturer rated full charge / discharge cycles",
      category: "Energy"
    },
    {
      id: "endurance",
      label: "Stated Endurance",
      value: "40–60 Minutes",
      detail: "Operational runtime depending on throttle application",
      highlight: true,
      category: "Performance"
    },
    {
      id: "max_load",
      label: "Maximum Load",
      value: "150 kg",
      detail: "Payload capacity including operator and onboard gear",
      category: "Dimensions & Capacity"
    },
    {
      id: "charging_input",
      label: "Charging Input",
      value: "AC 100–260 V",
      detail: "Universal domestic and marina shore power compatible",
      category: "Charging"
    },
    {
      id: "charger_power",
      label: "Charger Power",
      value: "2,000 W",
      detail: "Dedicated high-rate rapid AC marine charger",
      category: "Charging"
    },
    {
      id: "charging_time",
      label: "Charging Time",
      value: "4–5 Hours",
      detail: "Standard full replenishment cycle from empty",
      category: "Charging"
    },
    {
      id: "cooling_method",
      label: "Cooling Method",
      value: "Natural Water Cooling",
      detail: "Closed-loop passive marine flow heat dissipation",
      category: "Propulsion"
    },
    {
      id: "battery_mounting",
      label: "Battery Mounting",
      value: "Safety Buckle Type",
      detail: "Secure mechanical quick-release retention harness",
      category: "Construction"
    },
    {
      id: "dimensions",
      label: "Dimensions (L × W × H)",
      value: "220 × 99 × 75 cm",
      detail: "Compact footprint for tender garages & lightweight transport",
      highlight: true,
      category: "Dimensions & Capacity"
    },
    {
      id: "weight_without_battery",
      label: "Weight Without Battery",
      value: "56 kg",
      detail: "Ultra-lightweight bare hull easy for dual-person lifting",
      category: "Dimensions & Capacity"
    },
    {
      id: "weight_with_battery",
      label: "Weight With Battery",
      value: "84 kg",
      detail: "Operational curb weight on water",
      category: "Dimensions & Capacity"
    }
  ],

  // Dimension Callouts for Section 7
  dimensionsSummary: {
    length: "220 cm",
    width: "99 cm",
    height: "75 cm",
    weightBare: "56 kg",
    weightFull: "84 kg",
    maxLoad: "150 kg",
    power: "12 kW",
    battery: "5.8 kWh Ternary Lithium",
    charger: "2,000 W (4–5 h)"
  },

  // Interactive Product Viewer Angles
  viewerAngles: [
    {
      id: "profile",
      name: "Side Profile",
      tag: "Pure Silhouette",
      image: "assets/images/view-profile.png",
      description: "Clean waterline profile highlighting the 220 cm hydrodynamic hull and aerodynamic cowl.",
      hotspots: [
        { top: "35%", left: "38%", title: "Steering Cockpit", desc: "Ergonomic helm with marine-grade steering wheel & integrated throttle." },
        { top: "60%", left: "75%", title: "Bow Entry", desc: "Flared wave-deflecting prow engineered for smooth chop handling." },
        { top: "68%", left: "15%", title: "Aft Swim Platform", desc: "Non-slip teak-finish boarding deck with dual recessed grab handles." }
      ]
    },
    {
      id: "bow",
      name: "Front Bow",
      tag: "Dynamic Stance",
      image: "assets/images/view-bow.png",
      description: "Frontal aspect displaying aggressive spray rails, 99 cm beam, and protective forward windshield cowl.",
      hotspots: [
        { top: "25%", left: "50%", title: "Aero Cowl & Console", desc: "Streamlined aerodynamic cowl deflector reducing spray at 40 km/h." },
        { top: "45%", left: "50%", title: "Integrated Bow Handle", desc: "Molded forward handhold and non-skid textured front deck." },
        { top: "72%", left: "50%", title: "V-Hull Entry", desc: "Deep deadrise hull entry with stepped chines for stable directional tracking." }
      ]
    },
    {
      id: "stern",
      name: "Aft Stern",
      tag: "Jet Propulsion",
      image: "assets/images/view-stern.png",
      description: "Rear transom view showcasing the integrated jet intake tunnel and low-profile teak swim step.",
      hotspots: [
        { top: "50%", left: "50%", title: "Quilted Battery Hatch", desc: "Double-hinged diamond-pattern upholstered module cover." },
        { top: "72%", left: "50%", title: "Teak Boarding Deck", desc: "Teak-style marine EVA traction platform with flush tie-down points." },
        { top: "90%", left: "50%", title: "Water-Jet Nozzle", desc: "12 kW submerged water-jet output for impellor-driven propulsion." }
      ]
    },
    {
      id: "overhead",
      name: "Cockpit Interior",
      tag: "Helm & Seating",
      image: "assets/images/view-overhead.png",
      description: "Overhead cockpit perspective detailing the floorboard, bucket console, and central battery enclosure.",
      hotspots: [
        { top: "60%", left: "30%", title: "Battery Enclosure", desc: "5.8 kWh ternary lithium safety buckle mounting compartment." },
        { top: "50%", left: "70%", title: "Captain's Helm", desc: "Centralized responsive steering assembly with safety cutoff key." }
      ]
    },
    {
      id: "dash",
      name: "Helm & Controls",
      tag: "Precision Steering",
      image: "assets/images/view-dash.png",
      description: "Close-up of the automotive-inspired three-spoke helm and clean instrument console.",
      hotspots: [
        { top: "45%", left: "55%", title: "Three-Spoke Wheel", desc: "Marine-treated ergonomic wheel designed for one-hand or dual-hand high-speed maneuvers." },
        { top: "60%", left: "80%", title: "Throttle Interface", desc: "Progressive digital throttle trigger with instant electric jet torque." }
      ]
    },
    {
      id: "swim_platform",
      name: "Aft Deck & Latch",
      tag: "Craftsmanship Detail",
      image: "assets/images/view-swim-platform.png",
      description: "Detail of the diamond-stitched seat upholstery, safety buckles, and aft swim platform.",
      hotspots: [
        { top: "45%", left: "70%", title: "Safety Buckle Harness", desc: "Heavy-duty dual stainless buckle latches holding the battery enclosure tight." },
        { top: "68%", left: "30%", title: "Teak Decking", desc: "Warm teak finish marine decking resistant to saltwater, UV, and heat." }
      ]
    },
    {
      id: "action_1",
      name: "On Water — Cruise",
      tag: "Dynamic Performance",
      image: "assets/images/view-action-1.png",
      description: "The craft skimming the surface at 35 km/h, illustrating quiet electric agility."
    },
    {
      id: "action_2",
      name: "On Water — Turn",
      tag: "High-Speed Carving",
      image: "assets/images/view-action-2.png",
      description: "Sharp responsive cornering powered by direct water-jet vectoring."
    }
  ],

  // Product Search Keywords Taxonomy (For SEO, dynamic tagging & search integration)
  searchKeywords: {
    core: [
      "aquakart", "aqua kart", "aquacart", "aqua cart", "aquakarting", "aqua karting",
      "water go kart", "water go-kart", "aquatic go kart", "waterkart", "water kart",
      "electric water kart", "slalom water kart", "go kart on water"
    ],
    pwc: [
      "jet ski", "jetski", "jet-ski", "electric jet ski", "electric jetski",
      "battery jet ski", "lithium jet ski", "mini jet ski", "mini jetski",
      "compact jet ski", "micro jet ski", "lightweight jet ski", "single seater jet ski",
      "personal watercraft india", "PWC india", "commercial PWC"
    ],
    propulsion: [
      "waterjet", "water jet", "waterjet boat", "water jet boat", "water jet ski",
      "hydrojet", "hydro jet", "hydrojet boat", "hydro jet watercraft", "electric hydrojet",
      "12 kw water jet", "direct drive water jet", "impeller jet drive", "swimmer safe watercraft"
    ],
    buyingIntent: [
      "jet ski price in india", "jetski price in india", "electric jet ski price",
      "aqua kart price in india", "aquakart price", "buy jet ski india", "buy electric jet ski",
      "jet ski for sale in india", "cheapest jet ski in india", "affordable jet ski india",
      "jet ski under 10 lakhs", "made in india jet ski", "manufactured in india watercraft"
    ],
    alternatives: [
      "sea doo alternative india", "seadoo spark alternative", "yamaha waverunner alternative",
      "kawasaki jet ski alternative", "electric jetboard alternative", "yacht tender jet ski",
      "superyacht water toys", "mini jet boat"
    ],
    commercial: [
      "water sports business in india", "start water sports rental", "jet ski rental business",
      "aqua kart rental goa", "aquakarting track setup", "resort water sports activities",
      "zero fuel cost water sports", "clean water sports india"
    ],
    regions: [
      "goa jet ski", "goa aqua kart", "kerala water sports", "kochi jet ski", "alleppey backwaters",
      "alibaug water sports", "mandwa jet ski", "tarkarli water sports", "mumbai jet ski",
      "gokarna water sports", "rushikonda beach vizag", "pondicherry water sports",
      "udaipur lake boating", "rishikesh water recreation", "andaman jet ski"
    ]
  },

  // Form Submission
  form: {
    // Configurable endpoint (e.g. Formspree or custom API)
    // If empty or '#' the form operates in local test mode and shows a confirmation modal.
    endpoint: "",
    recipient: "sureshreddy.per@gmail.com",
    storageKey: "ruvo_inquiries"
  }
};

// Export to window
if (typeof window !== "undefined") {
  window.RUVO_CONFIG = RUVO_CONFIG;
}
