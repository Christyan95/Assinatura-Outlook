/**
 * Input Sanitization Module
 * Prevents XSS, HTML injection, and invalid characters
 */

import DOMPurify from 'dompurify';
import { CONSTANTS } from './constants';

/**
 * Sanitizes text input to remove dangerous characters and HTML tags
 * Maintains Brazilian Portuguese special characters (ç, ã, õ, etc)
 */
export const sanitizeText = (input: string, maxLength: number): string => {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Use DOMPurify with strict configuration
  const cleaned = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  });

  // Remove leading/trailing whitespace
  const trimmed = cleaned.trim();

  // Enforce max length
  return trimmed.substring(0, maxLength);
};

/**
 * Sanitizes name input specifically
 * Allows only letters, numbers, spaces, hyphens, and Portuguese accents
 */
export const sanitizeName = (input: string): string => {
  const sanitized = sanitizeText(input, CONSTANTS.INPUT_CONSTRAINTS.NOME_MAX);

  // Optional: Allow only alphanumeric + spaces + Portuguese accents + hyphens
  // This regex keeps: letters (including accented), numbers, spaces, hyphens
  const nameRegex = /^[a-zA-ZÀ-ÿ0-9\s\-']*$/;

  if (!nameRegex.test(sanitized)) {
    // Remove invalid characters but keep content
    return sanitized.replace(/[^a-zA-ZÀ-ÿ0-9\s\-']/g, '').trim();
  }

  return sanitized;
};

/**
 * Sanitizes job title/position input
 */
export const sanitizePosition = (input: string): string => {
  return sanitizeText(input, CONSTANTS.INPUT_CONSTRAINTS.CARGO_MAX);
};

/**
 * Sanitizes website/URL input
 * Ensures it's a valid domain format
 */
export const sanitizeWebsite = (input: string): string => {
  if (!input || typeof input !== 'string') {
    return '';
  }

  const cleaned = input.trim().toLowerCase();

  // Remove protocol if present
  const withoutProtocol = cleaned.replace(/^https?:\/\//, '');

  // Basic domain validation (simple regex, not comprehensive)
  const domainRegex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i;

  return domainRegex.test(withoutProtocol) ? withoutProtocol : '';
};

/**
 * Sanitizes and validates phone input
 * Returns clean phone number with only digits
 * Allows partial input for better UX while typing
 */
export const sanitizePhone = (input: string): string => {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Extract only digits
  const digits = input.replace(/\D/g, '');

  // Allow partial input while typing (for better UX)
  // Return up to 11 digits, even if user is still typing
  if (digits.length > CONSTANTS.PHONE_PATTERNS.MAX_DIGITS) {
    return digits.substring(0, CONSTANTS.PHONE_PATTERNS.MAX_DIGITS);
  }

  return digits;
};

/**
 * Generates properly formatted phone number
 * (XX) X XXXX-XXXX or (XX) XXXX-XXXX
 */
export const formatPhone = (cleanDigits: string): string => {
  if (!cleanDigits || cleanDigits.length < CONSTANTS.PHONE_PATTERNS.MIN_DIGITS) {
    return '';
  }

  const ddd = cleanDigits.substring(0, CONSTANTS.PHONE_PATTERNS.DDD_LENGTH);
  const body = cleanDigits.substring(CONSTANTS.PHONE_PATTERNS.DDD_LENGTH);

  if (body.length === 8) {
    // (XX) XXXX-XXXX (landline)
    return `(${ddd}) ${body.substring(0, 4)}-${body.substring(4)}`;
  } else if (body.length === 9) {
    // (XX) X XXXX-XXXX (mobile)
    return `(${ddd}) ${body.substring(0, 1)} ${body.substring(1, 5)}-${body.substring(5)}`;
  }

  return '';
};

/**
 * Safe HTML escape for rendering in HTML context
 * Prevents HTML injection in signature rendering
 */
export const escapeHtmlAttribute = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };

  return text.replace(/[&<>"']/g, (char) => map[char] || char);
};

export default {
  sanitizeText,
  sanitizeName,
  sanitizePosition,
  sanitizeWebsite,
  sanitizePhone,
  formatPhone,
  escapeHtmlAttribute,
};
