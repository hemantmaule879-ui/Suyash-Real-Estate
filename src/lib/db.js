import path from 'path';
import crypto from 'crypto';

let fs = null;
try {
  fs = eval("require('fs')");
} catch (e) {
  // fs is not available (e.g. Cloudflare Workers environment)
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DATA_DIR, 'db.json');

// Helper to hash password
export function hashPassword(password) {
  try {
    if (crypto && typeof crypto.createHash === 'function') {
      return crypto.createHash('sha256').update(password).digest('hex');
    }
  } catch (e) {
    // ignore
  }
  // Simple fallback hash
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return 'fb_' + Math.abs(hash).toString(16);
}

const DEFAULT_ADMIN_PASSWORD = 'admin'; 
// Pre-computed hash of 'admin' using SHA-256 to avoid runtime evaluation errors on startup
const DEFAULT_ADMIN_HASH = '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918';

const INITIAL_DATA = {
  properties: [
    {
      id: "prop-1",
      title: "Luxury 3 BHK Rental Flat in Downtown",
      category: "Rental Flats",
      type: "Rent",
      price: 45000,
      address: "Flat 402, Skyline Towers, Sector 15",
      city: "Mumbai",
      locality: "Bandra",
      area: 1650,
      bedrooms: 3,
      bathrooms: 3,
      parking: "1 Reserved Covered",
      amenities: ["Swimming Pool", "Gymnasium", "24/7 Security", "Power Backup", "Clubhouse"],
      description: "Experience premium living in this spacious, semi-furnished 3 BHK flat. Features three balconies with panoramic city views, modern bathrooms, and a fully fitted modular kitchen. Located in a secured, premium community with all high-end amenities.",
      googleMapLocation: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.8027734162464!2d72.82524427507421!3d19.028400082168925!2m3!1f0!2f0!3f0!3m2!1i1024!2i769!2f49.3!3m3!1m2!1s0x3be7cec13233e721%3A0x86617a20c3b0f5b9!2sBandra%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1717618000000!5m2!1sen!2sin",
      images: ["/uploads/flat1_1.jpg", "/uploads/flat1_2.jpg"],
      featured: true,
      status: "Available",
      dateAdded: "2026-06-01T10:00:00.000Z"
    },
    {
      id: "prop-2",
      title: "Modern 4 BHK Row House for Rent",
      category: "Rental Row Houses",
      type: "Rent",
      price: 85000,
      address: "Villa 12, Gold Crest Society, Road 4",
      city: "Pune",
      locality: "Koregaon Park",
      area: 2800,
      bedrooms: 4,
      bathrooms: 4,
      parking: "2 Car Parking",
      amenities: ["Private Garden", "Terrace", "Gated Security", "Pet Friendly", "Solar Water"],
      description: "Elegantly designed 4 BHK row house with a private front lawn and backyard garden. Located in one of the most premium localities, this row house offers complete privacy and peaceful environment while being close to top restaurants and stores.",
      googleMapLocation: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.9972379374026!2d73.88602927506161!3d18.53034968257008!2m3!1f0!2f0!3f0!3m2!1i1024!2i769!2f49.3!3m3!1m2!1s0x3bc2c10b7db01ab1%3A0xe543e382d56a2fa1!2sKoregaon%20Park%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1717618000000!5m2!1sen!2sin",
      images: ["/uploads/rowhouse1_1.jpg", "/uploads/rowhouse1_2.jpg"],
      featured: true,
      status: "Available",
      dateAdded: "2026-06-02T12:00:00.000Z"
    },
    {
      id: "prop-3",
      title: "Spacious 5 BHK Premium Bungalow",
      category: "Rental Bungalows",
      type: "Rent",
      price: 150000,
      address: "Bungalow 7, Whispering Palms Estate",
      city: "Lonavala",
      locality: "Gold Valley",
      area: 4500,
      bedrooms: 5,
      bathrooms: 5,
      parking: "3 Covered Parking",
      amenities: ["Private Swimming Pool", "Home Theatre Room", "Bar Area", "CCTV Security", "Servant Quarter"],
      description: "A breathtaking premium bungalow with an expansive private swimming pool and deck. Extremely spacious bedrooms with attached dressing rooms, large living area with double-height ceiling, and a separate home theatre setup. Perfect for luxury family living.",
      googleMapLocation: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2599729864273!2d73.4116812750624!3d18.755490782497645!2m3!1f0!2f0!3f0!3m2!1i1024!2i769!2f49.3!3m3!1m2!1s0x3be80170068593a5%3A0x6b4ef84a3b1d3d6e!2sLonavala%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1717618000000!5m2!1sen!2sin",
      images: ["/uploads/bungalow1_1.jpg"],
      featured: true,
      status: "Available",
      dateAdded: "2026-06-03T09:30:00.000Z"
    },
    {
      id: "prop-4",
      title: "Commercial Office Space in Business Hub",
      category: "Commercial Properties",
      type: "Sale",
      price: 12000000, 
      address: "Office 1005, 10th Floor, Apex Business Center",
      city: "Mumbai",
      locality: "BKC",
      area: 1200,
      bedrooms: 0,
      bathrooms: 2,
      parking: "2 Dedicated Basements",
      amenities: ["High-speed Elevators", "Centrally Air Conditioned", "Receptionist Area", "Conference Room", "Food Court"],
      description: "Fully furnished premium office space in the heart of BKC. Includes 20 workstations, a manager's cabin, a 10-seater conference room, separate pantry, and private washrooms. Ready to move in, highly suitable for corporate offices.",
      googleMapLocation: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.127814234057!2d72.86438067507504!3d19.058197782143048!2m3!1f0!2f0!3f0!3m2!1i1024!2i769!2f49.3!3m3!1m2!1s0x3be7c8e123f8d27b%3A0x4a0a4c2f4dbfbdf9!2sBandra%20Kurla%20Complex%2C%20Bandra%20East%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1717618000000!5m2!1sen!2sin",
      images: ["/uploads/office1_1.jpg"],
      featured: true,
      status: "Available",
      dateAdded: "2026-06-04T15:00:00.000Z"
    },
    {
      id: "prop-5",
      title: "Prime Land / Plot for Development",
      category: "Lands for Sale",
      type: "Sale",
      price: 25000000, 
      address: "Plot No. 44, Hill View Estate",
      city: "Pune",
      locality: "Mulshi",
      area: 10000, 
      bedrooms: 0,
      bathrooms: 0,
      parking: "NA",
      amenities: ["Corner Plot", "Road Facing", "Water Connection Available", "Electricity Point Ready"],
      description: "A beautiful, clear-title corner plot measuring 10,000 sq.ft. offering panoramic mountain views. Ideal for constructing a private villa, farmhouse, or second home. Fully fenced with a 30-foot wide tar road touch.",
      googleMapLocation: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15137.919730592928!2d73.50424564887375!3d18.520448761184313!2m3!1f0!2f0!3f0!3m2!1i1024!2i769!2f49.3!3m3!1m2!1s0x3bc2992d9d1ab5a7%3A0xc3d15a1334863e41!2sMulshi%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1717618000000!5m2!1sen!2sin",
      images: ["/uploads/plot1_1.jpg"],
      featured: true,
      status: "Available",
      dateAdded: "2026-06-04T17:30:00.000Z"
    }
  ],
  leads: [
    {
      id: "lead-1",
      name: "Rohan Sharma",
      mobile: "9876543210",
      email: "rohan.sharma@example.com",
      propertyId: "prop-1",
      propertyTitle: "Luxury 3 BHK Rental Flat in Downtown",
      message: "Hi, I am interested in renting this flat. Is it available for immediate viewing?",
      date: "2026-06-05T08:00:00.000Z"
    }
  ],
  adminPasswordHash: DEFAULT_ADMIN_HASH
};

// Global in-memory database cache fallback
let memoryDb = null;

function initDb() {
  if (!fs) return false;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify(INITIAL_DATA, null, 2), 'utf-8');
    }
    return true;
  } catch (error) {
    return false;
  }
}

export function readDb() {
  const isFsWorking = initDb();
  if (!isFsWorking) {
    if (!memoryDb) {
      memoryDb = JSON.parse(JSON.stringify(INITIAL_DATA));
    }
    return memoryDb;
  }
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to read database:", error);
    if (!memoryDb) {
      memoryDb = JSON.parse(JSON.stringify(INITIAL_DATA));
    }
    return memoryDb;
  }
}

export function writeDb(data) {
  const isFsWorking = initDb();
  if (!isFsWorking) {
    memoryDb = data;
    return true;
  }
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error("Failed to write database:", error);
    memoryDb = data;
    return true;
  }
}

// Properties Database helper
export const propertiesDb = {
  getAll: () => {
    return readDb().properties || [];
  },
  getById: (id) => {
    return (readDb().properties || []).find(p => p.id === id) || null;
  },
  add: (property) => {
    const db = readDb();
    const newProp = {
      ...property,
      id: property.id || `prop-${Date.now()}`,
      dateAdded: new Date().toISOString()
    };
    db.properties.push(newProp);
    writeDb(db);
    return newProp;
  },
  update: (id, updatedFields) => {
    const db = readDb();
    const index = db.properties.findIndex(p => p.id === id);
    if (index === -1) return null;
    db.properties[index] = {
      ...db.properties[index],
      ...updatedFields
    };
    writeDb(db);
    return db.properties[index];
  },
  delete: (id) => {
    const db = readDb();
    const index = db.properties.findIndex(p => p.id === id);
    if (index === -1) return false;
    db.properties.splice(index, 1);
    writeDb(db);
    return true;
  }
};

// Leads Database helper
export const leadsDb = {
  getAll: () => {
    const db = readDb();
    return db.leads || [];
  },
  add: (lead) => {
    const db = readDb();
    const newLead = {
      ...lead,
      id: `lead-${Date.now()}`,
      date: new Date().toISOString()
    };
    db.leads.push(newLead);
    writeDb(db);
    return newLead;
  },
  delete: (id) => {
    const db = readDb();
    const index = db.leads.findIndex(l => l.id === id);
    if (index === -1) return false;
    db.leads.splice(index, 1);
    writeDb(db);
    return true;
  }
};

// Admin Password utility
export const adminDb = {
  verifyPassword: (password) => {
    const db = readDb();
    const hash = hashPassword(password);
    return db.adminPasswordHash === hash;
  },
  updatePassword: (newPassword) => {
    const db = readDb();
    db.adminPasswordHash = hashPassword(newPassword);
    writeDb(db);
    return true;
  }
};
