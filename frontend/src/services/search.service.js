// services/search.service.js
import { ITEMS } from '../data/mock';

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export async function search(query) {
  await delay(120);
  if (!query) return [];
  const q = query.toLowerCase();
  return ITEMS.filter(
    (i) =>
      i.title.toLowerCase().includes(q) ||
      i.subtitle.toLowerCase().includes(q) ||
      i.category.includes(q) ||
      i.tags?.some((t) => t.toLowerCase().includes(q)),
  ).slice(0, 8);
}
