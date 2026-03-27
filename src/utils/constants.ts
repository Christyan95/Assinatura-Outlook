/**
 * Centralized Constants
 * Avoid magic strings and ensure configuration consistency
 */

export const CONSTANTS = {
  // Copy & Clipboard
  COPY_TOAST_DURATION: 3000,
  CLIPBOARD_TIMEOUT: 1000,

  // Input Constraints
  INPUT_CONSTRAINTS: {
    NOME_MAX: 50,
    CARGO_MAX: 60,
    CELULAR_MAX: 16,
  },

  // Phone Number Validation
  PHONE_PATTERNS: {
    DDD_LENGTH: 2,
    MIN_DIGITS: 10,
    MAX_DIGITS: 11,
  },

  // Outlook Configuration
  OUTLOOK_URL: 'https://outlook.office.com/mail/options/accounts-category/signatures-subcategory',
  OUTLOOK_PROTOCOL: 'https://',

  // Animation Defaults
  ANIMATION_DELAYS: {
    CARD_STAGGER: 0.15,
    FADE_DURATION: 0.6,
    HOVER_Y_OFFSET: 5,
  },

  // Signature HTML
  SIGNATURE: {
    LOGO_WIDTH: 120,
    FONT_FAMILY: "'Segoe UI', Arial, sans-serif",
    DEFAULT_LINE_HEIGHT: 1.2,
  },

  // Toast Messages
  TOAST_MESSAGES: {
    COPY_SUCCESS: 'Assinatura copiada com sucesso!',
    COPY_ERROR: 'Erro ao copiar assinatura. Tente novamente.',
    COPY_DENIED: 'Permissão de clipboard negada.',
  },

  // Error Messages
  ERROR_MESSAGES: {
    INVALID_COMPANY: 'Unidade de negócio não encontrada',
    INVALID_PHONE: 'Telefone inválido',
    INVALID_NAME: 'Nome inválido',
    FORM_INCOMPLETE: 'Por favor, preencha os campos obrigatórios',
    COPY_ERROR: 'Erro ao copiar assinatura. Tente novamente.',
    COPY_DENIED: 'Permissão de clipboard negada.',
  },

  // Date Format
  CURRENT_YEAR: new Date().getFullYear(),
};

export default CONSTANTS;
