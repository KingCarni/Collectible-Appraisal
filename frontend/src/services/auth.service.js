// services/auth.service.js — fully stubbed.
import { CURRENT_USER } from '../data/mock';

const delay = (ms) => new Promise((r) => setTimeout(r, ms));
let session = null;

export async function signIn({ email, password }) {
  await delay(600);
  if (!email || !password) throw new Error('Email and password required');
  session = { user: CURRENT_USER, token: 'mock-jwt-token' };
  return session;
}

export async function signUp({ email, password, name }) {
  await delay(700);
  if (!email || !password || !name) throw new Error('All fields required');
  session = { user: { ...CURRENT_USER, name, email }, token: 'mock-jwt-token' };
  return session;
}

export async function signOut() {
  await delay(150);
  session = null;
}

export function getSession() {
  return session;
}
