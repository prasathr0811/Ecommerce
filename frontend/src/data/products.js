const products = [
  // ✅ Mobiles (10)
  {
    id: 1,
    name: "iPhone 14 Pro Max",
    price: 129999,
    image: "https://m.media-amazon.com/images/I/61nzPMNY8zL._SX679_.jpg",
    rating: 4.8,
    category: "mobile",
    ram: "6GB",
    storage: "256GB",
    description: "A16 Bionic chip, ProMotion display, Triple 48MP camera.",
    features: [
      "A16 Bionic chip",
      "ProMotion display",
      "Triple 48MP camera",
    ],
  },
  {
    id: 2,
    name: "Samsung Galaxy S23 Ultra",
    price: 114999,
    image: "https://m.media-amazon.com/images/I/61VfL-aiToL._SX679_.jpg",
    rating: 4.7,
    category: "mobile",
    ram: "12GB",
    storage: "256GB",
    description: "200MP camera, Snapdragon 8 Gen 2, S Pen support.",
    features: [
      "200MP camera",
      "Snapdragon 8 Gen 2",
      "S Pen support",
    ],
  },
  {
    id: 3,
    name: "Redmi K50i 5G",
    price: 20999,
    image: "https://m.media-amazon.com/images/I/71d7rfSl0wL._SX679_.jpg",
    rating: 4.5,
    category: "mobile",
    ram: "6GB",
    storage: "128GB",
    description: "Dimensity 8100, LiquidCool tech, 144Hz display.",
    features: [
      "Dimensity 8100",
      "LiquidCool technology",
      "144Hz display",
    ],
  },
  {
    id: 4,
    name: "Redmi Note 12 Pro+",
    price: 29999,
    image: "https://m.media-amazon.com/images/I/81dT7CUY6GL._SX679_.jpg",
    rating: 4.4,
    category: "mobile",
    ram: "8GB",
    storage: "256GB",
    description: "200MP OIS camera, AMOLED display, 120W fast charging.",
    features: [
      "200MP OIS camera",
      "AMOLED display",
      "120W fast charging",
    ],
  },
  {
    id: 5,
    name: "Realme Narzo 60 5G",
    price: 16999,
    image: "https://m.media-amazon.com/images/I/71dEY4Neo3L._SX679_.jpg",
    rating: 4.3,
    category: "mobile",
    ram: "8GB",
    storage: "128GB",
    description: "AMOLED display, Dimensity 6020, 64MP camera.",
    features: [
      "AMOLED display",
      "Dimensity 6020",
      "64MP camera",
    ],
  },
  {
    id: 6,
    name: "Samsung Galaxy M13",
    price: 9999,
    image: "https://m.media-amazon.com/images/I/81vDZyJQ-4L._SX679_.jpg",
    rating: 4.4,
    category: "mobile",
    ram: "4GB",
    storage: "64GB",
    description: "6000mAh battery, FHD+ display, Exynos 850.",
    features: [
      "6000mAh battery",
      "FHD+ display",
      "Exynos 850",
    ],
  },
  {
    id: 7,
    name: "OnePlus Nord CE 3",
    price: 24999,
    image: "https://m.media-amazon.com/images/I/61amb0CfMGL._SX679_.jpg",
    rating: 4.5,
    category: "mobile",
    ram: "8GB",
    storage: "128GB",
    description: "AMOLED display, Snapdragon 782G, 80W charging.",
    features: [
      "AMOLED display",
      "Snapdragon 782G",
      "80W charging",
    ],
  },
  {
    id: 8,
    name: "iQOO Z7 5G",
    price: 17999,
    image: "https://m.media-amazon.com/images/I/61cwywLZR-L._SX679_.jpg",
    rating: 4.4,
    category: "mobile",
    ram: "6GB",
    storage: "128GB",
    description: "Dimensity 920, AMOLED, 44W fast charging.",
    features: [
      "Dimensity 920",
      "AMOLED display",
      "44W fast charging",
    ],
  },
  {
    id: 9,
    name: "Vivo V27 5G",
    price: 32999,
    image: "https://m.media-amazon.com/images/I/61VbKHdE0rL._SX679_.jpg",
    rating: 4.3,
    category: "mobile",
    ram: "8GB",
    storage: "128GB",
    description: "Sony IMX766 camera, Aura light, curved AMOLED.",
    features: [
      "Sony IMX766 camera",
      "Aura light",
      "Curved AMOLED",
    ],
  },
  {
    id: 10,
    name: "Realme C55",
    price: 10999,
    image: "https://m.media-amazon.com/images/I/71V--WZVUIL._SX679_.jpg",
    rating: 4.2,
    category: "mobile",
    ram: "6GB",
    storage: "64GB",
    description: "Mini capsule, 33W fast charging, 64MP AI camera.",
    features: [
      "Mini capsule design",
      "33W fast charging",
      "64MP AI camera",
    ],
  },

  // ✅ Laptops (5)
  {
    id: 11,
    name: "HP 15s Ryzen 5",
    price: 42999,
    image: "https://m.media-amazon.com/images/I/71c0GSxtEEL._SX679_.jpg",
    rating: 4.3,
    category: "laptop",
    ram: "8GB",
    storage: "512GB SSD",
    description:
      "HP 15s with AMD Ryzen 5 5500U, Radeon Graphics, 15.6'' FHD Display, Windows 11, Thin & Light.",
    features: [
      "AMD Ryzen 5 5500U",
      "8GB DDR4 RAM",
      "512GB SSD",
      "Radeon Graphics",
      "15.6'' Full HD Display",
      "Windows 11 Home",
    ],
  },
  {
    id: 12,
    name: "ASUS VivoBook 14",
    price: 39999,
    image: "https://m.media-amazon.com/images/I/71S8U9VzLTL._SX679_.jpg",
    rating: 4.3,
    category: "laptop",
    ram: "8GB",
    storage: "512GB SSD",
    description:
      "ASUS VivoBook 14 with Intel Core i3 11th Gen, 14'' FHD Display, Windows 11, Thin & Light.",
    features: [
      "Intel Core i3 11th Gen",
      "8GB RAM",
      "512GB SSD",
      "14'' Full HD Display",
      "Windows 11 Home",
      "Integrated UHD Graphics",
    ],
  },
  {
    id: 13,
    name: "Lenovo IdeaPad Slim 3",
    price: 44999,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    rating: 4.2,
    category: "laptop",
    ram: "8GB",
    storage: "512GB SSD",
    description:
      "Lenovo IdeaPad Slim 3 with Intel Core i5 11th Gen, 14'' FHD Display, Windows 11.",
    features: [
      "Intel Core i5 11th Gen",
      "8GB RAM",
      "512GB SSD",
      "14'' Full HD Anti-glare Display",
      "Windows 11",
      "Intel Iris Xe Graphics",
    ],
  },
  {
    id: 14,
    name: "Dell Inspiron 15",
    price: 50999,
    image: "https://m.media-amazon.com/images/I/71tHNTGasKL._SX679_.jpg",
    rating: 4.2,
    category: "laptop",
    ram: "8GB",
    storage: "512GB SSD",
    description:
      "Dell Inspiron 15 with Intel Core i5 12th Gen, 15.6'' FHD Display, Windows 11, Backlit Keyboard.",
    features: [
      "Intel Core i5 12th Gen",
      "8GB DDR4 RAM",
      "512GB SSD",
      "15.6'' Full HD Display",
      "Backlit Keyboard",
      "Windows 11 Home",
    ],
  },
  {
    id: 15,
    name: "Acer Swift 3",
    price: 57999,
    image: "https://m.media-amazon.com/images/I/71f2lQ3ESWL._SX679_.jpg",
    rating: 4.4,
    category: "laptop",
    ram: "16GB",
    storage: "512GB SSD",
    description:
      "Acer Swift 3 with Intel Core i5 11th Gen, 16GB RAM, 512GB SSD, 14'' FHD Display, Windows 11.",
    features: [
      "Intel Core i5 11th Gen",
      "16GB LPDDR4X RAM",
      "512GB SSD",
      "14'' Full HD Display",
      "Intel Iris Xe Graphics",
      "Windows 11 Home",
    ],
  },
  {
  id: 16,
  name: "boAt Xtend Smartwatch",
  price: 1499,
  image: "https://m.media-amazon.com/images/I/61ZuL8CUigL._SX679_.jpg",
  rating: 4.3,
  category: "smartwatch",
  description: "Alexa built-in smartwatch with 1.69” display, SPO2 & heart rate monitor.",
  features: [
    "Alexa Built-in",
    "Heart Rate & SpO2",
    "1.69” LCD Display"
  ]
},
{
  id: 17,
  name: "Acer 32 inch HD Ready Android LED TV",
  price: 10999,
  image: "https://m.media-amazon.com/images/I/81Zt42ioCgL._SX679_.jpg",
  rating: 4.2,
  category: "television",
  description: "Android Smart TV with Dolby Audio and built-in Chromecast.",
  features: [
    "HD Ready LED",
    "Android TV",
    "Dolby Audio"
  ]
},
{
  id: 18,
  name: "boAt Airdopes 141 Bluetooth Earbuds",
  price: 1299,
  image: "https://m.media-amazon.com/images/I/51HBom8xz7L._SX679_.jpg",
  rating: 4.3,
  category: "earphones",
  description: "42H playtime, ENx noise cancellation, ASAP charging.",
  features: [
    "42 Hours Playback",
    "ENx Noise Cancellation",
    "ASAP Charging"
  ]
},
{
  id: 19,
  name: "Atomic Habits by James Clear",
  price: 449,
  image: "https://m.media-amazon.com/images/I/91bYsX41DVL._SY466_.jpg",
  rating: 4.8,
  category: "book",
  description: "Build good habits, break bad ones with science-backed strategy.",
  features: [
    "Bestseller",
    "Practical Psychology",
    "Easy Steps"
  ]
},
{
  id: 20,
  name: "Ikigai: The Japanese Secret to a Long and Happy Life",
  price: 369,
  image: "https://m.media-amazon.com/images/I/81l3rZK4lnL._SY466_.jpg",
  rating: 4.7,
  category: "book",
  description: "International bestseller that reveals the Japanese concept of Ikigai — the reason for being.",
  features: [
    "Global Bestseller",
    "Focus on Purpose & Longevity",
    "Translated from Japanese"
  ]
}
,{
    id: 21,
    name: "Noise ColorFit Pulse Go Buzz Smartwatch",
    price: 1499,
    image: "https://m.media-amazon.com/images/I/61epn29QG0L._SX679_.jpg",
    rating: 4.2,
    category: "smartwatch",
    description: "1.69'' TFT display, Bluetooth calling, 100+ sports modes.",
    features: [
      "1.69'' HD Display",
      "Bluetooth Calling",
      "Heart Rate & SpO2 Monitor"
    ]
  },
  {
    id: 22,
    name: "Logitech B170 Wireless Mouse",
    price: 645,
    image: "https://m.media-amazon.com/images/I/61LtuGzXeaL._SX679_.jpg",
    rating: 4.4,
    category: "accessory",
    description: "Reliable wireless connectivity with 12-month battery life.",
    features: [
      "2.4GHz Wireless",
      "12-Month Battery",
      "1000 DPI Optical Tracking"
    ]
  },
  {
    id: 23,
    name: "realme narzo N53 (Feather Black, 64 GB)",
    price: 7999,
    image: "https://m.media-amazon.com/images/I/71DSxfKzkJL._SX679_.jpg",
    rating: 4.5,
    category: "mobile",
    description: "Budget smartphone with 6.74'' display, 5000mAh battery, and 33W fast charging.",
    features: [
      "6.74'' HD+ Display",
      "5000mAh Battery",
      "33W SuperVOOC Charging"
    ]
  },
  {
    id: 24,
    name: "Fastrack Reflex Vox Smartwatch",
    price: 2299,
    image: "https://m.media-amazon.com/images/I/61IMRs+o0iL._SX679_.jpg",
    rating: 4.1,
    category: "smartwatch",
    description: "Alexa built-in, large display, 10-day battery.",
    features: [
      "Alexa Built-in",
      "1.69'' HD Display",
      "10-Day Battery Life"
    ]
  },
  {
    id: 25,
    name: "The Psychology of Money",
    price: 349,
    image: "https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg",
    rating: 4.8,
    category: "book",
    description: "Timeless lessons on wealth, greed, and happiness by Morgan Housel.",
    features: [
      "Finance Bestseller",
      "Easy to Read",
      "Globally Acclaimed"
    ]
  }

];

export default products;
