import { cookies } from 'next/headers';
import crypto from 'crypto';

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

// Use env secret, fallback to stable key in dev to prevent session invalidation on Next.js HMR/reload
const sessionSecret = process.env.SESSION_SECRET || 'property_broker_pro_dev_secret_key_987654321_stable';

// Signs a payload
function signPayload(payload) {
  const data = JSON.stringify(payload);
  const hmac = crypto.createHmac('sha256', sessionSecret);
  hmac.update(data);
  const signature = hmac.digest('hex');
  return Buffer.from(data).toString('base64') + '.' + signature;
}

// Verifies a signed token
function verifyToken(token) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  try {
    const dataStr = Buffer.from(parts[0], 'base64').toString('utf-8');
    const signature = parts[1];

    const hmac = crypto.createHmac('sha256', sessionSecret);
    hmac.update(dataStr);
    const expectedSignature = hmac.digest('hex');

    if (signature !== expectedSignature) {
      return null;
    }

    const payload = JSON.parse(dataStr);
    if (payload.expiry < Date.now()) {
      return null; // Expired
    }

    return payload;
  } catch (e) {
    return null;
  }
}

export async function loginAdmin() {
  const payload = {
    user: 'admin',
    expiry: Date.now() + SESSION_EXPIRY_MS
  };
  const token = signPayload(payload);
  
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 // 24 hours
  });
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return false;

  const session = verifyToken(token);
  return session !== null;
}
