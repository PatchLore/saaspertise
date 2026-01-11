export type Product = {
  slug: string;
  name: string;
  category: "desk" | "productivity" | "mobile" | "remote";
  shortDescription: string;
  longDescription: string;
  pros: string[];
  cons: string[];
  priceRange?: string;
  image: string;
  affiliateUrl: string;
  updatedAt: string;
};

export const products: Product[] = [
  {
    slug: "ergolift-laptop-stand",
    name: "ErgoLift Laptop Stand",
    category: "desk",
    shortDescription:
      "An adjustable aluminum stand that improves posture and airflow.",
    longDescription:
      "The ErgoLift Laptop Stand raises your screen to eye level, reducing neck strain while keeping your desk clean and minimal. It’s lightweight, sturdy, and works well for both home and office setups.",
    pros: [
      "Improves posture and ergonomics",
      "Solid aluminum build",
      "Folds flat for travel",
    ],
    cons: [
      "No built-in cable management",
      "Limited height adjustment compared to premium stands",
    ],
    priceRange: "$30–$50",
    image: "/images/products/ergolift.jpg",
    affiliateUrl: "https://www.amazon.com/dp/REPLACE_WITH_REAL_ID",
    updatedAt: "2026-01-10",
  },
  {
    slug: "sony-wh-1000xm6",
    name: "Sony WH-1000XM6 Wireless Noise-Cancelling Headphones",
    category: "productivity",
    shortDescription:
      "Industry-leading noise-cancelling headphones designed to help you focus, work, and take calls without distraction.",
    longDescription:
      "The Sony WH-1000XM6 headphones are widely regarded as the gold standard for noise-cancelling headphones for work. Whether you’re in a busy home, a shared office, or travelling between meetings, they dramatically reduce background noise so you can stay focused.",
    pros: [
      "Best-in-class active noise cancellation",
      "Comfortable for long work sessions",
      "Excellent call and microphone quality",
      "Long battery life with fast charging",
    ],
    cons: [
      "Premium price compared to basic headphones",
      "Touch controls can take time to get used to",
    ],
    image: "/images/products/sony-wh-1000xm6.jpg",
    affiliateUrl: "https://www.amazon.com/dp/REPLACE_ME",
    updatedAt: "2026-01-10",
  },
  {
    slug: "elgato-stream-deck-neo",
    name: "Elgato Stream Deck Neo",
    category: "productivity",
    shortDescription:
      "A programmable shortcut controller that speeds up everyday tasks with one-tap actions.",
    longDescription:
      "The Elgato Stream Deck Neo allows professionals to automate repetitive actions like launching apps, muting microphones, and starting meetings with a single button press.",
    pros: [
      "Saves time on repetitive tasks",
      "Highly customisable buttons",
      "Integrates with popular work tools",
      "Compact and desk-friendly",
    ],
    cons: [
      "Requires setup time to get the most value",
      "Overkill for very light computer use",
    ],
    image: "/images/products/elgato-stream-deck-neo.jpg",
    affiliateUrl: "https://www.amazon.com/dp/REPLACE_ME",
    updatedAt: "2026-01-10",
  },
  {
    slug: "cuktech-100w-gan-charger",
    name: "CUKTECH 100W GaN USB-C Charger",
    category: "mobile",
    shortDescription:
      "A compact, high-power charger capable of fast-charging laptops, phones, and tablets simultaneously.",
    longDescription:
      "The CUKTECH 100W GaN charger replaces multiple bulky chargers with a single compact unit, making it ideal for desks, travel, and remote work setups.",
    pros: [
      "Powerful enough for laptops",
      "Charges multiple devices at once",
      "Compact and travel-friendly",
      "Reduces cable clutter",
    ],
    cons: [
      "Premium compared to basic chargers",
      "High-power cables may need to be purchased separately",
    ],
    image: "/images/products/cuktech-100w-gan.jpg",
    affiliateUrl: "https://www.amazon.com/dp/REPLACE_ME",
    updatedAt: "2026-01-10",
  },
  {
    slug: "wireless-charging-mouse-pad",
    name: "Wireless Charging Mouse Pad",
    category: "desk",
    shortDescription:
      "A desk mat that combines smooth mouse tracking with built-in wireless phone charging.",
    longDescription:
      "This wireless charging mouse pad functions as a comfortable mouse surface while also wirelessly charging your phone throughout the day, helping reduce desk clutter.",
    pros: [
      "Combines two desk essentials into one",
      "Keeps phones charged passively",
      "Reduces cable clutter",
      "Clean, minimal desk aesthetic",
    ],
    cons: [
      "Wireless charging is slower than wired",
      "Only supports Qi-compatible phones",
    ],
    image: "/images/products/wireless-charging-mouse-pad.jpg",
    affiliateUrl: "https://www.amazon.com/dp/REPLACE_ME",
    updatedAt: "2026-01-10",
  },
  {
    slug: "adjustable-laptop-stand",
    name: "Adjustable Laptop Stand",
    category: "desk",
    shortDescription:
      "An adjustable laptop stand that raises your screen to eye level for better posture and comfort.",
    longDescription:
      "An adjustable laptop stand improves posture by raising your laptop to eye level, reducing neck and shoulder strain during long work sessions.",
    pros: [
      "Improves posture and ergonomics",
      "Lightweight and portable",
      "Better airflow for laptop cooling",
      "Works well with external keyboards",
    ],
    cons: [
      "Requires external keyboard for best ergonomics",
      "Cheaper models may wobble slightly",
    ],
    image: "/images/products/adjustable-laptop-stand.jpg",
    affiliateUrl: "https://www.amazon.com/dp/REPLACE_ME",
    updatedAt: "2026-01-10",
  },
  {
    slug: "logitech-mx-master-3s",
    name: "Logitech MX Master 3S Wireless Performance Mouse",
    category: "desk",
    shortDescription:
      "A premium, ergonomic mouse designed for fast, precise work across multiple devices.",
    longDescription:
      "The Logitech MX Master 3S is a comfortable, feature-rich mouse for modern work. It supports fast scrolling, precise tracking, and seamless switching between devices—ideal for long desk sessions and multi-monitor setups.",
    pros: [
      "Comfortable ergonomic shape",
      "Excellent scrolling and gesture controls",
      "Reliable multi-device support",
    ],
    cons: [
      "Premium price compared to basic mice",
      "Larger shape may not suit smaller hands",
    ],
    image: "/images/products/logitech-mx-master-3s.jpg",
    affiliateUrl: "https://amzn.to/4pBt3ZD",
    updatedAt: "2026-01-11",
  },
  {
    slug: "elgato-stream-deck-mk2",
    name: "Elgato Stream Deck MK.2",
    category: "productivity",
    shortDescription:
      "A programmable controller that turns common actions into single-tap shortcuts.",
    longDescription:
      "The Elgato Stream Deck MK.2 helps streamline repetitive work by mapping workflows to tactile buttons. It's useful for creators and professionals who want quicker control of meetings, audio, apps, and routines.",
    pros: [
      "Speeds up repetitive workflows",
      "Highly customizable setup",
      "Works well with common productivity tools",
    ],
    cons: [
      "Takes time to configure well",
      "May be unnecessary for light usage",
    ],
    image: "/images/products/elgato-stream-deck-mk2.jpg",
    affiliateUrl: "https://amzn.to/3Yvt32j",
    updatedAt: "2026-01-11",
  },
  {
    slug: "benq-screenbar-pro",
    name: "BenQ ScreenBar Pro Monitor Light",
    category: "desk",
    shortDescription:
      "A monitor-mounted light that improves desk lighting without screen glare.",
    longDescription:
      "The BenQ ScreenBar Pro is designed to illuminate your workspace while reducing glare and reflections. It's a clean upgrade for monitor-based setups, especially for late-night work or low-light rooms.",
    pros: [
      "Improves desk lighting without taking desk space",
      "Reduces glare compared to traditional lamps",
      "Clean, minimal look for monitor setups",
    ],
    cons: [
      "Premium price versus basic desk lamps",
      "Fit depends on monitor thickness and shape",
    ],
    image: "/images/products/benq-screenbar-pro.jpg",
    affiliateUrl: "https://amzn.to/4jz8cEX",
    updatedAt: "2026-01-11",
  },
  {
    slug: "anker-555-usb-c-hub",
    name: "Anker 555 USB-C Hub (8-in-1)",
    category: "mobile",
    shortDescription:
      "An 8-in-1 USB-C hub that expands ports for laptops and travel setups.",
    longDescription:
      "The Anker 555 USB-C Hub adds essential ports for modern laptops—useful for hot-desking, travel, and remote work. It's a practical way to connect external displays, storage, and peripherals with a single cable.",
    pros: [
      "Adds multiple ports in one compact hub",
      "Good for travel and flexible work setups",
      "Helps reduce dongle clutter",
    ],
    cons: [
      "Can run warm under heavy use",
      "Port selection may not match every workflow",
    ],
    image: "/images/products/anker-555-usb-c-hub.jpg",
    affiliateUrl: "https://amzn.to/3LcQx9o",
    updatedAt: "2026-01-11",
  },
  {
    slug: "asus-zenscreen-mb16ah",
    name: "ASUS ZenScreen MB16AH Portable Monitor",
    category: "remote",
    shortDescription:
      "A portable monitor that adds a second screen for travel and remote work.",
    longDescription:
      "The ASUS ZenScreen MB16AH is a lightweight secondary display that makes remote work and travel days more productive. It's a simple way to regain multi-screen workflows when you're away from a full desk setup.",
    pros: [
      "Enables multi-screen productivity anywhere",
      "Compact and easy to travel with",
      "Useful for meetings, spreadsheets, and research",
    ],
    cons: [
      "Not as bright as full-size monitors",
      "Requires careful packing to avoid damage",
    ],
    image: "/images/products/asus-zenscreen-mb16ah.jpg",
    affiliateUrl: "https://amzn.to/4pBtfbj",
    updatedAt: "2026-01-11",
  },
];

