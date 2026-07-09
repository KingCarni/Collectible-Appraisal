// services/valuation.service.js
// Stubbed valuation service. Replace with real AI provider (OpenAI, Anthropic, etc.)
// The UI never knows the underlying implementation.

import { CATEGORIES } from '../data/mock';

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * @typedef {Object} Valuation
 * @property {string} id
 * @property {number} estimatedLow
 * @property {number} estimatedMid
 * @property {number} estimatedHigh
 * @property {number} confidence  // 0-100
 * @property {string} category
 * @property {string} title
 * @property {string} rationale
 * @property {string[]} improvementSuggestions
 * @property {Array<{title: string, price: number, source: string, date: string}>} comparableSales
 * @property {string[]} images
 */

const COMPARABLE_POOLS = {
  pokemon: [
    { title: 'Charizard 1st Ed. Holo PSA 9', price: 23800, source: 'PWCC Auction', date: '2025-11-14' },
    { title: 'Charizard 1st Ed. Holo PSA 8', price: 14200, source: 'Heritage Auctions', date: '2025-12-01' },
    { title: 'Charizard 1st Ed. Holo PSA 10', price: 62500, source: 'eBay Verified', date: '2026-01-03' },
  ],
  'fine-art': [
    { title: 'Similar oil, 40x50 in — Skinner', price: 17500, source: 'Skinner', date: '2025-10-08' },
    { title: 'Same artist, works on paper', price: 12000, source: 'Christie\'s', date: '2025-09-19' },
    { title: 'Comparable size & period', price: 21000, source: 'Bonhams', date: '2025-12-05' },
  ],
  magic: [
    { title: 'Black Lotus Alpha BGS 8', price: 68000, source: 'PWCC', date: '2025-12-12' },
    { title: 'Black Lotus Alpha BGS 9', price: 108000, source: 'Heritage', date: '2025-11-20' },
    { title: 'Black Lotus Beta BGS 8.5', price: 41000, source: 'Goldin', date: '2025-12-30' },
  ],
  comics: [
    { title: 'Amazing Fantasy #15 CGC 5.5', price: 98000, source: 'Heritage', date: '2025-11-01' },
    { title: 'Amazing Fantasy #15 CGC 6.5', price: 158000, source: 'ComicConnect', date: '2025-12-14' },
    { title: 'Amazing Fantasy #15 CGC 7.0', price: 210000, source: 'Heritage', date: '2026-01-05' },
  ],
  coins: [
    { title: '1794 Flowing Hair AU-50', price: 380000, source: 'Stack\'s Bowers', date: '2025-10-22' },
    { title: '1794 Flowing Hair AU-55', price: 520000, source: 'Heritage', date: '2025-11-30' },
    { title: '1795 Flowing Hair AU-53', price: 285000, source: 'Legend Rare', date: '2025-12-18' },
  ],
  memorabilia: [
    { title: 'Signed Strat, D. Gilmour 2017', price: 28500, source: 'Julien\'s', date: '2025-09-05' },
    { title: 'Signed Strat, Waters', price: 22000, source: 'RR Auctions', date: '2025-12-01' },
    { title: 'Signed Strat, Gilmour 2021', price: 35000, source: 'Julien\'s', date: '2026-01-02' },
  ],
};

const MOCK_TITLES = {
  pokemon: 'Charizard — 1st Edition Shadowless Holo',
  'fine-art': 'Untitled Post-War Abstract',
  magic: 'Black Lotus — Alpha',
  comics: 'Silver Age Key Issue',
  coins: '1794 Flowing Hair Silver Dollar',
  memorabilia: 'Signed Guitar — Vintage',
};

function guessCategory(files) {
  // Fake heuristic — cycles through categories based on filename hash.
  if (!files?.length) return 'pokemon';
  const seed = (files[0]?.name || '').length;
  const ids = CATEGORIES.map((c) => c.id);
  return ids[seed % ids.length];
}

/**
 * Kick off a valuation. In production this posts images to the AI service and
 * receives a structured response.
 * @param {{files: File[], notes?: string, categoryHint?: string}} input
 * @returns {Promise<Valuation>}
 */
export async function valuateItem({ files = [], notes = '', categoryHint } = {}) {
  // TODO: replace with real OpenAI / Anthropic vision call
  await delay(2400); // simulate model latency

  const category = categoryHint || guessCategory(files);
  const base = {
    pokemon: 24500,
    'fine-art': 18200,
    magic: 78900,
    comics: 128000,
    coins: 465000,
    memorabilia: 32500,
  }[category];

  const estimatedMid = Math.round(base * (0.92 + Math.random() * 0.16));
  const estimatedLow = Math.round(estimatedMid * 0.88);
  const estimatedHigh = Math.round(estimatedMid * 1.14);
  const confidence = Math.round(72 + Math.random() * 22);

  return {
    id: `val-${Date.now()}`,
    title: MOCK_TITLES[category],
    category,
    estimatedLow,
    estimatedMid,
    estimatedHigh,
    confidence,
    rationale:
      'Our valuation is anchored to three recent verified sales of comparable grade and provenance, adjusted for current market momentum in this category (+4% over the last 90 days).',
    improvementSuggestions: [
      'Add a photo of the back or reverse side',
      'Upload a close-up of any grading label or authentication mark',
      'Include a measurement reference (ruler or coin)',
      'Note the provenance or original purchase details',
    ],
    comparableSales: COMPARABLE_POOLS[category] || [],
    images: files.map((f) => URL.createObjectURL(f)),
    notes,
  };
}

export async function saveValuationDraft(valuation) {
  // TODO: persist to backend
  await delay(300);
  return { ok: true, id: valuation.id };
}
