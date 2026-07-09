// Mock data for Collectible Appraisal.
// All imagery hotlinked from Unsplash for a premium, curated feel.

export const CATEGORIES = [
  {
    id: 'fine-art',
    name: 'Fine Art',
    tagline: 'Paintings, sculpture & works on paper',
    description:
      'From Post-War abstraction to contemporary masters. Every canvas is a story — priced by the market, verified by our curators.',
    image:
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1400&auto=format&fit=crop',
    heroImage:
      'https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=1800&auto=format&fit=crop',
    itemCount: 3421,
  },
  {
    id: 'pokemon',
    name: 'Pokémon',
    tagline: 'Vintage & modern trading cards',
    description:
      'Base Set holos, Japanese promos, sealed booster boxes. Population reports and PSA-graded comps inform every valuation.',
    image:
      'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?q=85&w=1400&auto=format&fit=crop',
    heroImage:
      'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?q=80&w=1800&auto=format&fit=crop',
    itemCount: 8127,
  },
  {
    id: 'magic',
    name: 'Magic: The Gathering',
    tagline: 'Alpha, Beta & tournament staples',
    description:
      'Reserved List, Power Nine, and modern chase cards. Live prices tracked across CardKingdom, TCGPlayer, and auction results.',
    image:
      'https://images.unsplash.com/photo-1727445281463-af0d3a2caee3?q=80&w=1400&auto=format&fit=crop',
    heroImage:
      'https://images.unsplash.com/photo-1611996575749-79a3a250f948?q=80&w=1800&auto=format&fit=crop',
    itemCount: 5290,
  },
  {
    id: 'comics',
    name: 'Comics',
    tagline: 'Golden, Silver & Bronze Age',
    description:
      'Key issues, CGC-graded slabs, and pedigree collections. From Action Comics #1 to modern variant covers.',
    image:
      'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?q=80&w=1400&auto=format&fit=crop',
    heroImage:
      'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=1800&auto=format&fit=crop',
    itemCount: 2984,
  },
  {
    id: 'coins',
    name: 'Coins',
    tagline: 'Ancient, US & world numismatics',
    description:
      'From Athenian tetradrachms to Morgan dollars. Every lot cross-referenced with PCGS, NGC, and auction house comps.',
    image:
      'https://images.unsplash.com/photo-1621786030484-4c855eed6974?q=80&w=1400&auto=format&fit=crop',
    heroImage:
      'https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=1800&auto=format&fit=crop',
    itemCount: 4611,
  },
  {
    id: 'memorabilia',
    name: 'Signed Memorabilia',
    tagline: 'Sports, music & Hollywood',
    description:
      'Authenticated signatures from PSA/DNA, JSA, and Beckett. Game-used, tour-worn, and screen-used artifacts.',
    image:
      'https://images.unsplash.com/photo-1516981879613-9f5da904015f?q=80&w=1400&auto=format&fit=crop',
    heroImage:
      'https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=1800&auto=format&fit=crop',
    itemCount: 1876,
  },
];

// Verified working Unsplash images. Kept generic but visually apt for a premium marketplace.
const ART_IMG = 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?q=80&w=1400&auto=format&fit=crop';
const ART_IMG_2 = 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1400&auto=format&fit=crop';
const ART_IMG_3 = 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1400&auto=format&fit=crop';
const POK_IMG = 'https://images.unsplash.com/photo-1611931960487-4932667079f1?q=85&w=1400&auto=format&fit=crop';
const POK_IMG_2 = 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?q=85&w=1400&auto=format&fit=crop';
const MTG_IMG = 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=1400&auto=format&fit=crop';
const MTG_IMG_2 = 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=1400&auto=format&fit=crop';
const COMIC_IMG = 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?q=80&w=1400&auto=format&fit=crop';
const COMIC_IMG_2 = 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=85&w=1400&auto=format&fit=crop';
const COIN_IMG = 'https://images.unsplash.com/photo-1621786030484-4c855eed6974?q=80&w=1400&auto=format&fit=crop';
const COIN_IMG_2 = 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=1400&auto=format&fit=crop';
const MEM_IMG = 'https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=1400&auto=format&fit=crop';
const MEM_IMG_2 = 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1400&auto=format&fit=crop';

export const ITEMS = [
  {
    id: 'itm-001',
    title: 'Charizard — 1st Edition Shadowless Holo',
    subtitle: 'Base Set · PSA 9 Mint',
    category: 'pokemon',
    price: 24500,
    priceLow: 22000,
    priceHigh: 28000,
    confidence: 94,
    condition: 'PSA 9',
    year: 1999,
    seller: { name: 'Meridian Collectibles', verified: true, rating: 4.9 },
    images: [POK_IMG, POK_IMG_2, POK_IMG],
    thumb: POK_IMG,
    listedAt: '2026-01-04T10:12:00Z',
    provenance: ['Original owner since 1999', 'Sealed in PSA case Aug 2021'],
    tags: ['Holo', '1st Edition', 'Base Set'],
  },
  {
    id: 'itm-002',
    title: 'Untitled (Study in Ochre)',
    subtitle: 'Oil on linen · 48 × 60 in',
    category: 'fine-art',
    price: 18200,
    priceLow: 15000,
    priceHigh: 21000,
    confidence: 78,
    condition: 'Excellent',
    year: 1978,
    seller: { name: 'Gallery Ferro', verified: true, rating: 5.0 },
    images: [ART_IMG, ART_IMG_2, ART_IMG_3],
    thumb: ART_IMG,
    listedAt: '2026-01-06T14:00:00Z',
    provenance: ['Private collection, Zurich', 'Exhibited Kunsthaus 1982'],
    tags: ['Post-War', 'Abstract'],
  },
  {
    id: 'itm-003',
    title: 'Black Lotus — Alpha',
    subtitle: 'BGS 8.5 · Original border',
    category: 'magic',
    price: 78900,
    priceLow: 72000,
    priceHigh: 86000,
    confidence: 96,
    condition: 'BGS 8.5',
    year: 1993,
    seller: { name: 'Reserved List Co.', verified: true, rating: 4.98 },
    images: [MTG_IMG, MTG_IMG_2, MTG_IMG],
    thumb: MTG_IMG,
    listedAt: '2026-01-08T09:30:00Z',
    provenance: ['Acquired at Wizards Pro Tour 1996'],
    tags: ['Power Nine', 'Alpha'],
  },
  {
    id: 'itm-004',
    title: 'Amazing Fantasy #15 — CGC 6.0',
    subtitle: 'First appearance of Spider-Man',
    category: 'comics',
    price: 128000,
    priceLow: 118000,
    priceHigh: 142000,
    confidence: 91,
    condition: 'CGC 6.0',
    year: 1962,
    seller: { name: 'Silver Age Vault', verified: true, rating: 4.95 },
    images: [COMIC_IMG, COMIC_IMG_2, COMIC_IMG],
    thumb: COMIC_IMG,
    listedAt: '2026-01-02T18:22:00Z',
    provenance: ['Pedigree: Northland Collection'],
    tags: ['Key Issue', 'Silver Age'],
  },
  {
    id: 'itm-005',
    title: '1794 Flowing Hair Silver Dollar',
    subtitle: 'PCGS AU-53 · First-year issue',
    category: 'coins',
    price: 465000,
    priceLow: 420000,
    priceHigh: 510000,
    confidence: 88,
    condition: 'PCGS AU-53',
    year: 1794,
    seller: { name: 'Numis Heritage', verified: true, rating: 5.0 },
    images: [COIN_IMG, COIN_IMG_2, COIN_IMG],
    thumb: COIN_IMG,
    listedAt: '2025-12-29T11:00:00Z',
    provenance: ['Ex. Cardinal Collection'],
    tags: ['Early US', 'First Year'],
  },
  {
    id: 'itm-006',
    title: 'Signed Fender Stratocaster — Gilmour',
    subtitle: 'JSA Full LOA · 2019',
    category: 'memorabilia',
    price: 32500,
    priceLow: 28000,
    priceHigh: 36000,
    confidence: 82,
    condition: 'Excellent',
    year: 2019,
    seller: { name: 'Backstage Archive', verified: true, rating: 4.87 },
    images: [MEM_IMG, MEM_IMG_2, MEM_IMG],
    thumb: MEM_IMG,
    listedAt: '2026-01-07T20:15:00Z',
    provenance: ['Signed at Royal Albert Hall'],
    tags: ['Music', 'JSA'],
  },
  {
    id: 'itm-007',
    title: 'Pikachu Illustrator Promo',
    subtitle: 'PSA 7 · CoroCoro contest 1998',
    category: 'pokemon',
    price: 385000,
    priceLow: 340000,
    priceHigh: 420000,
    confidence: 89,
    condition: 'PSA 7',
    year: 1998,
    seller: { name: 'Meridian Collectibles', verified: true, rating: 4.9 },
    images: [POK_IMG_2, POK_IMG, POK_IMG_2],
    thumb: POK_IMG_2,
    listedAt: '2026-01-01T08:00:00Z',
    provenance: ['Contest winner, verified via CoroCoro archives'],
    tags: ['Grail', 'Promo'],
  },
  {
    id: 'itm-008',
    title: 'Composition in Blue',
    subtitle: 'Acrylic on canvas · 36 × 48 in',
    category: 'fine-art',
    price: 9800,
    priceLow: 8500,
    priceHigh: 11500,
    confidence: 71,
    condition: 'Very Good',
    year: 1992,
    seller: { name: 'Atelier Nord', verified: false, rating: 4.6 },
    images: [ART_IMG_2, ART_IMG_3, ART_IMG],
    thumb: ART_IMG_2,
    listedAt: '2026-01-05T12:00:00Z',
    provenance: ['Estate sale, Copenhagen'],
    tags: ['Contemporary'],
  },
  {
    id: 'itm-009',
    title: 'Mox Sapphire — Beta',
    subtitle: 'PSA 8 · Original border',
    category: 'magic',
    price: 41200,
    priceLow: 37000,
    priceHigh: 45000,
    confidence: 93,
    condition: 'PSA 8',
    year: 1993,
    seller: { name: 'Reserved List Co.', verified: true, rating: 4.98 },
    images: [MTG_IMG_2, MTG_IMG, MTG_IMG_2],
    thumb: MTG_IMG_2,
    listedAt: '2026-01-08T15:45:00Z',
    provenance: ['Sealed pack pull, 1993'],
    tags: ['Power Nine', 'Beta'],
  },
  {
    id: 'itm-010',
    title: 'Detective Comics #27 — CGC 4.5',
    subtitle: 'First appearance of Batman',
    category: 'comics',
    price: 1450000,
    priceLow: 1300000,
    priceHigh: 1600000,
    confidence: 87,
    condition: 'CGC 4.5',
    year: 1939,
    seller: { name: 'Golden Age Estate', verified: true, rating: 5.0 },
    images: [COMIC_IMG_2, COMIC_IMG, COMIC_IMG_2],
    thumb: COMIC_IMG_2,
    listedAt: '2025-12-20T09:00:00Z',
    provenance: ['Mile High Collection'],
    tags: ['Grail', 'Golden Age'],
  },
  {
    id: 'itm-011',
    title: '1933 Double Eagle',
    subtitle: 'MS-65 · One of the finest known',
    category: 'coins',
    price: 7800000,
    priceLow: 7200000,
    priceHigh: 8400000,
    confidence: 85,
    condition: 'MS-65',
    year: 1933,
    seller: { name: 'Numis Heritage', verified: true, rating: 5.0 },
    images: [COIN_IMG_2, COIN_IMG, COIN_IMG_2],
    thumb: COIN_IMG_2,
    listedAt: '2025-12-15T10:00:00Z',
    provenance: ['King Farouk collection'],
    tags: ['Grail', 'Gold'],
  },
  {
    id: 'itm-012',
    title: 'Signed Jordan Rookie Jersey',
    subtitle: 'PSA/DNA Certified · Game-issued',
    category: 'memorabilia',
    price: 68000,
    priceLow: 60000,
    priceHigh: 76000,
    confidence: 84,
    condition: 'Excellent',
    year: 1985,
    seller: { name: 'Hardcourt Provenance', verified: true, rating: 4.92 },
    images: [MEM_IMG_2, MEM_IMG, MEM_IMG_2],
    thumb: MEM_IMG_2,
    listedAt: '2026-01-06T13:00:00Z',
    provenance: ['Team locker room source'],
    tags: ['Sports', 'PSA'],
  },
];

export const RECENT_SALES = [
  { id: 's1', title: 'Charizard 1st Ed. Holo — PSA 10', price: 62000, date: '2026-01-03' },
  { id: 's2', title: 'Black Lotus Beta — BGS 9', price: 92500, date: '2026-01-02' },
  { id: 's3', title: 'Action Comics #1 — CGC 2.0', price: 1180000, date: '2025-12-28' },
  { id: 's4', title: '1804 Draped Bust Dollar', price: 3200000, date: '2025-12-22' },
];

export const SELLER_LISTINGS = [
  { ...ITEMS[0], status: 'live', views: 1284, watchers: 42 },
  { ...ITEMS[1], status: 'live', views: 512, watchers: 18 },
  { ...ITEMS[5], status: 'draft', views: 0, watchers: 0 },
];

export const CURRENT_USER = {
  id: 'usr-001',
  name: 'Alex Whitmore',
  handle: '@awhitmore',
  email: 'alex@collectible.example',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
  verified: true,
  memberSince: '2024-03',
};

export function findItem(id) {
  return ITEMS.find((i) => i.id === id);
}

export function findCategory(id) {
  return CATEGORIES.find((c) => c.id === id);
}

export function itemsByCategory(id) {
  return ITEMS.filter((i) => i.category === id);
}
