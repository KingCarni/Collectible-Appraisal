// services/item.service.js — user's own items (collection, saved, drafts)
import { ITEMS, SELLER_LISTINGS } from '../data/mock';

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export async function getMyListings() {
  await delay(120);
  return SELLER_LISTINGS;
}

export async function getMyCollection() {
  await delay(120);
  return []; // empty state
}

export async function getSavedItems() {
  await delay(120);
  return []; // empty state
}

export async function getAdminQueue() {
  await delay(120);
  return []; // empty state
}

export async function getDashboardMetrics() {
  await delay(120);
  return {
    grossSales: 68400,
    activeListings: SELLER_LISTINGS.filter((l) => l.status === 'live').length,
    pendingOffers: 3,
    watchers: SELLER_LISTINGS.reduce((s, l) => s + (l.watchers || 0), 0),
  };
}

export async function getFeaturedItems(limit = 6) {
  await delay(100);
  return ITEMS.slice(0, limit);
}
