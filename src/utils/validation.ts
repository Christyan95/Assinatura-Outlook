/**
 * Validation Utilities
 * Centralized business logic validation
 */

import { CONSTANTS } from './constants';
import { sanitizePhone } from './sanitizer';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates name field
 * Required: at least 2 characters
 */
export const validateName = (name: string): ValidationResult => {
  const trimmed = name.trim();

  if (!trimmed) {
    return {
      isValid: false,
      error: 'Nome é obrigatório',
    };
  }

  if (trimmed.length < 2) {
    return {
      isValid: false,
      error: 'Nome deve ter pelo menos 2 caracteres',
    };
  }

  if (trimmed.length > CONSTANTS.INPUT_CONSTRAINTS.NOME_MAX) {
    return {
      isValid: false,
      error: `Nome não pode exceder ${CONSTANTS.INPUT_CONSTRAINTS.NOME_MAX} caracteres`,
    };
  }

  return { isValid: true };
};

/**
 * Validates position/job title
 * Optional field, but if provided must have minimum length
 */
export const validatePosition = (position: string): ValidationResult => {
  if (!position.trim()) {
    // Optional field
    return { isValid: true };
  }

  if (position.trim().length < 2) {
    return {
      isValid: false,
      error: 'Cargo deve ter pelo menos 2 caracteres',
    };
  }

  if (position.length > CONSTANTS.INPUT_CONSTRAINTS.CARGO_MAX) {
    return {
      isValid: false,
      error: `Cargo não pode exceder ${CONSTANTS.INPUT_CONSTRAINTS.CARGO_MAX} caracteres`,
    };
  }

  return { isValid: true };
};

/**
 * Validates phone number
 * Optional field, but if provided must be valid Brazilian format
 */
export const validatePhone = (phone: string): ValidationResult => {
  if (!phone.trim()) {
    // Optional field
    return { isValid: true };
  }

  const cleanDigits = sanitizePhone(phone);

  if (!cleanDigits) {
    return {
      isValid: false,
      error: 'Telefone deve ter 10 ou 11 dígitos',
    };
  }

  // Validate Brazilian DDD (area code)
  const ddd = parseInt(cleanDigits.substring(0, 2), 10);

  // Brazilian DDDs range from 11 to 99 typically
  if (ddd < 11 || ddd > 99) {
    return {
      isValid: false,
      error: 'DDD de telefone inválido',
    };
  }

  return { isValid: true };
};

/**
 * Validates website URL format
 * Ensuresit's a properly formatted domain
 */
export const validateWebsite = (website: string): ValidationResult => {
  if (!website || typeof website !== 'string') {
    return {
      isValid: false,
      error: 'Website inválido',
    };
  }

  const domainRegex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i;

  if (!domainRegex.test(website)) {
    return {
      isValid: false,
      error: 'Formato de website inválido',
    };
  }

  return { isValid: true };
};

/**
 * Validates complete form before copy
 * Checks all mandatory fields
 */
export interface FormData {
  nome: string;
  cargo: string;
  celular: string;
  saudacao: string;
  unidade: string;
}

export const validateForm = (formData: FormData): ValidationResult => {
  // Validate name (mandatory)
  const nameValidation = validateName(formData.nome);
  if (!nameValidation.isValid) {
    return nameValidation;
  }

  // Validate position (mandatory)
  const positionValidation = validatePosition(formData.cargo);
  if (!positionValidation.isValid) {
    return positionValidation;
  }

  // Validate phone (optional)
  const phoneValidation = validatePhone(formData.celular);
  if (!phoneValidation.isValid) {
    return phoneValidation;
  }

  return { isValid: true };
};

/**
 * Validates color hex format
 * Ensures brand colors are valid
 */
export const validateHexColor = (color: string): ValidationResult => {
  const hexRegex = /^#(?:[0-9a-f]{3}){1,2}$/i;

  if (!hexRegex.test(color)) {
    return {
      isValid: false,
      error: 'Cor hexadecimal inválida',
    };
  }

  return { isValid: true };
};

/**
 * Validates company/brand slug
 * Only alphanumeric and hyphens
 */
export const validateSlug = (slug: string): ValidationResult => {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  if (!slugRegex.test(slug)) {
    return {
      isValid: false,
      error: 'Slug inválido. Use apenas letras minúsculas, números e hífens',
    };
  }

  return { isValid: true };
};

export default {
  validateName,
  validatePosition,
  validatePhone,
  validateWebsite,
  validateForm,
  validateHexColor,
  validateSlug,
};
