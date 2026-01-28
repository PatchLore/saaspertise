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
      "Adjustable aluminum stand that raises laptops to eye level, improving posture and airflow while keeping desks clean, stable, and travel friendly.",
    longDescription:
      "The ErgoLift Laptop Stand raises your screen to eye level, reducing neck strain while keeping your desk clean and minimal. It’s lightweight, sturdy, and works well for both home and office setups.",
    pros: [
      "Raises screens for healthier posture",
      "Sturdy aluminum build that travels well",
    ],
    cons: [
      "No built-in cable management",
      "Limited height adjustment compared to premium stands",
    ],
    priceRange: "$30–$50",
    image: "/images/products/ergolift-laptop-stand.jpg",
    affiliateUrl: "https://www.amazon.com/s?k=ErgoLift%20Laptop%20Stand",
    updatedAt: "2026-01-10",
  },
  {
    slug: "sony-wh-1000xm6",
    name: "Sony WH-1000XM6 Wireless Noise-Cancelling Headphones",
    category: "productivity",
    shortDescription:
      "Flagship noise-cancelling headphones that create a quiet workspace, delivering clear calls, long battery life, and focus-friendly sound for busy daily environments.",
    longDescription:
      "The Sony WH-1000XM6 headphones are widely regarded as the gold standard for noise-cancelling headphones for work. Whether you’re in a busy home, a shared office, or travelling between meetings, they dramatically reduce background noise so you can stay focused.",
    pros: [
      "Best-in-class noise cancellation for focus",
      "Comfortable fit with strong call quality",
    ],
    cons: [
      "Premium price compared to basic headphones",
      "Touch controls can take time to get used to",
    ],
    image: "/images/products/sony-wh-1000xm6.jpg",
    affiliateUrl:
      "https://www.amazon.com/s?k=Sony%20WH-1000XM6%20Wireless%20Noise-Cancelling%20Headphones",
    updatedAt: "2026-01-10",
  },
  {
    slug: "elgato-stream-deck-neo",
    name: "Elgato Stream Deck Neo",
    category: "productivity",
    shortDescription:
      "Programmable shortcut controller that speeds routine actions with one-tap keys, helping teams launch apps, manage meetings, and stay on flow.",
    longDescription:
      "The Elgato Stream Deck Neo allows professionals to automate repetitive actions like launching apps, muting microphones, and starting meetings with a single button press.",
    pros: [
      "Custom keys streamline frequent tasks",
      "Compact form with clear visual labels",
    ],
    cons: [
      "Requires setup time to get the most value",
      "Overkill for very light computer use",
    ],
    image: "/images/products/elgato-stream-deck-neo.jpg",
    affiliateUrl: "https://www.amazon.com/s?k=Elgato%20Stream%20Deck%20Neo",
    updatedAt: "2026-01-10",
  },
  {
    slug: "cuktech-100w-gan-charger",
    name: "CUKTECH 100W GaN USB-C Charger",
    category: "mobile",
    shortDescription:
      "Compact GaN charger that powers laptops, phones, and tablets at once, reducing cable clutter while delivering fast, reliable charging on desks or travel.",
    longDescription:
      "The CUKTECH 100W GaN charger replaces multiple bulky chargers with a single compact unit, making it ideal for desks, travel, and remote work setups.",
    pros: [
      "High output for modern laptops",
      "Multiple ports for daily carry",
    ],
    cons: [
      "Premium compared to basic chargers",
      "High-power cables may need to be purchased separately",
    ],
    image: "/images/products/cuktech-100w-gan-charger.jpg",
    affiliateUrl: "https://www.amazon.com/s?k=CUKTECH%20100W%20GaN%20USB-C%20Charger",
    updatedAt: "2026-01-10",
  },
  {
    slug: "wireless-charging-mouse-pad",
    name: "Wireless Charging Mouse Pad",
    category: "desk",
    shortDescription:
      "Desk mat with built-in wireless charging that keeps phones topped up while providing smooth mouse tracking and a cleaner, minimalist workspace.",
    longDescription:
      "This wireless charging mouse pad functions as a comfortable mouse surface while also wirelessly charging your phone throughout the day, helping reduce desk clutter.",
    pros: [
      "Combines desk mat and charger",
      "Reduces cable clutter and mess",
    ],
    cons: [
      "Wireless charging is slower than wired",
      "Only supports Qi-compatible phones",
    ],
    image: "/images/products/wireless-charging-mouse-pad.jpg",
    affiliateUrl: "https://www.amazon.com/s?k=Wireless%20Charging%20Mouse%20Pad", // TODO: Awaiting confirmed ASIN from owner
    updatedAt: "2026-01-10",
  },
  {
    slug: "adjustable-laptop-stand",
    name: "Adjustable Laptop Stand",
    category: "desk",
    shortDescription:
      "Adjustable stand that elevates laptops to eye level, improving posture and airflow while supporting external keyboard setups for comfortable, long work sessions.",
    longDescription:
      "An adjustable laptop stand improves posture by raising your laptop to eye level, reducing neck and shoulder strain during long work sessions.",
    pros: [
      "Elevates screens for better alignment",
      "Portable design with stable support",
    ],
    cons: [
      "Requires external keyboard for best ergonomics",
      "Cheaper models may wobble slightly",
    ],
    image: "/images/products/adjustable-laptop-stand.jpg",
    affiliateUrl: "https://www.amazon.com/s?k=Adjustable%20Laptop%20Stand", // TODO: Awaiting confirmed ASIN from owner
    updatedAt: "2026-01-10",
  },
  {
    slug: "logitech-mx-master-3s",
    name: "Logitech MX Master 3S Wireless Performance Mouse",
    category: "desk",
    shortDescription:
      "Premium ergonomic mouse built for precision and multitasking, with fast scrolling, quiet clicks, and seamless switching across multiple devices daily.",
    longDescription:
      "The Logitech MX Master 3S is a comfortable, feature-rich mouse for modern work. It supports fast scrolling, precise tracking, and seamless switching between devices—ideal for long desk sessions and multi-monitor setups.",
    pros: [
      "Comfortable shape for long sessions",
      "Reliable multi-device control",
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
      "Programmable control pad that turns complex workflows into single-tap actions, ideal for creators and professionals managing apps, audio, and meetings.",
    longDescription:
      "The Elgato Stream Deck MK.2 helps streamline repetitive work by mapping workflows to tactile buttons. It's useful for creators and professionals who want quicker control of meetings, audio, apps, and routines.",
    pros: [
      "One-tap control for repeat tasks",
      "Customizable keys with software support",
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
      "Monitor-mounted light bar that brightens desks without screen glare, improving focus and comfort in low-light work settings and late sessions.",
    longDescription:
      "The BenQ ScreenBar Pro is designed to illuminate your workspace while reducing glare and reflections. It's a clean upgrade for monitor-based setups, especially for late-night work or low-light rooms.",
    pros: [
      "Glare-free lighting for monitors",
      "Keeps desks clear and minimal",
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
      "8-in-1 USB-C hub that expands ports for laptops, simplifying travel setups and hot-desking with reliable connectivity in one compact unit.",
    longDescription:
      "The Anker 555 USB-C Hub adds essential ports for modern laptops—useful for hot-desking, travel, and remote work. It's a practical way to connect external displays, storage, and peripherals with a single cable.",
    pros: [
      "Adds essential ports in one hub",
      "Great for travel and hot desks",
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
      "Slim portable monitor that adds a second screen on the go, boosting productivity for travel days, client meetings, and remote work.",
    longDescription:
      "The ASUS ZenScreen MB16AH is a lightweight secondary display that makes remote work and travel days more productive. It's a simple way to regain multi-screen workflows when you're away from a full desk setup.",
    pros: [
      "Lightweight second screen for travel",
      "Improves multitasking away from desk",
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

