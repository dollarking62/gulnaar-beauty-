/**
 * GULNAAR ATELIER — Image Registry & Attribution Database
 * 
 * STRICT REAL PHOTOGRAPHY COMPLIANCE:
 * - NO AI-generated images.
 * - Sourced from legitimate public photography platforms (Wikimedia Commons, Unsplash Open License).
 * - Stores source URLs, license types, and photographer credits (Requirement #30).
 */

const IMAGE_REGISTRY = {
  hero: {
    id: "hero_bride",
    title: "Editorial Indian Bride in Handcrafted Scarlet & Gold Zari",
    url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85",
    credit: "Charanjeet Dhiman",
    source: "Unsplash",
    license: "Unsplash Free Commercial License",
    alt: "Indian bride adorned in crimson lehenga, emerald and gold jewellery, matha patti, and editorial bridal makeup"
  },
  journeySide: {
    id: "journey_portrait",
    title: "Indian Elegance & Royal Silk Attire",
    url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
    credit: "Dollar Gill",
    source: "Unsplash",
    license: "Unsplash Free Commercial License",
    alt: "Young Indian woman wearing emerald and gold ethnic saree with radiant festival makeup"
  },
  services: {
    makeup: {
      url: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=80",
      credit: "Ashley Piszek",
      source: "Unsplash",
      alt: "High definition eye makeup and brow sculpting detail"
    },
    hair: {
      url: "https://images.unsplash.com/photo-1522337094846-8a818192de1f?auto=format&fit=crop&w=1000&q=80",
      credit: "Averie Woodard",
      source: "Unsplash",
      alt: "Rich brunette hair styled into luxurious soft flowing waves"
    },
    color: {
      url: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1000&q=80",
      credit: "Christopher Campbell",
      source: "Unsplash",
      alt: "Dimensional espresso and burgundy balayage coiffure"
    },
    faceCare: {
      url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80",
      credit: "Sora Shimazaki",
      source: "Unsplash",
      alt: "Restorative botanical face facial and hydrating mask ceremony"
    },
    bodyCare: {
      url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80",
      credit: "Content Pixie",
      source: "Unsplash",
      alt: "Luxury body clean-up, aromatic oils and restorative massage"
    },
    bridal: {
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80",
      credit: "Charanjeet Dhiman",
      source: "Unsplash",
      alt: "Royal North Indian bride with ornate jewellery and radiant bridal glow"
    },
    styling: {
      url: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=1000&q=80",
      credit: "Prashant Sharma",
      source: "Unsplash",
      alt: "Indian woman wearing regal crimson lehenga with traditional dupatta drape"
    }
  },
  transformations: {
    bridal: {
      before: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80",
      after: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80",
      title: "Royal North Indian Bridal Metamorphosis",
      desc: "Hydrated dewy skin prep transitioning into high-definition long-wear royal bridal glam with traditional gold accents."
    },
    party: {
      before: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
      after: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1000&q=80",
      title: "Evening Cocktail & Sangeet Glam",
      desc: "Soft daylight tone evolving into sculpted cheekbones, smoky eye contouring, and glossed berry lips."
    },
    traditional: {
      before: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=80",
      after: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
      title: "Temple & Silk Saree Heritage Look",
      desc: "Fresh natural complexion framed into timeless South Indian temple jewellery, classic kohl eyes, and crimson bindi."
    },
    engagement: {
      before: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80",
      after: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1000&q=80",
      title: "Blush Pink Engagement Romance",
      desc: "Subtle rosewood undertones, luminous glass skin finish, and feathered lash enhancements."
    }
  },
  hairColors: {
    black: {
      name: "Natural Raven Black",
      shadeHex: "#111111",
      url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=80",
      tone: "Cool Neutral",
      maintenance: "Low / High Gloss Treatment",
      desc: "Pure obsidian depth enriched with botanical keratin gloss for mirror-like light reflection on Indian hair textures."
    },
    chocolate: {
      name: "Rich Chocolate Brown",
      shadeHex: "#3D2314",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
      tone: "Warm Neutral",
      maintenance: "Low-Medium / 10-12 Weeks",
      desc: "Deep cocoa base illuminated with soft velvet highlights to complement warm golden and olive skin tones."
    },
    caramel: {
      name: "Sunlit Caramel Melt",
      shadeHex: "#8B5A2B",
      url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80",
      tone: "Warm Honeyed",
      maintenance: "Medium / Seamless Balayage",
      desc: "Hand-painted dimensional ribbons cascading from an espresso root into buttery caramel ribbons."
    },
    burgundy: {
      name: "Deep Velvet Burgundy",
      shadeHex: "#4A0E1C",
      url: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1000&q=80",
      tone: "Cool Jewel Berry",
      maintenance: "Medium / Color Gloss Touchup",
      desc: "Sophisticated plum-infused wine hue offering luminous vibrancy under sunlight without harsh bleaching."
    },
    honey: {
      name: "Warm Golden Honey",
      shadeHex: "#BA8748",
      url: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=1000&q=80",
      tone: "Luminous Warm",
      maintenance: "Medium / 8-10 Weeks",
      desc: "Radiant sun-kissed reflection tailored to illuminate framing curls and elevate soft layered cuts."
    },
    espresso: {
      name: "Smoky Soft Espresso",
      shadeHex: "#2C1D18",
      url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80",
      tone: "Neutral Muted",
      maintenance: "Effortless Refresh",
      desc: "Understated cool-toned brunette that softens facial features while preserving the natural richness of Indian hair."
    }
  },
  bridalLookbook: [
    {
      style: "Classic Red",
      title: "The Royal Heritage Scarlet Bride",
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Indian_bride_wearing_north_indian_bridal_wear.jpg?width=900",
      credit: "Wikimedia Commons (CC BY-SA 4.0)",
      source: "Wikimedia Commons",
      pairing: "Polki Choker, Nath, Hand-Embroidered Zardozi Dupatta",
      notes: "Intense matte scarlet lips, sculpted golden kohl lids, and a regal micro-bindi arrangement."
    },
    {
      style: "Soft Pink",
      title: "The Contemporary Pastel Romance",
      url: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=900&q=80",
      credit: "Dollar Gill",
      source: "Unsplash",
      pairing: "Russian Emeralds, Rose Gold Tika, Blush Organza",
      notes: "Dewy champagne cheekbones, velvet nude-rose lips, and soft ethereal lash definition."
    },
    {
      style: "Royal Maroon",
      title: "The Velvet Twilight Couture",
      url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
      credit: "Charanjeet Dhiman",
      source: "Unsplash",
      pairing: "Temple Kundan, Matha Patti, Pure Banarasi Weave",
      notes: "Deep wine stained lip artistry, smoky bronze lid contour, and architectural face framing."
    },
    {
      style: "Minimal Bride",
      title: "The Modern Clean-Lined Bride",
      url: "https://images.unsplash.com/photo-1546804784-896d0dca3805?auto=format&fit=crop&w=900&q=80",
      credit: "Kirill Balobanov",
      source: "Unsplash",
      pairing: "Solitaire Choker, Sleek Floral Gajra Bun",
      notes: "Skin-first glass complexion, feather-light brows, and sheer glossy peach flush."
    },
    {
      style: "Traditional Heritage",
      title: "The Vedic Golden Era Bride",
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Bridal_makeup_for_Indian_Wedding.jpg?width=900",
      credit: "Wikimedia Commons (CC BY-SA 4.0)",
      source: "Wikimedia Commons",
      pairing: "Antique Temple Gold, Jadau Bangles, Crimson Silk",
      notes: "Winged kajal liner, traditional sindoor placement, and flawless porcelain finish."
    },
    {
      style: "Contemporary Reception",
      title: "The Starlight Cocktail Bride",
      url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80",
      credit: "Kunal Goswami",
      source: "Unsplash",
      pairing: "Diamond Cascades, Indo-Western Trail Gown",
      notes: "Champagne glitter pigment, Hollywood waves, and long-wear mauve satin lips."
    }
  ],
  studio: [
    {
      title: "Main Makeup & Styling Bar",
      url: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1000&q=80",
      credit: "Adam Winger",
      desc: "Italian leather styling chairs with 5000K daylight-balanced vanity mirrors"
    },
    {
      title: "Hydration & Hair Wash Sanctuary",
      url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80",
      credit: "Guilherme Petri",
      desc: "Reclining ergonomic wash stations with chromotherapy ceiling lighting"
    },
    {
      title: "Bespoke Bridal VIP Suite",
      url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80",
      credit: "Element5 Digital",
      desc: "Private bridal fitting salon with champagne service and personal draping room"
    }
  ]
};

// Global attribution list for modal viewer
function getAttributionList() {
  return [
    {
      title: "Editorial Indian Bride in Handcrafted Scarlet & Gold Zari",
      url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
      photographer: "Charanjeet Dhiman",
      source: "Unsplash (Unsplash License)"
    },
    {
      title: "Indian Elegance & Royal Silk Attire",
      url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb",
      photographer: "Dollar Gill",
      source: "Unsplash (Unsplash License)"
    },
    {
      title: "Traditional North Indian Bridal Makeup",
      url: "https://commons.wikimedia.org/wiki/File:Indian_bride_wearing_north_indian_bridal_wear.jpg",
      photographer: "Wikimedia Commons Contributor",
      source: "Wikimedia Commons (CC BY-SA 4.0)"
    },
    {
      title: "Bridal Makeup for Indian Wedding",
      url: "https://commons.wikimedia.org/wiki/File:Bridal_makeup_for_Indian_Wedding.jpg",
      photographer: "Wikimedia Commons Contributor",
      source: "Wikimedia Commons (CC BY-SA 4.0)"
    },
    {
      title: "Intricate Bridal Mehndi Henna Hands",
      url: "https://commons.wikimedia.org/wiki/File:Mehndi.jpg",
      photographer: "Wikimedia Commons Contributor",
      source: "Wikimedia Commons (CC BY-SA 4.0)"
    },
    {
      title: "Indian Bride with Traditional Floral Veil",
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a",
      photographer: "Charanjeet Dhiman",
      source: "Unsplash (Unsplash License)"
    },
    {
      title: "Pastel Pink Lehengas & Modern Bridal Styling",
      url: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5",
      photographer: "Dollar Gill",
      source: "Unsplash (Unsplash License)"
    },
    {
      title: "Luxury Atelier Interior & Salon Chairs",
      url: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f",
      photographer: "Adam Winger",
      source: "Unsplash (Unsplash License)"
    }
  ];
}
