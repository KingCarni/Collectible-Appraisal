// services/marketplace.service.js
// Read-only marketplace queries. Replace with real API calls later.

import { ITEMS, CATEGORIES, findItem, itemsByCategory, RECENT_SALES } from '../data/mock';

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export async function listCategories() {
  await delay(50);
  return CATEGORIES;
}

/**
 * @param {{category?: string, query?: string, minPrice?: number, maxPrice?: number, condition?: string, sort?: 'featured'|'newest'|'price-asc'|'price-desc'}} filters
 */
export async function listItems(filters = {}) {
  await delay(150);
  let items = [...ITEMS];
  if (filters.category) items = items.filter((i) => i.category === filters.category);
  if (filters.query) {
    const q = filters.query.toLowerCase();
    items = items.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.subtitle.toLowerCase().includes(q) ||
        i.tags?.some((t) => t.toLowerCase().includes(q)),
    );
  }
  if (filters.minPrice != null) items = items.filter((i) => i.price >= filters.minPrice);
  if (filters.maxPrice != null) items = items.filter((i) => i.price <= filters.maxPrice);
  if (filters.condition && filters.condition !== 'all') {
    items = items.filter((i) => i.condition === filters.condition);
  }
  switch (filters.sort) {
    case 'price-asc':
      items.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      items.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      items.sort((a, b) => new Date(b.listedAt) - new Date(a.listedAt));
      break;
    default:
      break;
  }
  return items;
}

export async function getItem(id) {
  await delay(80);
  return findItem(id) || null;
}

export async function getRelatedItems(id, limit = 4) {
  await delay(80);
  const item = findItem(id);
  if (!item) return [];
  return itemsByCategory(item.category)
    .filter((i) => i.id !== id)
    .slice(0, limit);
}

export async function getRecentSales() {
  await delay(60);
  return RECENT_SALES;
}

export async function createListing(_payload) {
  // TODO: persist to backend
  await delay(400);
  return { ok: true, id: `list-${Date.now()}` };
}

export async function makeOffer({ itemId, amount }) {
  // TODO: real Stripe / escrow flow
  await delay(600);
  return { ok: true, offerId: `offer-${Date.now()}`, itemId, amount };
}

export async function buyNow({ itemId }) {
  // TODO: real Stripe checkout redirect
  await delay(800);
  return { ok: true, orderId: `order-${Date.now()}`, itemId };
}
